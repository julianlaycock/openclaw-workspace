# Technische und organisatorische Maßnahmen (TOM) gemäß Art. 32 DSGVO

**Verantwortlicher:** Caelith UG (haftungsbeschränkt) i.G., Julian Laycock  
**Stand:** 22. Februar 2026

---

## 1. Zutrittskontrolle

- Kein physischer Serverraum — Anwendung und Datenbank werden bei Railway (EU-Region) gehostet
- Zugang zur Hosting-Infrastruktur ausschließlich über authentifizierte, verschlüsselte Verbindungen

## 2. Zugangskontrolle

- Authentifizierung über E-Mail und Passwort mit bcrypt-Hashing (Kostenfaktor ≥ 10)
- JWT-basierte Sitzungsverwaltung mit httpOnly Cookies (kein JavaScript-Zugriff auf Token)
- Automatische Sitzungsablauf nach 7 Tagen (Refresh-Token)
- Rate Limiting auf Anmeldeendpunkte zur Abwehr von Brute-Force-Angriffen
- Automatische Löschung fehlgeschlagener Anmeldeversuche nach 30 Tagen

## 3. Zugriffskontrolle

- Rollenbasierte Zugriffskontrolle (RBAC) mit definierten Rollen (Admin, User)
- Mandantentrennung durch Row-Level Security (RLS) auf Datenbankebene
- Kein mandantenübergreifender Datenzugriff möglich
- API-Endpunkte prüfen Mandantenzugehörigkeit bei jedem Zugriff

## 4. Weitergabekontrolle

- TLS 1.2+ für alle Datenübertragungen (HTTPS-Pflicht)
- CORS-Konfiguration beschränkt API-Zugriff auf autorisierte Ursprünge
- Content Security Policy (CSP) verhindert unautorisierten Ressourcenzugriff
- PII-Stripping vor Übermittlung an KI-Drittanbieter (Anthropic)

## 5. Eingabekontrolle

- Eingabevalidierung und -sanitierung auf allen API-Endpunkten
- Lückenloser Audit-Trail aller datenverändernden Aktionen
- Audit-Trail enthält: Benutzer-ID, Aktion, Zeitstempel, betroffene Datensätze
- Audit-Trail-Einträge sind unveränderlich (Append-Only)

## 6. Auftragskontrolle

- Auftragsverarbeitungsvertrag (AVV) mit allen Kunden gemäß Art. 28 DSGVO
- Dokumentierte Weisungen zur Datenverarbeitung
- Regelmäßige Überprüfung der Unterauftragsverarbeiter

## 7. Verfügbarkeitskontrolle

- Automatisierte Datenbank-Backups über den Hosting-Anbieter (Railway)
- Hochverfügbare Infrastruktur mit automatischem Failover
- Monitoring der Systemverfügbarkeit

## 8. Trennungskontrolle

- Mandantentrennung durch Row-Level Security — Daten verschiedener Kunden sind logisch vollständig getrennt
- Separate Datenbanktabellen für verschiedene Datenkategorien
- Zweckgebundene Verarbeitung durch definierte API-Endpunkte

## 9. Pseudonymisierung (Art. 32 Abs. 1 lit. a DSGVO)

- PII-Stripping für alle an KI-Dienste übermittelten Daten (stripPIIFromToolResult)
- Gehashte Referenzen im Audit-Trail für personenbezogene Daten
- Soft-Delete mit vollständiger Anonymisierung personenbezogener Daten bei Löschung (Art. 17)

## 10. Verfahren zur regelmäßigen Überprüfung

- Regelmäßige Überprüfung und Aktualisierung der TOM (mindestens jährlich)
- Dokumentation aller sicherheitsrelevanten Änderungen im Audit-Trail
- GDPR-Audit mit Maßnahmenplan (zuletzt: Februar 2026)

---

*Dieses Dokument wird mindestens jährlich überprüft und bei Bedarf aktualisiert.*
