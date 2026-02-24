# Auftragsverarbeitungsvertrag (AVV) gemäß Art. 28 DSGVO

**zwischen**

[Name und Anschrift des Kunden]  
— nachfolgend „**Verantwortlicher**" oder „**Auftraggeber**" —

**und**

Caelith UG (haftungsbeschränkt) i.G.  
Julian Laycock  
Berlin, Deutschland  
julian.laycock@caelith.tech  
— nachfolgend „**Auftragsverarbeiter**" —

**Stand:** 22. Februar 2026

---

## § 1 Gegenstand und Dauer

1. Der Auftragsverarbeiter verarbeitet personenbezogene Daten im Auftrag des Verantwortlichen im Rahmen der Bereitstellung der Caelith-Compliance-Plattform.
2. Die Dauer der Verarbeitung entspricht der Laufzeit des Hauptvertrags (SaaS-Abonnement) zuzüglich einer Nachfrist von 30 Tagen für den Datenexport.

## § 2 Gegenstand und Zweck der Verarbeitung

Die Verarbeitung umfasst:
- Verwaltung von Investorendaten (Anlegen, Bearbeiten, Löschen, Exportieren)
- KYC/AML-Compliance-Prüfung und -Scoring
- Regelbasierte und KI-gestützte Compliance-Analyse
- Erstellung und Pflege von Audit-Trails
- Bereitstellung des Compliance-Copilot (KI-Assistent)

## § 3 Art der personenbezogenen Daten

- Name, E-Mail-Adresse, Steuer-ID, LEI
- Jurisdiktion, Investorentyp und -klassifikation
- KYC-Status und -Ablaufdatum
- Anlagebeträge und Beteiligungspositionen
- Klassifizierungsnachweise und Compliance-Ergebnisse

## § 4 Kategorien betroffener Personen

- Investoren des Auftraggebers
- Mitarbeiter des Auftraggebers (Plattformnutzer)

## § 5 Pflichten des Auftragsverarbeiters

Der Auftragsverarbeiter verpflichtet sich:

1. Die personenbezogenen Daten ausschließlich gemäß den dokumentierten Weisungen des Verantwortlichen zu verarbeiten.
2. Sicherzustellen, dass sich die zur Verarbeitung befugten Personen zur Vertraulichkeit verpflichtet haben.
3. Die technischen und organisatorischen Maßnahmen gemäß § 8 umzusetzen.
4. Die Bedingungen gemäß § 6 für die Inanspruchnahme von Unterauftragsverarbeitern einzuhalten.
5. Den Verantwortlichen bei der Erfüllung von Betroffenenrechten zu unterstützen (Art. 15–22 DSGVO).
6. Den Verantwortlichen bei der Einhaltung der Pflichten gemäß Art. 32–36 DSGVO zu unterstützen.
7. Nach Beendigung der Verarbeitung alle personenbezogenen Daten zu löschen oder zurückzugeben, sofern keine gesetzliche Aufbewahrungspflicht besteht.
8. Dem Verantwortlichen alle erforderlichen Informationen zum Nachweis der Einhaltung zur Verfügung zu stellen und Überprüfungen zu ermöglichen.

## § 6 Unterauftragsverarbeiter

1. Der Verantwortliche erteilt hiermit eine allgemeine schriftliche Genehmigung zur Einschaltung von Unterauftragsverarbeitern.
2. Aktuelle Unterauftragsverarbeiter:

| Unterauftragsverarbeiter | Sitz | Zweck | Datenübermittlung |
|--------------------------|------|-------|-------------------|
| Railway, Inc. | EU-Region | Anwendungshosting, Datenbankbetrieb | EU (kein Drittlandtransfer) |
| Anthropic, Inc. | USA | KI-Modellverarbeitung (Compliance Copilot) | USA — EU-US DPF / SCCs; PII wird vor Übermittlung entfernt |

3. Der Auftragsverarbeiter informiert den Verantwortlichen mindestens 30 Tage vor der Einschaltung neuer Unterauftragsverarbeiter. Der Verantwortliche kann innerhalb von 14 Tagen Einspruch erheben.
4. Der Auftragsverarbeiter stellt sicher, dass Unterauftragsverarbeitern dieselben Datenschutzpflichten auferlegt werden.

## § 7 Datenschutzverletzungen

1. Der Auftragsverarbeiter meldet dem Verantwortlichen jede Verletzung des Schutzes personenbezogener Daten unverzüglich, spätestens jedoch innerhalb von **24 Stunden** nach Kenntniserlangung.
2. Die Meldung enthält mindestens:
   - Art der Verletzung
   - Betroffene Datenkategorien und ungefähre Anzahl betroffener Personen
   - Wahrscheinliche Folgen
   - Ergriffene und vorgeschlagene Abhilfemaßnahmen
3. Der Auftragsverarbeiter unterstützt den Verantwortlichen bei der Erfüllung seiner Meldepflichten gemäß Art. 33 und 34 DSGVO.

## § 8 Technische und organisatorische Maßnahmen (TOM)

Der Auftragsverarbeiter setzt folgende Maßnahmen um:

**Zugriffskontrolle:**
- Rollenbasierte Zugriffskontrolle (RBAC)
- JWT-basierte Authentifizierung mit httpOnly Cookies
- Rate Limiting auf Anmeldeendpunkte

**Verschlüsselung:**
- TLS 1.2+ für alle Datenübertragungen
- bcrypt-Hashing für Passwörter
- Verschlüsselung ruhender Daten auf Datenbankebene

**Mandantentrennung:**
- Row-Level Security auf Datenbankebene
- Strikte Mandantenisolation — kein mandantenübergreifender Datenzugriff

**Pseudonymisierung:**
- PII-Stripping vor Übermittlung an KI-Dienste
- Gehashte Referenzen im Audit-Trail

**Eingabekontrolle:**
- Eingabevalidierung und -sanitierung auf allen Endpunkten
- Content Security Policy (CSP) und CORS-Konfiguration

**Verfügbarkeit:**
- Automatisierte Backups
- Hochverfügbare Hosting-Infrastruktur

## § 9 Überprüfungen und Audits

1. Der Auftragsverarbeiter stellt dem Verantwortlichen auf Anfrage alle Informationen zur Verfügung, die zur Nachweisführung der Einhaltung erforderlich sind.
2. Der Verantwortliche oder ein von ihm beauftragter Prüfer darf Überprüfungen durchführen, einschließlich Inspektionen, nach vorheriger Ankündigung mit angemessener Frist (mindestens 14 Tage).

## § 10 Haftung

Die Haftung richtet sich nach den Bestimmungen des Hauptvertrags und den Regelungen der Art. 82 ff. DSGVO.

## § 11 Schlussbestimmungen

1. Dieser AVV tritt mit Unterzeichnung in Kraft und gilt für die Dauer des Hauptvertrags.
2. Änderungen bedürfen der Schriftform.
3. Es gilt deutsches Recht. Gerichtsstand ist Berlin.

---

**Auftraggeber (Verantwortlicher):**

Ort, Datum: ___________________________  
Unterschrift: ___________________________  
Name: ___________________________

**Auftragsverarbeiter:**

Ort, Datum: ___________________________  
Unterschrift: ___________________________  
Name: Julian Laycock, Caelith UG (haftungsbeschränkt) i.G.
