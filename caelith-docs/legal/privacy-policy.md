# Privacy Policy — Caelith

**Effective Date:** 23 February 2026
**Last Updated:** 23 February 2026

*Eine deutsche Fassung dieser Datenschutzerklärung ist auf Anfrage erhältlich. / A German version of this privacy policy is available on request.*

---

## 1. Data Controller

**Caelith**
Julian Laycock
Berlin, Germany
Email: [julian.laycock@caelith.tech](mailto:julian.laycock@caelith.tech)

(Verantwortlicher im Sinne der DSGVO)

---

## 2. What Data We Collect

### 2.1 Account Data
- Full name
- Email address
- Password (stored as bcrypt hash only — we never store plaintext passwords)
- Company name and role

### 2.2 Fund & Investor Data
Data you upload or enter into Caelith in the course of using the service:
- Fund names, structures, and regulatory classifications
- Investor names, addresses, nationalities
- Tax identification numbers (TINs)
- KYC/AML documents (identity documents, proof of address)
- Investment amounts and transaction records

### 2.3 Usage Data
- Server access logs (timestamps, IP addresses, request paths)
- Browser type and version
- Pages visited within the application
- Feature usage patterns (aggregated)

---

## 3. Legal Basis for Processing

We process personal data on the following legal bases under the General Data Protection Regulation (GDPR):

| Purpose | Legal Basis |
|---|---|
| Providing the Caelith service, managing your account, processing fund/investor data | **Art. 6(1)(b) GDPR** — Performance of a contract |
| Analytics, service improvement, security monitoring | **Art. 6(1)(f) GDPR** — Legitimate interest |
| Compliance with legal obligations (e.g., financial record retention) | **Art. 6(1)(c) GDPR** — Legal obligation |

Where we rely on legitimate interest, we have conducted a balancing test to ensure your rights and freedoms are not overridden. You may object to processing based on legitimate interest at any time (see Section 7).

---

## 4. Data Processors (Auftragsverarbeiter)

We engage the following third-party processors:

| Processor | Purpose | Location | Safeguards |
|---|---|---|---|
| **Railway** | Application hosting and infrastructure | EU (European region) | Data remains in EU; DPA in place |
| **Anthropic** | AI compliance copilot | United States | PII is stripped before data is sent to Anthropic; Standard Contractual Clauses (SCCs) in place |
| **OpenSanctions** | Sanctions and PEP screening API | EU | Screening queries contain only names; DPA in place |

**Important:** When using the AI compliance copilot feature, personally identifiable information (PII) is removed from data before it is transmitted to Anthropic. Anthropic does not receive investor tax IDs, full addresses, or KYC documents.

---

## 5. Data Retention (Aufbewahrungsfristen)

| Data Category | Retention Period | Reason |
|---|---|---|
| Financial and investor records | **7 years** from creation | Regulatory requirements (§ 257 HGB, § 147 AO) |
| Account data | Duration of account + deleted within 30 days of deletion request | Contract performance |
| Usage logs | **12 months** | Security and service improvement |
| Audit trail records | **7 years** | Regulatory compliance |

After the retention period expires, data is securely deleted or anonymised.

---

## 6. International Data Transfers

- **Primary processing:** All application data is hosted and processed within the European Union via Railway's EU region.
- **Anthropic (US):** Data sent to Anthropic's API is PII-stripped. For any residual transfer risk, we rely on Standard Contractual Clauses (SCCs) pursuant to Art. 46(2)(c) GDPR and supplementary technical measures (data minimisation, pseudonymisation).
- **OpenSanctions:** Queries remain within the EU.

We do not transfer complete investor datasets outside the EEA.

---

## 7. Your Rights (Ihre Rechte als betroffene Person)

Under the GDPR, you have the following rights:

- **Right of access** (Art. 15) — Obtain confirmation and a copy of your personal data
- **Right to rectification** (Art. 16) — Correct inaccurate data
- **Right to erasure** (Art. 17) — Request deletion of your data ("right to be forgotten"), subject to legal retention obligations
- **Right to restriction of processing** (Art. 18) — Restrict processing in certain circumstances
- **Right to data portability** (Art. 20) — Receive your data in a structured, machine-readable format
- **Right to object** (Art. 21) — Object to processing based on legitimate interest
- **Right to withdraw consent** (Art. 7(3)) — Where processing is based on consent, withdraw at any time
- **Right to lodge a complaint** (Art. 77) — File a complaint with a supervisory authority (for Berlin: Berliner Beauftragte für Datenschutz und Informationsfreiheit)

To exercise any of these rights, contact us at **julian.laycock@caelith.tech**. We will respond within 30 days.

---

## 8. Security Measures (Technische und organisatorische Maßnahmen)

We implement the following measures to protect your data:

- **Encryption in transit:** All data transmitted between your browser and our servers is encrypted using TLS 1.2+
- **Password security:** Passwords are hashed using bcrypt with appropriate cost factors; plaintext passwords are never stored
- **Tenant isolation:** Each customer's data is logically isolated at the database level; cross-tenant access is prevented by design
- **Audit trail:** All significant actions (data access, modifications, exports) are logged with timestamps and user identification
- **Access controls:** Role-based access control (RBAC) within customer accounts; internal access to production systems is restricted and logged
- **Backup:** Regular encrypted backups with tested restoration procedures

---

## 9. Cookies and Tracking

Caelith uses only **strictly necessary cookies** for session management and authentication. We do not use advertising cookies, third-party tracking pixels, or social media plugins.

---

## 10. Children's Data

Caelith is a B2B service intended for professional use by fund managers and compliance officers. We do not knowingly collect data from persons under 16 years of age.

---

## 11. Changes to This Policy

We may update this privacy policy from time to time. Material changes will be communicated via email or in-app notification at least 30 days before they take effect. The "Last Updated" date at the top of this document will be revised accordingly.

---

## 12. Contact

For any questions about this privacy policy or our data protection practices:

**Caelith — Julian Laycock**
Berlin, Germany
Email: [julian.laycock@caelith.tech](mailto:julian.laycock@caelith.tech)

For complaints, you may also contact the Berlin data protection authority:
**Berliner Beauftragte für Datenschutz und Informationsfreiheit**
Friedrichstr. 219, 10969 Berlin
https://www.datenschutz-berlin.de
