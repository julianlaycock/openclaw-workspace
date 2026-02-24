# Data Processing Agreement (DPA)
## Auftragsverarbeitungsvertrag (AVV) gemäß Art. 28 DSGVO

**Effective Date:** _______________
**Agreement Number:** DPA-_______________

---

## Parties

**Controller (Verantwortlicher):**

Company: _______________
Address: _______________
Contact Person: _______________
Email: _______________

(hereinafter "Controller" or "Customer")

**Processor (Auftragsverarbeiter):**

Company: Caelith
Represented by: Julian Laycock
Address: Berlin, Germany
Email: julian.laycock@caelith.tech

(hereinafter "Processor" or "Caelith")

The Controller and Processor are individually referred to as a "Party" and collectively as the "Parties".

---

## 1. Subject Matter and Duration

### 1.1 Subject Matter
This Data Processing Agreement ("DPA") supplements the Terms of Service between the Parties and governs the Processor's processing of personal data on behalf of the Controller in connection with the Caelith platform.

### 1.2 Duration
This DPA is effective for the duration of the underlying service agreement between the Parties. It terminates automatically when the service agreement ends and all personal data has been deleted or returned in accordance with Section 10.

---

## 2. Nature and Purpose of Processing

The Processor processes personal data on behalf of the Controller for the following purposes:

- Providing the Caelith regulatory compliance platform
- Investor onboarding, KYC/AML screening, and sanctions/PEP checks
- Regulatory classification and compliance monitoring of funds and investors
- AI-assisted compliance analysis (with PII stripped prior to AI processing)
- Generation of compliance reports, audit trails, and regulatory filings
- Data storage and backup in connection with the above purposes

The Processor shall process personal data only on documented instructions from the Controller, unless required to do so by Union or Member State law to which the Processor is subject (Art. 28(3)(a) GDPR).

---

## 3. Types of Personal Data

The following categories of personal data are processed:

| Category | Data Elements |
|---|---|
| **Investor identification data** | Full name, date of birth, nationality, address |
| **Tax information** | Tax identification numbers (TINs), tax residency |
| **KYC/AML documents** | Copies of identity documents (passport, national ID), proof of address, source of wealth documentation |
| **Financial data** | Investment amounts, transaction records, fund holdings |
| **Contact data** | Email addresses, phone numbers |
| **Professional data** | Company affiliation, role/title |
| **Account data** | Names and email addresses of platform users |

---

## 4. Categories of Data Subjects

- Investors (natural persons) in funds managed by the Controller
- Fund managers and directors
- Compliance officers and other authorised personnel of the Controller
- Beneficial owners and controlling persons

---

## 5. Obligations of the Processor

The Processor shall:

a) Process personal data only on documented instructions from the Controller, including with regard to transfers to third countries (unless required by applicable law, in which case the Processor shall inform the Controller in advance unless prohibited by law)

b) Ensure that persons authorised to process personal data have committed themselves to confidentiality or are under an appropriate statutory obligation of confidentiality (Art. 28(3)(b) GDPR)

c) Take all measures required pursuant to Art. 32 GDPR (see Section 6)

d) Respect the conditions for engaging sub-processors (see Section 7)

e) Assist the Controller in responding to data subject requests (Art. 28(3)(e) GDPR)

f) Assist the Controller in ensuring compliance with obligations under Art. 32–36 GDPR, taking into account the nature of processing and information available to the Processor

g) At the choice of the Controller, delete or return all personal data after the end of the provision of services (see Section 10)

h) Make available to the Controller all information necessary to demonstrate compliance with obligations under Art. 28 GDPR and allow for and contribute to audits (see Section 9)

---

## 6. Technical and Organisational Measures (Art. 32 GDPR)

The Processor implements and maintains the following measures to ensure a level of security appropriate to the risk:

### 6.1 Encryption
- **In transit:** All data transmitted between users and the platform is encrypted using TLS 1.2 or higher
- **At rest:** Database storage uses encryption at rest provided by the infrastructure provider
- **Passwords:** User passwords are hashed using bcrypt with appropriate cost factors; plaintext passwords are never stored or logged

### 6.2 Access Controls
- **Authentication:** Multi-factor authentication available for all accounts
- **Authorisation:** Role-based access control (RBAC) within customer tenants, enforcing principle of least privilege
- **Internal access:** Production system access is restricted to authorised personnel, protected by strong authentication, and logged

### 6.3 Tenant Isolation
- Each customer's data is logically isolated at the database level
- Application-layer controls prevent cross-tenant data access
- Queries are scoped to the authenticated tenant at the ORM/query level

### 6.4 Audit Trail
- All significant operations (data access, creation, modification, deletion, exports) are logged
- Audit logs include timestamps, user identification, action type, and affected records
- Audit logs are retained for 7 years and are tamper-resistant

### 6.5 Backup and Recovery
- Regular automated backups of all customer data
- Backups are encrypted and stored in a geographically separate location within the EU
- Backup restoration procedures are tested periodically

### 6.6 Incident Response
- Documented incident response procedures
- Security incidents are assessed and classified within 4 hours of detection
- Data breach notification in accordance with Section 8

### 6.7 Organisational Measures
- Confidentiality obligations for all personnel with access to personal data
- Regular security awareness training
- Periodic review and update of security measures

---

## 7. Sub-processors (Unterauftragsverarbeiter)

### 7.1 Authorised Sub-processors

The Controller grants general written authorisation for the Processor to engage the following sub-processors:

| Sub-processor | Purpose | Location | Safeguards |
|---|---|---|---|
| **Railway** | Cloud infrastructure and hosting | EU (European region) | Data remains in EU; DPA in place |
| **Anthropic** | AI-assisted compliance analysis | United States | **PII is stripped before transmission**; Standard Contractual Clauses (SCCs) in place; data minimisation measures applied |

### 7.2 Changes to Sub-processors
The Processor shall inform the Controller of any intended changes to sub-processors (additions or replacements) at least **30 days in advance**, giving the Controller the opportunity to object.

If the Controller raises a reasonable objection within 14 days of notification, the Parties shall discuss the concern in good faith. If no resolution is reached, the Controller may terminate the affected service with 30 days' notice.

### 7.3 Sub-processor Obligations
The Processor shall impose on each sub-processor, by way of a written contract, the same data protection obligations as set out in this DPA. The Processor remains fully liable to the Controller for the performance of each sub-processor's obligations.

---

## 8. Data Breach Notification

### 8.1 Notification to Controller
In the event of a personal data breach (as defined in Art. 4(12) GDPR), the Processor shall notify the Controller without undue delay, and in any event within **24 hours** of becoming aware of the breach.

### 8.2 Notification Content
The notification shall include, to the extent available:
- Description of the nature of the breach, including categories and approximate number of data subjects and records affected
- Name and contact details of the Processor's point of contact
- Description of likely consequences of the breach
- Description of measures taken or proposed to address the breach and mitigate its effects

### 8.3 Cooperation
The Processor shall cooperate with the Controller and take reasonable steps to assist in the investigation, mitigation, and remediation of the breach. The Processor shall assist the Controller in fulfilling its obligations under Art. 33 and 34 GDPR (notification to supervisory authority and communication to data subjects).

### 8.4 No Unauthorised Disclosure
The Processor shall not inform any third party about a data breach without the Controller's prior written consent, unless required by applicable law.

---

## 9. Audit Rights

### 9.1 Information and Audit
The Processor shall make available to the Controller all information necessary to demonstrate compliance with the obligations set out in Art. 28 GDPR and this DPA.

The Processor shall allow for and contribute to audits, including inspections, conducted by the Controller or an independent auditor mandated by the Controller. The Controller shall provide at least **30 days' written notice** of any audit.

### 9.2 Scope and Conduct
Audits shall be conducted during normal business hours, with minimal disruption to the Processor's operations. The auditor shall be bound by confidentiality obligations.

### 9.3 Certifications and Reports
Where available, the Processor may provide relevant certifications, audit reports (e.g., SOC 2), or summaries of independent security assessments in lieu of on-site audits, provided these adequately address the Controller's concerns.

### 9.4 Costs
Each Party bears its own costs in connection with audits. If an audit reveals a material breach of this DPA, the Processor shall bear the reasonable costs of the audit.

---

## 10. Data Deletion and Return

### 10.1 Upon Termination
Upon termination or expiry of the service agreement, the Processor shall, at the Controller's choice:

a) **Return** all personal data to the Controller in a structured, commonly used, and machine-readable format (e.g., CSV, JSON), or

b) **Delete** all personal data from its systems

The Controller must communicate its choice within **30 days** of termination. If no instruction is received, the Processor shall delete all personal data.

### 10.2 Deletion Timeline
Deletion from active systems shall occur within **30 days** of the Controller's instruction (or 30 days after the choice deadline). Personal data in backups shall be deleted when backups are overwritten in the ordinary course, and no later than **90 days** after termination.

### 10.3 Legal Retention
Where the Processor is required by Union or Member State law to retain certain personal data, the Processor shall inform the Controller of the legal requirement and ensure the confidentiality of such data. This data shall be deleted once the retention obligation expires.

### 10.4 Confirmation
The Processor shall provide written confirmation of deletion upon the Controller's request.

---

## 11. International Data Transfers

### 11.1 General Principle
Personal data shall be processed within the European Economic Area (EEA). The Processor shall not transfer personal data to a country outside the EEA without ensuring adequate safeguards.

### 11.2 Transfer Mechanisms
Where personal data is transferred to sub-processors outside the EEA (currently: Anthropic, United States), the following safeguards are in place:

- **Standard Contractual Clauses (SCCs)** pursuant to Art. 46(2)(c) GDPR (Commission Implementing Decision (EU) 2021/914)
- **Technical measures:** PII stripping and data minimisation before transfer
- **Transfer impact assessment** conducted to evaluate the legal framework of the recipient country

### 11.3 Notification
The Processor shall promptly inform the Controller of any legal requirements in a third country that may affect its ability to comply with this DPA or that conflict with obligations under EU data protection law.

---

## 12. Obligations of the Controller

The Controller warrants that:

a) It has a lawful basis for processing the personal data covered by this DPA

b) It has provided appropriate privacy notices to data subjects

c) It shall promptly inform the Processor of any changes to processing instructions

d) It shall comply with its obligations under the GDPR and applicable data protection laws

---

## 13. Liability

The liability of each Party under this DPA is subject to the limitations set out in the underlying service agreement (Terms of Service), except where such limitations are prohibited by applicable law.

---

## 14. Governing Law and Jurisdiction

This DPA is governed by the laws of the **Federal Republic of Germany**. The exclusive place of jurisdiction is **Berlin, Germany**.

---

## 15. Severability

If any provision of this DPA is held invalid or unenforceable, the remaining provisions shall remain in full force and effect.

---

## 16. Amendments

This DPA may only be amended in writing (including electronic form) signed by both Parties.

---

## Signatures

**Controller:**

Name: _______________
Title: _______________
Date: _______________
Signature: _______________

**Processor (Caelith):**

Name: Julian Laycock
Title: Founder
Date: _______________
Signature: _______________

---

## Annex A — Technical and Organisational Measures

*See Section 6 of this DPA for the complete description of technical and organisational measures.*

## Annex B — Authorised Sub-processors

*See Section 7.1 of this DPA for the current list of authorised sub-processors.*

## Annex C — Description of Processing

| Element | Description |
|---|---|
| **Subject matter** | Processing of personal data in connection with the Caelith regulatory compliance platform |
| **Duration** | Duration of the service agreement |
| **Nature and purpose** | Regulatory compliance analysis, KYC/AML screening, sanctions checking, investor data management, compliance reporting |
| **Types of personal data** | See Section 3 |
| **Categories of data subjects** | See Section 4 |
