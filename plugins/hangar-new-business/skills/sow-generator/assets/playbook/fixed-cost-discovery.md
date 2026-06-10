# Contract Type: Fixed Cost Discovery

## When to Use
Use when Planes is being engaged specifically for a discovery phase only — at a fixed cost and fixed scope. There is no commitment to a subsequent phase; the output is a set of discovery artefacts (validated scope, user journeys, wireframes, feasibility notes) that inform what comes next. Subsequent phases would be scoped under a separate SOW.

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
> Planes will deliver the activities and outputs outlined in this Statement of Work for a fixed fee over a fixed period. The scope, deliverables, and timeline are defined in this document. Any change to these, including any extension of time or additional activities, will require written agreement between Planes and the Client.

### 5. Team Changes and Absences
> **Team Composition Changes:** We may vary role mix (e.g., design vs. engineering) to meet objectives. Any changes will be discussed and confirmed by email. Unless otherwise agreed, overall fixed fee remains unchanged.
>
> **Absences:** Substitution first (like-for-like where possible). Extension of the phase to recover capacity by mutual agreement if substitution isn't appropriate.

### 6. Scope Changes
> Any changes to the scope, services, or deliverables must be agreed in writing by both parties prior to the change.

### 7. Approach Overview — MANDATORY, always populate from source proposal

**This section must never be left empty.** Use Option A format:

1. **Prose intro** (`approach_intro` or `approach_summary`) — 1-2 sentences taken from the proposal
   describing how the discovery is structured (e.g. parallel research streams, timeline, focus).
2. **Activities table** (`activities`) — populate from the proposal's described workstreams,
   research activities, or phases. Each row: Activity (what is being done) | Outcome (what it produces).

Example activities for a typical discovery:

| Activity | Outcome |
|----------|---------|
| Stakeholder alignment | Agreed success criteria and priorities |
| User research / workshops | Validated user needs and journeys |
| Technical feasibility review | Confirmed approach and dependency map |
| Discovery playback | Recommendation to proceed, stop, or pivot |

If the proposal uses named workstreams (e.g. Desirability / Feasibility / Viability), use those
as the Activity column entries with their stated goals as Outcomes.

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
> Discovery Deliverables are accepted on the earliest of: (a) Client's written acceptance; or (b) presentation of the Final Playback deck and provision of all Deliverables in the agreed locations.

### 15. Warranty
> Discovery is a professional services engagement without SLAs. No warranty or post-acceptance maintenance applies to Discovery artefacts; changes are handled via change control or a subsequent SOW.

### 16. Cost Breakdown
> **Cost:** £[X] (ex VAT and expenses)
>
> **Expenses:** Any expenses incurred (such as travel, testing incentives, purchasing software) will be re-charged to the Client with Client approval.

### 17. Invoicing Schedule
> Invoicing will be issued at the following milestones:
> - [Date or milestone]: £[amount]
> - [Date or milestone]: £[amount]
>
> Any rechargeable expenses incurred will be invoiced as part of the above invoicing schedules.

### 18. Cancellation
> Either party may cancel this SOW with 30 days' written notice. Fees for work performed to the effective date remain payable.

---

## Standard Activities Table

| Activity | Outcome |
|----------|---------|
| Stakeholder alignment | Agreed success criteria and priorities |
| User research / workshops | Validated user needs and journeys |
| Draft wireframes | Low-fi flows ready for design phase |
| Technical feasibility review | Confirmed approach and dependency map |
| Discovery playback | Presented summary with recommendations |

---

## Standard Deliverables Table

| Deliverable | Detail |
|-------------|--------|
| Discovery Summary | Validated scope, success criteria, journeys, draft wireframes, feasibility notes. |
| [Additional deliverable] | [Detail] |

---

## Roles & Team Table

| Role | Discovery |
|------|-----------|
| Director | x% |
| Product Lead | x% |
| Senior Product Designer | x% |
| Senior Developer | x% |

---

## Key Differences vs Other Contract Types

| | Fixed Cost Discovery | Gated Fixed Phase | Fixed Budget and Scope |
|---|---|---|---|
| Scope | Discovery only | Phase by phase | Full project upfront |
| Subsequent phases | Separate SOW required | Confirmed at gate | All in this SOW |
| Warranty | None -- professional services only | 30-day defect warranty | 30-day defect warranty |
| Acceptance trigger | Written acceptance or Final Playback | Written acceptance or artefact delivery | Written acceptance or delivery |
| Typical duration | 1-3 weeks | Multi-phase | Multi-phase |

---

## Key Config Fields (for JSON when generating)

```json
{
  "contract_type": "fixed_cost_discovery",
  "client": "[Client name]",
  "project_name": "[Project name]",
  "date": "[DD/MM/YY]",
  "start_date": "[Start date]",
  "end_date": "[End date]",
  "client_contact": "[Name, role]",
  "planes_contact": "[Name, role]",
  "project_overview": "[2-3 sentence summary of what the discovery is investigating and why]",
  "objectives": [
    "[Objective 1]",
    "[Objective 2]",
    "[Objective 3]"
  ],
  "approach_intro": "[1-2 sentence description of how the discovery is structured, from the proposal]",
  "activities": [
    { "activity": "Desirability research", "outcome": "Validated user needs and appetite for the proposed solution" },
    { "activity": "Feasibility review", "outcome": "Confirmed technical approach and dependency map" },
    { "activity": "Viability analysis", "outcome": "Business case and pricing model" },
    { "activity": "Discovery playback", "outcome": "Recommendation to proceed, stop, or pivot" }
  ],
  "deliverables": [
    { "name": "Discovery Summary", "detail": "Validated scope, success criteria, journeys, draft wireframes, feasibility notes." }
  ],
  "assumptions": [
    "[Assumption 1]",
    "[Assumption 2]"
  ],
  "out_of_scope": [
    "[Item 1]",
    "[Item 2]"
  ],
  "team": [
    { "name": "Ryan Lock", "role": "Director", "allocation": "20%" },
    { "name": "[Name]", "role": "[Role]", "allocation": "100%" }
  ],
  "total_cost": "£X,XXX",
  "invoicing_milestones": [
    { "milestone": "Project start", "amount": "£X,XXX" },
    { "milestone": "Discovery playback and delivery of all deliverables", "amount": "£X,XXX" }
  ],
  "expenses_note": "[None expected / list reimbursable items]"
}
```

---

## Notes
- No warranty applies -- discovery outputs are professional services artefacts, not software with defects.
- Acceptance is triggered by the Final Playback presentation or written sign-off, whichever comes first.
- Invoicing is milestone-based (not monthly or at phase start) -- milestones must be specified in the config.
- Any subsequent Design or Build work requires a **new SOW**.
- The Approach section uses `approach_intro` + `activities` (not `phases`). The generator renders these
  as prose followed by a two-column Activity | Outcome table.
