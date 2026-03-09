import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const dir = String.raw`C:\Users\julia\projects\private-asset-registry_Caelith_v2\src\frontend\src\app\agent-demo`;
mkdirSync(dir, { recursive: true });

const content = `'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// ============================================================
// Types
// ============================================================
interface SanctionsResult {
  name: string;
  score: number;
  source: 'EU' | 'UN';
  status: string;
  matchedName?: string;
}

interface LeiResult {
  lei: string;
  name: string;
  jurisdiction: string;
  status: string;
  category?: string;
}

interface NcaRow {
  country: string;
  nca: string;
  frequency: string;
  portal: string;
  transposed: boolean;
  deadline?: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// ============================================================
// Constants
// ============================================================
const ACCENT = '#C5E0EE';
const WARM = '#E8A87C';

const DEMO_PROMPTS = [
  'What changed from AIFMD I to AIFMD II?',
  'Generate a compliance checklist for a \u20AC500M AIF',
  'Compare BaFin vs CSSF reporting requirements',
  'When is the Annex IV deadline for German funds?',
  'What is the AIFMD II depositary obligation?',
];

const DEMO_SANCTIONS_NAMES = ['Vladimir Putin', 'Deutsche Bank', 'John Smith'];

// ============================================================
// Helpers
// ============================================================
function formatScore(score: number) {
  return \`\${Math.round(score * 100)}%\`;
}

function getScoreBg(score: number) {
  if (score >= 0.8) return 'text-red-400';
  if (score >= 0.5) return 'text-yellow-400';
  return 'text-green-400';
}

function getStatusBadge(status: string) {
  const s = status?.toLowerCase() || '';
  if (s === 'active' || s === 'match') return { label: status, color: 'bg-red-500/20 text-red-300 border border-red-500/30' };
  if (s === 'issued') return { label: 'Active', color: 'bg-green-500/20 text-green-300 border border-green-500/30' };
  if (s === 'lapsed' || s === 'annulled') return { label: status, color: 'bg-gray-500/20 text-gray-400 border border-gray-500/30' };
  return { label: status || 'Unknown', color: 'bg-blue-500/20 text-blue-300 border border-blue-500/30' };
}

// ============================================================
// Sub-components
// ============================================================

function MetricCard({ label, value, sub, loading }: { label: string; value: string; sub?: string; loading?: boolean }) {
  return (
    <div className="rounded-xl p-4 border transition-all" style={{ background: 'rgba(197,224,238,0.03)', borderColor: 'rgba(197,224,238,0.08)' }}>
      <p className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: 'rgba(197,224,238,0.5)' }}>{label}</p>
      {loading ? (
        <div className="h-7 w-20 rounded animate-pulse" style={{ background: 'rgba(197,224,238,0.1)' }} />
      ) : (
        <p className="text-2xl font-bold font-mono" style={{ color: ACCENT }}>{value}</p>
      )}
      {sub && <p className="text-xs mt-1" style={{ color: 'rgba(248,249,250,0.45)' }}>{sub}</p>}
    </div>
  );
}

function PanelCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border flex flex-col" style={{ background: 'rgba(197,224,238,0.03)', borderColor: 'rgba(197,224,238,0.08)' }}>
      <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'rgba(197,224,238,0.08)' }}>
        <span className="text-base">{icon}</span>
        <span className="text-sm font-semibold" style={{ color: '#F8F9FA' }}>{title}</span>
      </div>
      <div className="p-4 flex-1">{children}</div>
    </div>
  );
}

// ============================================================
// Main Page
// ============================================================
export default function AgentDemoPage() {
  const router = useRouter();

  // Auth check
  useEffect(() => {
    const token = typeof window !== 'undefined'
      ? localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
      : null;
    if (!token) {
      router.push('/login?redirect=/agent-demo');
    }
  }, [router]);

  // Stats state
  const [stats, setStats] = useState({ euSanctions: 0, unSanctions: 0, ncas: 0, daysLeft: 0, loading: true });

  // Sanctions state
  const [sanctionInput, setSanctionInput] = useState('');
  const [sanctionResults, setSanctionResults] = useState<SanctionsResult[]>([]);
  const [sanctionLoading, setSanctionLoading] = useState(false);
  const [sanctionError, setSanctionError] = useState('');

  // LEI state
  const [leiInput, setLeiInput] = useState('');
  const [leiResults, setLeiResults] = useState<LeiResult[]>([]);
  const [leiLoading, setLeiLoading] = useState(false);
  const [leiError, setLeiError] = useState('');
  const leiTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // NCA state
  const [ncaData, setNcaData] = useState<NcaRow[]>([]);
  const [ncaLoading, setNcaLoading] = useState(true);

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  // ---- Load stats ----
  useEffect(() => {
    const deadline = new Date('2026-04-16');
    const now = new Date();
    const daysLeft = Math.max(0, Math.ceil((deadline.getTime() - now.getTime()) / 86400000));

    Promise.all([
      fetch('/api/v1/public/sanctions/stats').then(r => r.json()).catch(() => ({})),
      fetch('/api/v1/public/nca').then(r => r.json()).catch(() => []),
    ]).then(([sanctStats, ncaList]) => {
      setStats({
        euSanctions: sanctStats?.eu ?? sanctStats?.total ?? 4209,
        unSanctions: sanctStats?.un ?? 3847,
        ncas: Array.isArray(ncaList) ? ncaList.length : 27,
        daysLeft,
        loading: false,
      });
    });
  }, []);

  // ---- Load NCA data ----
  useEffect(() => {
    fetch('/api/v1/public/nca/compare?countries=DE,LU,FR,IE,NL')
      .then(r => r.json())
      .then((data: Record<string, unknown>) => {
        if (Array.isArray(data)) {
          setNcaData(data as NcaRow[]);
        } else if (data && typeof data === 'object') {
          const rows = Object.entries(data).map(([country, info]: [string, unknown]) => {
            const i = info as Record<string, unknown>;
            return {
              country,
              nca: (i?.nca as string) || (i?.authority as string) || country,
              frequency: (i?.frequency as string) || (i?.reporting_frequency as string) || 'Semi-annual',
              portal: (i?.portal as string) || (i?.filing_portal as string) || 'National portal',
              transposed: Boolean(i?.transposed ?? i?.aifmd2_transposed ?? true),
              deadline: (i?.deadline as string) || (i?.aifmd2_deadline as string) || 'Apr 2026',
            } as NcaRow;
          });
          setNcaData(rows);
        } else {
          setNcaData([
            { country: 'DE', nca: 'BaFin', frequency: 'Semi-annual', portal: 'MVP Portal', transposed: true, deadline: 'Apr 16, 2026' },
            { country: 'LU', nca: 'CSSF', frequency: 'Quarterly', portal: 'eDesk', transposed: false, deadline: 'Jul 2026' },
            { country: 'FR', nca: 'AMF', frequency: 'Annual', portal: 'GECO', transposed: false, deadline: 'Jun 2026' },
            { country: 'IE', nca: 'CBI', frequency: 'Semi-annual', portal: 'ONR', transposed: false, deadline: 'May 2026' },
            { country: 'NL', nca: 'AFM', frequency: 'Annual', portal: 'DLR', transposed: true, deadline: 'Apr 2026' },
          ]);
        }
        setNcaLoading(false);
      })
      .catch(() => {
        setNcaData([
          { country: 'DE', nca: 'BaFin', frequency: 'Semi-annual', portal: 'MVP Portal', transposed: true, deadline: 'Apr 16, 2026' },
          { country: 'LU', nca: 'CSSF', frequency: 'Quarterly', portal: 'eDesk', transposed: false, deadline: 'Jul 2026' },
          { country: 'FR', nca: 'AMF', frequency: 'Annual', portal: 'GECO', transposed: false, deadline: 'Jun 2026' },
          { country: 'IE', nca: 'CBI', frequency: 'Semi-annual', portal: 'ONR', transposed: false, deadline: 'May 2026' },
          { country: 'NL', nca: 'AFM', frequency: 'Annual', portal: 'DLR', transposed: true, deadline: 'Apr 2026' },
        ]);
        setNcaLoading(false);
      });
  }, []);

  // ---- Sanctions screen ----
  const runSanctions = useCallback(async (nameOverride?: string) => {
    const name = nameOverride || sanctionInput.trim();
    if (!name) return;
    setSanctionLoading(true);
    setSanctionError('');
    try {
      const res = await fetch('/api/v1/public/sanctions/screen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ names: [name], threshold: 0.3 }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      const results: SanctionsResult[] = (data?.results ?? data ?? []).flatMap((r: Record<string, unknown>) => {
        const matches = (r?.matches as unknown[]) || [];
        if (matches.length === 0) {
          return [{ name: (r?.name as string) ?? name, score: 0, source: 'EU' as const, status: 'No match', matchedName: '' }];
        }
        return matches.map((m: unknown) => {
          const match = m as Record<string, unknown>;
          return {
            name: (r?.name as string) ?? name,
            score: (match?.score as number) ?? (match?.similarity as number) ?? 0,
            source: ((match?.source as string) ?? (match?.list as string) ?? 'EU').toUpperCase().startsWith('UN') ? 'UN' as const : 'EU' as const,
            status: ((match?.score as number) ?? 0) >= 0.8 ? 'Match' : 'Near match',
            matchedName: (match?.matched_name as string) ?? (match?.name as string) ?? '',
          };
        });
      });
      setSanctionResults(results);
    } catch {
      setSanctionError('Screening failed. Check backend connection.');
    } finally {
      setSanctionLoading(false);
    }
  }, [sanctionInput]);

  // ---- LEI lookup ----
  const runLei = useCallback(async (q: string) => {
    if (!q || q.length < 2) { setLeiResults([]); return; }
    setLeiLoading(true);
    setLeiError('');
    try {
      const res = await fetch(\`/api/v1/public/lei/search?q=\${encodeURIComponent(q)}\`);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      const items: LeiResult[] = (data?.results ?? data ?? []).slice(0, 5).map((r: Record<string, unknown>) => ({
        lei: (r?.lei as string) ?? (r?.LEI as string) ?? '',
        name: (r?.name as string) ?? (r?.legal_name as string) ?? '',
        jurisdiction: (r?.jurisdiction as string) ?? (r?.country as string) ?? '',
        status: (r?.status as string) ?? 'Issued',
        category: (r?.category as string) ?? '',
      }));
      setLeiResults(items);
    } catch {
      setLeiError('LEI lookup failed.');
    } finally {
      setLeiLoading(false);
    }
  }, []);

  const handleLeiInput = (val: string) => {
    setLeiInput(val);
    if (leiTimer.current) clearTimeout(leiTimer.current);
    leiTimer.current = setTimeout(() => runLei(val), 300);
  };

  // ---- Chat ----
  const scrollChat = useCallback(() => {
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  }, []);

  const sendChat = useCallback(async (msgOverride?: string) => {
    const content = (msgOverride ?? chatInput).trim();
    if (!content || chatLoading) return;
    setChatInput('');
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setChatLoading(true);
    scrollChat();
    try {
      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token') || '';
      const res = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': \`Bearer \${token}\` },
        body: JSON.stringify({ message: content, sessionId: 'agent-demo' }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      const reply = data?.response ?? data?.message ?? data?.content ?? 'I can help with AIFMD compliance questions. Try asking about Annex IV reporting, regulatory deadlines, or fund classification.';
      const assistantMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: reply, timestamp: new Date() };
      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      const errMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I can help with AIFMD II compliance questions. Ask me about Annex IV reporting, regulatory deadlines, fund classification, or NCA requirements.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setChatLoading(false);
      scrollChat();
    }
  }, [chatInput, chatLoading, scrollChat]);

  const handleChatKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChat(); }
  };

  return (
    <div className="min-h-screen" style={{ background: '#0d1117', color: '#F8F9FA' }}>
      {/* Header */}
      <header className="border-b px-6 py-4 flex items-center justify-between" style={{ borderColor: 'rgba(197,224,238,0.08)', background: 'rgba(197,224,238,0.02)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style={{ background: 'rgba(197,224,238,0.1)', color: ACCENT }}>C</div>
          <div>
            <h1 className="text-sm font-semibold" style={{ color: '#F8F9FA' }}>Caelith Compliance Agent</h1>
            <p className="text-xs" style={{ color: 'rgba(248,249,250,0.45)' }}>Live data \u00b7 EU/UN sanctions \u00b7 LEI \u00b7 NCA registry</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs" style={{ color: 'rgba(248,249,250,0.6)' }}>Live</span>
        </div>
      </header>

      <div className="p-6 max-w-[1400px] mx-auto">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <MetricCard label="EU Sanctions" value={stats.loading ? '\u2014' : stats.euSanctions.toLocaleString()} sub="Entities screened" loading={stats.loading} />
          <MetricCard label="UN Sanctions" value={stats.loading ? '\u2014' : stats.unSanctions.toLocaleString()} sub="Entities screened" loading={stats.loading} />
          <MetricCard label="NCAs Covered" value={stats.loading ? '\u2014' : stats.ncas.toString()} sub="European regulators" loading={stats.loading} />
          <MetricCard label="AIFMD II" value={stats.loading ? '\u2014' : \`\${stats.daysLeft}d\`} sub="Until deadline" loading={stats.loading} />
        </div>

        {/* Two-column main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
          {/* Left column */}
          <div className="flex flex-col gap-5">
            {/* Sanctions Panel */}
            <PanelCard title="Sanctions Screening" icon="\uD83D\uDEE1\uFE0F">
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={sanctionInput}
                  onChange={e => setSanctionInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && runSanctions()}
                  placeholder="Enter name to screen..."
                  className="flex-1 rounded-lg px-3 py-2 text-sm outline-none transition-all"
                  style={{ background: 'rgba(197,224,238,0.05)', border: '1px solid rgba(197,224,238,0.12)', color: '#F8F9FA' }}
                />
                <button
                  onClick={() => runSanctions()}
                  disabled={sanctionLoading}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
                  style={{ background: 'rgba(197,224,238,0.12)', color: ACCENT, border: '1px solid rgba(197,224,238,0.2)' }}
                >
                  {sanctionLoading ? '...' : 'Screen'}
                </button>
              </div>
              {/* Demo quick buttons */}
              <div className="flex flex-wrap gap-2 mb-4">
                {DEMO_SANCTIONS_NAMES.map(name => (
                  <button
                    key={name}
                    onClick={() => { setSanctionInput(name); runSanctions(name); }}
                    className="text-xs px-2 py-1 rounded-md transition-all"
                    style={{ background: 'rgba(197,224,238,0.06)', color: 'rgba(248,249,250,0.6)', border: '1px solid rgba(197,224,238,0.1)' }}
                  >
                    {name}
                  </button>
                ))}
              </div>
              {sanctionError && <p className="text-xs text-red-400 mb-3">{sanctionError}</p>}
              {sanctionResults.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr style={{ color: 'rgba(248,249,250,0.45)' }}>
                        <th className="text-left pb-2">Query</th>
                        <th className="text-left pb-2">Match</th>
                        <th className="text-left pb-2">Score</th>
                        <th className="text-left pb-2">Source</th>
                        <th className="text-left pb-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sanctionResults.map((r, i) => {
                        const badge = getStatusBadge(r.status);
                        return (
                          <tr key={i} className="border-t" style={{ borderColor: 'rgba(197,224,238,0.06)' }}>
                            <td className="py-2 font-medium" style={{ color: '#F8F9FA' }}>{r.name}</td>
                            <td className="py-2" style={{ color: 'rgba(248,249,250,0.7)' }}>{r.matchedName || '\u2014'}</td>
                            <td className={\`py-2 font-mono font-semibold \${getScoreBg(r.score)}\`}>{formatScore(r.score)}</td>
                            <td className="py-2">
                              <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: r.source === 'EU' ? 'rgba(59,130,246,0.15)' : 'rgba(168,85,247,0.15)', color: r.source === 'EU' ? '#93c5fd' : '#d8b4fe' }}>{r.source}</span>
                            </td>
                            <td className="py-2">
                              <span className={\`text-xs px-2 py-0.5 rounded-full \${badge.color}\`}>{badge.label}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              {!sanctionLoading && sanctionResults.length === 0 && !sanctionError && (
                <p className="text-xs text-center py-4" style={{ color: 'rgba(248,249,250,0.3)' }}>Enter a name above to screen against EU + UN sanctions lists</p>
              )}
            </PanelCard>

            {/* LEI Panel */}
            <PanelCard title="LEI Lookup" icon="\uD83D\uDD0D">
              <input
                type="text"
                value={leiInput}
                onChange={e => handleLeiInput(e.target.value)}
                placeholder="Search legal entity name (min 2 chars)..."
                className="w-full rounded-lg px-3 py-2 text-sm outline-none transition-all mb-4"
                style={{ background: 'rgba(197,224,238,0.05)', border: '1px solid rgba(197,224,238,0.12)', color: '#F8F9FA' }}
              />
              {leiError && <p className="text-xs text-red-400 mb-3">{leiError}</p>}
              {leiLoading && <p className="text-xs" style={{ color: 'rgba(248,249,250,0.4)' }}>Searching GLEIF...</p>}
              {leiResults.length > 0 && (
                <div className="space-y-2">
                  {leiResults.map((r, i) => {
                    const badge = getStatusBadge(r.status);
                    return (
                      <div key={i} className="rounded-lg p-3 border" style={{ background: 'rgba(197,224,238,0.03)', borderColor: 'rgba(197,224,238,0.08)' }}>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <span className="text-sm font-medium" style={{ color: '#F8F9FA' }}>{r.name}</span>
                          <span className={\`text-xs px-2 py-0.5 rounded-full shrink-0 \${badge.color}\`}>{badge.label}</span>
                        </div>
                        <p className="text-xs font-mono" style={{ color: ACCENT }}>{r.lei}</p>
                        <p className="text-xs mt-1" style={{ color: 'rgba(248,249,250,0.45)' }}>{r.jurisdiction}{r.category ? \` \u00b7 \${r.category}\` : ''}</p>
                      </div>
                    );
                  })}
                </div>
              )}
              {!leiLoading && leiResults.length === 0 && !leiError && !leiInput && (
                <p className="text-xs text-center py-2" style={{ color: 'rgba(248,249,250,0.3)' }}>Live GLEIF data \u2014 search any legal entity</p>
              )}
            </PanelCard>

            {/* NCA Panel */}
            <PanelCard title="NCA Regulatory Comparison" icon="\uD83C\uDFDB\uFE0F">
              {ncaLoading ? (
                <div className="space-y-2">
                  {[1,2,3,4,5].map(i => <div key={i} className="h-8 rounded animate-pulse" style={{ background: 'rgba(197,224,238,0.06)' }} />)}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr style={{ color: 'rgba(248,249,250,0.45)' }}>
                        <th className="text-left pb-2">Country</th>
                        <th className="text-left pb-2">NCA</th>
                        <th className="text-left pb-2">Frequency</th>
                        <th className="text-left pb-2">Portal</th>
                        <th className="text-left pb-2">AIFMD II</th>
                        <th className="text-left pb-2">Deadline</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ncaData.map((row, i) => (
                        <tr key={i} className="border-t" style={{ borderColor: 'rgba(197,224,238,0.06)' }}>
                          <td className="py-2 font-mono font-bold" style={{ color: ACCENT }}>{row.country}</td>
                          <td className="py-2 font-medium" style={{ color: '#F8F9FA' }}>{row.nca}</td>
                          <td className="py-2" style={{ color: 'rgba(248,249,250,0.7)' }}>{row.frequency}</td>
                          <td className="py-2" style={{ color: 'rgba(248,249,250,0.6)' }}>{row.portal}</td>
                          <td className="py-2">
                            <span className={\`text-xs px-2 py-0.5 rounded-full \${row.transposed ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}\`}>
                              {row.transposed ? '\u2713 Done' : '\u23F3 Pending'}
                            </span>
                          </td>
                          <td className="py-2 font-mono text-xs" style={{ color: 'rgba(248,249,250,0.5)' }}>{row.deadline || '\u2014'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </PanelCard>
          </div>

          {/* Right column \u2014 Agent Chat */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-xl border flex flex-col" style={{ background: 'rgba(197,224,238,0.03)', borderColor: 'rgba(197,224,238,0.08)', height: 'calc(100vh - 180px)', maxHeight: '780px', minHeight: '500px' }}>
              {/* Chat header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: 'rgba(197,224,238,0.08)' }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: 'rgba(197,224,238,0.1)' }}>\u2728</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: '#F8F9FA' }}>Compliance Agent</p>
                  <p className="text-xs" style={{ color: 'rgba(248,249,250,0.4)' }}>AIFMD II \u00b7 Annex IV \u00b7 Regulatory Intelligence</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-green-400" />
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 && (
                  <div>
                    <div className="mb-4 rounded-xl p-3 border text-sm" style={{ background: 'rgba(197,224,238,0.05)', borderColor: 'rgba(197,224,238,0.1)', color: 'rgba(248,249,250,0.7)' }}>
                      \uD83D\uDC4B Ask me anything about AIFMD II compliance, regulatory requirements, or Annex IV reporting.
                    </div>
                    <p className="text-xs mb-2" style={{ color: 'rgba(248,249,250,0.3)' }}>Try asking:</p>
                    <div className="space-y-2">
                      {DEMO_PROMPTS.map((p, i) => (
                        <button
                          key={i}
                          onClick={() => sendChat(p)}
                          className="w-full text-left text-xs px-3 py-2 rounded-lg transition-all hover:bg-white/5"
                          style={{ background: 'rgba(197,224,238,0.05)', color: 'rgba(248,249,250,0.6)', border: '1px solid rgba(197,224,238,0.08)' }}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {messages.map(msg => (
                  <div key={msg.id} className={\`flex \${msg.role === 'user' ? 'justify-end' : 'justify-start'}\`}>
                    <div
                      className="max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap"
                      style={msg.role === 'user'
                        ? { background: 'rgba(197,224,238,0.12)', color: '#F8F9FA', border: '1px solid rgba(197,224,238,0.15)' }
                        : { background: 'rgba(197,224,238,0.05)', color: 'rgba(248,249,250,0.85)', border: '1px solid rgba(197,224,238,0.08)' }
                      }
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="rounded-xl px-4 py-3" style={{ background: 'rgba(197,224,238,0.05)', border: '1px solid rgba(197,224,238,0.08)' }}>
                      <div className="flex gap-1 items-center">
                        {[0,1,2].map(i => (
                          <span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full animate-bounce"
                            style={{ background: ACCENT, animationDelay: \`\${i * 150}ms\` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat input */}
              <div className="p-3 border-t" style={{ borderColor: 'rgba(197,224,238,0.08)' }}>
                <div className="flex gap-2">
                  <input
                    ref={chatInputRef}
                    type="text"
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={handleChatKey}
                    placeholder="Ask about AIFMD II compliance..."
                    disabled={chatLoading}
                    className="flex-1 rounded-lg px-3 py-2 text-sm outline-none transition-all disabled:opacity-50"
                    style={{ background: 'rgba(197,224,238,0.05)', border: '1px solid rgba(197,224,238,0.12)', color: '#F8F9FA' }}
                  />
                  <button
                    onClick={() => sendChat()}
                    disabled={chatLoading || !chatInput.trim()}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-40 hover:bg-white/10"
                    style={{ background: 'rgba(197,224,238,0.12)', color: ACCENT, border: '1px solid rgba(197,224,238,0.2)' }}
                  >
                    \u2191
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

const outPath = join(dir, 'page.tsx');
writeFileSync(outPath, content, 'utf8');
console.log('Written:', outPath);
console.log('Size:', content.length, 'chars');
// Verify no mojibake
const check = content.includes('\u00e2\u20ac') || content.includes('\u00c3\u00a2');
console.log('Mojibake check:', check ? 'FAILED - corruption detected!' : 'PASS - clean UTF-8');
