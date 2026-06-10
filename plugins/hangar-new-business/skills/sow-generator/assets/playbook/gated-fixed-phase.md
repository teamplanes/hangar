# Contract Type: Gated Fixed Phase Cost

## When to Use
Use when the project is delivered in distinct phases, each with its own fixed cost. At the end of each phase (the "gate"), the client can choose to proceed, pause, or stop — with no obligation to commit to later phases until the previous one is complete. This is the right model when later scope depends on learning from earlier phases (e.g. build scope confirmed after design is accepted).

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
> Planes will deliver the activities and outputs outlined in this phase for a fixed fee over a fixed period. The scope, deliverables, and timeline for the active phase are defined in this document (or confirmed at the prior gate). Any change to these, including any extension of time, adjustments to deliverables, or additional activities, will require written agreement between Planes and the Client. At each gate, the Client may elect to proceed to the next phase, pause/stop, or adjust the scope/cost for the next phase by mutual agreement.

### 5. Team Changes and Absences
> **Team Composition Changes:** We may vary role mix (e.g., design vs. engineering) to meet objectives. Any changes will be discussed and confirmed by email. Unless otherwise agreed, overall fixed fee remains unchanged.
>
> **Absences:** Substitution first (like-for-like where possible). Extension of the phase to recover capacity by mutual agreement if substitution isn't appropriate.

### 6. Scope Changes
> Any changes to the scope, services, or deliverables must be agreed in writing by both parties prior to the change.

### 7. Approach Overview — Gating Logic — MANDATORY, always populate from source proposal

**This section must never be left empty.** Use Option A format:

1. **Prose intro** (`approach_intro`) — 1-2 sentences describing the phased structure, taken from
   the proposal (e.g. "The project is delivered in three phases. At the end of each phase, the client
   can choose to proceed, pause, or stop without further commitment.")
2. **Activities table** (`activities`) — one row per phase, with the phase name/purpose as Activity
   and the key output as Outcome. Taken directly from the proposal's phase descriptions.

If the proposal includes a gating narrative, use `gating_text` instead of `approach_intro` --
the generator will render it as the prose intro. In either case, the activities table must be populated.

**Standard gating boilerplate** (use verbatim or near-verbatim if the proposal doesn't specify):
> The project is delivered in distinct phases. At the conclusion of each phase, either party may elect
> to proceed to the next phase under an agreed scope and cost, or pause/stop without further commitment.
> A fixed scope and cost for a later phase may be confirmed only after completion of the preceding phase.

### Standard Phase Descriptions

**Phase 1: Discovery**
- **Purpose:** Align scope, validate feasibility, and define key experiences.
- **Activities:** Stakeholder alignment and success criteria; light user research/workshops; draft user journeys and low-fi wireframes; technical approach validation and dependency mapping.
- **Outputs:** Discovery Summary (validated scope, success criteria, draft flows/wireframes, feasibility notes).

**Phase 2: Design**
- **Purpose:** Translate wireframes into high-fidelity interfaces and a reusable design system; prepare build-ready assets.
- **Activities:** High-fidelity UI design; prototyping and user testing; preparation of build-ready assets in Figma.
- **Outputs:** Figma files (screens & components) and design system foundations.

**Phase 3: Build & Launch**
- **Purpose:** Deliver production-ready product per agreed scope.
- **Activities:** Engineering setup and implementation; integrations; QA, performance, and security reviews; UAT cycles, issue resolution, deployment.
- **Outputs:** Deployed product per Deliverables; technical/operational documentation and walkthrough.
- **Note:** The Build scope and fee are confirmed at the end of Design (Gate 2), based on accepted designs and assumptions.

### 9. Ways of Working
- **Delivery Framework:** Agile delivery; scope of tasks may evolve with learning, within the agreed phase boundaries.
- **Status & Meetings:** Cadence to include Sprint Planning, Demos/Reviews, and Stand-ups; ad-hoc sessions as needed.
- **Communication:** [Slack/Email/Other]; single shared channel for visibility.
- **Task Management:** [Jira/Linear/Asana] to manage backlog and progress.

### 10. Client Responsibilities
- Appoint a Business Owner for decisions, approvals and stakeholder coordination.
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

### 16. Cost Breakdown
> At each gate, Client may proceed or stop without further commitment. Costs by phase are set out below; later phases may be confirmed only after prior phases complete.

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

> Allocations are indicative to set expectations and will be confirmed at each phase gate; the team composition and time split may be adjusted by mutual agreement to meet the agreed outcomes.

---

## Key Difference vs Fixed Budget and Scope

| | Gated Fixed Phase | Fixed Budget and Scope |
|---|---|---|
| Client commitment | Phase by phase -- can stop at any gate | Full amount committed on signature |
| Later phase scope | Confirmed after prior phase completes | Defined fully upfront |
| Use when | Scope uncertainty; phased learning needed | Scope is well understood from day one |
| Cost table intro | "At each gate, Client may proceed or stop..." | "The Total Cost is Fixed..." |

---

## Key Config Fields (for JSON when generating)

```json
{
  "contract_type": "gated_fixed_phase",
  "client": "[Client name]",
  "project_name": "[Project name]",
  "date": "[DD/MM/YY]",
  "start_date": "[Start date]",
  "end_date": "[End date]",
  "client_contact": "[Name, role]",
  "planes_contact": "[Name, role]",
  "project_overview": "[2-3 sentence summary of the engagement and what is being built]",
  "objectives": [
    "[Objective 1]",
    "[Objective 2]",
    "[Objective 3]"
  ],
  "approach_intro": "[1-2 sentence framing of the phased delivery structure, from the proposal]",
  "activities": [
    { "activity": "Discovery", "outcome": "Validated scope, user journeys, feasibility notes, and recommendation" },
    { "activity": "Design", "outcome": "High-fidelity Figma files, design system, build-ready assets" },
    { "activity": "Build & Launch", "outcome": "Deployed production product, QA/UAT complete, documentation" }
  ],
  "gating_text": "[Optional: replaces approach_intro if a specific gating narrative is needed]",
  "phases": [
    {
      "name": "Discovery",
      "duration": "1-2 weeks",
      "purpose": "Align scope, validate feasibility, and define key experiences.",
      "activities": ["Stakeholder alignment", "User research/workshops", "Draft wireframes"],
      "outputs": ["Discovery Summary"]
    }
  ],
  "deliverables": [
    { "name": "Discovery Outputs", "detail": "..." }
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
- The key differentiator is the **gate mechanism** -- client has a genuine off-ramp at each phase end.
- Build phase cost is deliberately left as a range (or TBC) because it is confirmed at Gate 2, not upfront.
- Payment terms are **30 days from invoice**.
- The `activities` field populates the Approach Overview table. Use one row per phase.
