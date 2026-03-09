# HEARTBEAT.md

## Caelith Production Monitoring
- Ping https://www.caelith.tech — alert if non-200 or response > 5s
- Ping https://www.caelith.tech/api/health — alert if backend is down
- Only alert Julian if something is ACTUALLY down (not transient blips — check twice before alerting)

## Railway Deploy Watch
- Check if latest Railway deploy succeeded (use: `railway status` if available, otherwise just rely on the pings above)

## Git Watch
- Run `git -C C:\Users\julia\.openclaw\sandboxes\caelith-project fetch --dry-run 2>&1` — if remote has new commits Julian pushed from elsewhere, note it in daily memory

## Rules
- Late night (23:00-08:00): only alert for production DOWN, skip everything else
- Don't repeat alerts for the same issue within 2 hours
- Track state in memory/heartbeat-state.json
