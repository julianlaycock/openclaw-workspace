# Verzeichnis von Verarbeitungstätigkeiten gemäß Art. 30 DSGVO

**Verantwortlicher:** Caelith UG (haftungsbeschränkt) i.G., Julian Laycock, Berlin, Deutschland  
**Kontakt:** julian.laycock@caelith.tech  
**Stand:** 22. Februar 2026

---

## 1. Investorenverwaltung

| Feld | Beschreibung |
|------|-------------|
| **Zweck** | Verwaltung von Investorendaten im Auftrag von KVG-Kunden (Kapitalverwaltungsgesellschaften) |
| **Rechtsgrundlage** | Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung); Art. 28 DSGVO (Auftragsverarbeitung) |
| **Kategorien betroffener Personen** | Investoren der KVG-Kunden |
| **Kategorien personenbezogener Daten** | Name, E-Mail, Jurisdiktion, Investorentyp, Steuer-ID, LEI, Anlagebeträge, Beteiligungspositionen |
| **Empfänger** | KVG-Kunde (Verantwortlicher), Railway (Hosting), Anthropic (KI, nur nach PII-Stripping) |
| **Übermittlung in Drittländer** | USA (Anthropic) — EU-US DPF / SCCs; personenbezogene Daten werden vor Übermittlung entfernt |
| **Aufbewahrungsfrist** | Vertragsdauer + 10 Jahre (§ 257 HGB) |
| **Technische Maßnahmen** | TLS-Verschlüsselung, Row-Level Security, rollenbasierte Zugriffskontrolle, Audit-Trail |

## 2. KYC/AML-Prüfung

| Feld | Beschreibung |
|------|-------------|
| **Zweck** | Durchführung von Know-Your-Customer- und Geldwäscheprüfungen für Investoren |
| **Rechtsgrundlage** | Art. 6 Abs. 1 lit. c DSGVO (rechtliche Verpflichtung — GwG, KAGB) |
| **Kategorien betroffener Personen** | Investoren |
| **Kategorien personenbezogener Daten** | KYC-Status, KYC-Ablaufdatum, Klassifizierungsnachweise, Steuer-ID, LEI |
| **Empfänger** | KVG-Kunde, zuständige Aufsichtsbehörden (auf Anfrage) |
| **Aufbewahrungsfrist** | 10 Jahre nach Beendigung der Geschäftsbeziehung (§ 8 GwG) |
| **Technische Maßnahmen** | Verschlüsselung, Zugriffskontrolle, Audit-Trail, Eingabevalidierung |

## 3. Compliance-Scoring und Regelprüfung

| Feld | Beschreibung |
|------|-------------|
| **Zweck** | Automatisierte Prüfung der regulatorischen Compliance von Investoren und Fonds |
| **Rechtsgrundlage** | Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) |
| **Kategorien betroffener Personen** | Investoren |
| **Kategorien personenbezogener Daten** | Investorentyp, Jurisdiktion, Anlagebeträge, Compliance-Ergebnisse |
| **Empfänger** | KVG-Kunde |
| **Aufbewahrungsfrist** | Vertragsdauer + 10 Jahre |
| **Technische Maßnahmen** | Regelbasierte Auswertung, keine Weitergabe an Dritte, Audit-Trail |

## 4. KI-Compliance-Copilot

| Feld | Beschreibung |
|------|-------------|
| **Zweck** | KI-gestützte Beantwortung von Compliance-Fragen und Regelinterpretation |
| **Rechtsgrundlage** | Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) |
| **Kategorien betroffener Personen** | Plattformnutzer (KVG-Mitarbeiter) |
| **Kategorien personenbezogener Daten** | Anfragetexte, Nutzungsdaten; personenbezogene Identifikatoren werden vor Übermittlung entfernt (PII-Stripping) |
| **Empfänger** | Anthropic, Inc. (USA) — nur pseudonymisierte Daten |
| **Übermittlung in Drittländer** | USA — EU-US DPF / SCCs |
| **Aufbewahrungsfrist** | 12 Monate, danach Anonymisierung |
| **Technische Maßnahmen** | PII-Stripping vor Übermittlung, TLS, Rate Limiting |

## 5. Audit-Trail / Protokollierung

| Feld | Beschreibung |
|------|-------------|
| **Zweck** | Lückenlose Nachvollziehbarkeit aller Aktionen in der Plattform |
| **Rechtsgrundlage** | Art. 6 Abs. 1 lit. c DSGVO (rechtliche Verpflichtung); Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) |
| **Kategorien betroffener Personen** | Alle Plattformnutzer |
| **Kategorien personenbezogener Daten** | Benutzer-ID, Aktion, Zeitstempel, IP-Adresse, betroffene Datensätze |
| **Empfänger** | KVG-Kunde, Aufsichtsbehörden (auf Anfrage) |
| **Aufbewahrungsfrist** | 10 Jahre (regulatorische Anforderung) |
| **Technische Maßnahmen** | Gehashte Referenzen, Unveränderlichkeit, Zugriffskontrolle |

## 6. Benutzerkontoverwaltung und Authentifizierung

| Feld | Beschreibung |
|------|-------------|
| **Zweck** | Verwaltung von Benutzerkonten, Anmeldung und Sitzungsverwaltung |
| **Rechtsgrundlage** | Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) |
| **Kategorien betroffener Personen** | Plattformnutzer (KVG-Mitarbeiter) |
| **Kategorien personenbezogener Daten** | Name, E-Mail, gehashtes Passwort (bcrypt), IP-Adresse, Anmeldeversuche |
| **Empfänger** | Railway (Hosting) |
| **Aufbewahrungsfrist** | Kontodaten: Vertragsdauer + 30 Tage; Anmeldeversuche: 30 Tage; Sitzungstoken: 7 Tage |
| **Technische Maßnahmen** | bcrypt-Hashing, httpOnly Cookies, Rate Limiting, CSP, CORS |

---

*Dieses Verzeichnis wird mindestens jährlich überprüft und bei wesentlichen Änderungen der Verarbeitungstätigkeiten aktualisiert.*
