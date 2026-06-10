# Contract Type: Time and Materials (T&M)

## When to Use
Use a Time and Materials contract when Planes is supplying individuals on a day rate basis. Scope is flexible — the team works through a prioritised backlog agreed with the client, typically reviewed every two weeks. There is no guarantee all activities will be completed, only that they have been prioritised.

---

## Section Structure

1. Project Overview
2. Project Detail
3. Objectives
4. Engagement Model
5. Scope Changes
6. Ways of Working
7. Assumptions and Dependencies
8. Acceptance and Completion
9. Warranty
10. Cost Breakdown
11. Invoicing Schedule
12. Cancellation
13. Signatures

---

## Standard Boilerplate (by section)

### 4. Engagement Model
> This engagement is being conducted on a Time and Materials basis. Under a Time and Materials commercial model Planes is supplying individuals on a day rate basis only, even if this comes in the form of a team. The team will work on the priorities discussed and agreed with the client, working through these in the time the team is contracted.

### 5. Scope Changes
> With a Time and Materials approach, additions and changes to scope can be accommodated and will be determined by or with the Client. The backlog of tasks will be prioritised and agreed with the Client on a regular basis (typically every 2 weeks, but this will be agreed with the Client and noted in the 'Ways of Working') and this will form the work priority for the team for that period. There is no guarantee that all of the activities/features will be completed during that time period, just that they have been prioritised.

### 6. Ways of Working
- **Delivery Framework.** Work will follow an agile delivery approach. Tasks and priorities may evolve as the team learns, within the boundaries of this agreement.
- **Planning and Prioritisation.** The backlog will be reviewed and prioritised with the Client on a regular cadence. This cadence will be agreed at the start of the engagement and may adapt as needed.
- **Meetings.** The team and Client will agree a lightweight set of routines for collaboration, which may include planning sessions, reviews, stand-ups, and ad-hoc working meetings.
- **Communication.** Day-to-day communication will take place through agreed channels [Slack/Email/Other]. A shared channel will provide visibility for both teams.
- **Task Management.** Work will be tracked in an agreed tool (typically Notion or Jira), which will be used as the shared source of truth for backlog items and progress.

### 8. Acceptance and Completion
> There is no defined deliverable acceptance process under this T&M SOW. When using the T&M model, the project does not reach a completion state until expiry or termination of this agreement. Time required for the handover process including additional support or training required will be completed as time and materials under this agreement.

### 9. Warranty
> **Bugs.** For any software development, bugs will be fixed on a Time and Materials basis, and will be prioritised alongside other development work such as features and enhancements.
>
> **Warranty.** Following the expiry or termination of this agreement, Planes will have no liability for any apparent or actual defect that comes to light. Planes will remedy any defect under a separate agreement between the Parties.

### 10. Cost Breakdown
> Expenses: Any expenses incurred (such as travel, testing incentives, purchasing software) will be re-charged to the Client with Client approval.

**Roles table** (day rate + allocation per week):

| Role | Day Rate | Allocation (Days per week) |
|------|----------|---------------------------|
| {Role} | £X,XXX | X |
| {Role} | £X,XXX | X |

### 11. Invoicing Schedule
> **Cadence.** Invoices will be issued at the end of each calendar month, based on submitted timesheets rounded to the nearest half-day.
>
> **Payment Terms.** 14 days from invoice date.

### 12. Cancellation
> Either party may cancel this SOW with 30 days' written notice. Fees for work performed to the effective date remain payable.

---

## Key Config Fields (for JSON when generating)

```json
{
  "contract_type": "time_and_materials",
  "client": "[Client name]",
  "project_name": "[Project name]",
  "date": "[DD/MM/YY]",
  "start_date": "[Start date]",
  "end_date": "[End date]",
  "client_contact": "[Name, role]",
  "planes_contact": "[Name, role]",
  "project_overview": "[2–3 sentence summary of the engagement]",
  "objectives": [
    "[Objective 1]",
    "[Objective 2]",
    "[Objective 3]"
  ],
  "assumptions": [
    "[Assumption or dependency 1]",
    "[Assumption or dependency 2]"
  ],
  "team": [
    { "role": "[Role name]", "day_rate": 0, "days_per_week": 0 },
    { "role": "[Role name]", "day_rate": 0, "days_per_week": 0 }
  ]
}
```

---

## Notes
- This contract type has **no fixed deliverable** — completion is defined by expiry or termination of the agreement.
- The team works from a prioritised backlog; scope is intentionally flexible.
- Invoicing is monthly in arrears based on timesheets, not milestones.
- Warranty obligations end with the agreement unless a new agreement is put in place.
