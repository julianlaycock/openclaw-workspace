# Aufbewahrungsrichtlinie (Data Retention Policy)

**Verantwortlicher:** Caelith UG (haftungsbeschränkt) i.G., Julian Laycock  
**Stand:** 22. Februar 2026

---

## Übersicht der Aufbewahrungsfristen

| Datenkategorie | Aufbewahrungsfrist | Rechtsgrundlage | Löschmethode |
|---------------|-------------------|-----------------|-------------|
| **Investorendaten** | Vertragsdauer + 10 Jahre | § 257 HGB, § 147 AO (handels- und steuerrechtliche Aufbewahrungspflicht) | Soft-Delete mit vollständiger Anonymisierung personenbezogener Daten |
| **Anmeldeversuche (login_attempts)** | 30 Tage | Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse — Sicherheit) | Automatische Löschung (DELETE WHERE attempted_at < NOW() - 30 Tage) |
| **Audit-Trail** | 10 Jahre | Regulatorische Aufbewahrungspflicht (AIFMD, KAGB, § 257 HGB) | Keine Löschung innerhalb der Frist; danach Anonymisierung |
| **Sitzungs-/Refresh-Token** | 7 Tage | Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) | Automatischer Ablauf (Token-Expiry) |
| **Kundenkontodaten** | Vertragsdauer + 30 Tage | Art. 6 Abs. 1 lit. b DSGVO | Löschung nach Exportfrist |
| **Nutzungsdaten** | 12 Monate | Art. 6 Abs. 1 lit. f DSGVO | Anonymisierung |
| **Copilot-Abfrageprotokolle** | 12 Monate | Art. 6 Abs. 1 lit. b DSGVO | Anonymisierung |

## Umsetzung

- Anmeldeversuche werden automatisch bei Serverstart bereinigt (Migration 051)
- Sitzungstoken laufen automatisch ab (JWT-Expiry)
- Investorendaten werden bei Löschung anonymisiert (Soft-Delete gemäß Art. 17 DSGVO)
- Audit-Trail-Einträge sind unveränderlich und werden gemäß regulatorischer Vorgaben aufbewahrt

## Verantwortlichkeit

Die Einhaltung dieser Richtlinie wird mindestens jährlich überprüft. Änderungen werden dokumentiert und den betroffenen Kunden mitgeteilt.

---

*Diese Richtlinie wird mindestens jährlich überprüft und bei Bedarf aktualisiert.*
