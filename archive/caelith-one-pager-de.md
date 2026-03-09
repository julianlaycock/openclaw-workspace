# Caelith — AIFMD II Compliance-Infrastruktur für KVGs

## Seite 1 — Problem & Lösung

### AIFMD II tritt am 16. April 2026 in Kraft. Sind Sie vorbereitet?

Caelith ersetzt manuelle Compliance-Prozesse durch eine API-first Infrastruktur — nicht nur ein Dashboard, sondern die Compliance-Schicht für Ihren gesamten Fondsstack.

---

**Kostenvergleich:**

| | Manuelle Compliance / Big 4 | Mit Caelith |
|---|---|---|
| Kosten | ~€180.000 / Jahr | ab €11.880 / Jahr |
| Details | Berater, FTEs, Excel-basierte Prozesse | Automatisiert, API-gesteuert, auditierbar |
| | | **93% günstiger** |

---

### Compliance-Infrastruktur auf Enterprise-Niveau

- **Annex IV XML-Generierung** — XSD-validiert · ESMA Rev 6 · Sofort einsatzbereit
- **Echtzeit-Sanktionsprüfung** — 6.863 EU- & UN-Entitäten · Automatisches Screening
- **LEI-Verifizierung** — Direkte GLEIF-Integration · Statusvalidierung
- **Audit Trail (SHA-256)** — Hash-verkettet · Manipulationssicher · BaFin-tauglich
- **13 Regeln · 6 Frameworks** — AIFMD II, KAGB, ELTIF 2.0, RAIF, SIF, MiFID II
- **EMT/EET/EPT Templates** — 43+ Felder · Automatische Generierung
- **KI-Compliance-Copilot** — Deutsch & Englisch · Kontextbezogene Analyse
- **Volle REST API** — OpenAPI/Swagger-Docs · Für Ihre Systeme gebaut

> **Nicht nur ein Dashboard.** Caelith ist eine Compliance-Infrastruktur-Schicht mit versionierten API-Endpunkten, die sich nahtlos in Ihren bestehenden Fondsstack integriert — von Portfolio-Management-Systemen bis zur BaFin-Meldekette.

---

## Seite 2 — API & Pricing

### API-first Compliance-Infrastruktur

- Versionierte Routes: /api/v1/*
- API Key Auth: Bearer Token
- OpenAPI 3.0 mit Swagger UI

**Beispiel — Compliance-Bewertung via API:**

```
POST /api/v1/compliance/evaluate
Authorization: Bearer <API_KEY>

{
  "fundId": "fund_abc123",
  "frameworks": ["AIFMD_II", "KAGB"],
  "includeAnnexIV": true,
  "sanctions": { "screen": true, "lists": ["EU", "UN"] }
}

// → 13 Regeln geprüft · Annex IV XML generiert · Audit Trail erstellt
```

**Open Source:** `npm install open-annex-iv` · Apache 2.0 Lizenz

---

### Transparente Preisgestaltung

| Plan | Preis |
|---|---|
| Essentials | €990 / Monat |
| Professional | €1.990 / Monat |
| Enterprise | ab €3.500 / Monat |

---

### Vertrauen & Sicherheit

- EU-Hosting (Frankfurt)
- DSGVO-konform
- BaFin-kompatibel
- SOC 2 Ready

---

### Testen Sie die Live-Demo

🔗 www.caelith.tech/demo-dashboard

**Kontakt:**
Julian Laycock · CEO
julian.laycock@caelith.tech
API-Dokumentation: www.caelith.tech/api/docs

---

© 2026 Caelith · caelith.tech · Compliance-Infrastruktur für europäische Fondsmanager
