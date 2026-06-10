# Contract Type: Fixed Budget and Scope

## When to Use
Use when the scope is well-understood and fully defined upfront. Planes delivers a specific set of deliverables for a total fixed fee. Because the budget is fixed, the scope is strictly defined — any changes after signing must be agreed in writing and may affect the fee.

---

## Section Structure

1. Project Overview
2. Project Detail
3. Objectives
4. Engagement Model
5. Team Changes and Absences
6. Scope Changes
7. Approach Overview
8. Deliverables
9. Ways of Working
10. Client Responsibilities
11. Assumptions and Dependencies
12. Out of Scope
13. Roles & Team
14. Acceptance and Completion
15. Warranty
16. Cost Breakdown
17. Invoicing Schedule
18. Cancellation
19. Signatures

---

## Standard Boilerplate (by section)

### 4. Engagement Model
> Planes will deliver the specific Scope of Work and Deliverables outlined in this document for a Total Fixed Fee. Because the Budget is fixed, the Scope is strictly defined. The details in the "Scope" and "Deliverables" sections constitute the entirety of the work to be performed.

### 5. Team Changes and Absences
> **Team Composition Changes:** Planes retains the right to manage the team composition and resource allocation as necessary to deliver the agreed Scope within the Fixed Fee. While we aim for consistency, specific individuals are not guaranteed.
>
> **Absences:** Planes is responsible for managing team absences and capacity. We will ensure that appropriate resources are available to meet the agreed milestones and delivery dates.

### 6. Scope Changes
> The Fixed Fee is predicated on the fixed Scope defined herein. Any changes to requirements, designs, or features requested by the Client after the signing of this SOW must be agreed in writing. If a change impacts the effort, timeline, or risk profile of the project, it will be agreed between Planes and the Client before work proceeds.

### 7. Approach Overview — MANDATORY, always populate from source proposal

**This section must never be left empty.** Use Option A format:

1. **Prose intro** (`approach_intro`) — 1-2 sentences describing the delivery approach, taken from
   the proposal (e.g. "The project is delivered across three sequential phases, with each phase
   building directly on the outputs of the last.")
2. **Activities table** (`activities`) — one row per phase or workstream, with the phase name/purpose
   as Activity and the key output as Outcome. Taken from the proposal's phase or deliverable structure.

### 9. Ways of Working
- **Delivery Framework:** Agile delivery; scope of tasks may evolve with learning, within the agreed phase boundaries.
- **Status & Meetings:** Cadence to include Sprint Planning, Demos/Reviews, and Stand-ups; ad-hoc sessions as needed.
- **Communication:** [Slack/Email/Other]; single shared channel for visibility.
- **Task Management:** [Jira/Linear/Asana] to manage backlog and progress.

### 10. Client Responsibilities
- Appoint a single Client Contact for decisions, approvals and stakeholder coordination.
- Provide timely requirements, business rules and feedback.
- Grant access to required systems and subject-matter experts.
- Manage third-party providers (where applicable) and associated contracts.

### 14. Acceptance and Completion
> - **Discovery Completion:** On the earlier of (a) Client's written acceptance of the Discovery outputs; or (b) the Discovery playback and delivery of all agreed artefacts to the shared repository.
> - **Design Completion:** On the earlier of (a) Client's written acceptance of the Design outputs; or (b) delivery of final build-ready Figma files/components and the design notes.
> - **Build & Launch Completion:** On the earlier of (a) Client's written acceptance; or (b) first production availability to any live end user (post-UAT), subject to the emergency-rollback carve-out below.
> - **Emergency rollback (Build only):** If the Client rolls back within 2 Business Days solely due to a defect attributable to Planes, Acceptance pauses until the fix is redeployed to production.

### 15. Warranty
> **Coverage:** For 30 days from Acceptance, Planes will fix reproducible defects that cause the Deliverables to materially deviate from the accepted scope at no charge. No response-time or uptime commitments apply under this warranty.
>
> **Exclusions:** Enhancements/changes; issues caused by Client/third-party modifications or environments; third-party/platform outages; data/content errors; non-material/cosmetic issues. If Client/third parties change code/infrastructure without Planes' written approval, the warranty does not apply to affected areas.
>
> **Supersession by Support SLA:** If a support agreement is entered into, its SLA governs from its effective date for the same Deliverables/environments.

### 17. Invoicing Schedule
> - **Discovery:** £[amount] at Phase start.
> - **Design:** £[amount] at Phase start.
> - **Build & Launch:** 50% at Phase kickoff; 50% at Acceptance.
> - **Payment Terms:** Invoices payable within 30 days of issue.

### 18. Cancellation
> Either party may cancel this SOW with 30 days' written notice. Fees for work performed to the effective date remain payable.

---

## Standard Deliverables Table

| Deliverable | Detail |
|-------------|--------|
| Discovery Outputs | Discovery summary (validated scope, success criteria, journeys, draft wireframes, feasibility notes). |
| Design Files | High-fidelity UI in Figma, reusable design system, build-ready assets. |
| Deployed Infrastructure | Production environment(s) prepared and configured for integrations. |
| Product Build | Working product per agreed scope, integrations, QA/UAT artefacts, deployment. |
| Documentation | Technical and operational documentation; operations walkthrough/training. |

---

## Roles & Team Table (indicative)

| Role | Discovery | Design | Build & Launch |
|------|-----------|--------|----------------|
| Director | 10% | 10% | 10% |
| Product Lead | 100% | 50% | 20% |
| Senior Product Designer | 100% | 100% | 20% |
| Senior Developer | 20% | 10% | 100% |

---

## Key Config Fields (for JSON when generating)

```json
{
  "contract_type": "fixed_budget_and_scope",
  "client": "[Client name]",
  "project_name": "[Project name]",
  "date": "[DD/MM/YY]",
  "start_date": "[Start date]",
  "end_date": "[End date]",
  "client_contact": "[Name, role]",
  "planes_contact": "[Name, role]",
  "project_overview": "[2-3 sentence summary of the engagement and what is being built]",
  "objectives": ["[Objective 1]", "[Objective 2]"],
  "approach_intro": "[1-2 sentence framing of the delivery structure, from the proposal]",
  "activities": [
    { "activity": "Discovery", "outcome": "Validated scope, user journeys, feasibility notes" },
    { "activity": "Design", "outcome": "High-fidelity Figma files, design system, build-ready assets" },
    { "activity": "Build & Launch", "outcome": "Deployed production product, QA/UAT complete, documentation" }
  ],
  "phases": [
    { "name": "Discovery", "duration": "1 week" },
    { "name": "Design", "duration": "3 weeks" },
    { "name": "Build & Launch", "duration": "4-6 weeks" }
  ],
  "deliverables": [
    { "name": "Discovery Outputs", "detail": "..." },
    { "name": "Design Files", "detail": "..." },
    { "name": "Product Build", "detail": "..." }
  ],
  "assumptions": ["[Assumption 1]"],
  "out_of_scope": ["[Item 1]"],
  "team": [
    { "role": "Director", "discovery": "10%", "design": "10%", "build": "10%" },
    { "role": "Product Lead", "discovery": "100%", "design": "50%", "build": "20%" }
  ],
  "costs": [
    { "phase": "Discovery", "cost": "£X,XXX" },
    { "phase": "Design", "cost": "£XX,XXX" },
    { "phase": "Build & Launch", "cost": "£XX,XXX - £XX,XXX" }
  ],
  "total_cost": "£XX,XXX - £XX,XXX",
  "expenses_note": "[None expected / list reimbursable items]"
}
```

---

## Notes
- The total cost is **fixed** -- client commits to the full amount on signature.
- Scope changes after signing require written agreement and may affect the fee.
- Payment terms are **30 days from invoice**.
- The `activities` field populates the Approach Overview table. Use one row per phase.
