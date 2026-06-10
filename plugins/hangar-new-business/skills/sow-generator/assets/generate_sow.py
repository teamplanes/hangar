#!/usr/bin/env python3
"""
Planes SOW Generator
Usage: python generate_sow.py --template template.docx --config config.json --output output.docx
"""
import argparse, json, re, shutil, zipfile, os, tempfile

# ──────────────────────────────────────────────────────────────────────────────
# XML HELPERS
# ──────────────────────────────────────────────────────────────────────────────

def esc(text):
    if not isinstance(text, str):
        text = str(text)
    return (text.replace('&', '&amp;')
                .replace('<', '&lt;')
                .replace('>', '&gt;')
                .replace('"', '&quot;'))

BLUE   = "2563eb"
DARK   = "1c1c2e"
GRAY   = "f5f5f7"
WHITE  = "ffffff"
BODY   = "2d2d2d"

def h1(text):
    return f'''<w:p>
  <w:pPr>
    <w:pStyle w:val="Heading1"/>
    <w:pBdr><w:bottom w:val="single" w:sz="8" w:space="4" w:color="{BLUE}"/></w:pBdr>
    <w:spacing w:before="400" w:after="160" w:lineRule="auto"/>
  </w:pPr>
  <w:r>
    <w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:b/><w:color w:val="{DARK}"/><w:sz w:val="28"/><w:szCs w:val="28"/></w:rPr>
    <w:t xml:space="preserve">{esc(text)}</w:t>
  </w:r>
</w:p>'''

def h2(text):
    return f'''<w:p>
  <w:pPr>
    <w:pStyle w:val="Heading2"/>
    <w:spacing w:before="240" w:after="80" w:lineRule="auto"/>
  </w:pPr>
  <w:r>
    <w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:b/><w:color w:val="{DARK}"/><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr>
    <w:t xml:space="preserve">{esc(text)}</w:t>
  </w:r>
</w:p>'''

def para(text, bold=False, italic=False, color=BODY):
    b = "<w:b/>" if bold else ""
    i = "<w:i/>" if italic else ""
    return f'''<w:p>
  <w:pPr><w:spacing w:after="120" w:line="276" w:lineRule="auto"/></w:pPr>
  <w:r>
    <w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/>{b}{i}<w:color w:val="{color}"/><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr>
    <w:t xml:space="preserve">{esc(text)}</w:t>
  </w:r>
</w:p>'''

def para_bold_intro(label, rest):
    """Paragraph where the first word/phrase is bold, followed by normal text."""
    return f'''<w:p>
  <w:pPr><w:spacing w:after="120" w:line="276" w:lineRule="auto"/></w:pPr>
  <w:r>
    <w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:b/><w:color w:val="{BODY}"/><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr>
    <w:t xml:space="preserve">{esc(label)}</w:t>
  </w:r>
  <w:r>
    <w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:color w:val="{BODY}"/><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr>
    <w:t xml:space="preserve">  {esc(rest)}</w:t>
  </w:r>
</w:p>'''

def spacer():
    return '<w:p><w:pPr><w:spacing w:after="80" w:lineRule="auto"/></w:pPr></w:p>'

def bullet(text, num_id=1):
    return f'''<w:p>
  <w:pPr>
    <w:numPr><w:ilvl w:val="0"/><w:numId w:val="{num_id}"/></w:numPr>
    <w:spacing w:after="60" w:line="276" w:lineRule="auto"/>
  </w:pPr>
  <w:r>
    <w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:color w:val="{BODY}"/><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr>
    <w:t xml:space="preserve">{esc(text)}</w:t>
  </w:r>
</w:p>'''

def numbered(text, num_id=2):
    return f'''<w:p>
  <w:pPr>
    <w:numPr><w:ilvl w:val="0"/><w:numId w:val="{num_id}"/></w:numPr>
    <w:spacing w:after="80" w:line="276" w:lineRule="auto"/>
  </w:pPr>
  <w:r>
    <w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:color w:val="{BODY}"/><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr>
    <w:t xml:space="preserve">{esc(text)}</w:t>
  </w:r>
</w:p>'''

# ── Table helpers ─────────────────────────────────────────────────────────────

def tbl_open(col_widths):
    total = sum(col_widths)
    cols = ''.join(f'<w:gridCol w:w="{w}"/>' for w in col_widths)
    return f'''<w:tbl>
  <w:tblPr>
    <w:tblW w:w="{total}" w:type="dxa"/>
    <w:tblBorders>
      <w:top w:val="single" w:sz="4" w:color="dddddd"/>
      <w:left w:val="single" w:sz="4" w:color="dddddd"/>
      <w:bottom w:val="single" w:sz="4" w:color="dddddd"/>
      <w:right w:val="single" w:sz="4" w:color="dddddd"/>
      <w:insideH w:val="single" w:sz="4" w:color="dddddd"/>
      <w:insideV w:val="single" w:sz="4" w:color="dddddd"/>
    </w:tblBorders>
    <w:tblCellMar>
      <w:top w:w="120" w:type="dxa"/>
      <w:left w:w="160" w:type="dxa"/>
      <w:bottom w:w="120" w:type="dxa"/>
      <w:right w:w="160" w:type="dxa"/>
    </w:tblCellMar>
  </w:tblPr>
  <w:tblGrid>{cols}</w:tblGrid>'''

def tbl_close():
    return '</w:tbl>'

def _cell(text, width, bold=False, italic=False, bg=WHITE, color=None, size=22, bullets=None):
    if color is None:
        color = "ffffff" if bg == DARK else BODY
    b = "<w:b/><w:bCs/>" if bold else ""
    i = "<w:i/><w:iCs/>" if italic else ""
    if bullets:
        rows = ''.join(f'''<w:p>
      <w:pPr>
        <w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr>
        <w:spacing w:after="40" w:line="260" w:lineRule="auto"/>
      </w:pPr>
      <w:r>
        <w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:color w:val="{color}"/><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr>
        <w:t xml:space="preserve">{esc(b_item)}</w:t>
      </w:r>
    </w:p>''' for b_item in bullets)
        return f'''<w:tc>
    <w:tcPr><w:tcW w:w="{width}" w:type="dxa"/><w:shd w:val="clear" w:fill="{bg}"/></w:tcPr>
    {rows}
  </w:tc>'''
    else:
        return f'''<w:tc>
    <w:tcPr><w:tcW w:w="{width}" w:type="dxa"/><w:shd w:val="clear" w:fill="{bg}"/></w:tcPr>
    <w:p>
      <w:pPr><w:spacing w:after="40" w:lineRule="auto"/></w:pPr>
      <w:r>
        <w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/>{b}{i}<w:color w:val="{color}"/><w:sz w:val="{size}"/><w:szCs w:val="{size}"/></w:rPr>
        <w:t xml:space="preserve">{esc(text)}</w:t>
      </w:r>
    </w:p>
  </w:tc>'''

def row(*cells):
    return f'<w:tr>{"".join(cells)}</w:tr>'

def hdr_row(*items):
    """items: list of (text, width)"""
    return row(*[_cell(t, w, bold=True, bg=DARK) for t, w in items])

def data_row(*items, shade=WHITE):
    """items: (text, width) or (text, width, opts_dict)"""
    cells = []
    for item in items:
        if len(item) == 2:
            cells.append(_cell(item[0], item[1], bg=shade))
        else:
            t, w, opts = item
            cells.append(_cell(t, w, bg=shade, **opts))
    return row(*cells)

# ──────────────────────────────────────────────────────────────────────────────
# COMMON SECTIONS (shared across contract types)
# ──────────────────────────────────────────────────────────────────────────────
W = 9026  # A4 content width (11906 - 2*1440 margins)

def section_project_overview(c, num):
    parts = [h1(f"{num}. Project Overview")]
    parts.append(para(c.get("project_overview", "")))
    return parts

def section_project_detail(c, num):
    col = [2600, W - 2600]
    parts = [h1(f"{num}. Project Detail"), spacer()]
    parts.append(tbl_open(col))
    rows = [
        ("Client",               c.get("client_legal_name") or c.get("client_name", "")),
        ("Project Name",         c.get("project_name", "")),
        ("Engagement Model",     c.get("engagement_model_label", "")),
        ("Project Start Date",   c.get("start_date", "[TBC]")),
        ("Estimated Completion", c.get("completion_date", "[TBC]")),
        ("Main Client Contact",  c.get("client_contact_name", "[TBC]")),
        ("Main Planes Contact",  c.get("planes_contact", "Ryan Lock")),
    ]
    for label, value in rows:
        parts.append(row(_cell(label, col[0], bold=True, bg=GRAY), _cell(value, col[1])))
    parts.append(tbl_close())
    parts.append(spacer())
    gsa_note = c.get("gsa_note") or f"This SOW is governed by the terms of the General Services Agreement between Planes Agency and {c.get('client_legal_name') or c.get('client_name', 'the Client')}."
    parts.append(para(gsa_note))
    return parts

def section_objectives(c, num):
    parts = [h1(f"{num}. Objectives")]
    for obj in c.get("objectives", []):
        parts.append(numbered(obj))
    return parts

def section_scope_changes(c, num):
    text = c.get("scope_changes_text") or "Any changes to the scope, services, or deliverables must be agreed in writing by both parties prior to implementation."
    return [h1(f"{num}. Scope Changes"), para(text)]

def section_deliverables(c, num):
    dc = [3000, W - 3000]
    parts = [h1(f"{num}. Deliverables"), spacer()]
    parts.append(tbl_open(dc))
    parts.append(hdr_row(("Deliverable", dc[0]), ("Detail", dc[1])))
    for d in c.get("deliverables", []):
        parts.append(row(
            _cell(d.get("name", ""), dc[0], bold=True),
            _cell(d.get("detail", ""), dc[1])
        ))
    parts.append(tbl_close())
    return parts

def section_ways_of_working(c, num):
    parts = [h1(f"{num}. Ways of Working")]
    for item in c.get("ways_of_working", []):
        parts.append(para_bold_intro(item.get("title", "") + ".", "  " + item.get("text", "")))
    return parts

def section_client_responsibilities(c, num):
    parts = [h1(f"{num}. Client Responsibilities")]
    for b in c.get("client_responsibilities", []):
        parts.append(bullet(b))
    return parts

def section_out_of_scope(c, num):
    parts = [h1(f"{num}. Out of Scope")]
    for b in c.get("out_of_scope", []):
        parts.append(bullet(b))
    return parts

def section_invoicing(c, num):
    ic = [W - 2200, 2200]
    parts = [h1(f"{num}. Invoicing Schedule")]
    if c.get("invoicing_intro"):
        parts.append(para(c["invoicing_intro"]))
    parts.append(spacer())
    parts.append(tbl_open(ic))
    has_timing = any("timing" in inv for inv in c.get("invoicing", []))
    if has_timing:
        ic3 = [W - 4000, 1600, 2400]
        parts = parts[:-2]  # remove the tbl_open we just added
        parts.append(tbl_open(ic3))
        parts.append(hdr_row(("Milestone / Phase", ic3[0]), ("Amount (ex. VAT)", ic3[1]), ("Timing", ic3[2])))
        for inv in c.get("invoicing", []):
            parts.append(row(
                _cell(inv.get("phase", ""), ic3[0]),
                _cell(inv.get("amount", ""), ic3[1]),
                _cell(inv.get("timing", ""), ic3[2])
            ))
    else:
        parts.append(hdr_row(("Milestone / Phase", ic[0]), ("Amount (ex. VAT)", ic[1])))
        for inv in c.get("invoicing", []):
            parts.append(row(
                _cell(inv.get("phase", ""), ic[0]),
                _cell(inv.get("amount", ""), ic[1])
            ))
    # Total row
    if c.get("total_cost"):
        if has_timing:
            parts.append(row(
                _cell("Total", ic3[0], bold=True, bg=GRAY),
                _cell(c["total_cost"], ic3[1], bold=True, bg=GRAY),
                _cell("", ic3[2], bg=GRAY)
            ))
        else:
            parts.append(row(
                _cell("Total", ic[0], bold=True, bg=GRAY),
                _cell(c["total_cost"], ic[1], bold=True, bg=GRAY)
            ))
    parts.append(tbl_close())
    if c.get("invoicing_notes"):
        parts.append(spacer())
        parts.append(para(c["invoicing_notes"]))
    return parts

def section_cancellation(c, num):
    text = c.get("cancellation_text") or "This Statement of Work may be cancelled with 30 days\u2019 written notice. Any work completed prior to the cancellation date will be invoiced at the agreed rates."
    return [h1(f"{num}. Cancellation"), para(text)]

def section_signatures(c, num):
    sc = [2200, 2200, 2826, 1800]
    parts = [h1(f"{num}. Signatures"), spacer()]
    parts.append(tbl_open(sc))
    parts.append(hdr_row(("Name", sc[0]), ("Role", sc[1]), ("Organisation", sc[2]), ("Signature", sc[3])))
    for sig in c.get("signatures", []):
        parts.append(row(
            _cell(sig.get("name", ""), sc[0], bold=True),
            _cell(sig.get("role", ""), sc[1]),
            _cell(sig.get("org", ""), sc[2]),
            _cell("", sc[3])
        ))
    parts.append(tbl_close())
    parts.append(spacer())
    parts.append(para("Planes Agency Limited  \u00B7  Unit 110, Brickfields, 37 Cremer St, London E2 8HD", italic=True, color="777777"))
    parts.append(para("hello@planes.agency  \u00B7  07400 327871", italic=True, color="777777"))
    return parts

# ──────────────────────────────────────────────────────────────────────────────
# CONTRACT-TYPE-SPECIFIC SECTIONS
# ──────────────────────────────────────────────────────────────────────────────

def section_gated_approach_and_phases(c, num):
    """Gated Fixed Phase Cost: approach overview + phase blocks."""
    parts = [h1(f"{num}. Approach Overview")]

    # Introductory approach paragraphs
    if c.get("approach_intro"):
        for line in (c["approach_intro"] if isinstance(c["approach_intro"], list) else [c["approach_intro"]]):
            parts.append(para(line))

    # Standard gating language (can be overridden)
    gating_text = c.get("gating_text") or [
        ("Phases Summary.", "This project is delivered in distinct phases. The duration and cost of each phase is reviewed at the conclusion of the preceding phase, at which point team structure and planned outcomes may be adjusted with written agreement."),
        ("Gated Progression.", "Progression from one phase to the next is mutually agreed and is not automatic. Following completion of each phase, Planes will provide a summary of outcomes along with confirmation of the team, time and cost for the next phase. Work on a subsequent phase will only begin once both parties have agreed this in writing."),
        ("Fixed Phase Costs.", "Each phase is priced on a fixed-cost basis, determined by the agreed team shape and day rates. If the team composition differs from what is outlined in this SOW, the phase cost will be adjusted accordingly and confirmed in writing before work begins."),
    ]
    for label, text in gating_text:
        parts.append(para_bold_intro(label, text))

    parts.append(h1(f"{num + 0.1:.0f}. Project Phases".replace(".0", "")))  # renumber handled by caller

    # Per-phase blocks
    for phase in c.get("phases", []):
        parts.append(h2(phase.get("name", "")))
        if phase.get("dates"):
            parts.append(para(f"Indicative Dates: {phase['dates']}", italic=True, color="555555"))
        if phase.get("description"):
            parts.append(para(phase["description"]))
        if phase.get("activities"):
            parts.append(para("Activities:", bold=True))
            for act in phase["activities"]:
                parts.append(bullet(act))
        if phase.get("outcomes"):
            parts.append(para("Outcomes:", bold=True))
            for out in phase["outcomes"]:
                parts.append(bullet(out))
        parts.append(spacer())
    return parts

def section_gated_approach_overview(c, num):
    """Returns approach (num) and phases (num+1) as separate top-level sections."""
    parts = [h1(f"{num}. Approach Overview")]
    # Only use approach_intro if gating_text is not provided (gating_text supersedes it)
    if c.get("approach_intro") and not c.get("gating_text"):
        for line in (c["approach_intro"] if isinstance(c["approach_intro"], list) else [c["approach_intro"]]):
            parts.append(para(line))
    gating_text = c.get("gating_text") or [
        ("Phases Summary.", "This project is delivered in distinct phases. The duration and cost of each phase is reviewed at the conclusion of the preceding phase, at which point team structure and planned outcomes may be adjusted with written agreement."),
        ("Gated Progression.", "Progression from one phase to the next is mutually agreed and is not automatic. Following completion of each phase, Planes will provide a summary of outcomes along with confirmation of the team, time and cost for the next phase. Work on a subsequent phase will only begin once both parties have agreed this in writing."),
        ("Fixed Phase Costs.", "Each phase is priced on a fixed-cost basis, determined by the agreed team shape and day rates. If the team composition differs from what is outlined in this SOW, the phase cost will be adjusted accordingly and confirmed in writing before work begins."),
    ]
    for label, text in gating_text:
        parts.append(para_bold_intro(label, text))
    return parts

def section_phases(c, num):
    parts = [h1(f"{num}. Project Phases")]
    for phase in c.get("phases", []):
        parts.append(h2(phase.get("name", "")))
        if phase.get("dates"):
            parts.append(para(f"Indicative Dates:  {phase['dates']}", italic=True, color="666666"))
        if phase.get("description"):
            parts.append(para(phase["description"]))
        if phase.get("activities"):
            parts.append(para("Activities:", bold=True))
            for act in phase["activities"]:
                parts.append(bullet(act))
        if phase.get("outcomes"):
            parts.append(para("Outcomes:", bold=True))
            for out in phase["outcomes"]:
                parts.append(bullet(out))
        parts.append(spacer())
    return parts

def section_gated_cost_breakdown(c, num):
    """Gated: phase costs table with indicative total."""
    cc = [W - 2600, 2600]
    parts = [h1(f"{num}. Cost Breakdown")]
    if c.get("cost_breakdown_note"):
        parts.append(para(c["cost_breakdown_note"]))
    parts.append(spacer())
    parts.append(tbl_open(cc))
    parts.append(hdr_row(("Phase", cc[0]), ("Indicative Cost (ex. VAT)", cc[1])))
    for phase in c.get("phases", []):
        if phase.get("cost"):
            parts.append(row(_cell(phase["name"], cc[0]), _cell(phase["cost"], cc[1])))
    if c.get("total_cost"):
        parts.append(row(
            _cell("Total (indicative)", cc[0], bold=True, bg=GRAY),
            _cell(c["total_cost"], cc[1], bold=True, bg=GRAY)
        ))
    parts.append(tbl_close())
    return parts

def section_roles_day_rates(c, num):
    """Gated: roles + day rates only (no names/allocations)."""
    tc = [W - 2200, 2200]
    parts = [h1(f"{num}. Roles and Day Rates")]
    if c.get("roles_intro"):
        parts.append(para(c["roles_intro"]))
    else:
        parts.append(para("The table below shows the team roles and day rates which form the basis of phase cost calculations. The team may flex between phases depending on what is agreed at each gate. Any changes will be confirmed in writing."))
    parts.append(spacer())
    parts.append(tbl_open(tc))
    parts.append(hdr_row(("Role", tc[0]), ("Day Rate (ex. VAT)", tc[1])))
    for member in c.get("team", []):
        parts.append(row(
            _cell(member.get("role", ""), tc[0]),
            _cell(member.get("day_rate", ""), tc[1])
        ))
    parts.append(tbl_close())
    if c.get("roles_footnote"):
        parts.append(spacer())
        parts.append(para(c["roles_footnote"], italic=True, color="666666"))
    return parts

def section_team_allocation(c, num):
    """Fixed Budget / Discovery: named team with roles and allocation %."""
    tc = [3000, 3226, 1800]
    parts = [h1(f"{num}. Roles & Team")]
    parts.append(spacer())
    parts.append(tbl_open(tc))
    parts.append(hdr_row(("Name", tc[0]), ("Role", tc[1]), ("Commitment", tc[2])))
    for member in c.get("team", []):
        name = member.get("name") or member.get("role", "")
        role = member.get("role", "") if member.get("name") else ""
        alloc = member.get("allocation") or member.get("day_rate", "")
        parts.append(row(
            _cell(name, tc[0], bold=True),
            _cell(role, tc[1]),
            _cell(alloc, tc[2])
        ))
    parts.append(tbl_close())
    return parts

def section_fixed_cost_breakdown(c, num):
    """Fixed Budget / Discovery: single total cost table."""
    cc = [2600, W - 2600]
    parts = [h1(f"{num}. Cost Breakdown")]
    parts.append(spacer())
    parts.append(tbl_open(cc))
    parts.append(row(
        _cell("Total Cost", cc[0], bold=True, bg=GRAY),
        _cell(c.get("total_cost", ""), cc[1], bold=True)
    ))
    if c.get("expenses_note"):
        parts.append(row(
            _cell("Expenses", cc[0], bold=True, bg=GRAY),
            _cell(c["expenses_note"], cc[1])
        ))
    parts.append(tbl_close())
    return parts

def section_tm_rates(c, num):
    """T&M: role + day rate table."""
    tc = [W - 2200, 2200]
    parts = [h1(f"{num}. Roles and Day Rates")]
    parts.append(para("The following day rates apply to this engagement. Monthly invoices will be based on actual time logged against these rates."))
    parts.append(spacer())
    parts.append(tbl_open(tc))
    parts.append(hdr_row(("Role", tc[0]), ("Day Rate (ex. VAT)", tc[1])))
    for member in c.get("team", []):
        parts.append(row(
            _cell(member.get("role", ""), tc[0]),
            _cell(member.get("day_rate", ""), tc[1])
        ))
    parts.append(tbl_close())
    return parts

def section_completion_handover(c, num):
    text = c.get("completion_handover_text") or "The project will be deemed complete at the conclusion of the final phase unless both parties agree to extend. Time required for handover, including documentation, additional support or training, will be completed using resources allocated within this SOW."
    return [h1(f"{num}. Completion and Handover"), para(text)]

def section_acceptance(c, num):
    text = c.get("acceptance_text") or "Deliverables are accepted on the earliest of: (a) the Client\u2019s written acceptance; or (b) presentation of final deliverables in the agreed locations. Where there is a defect attributable to Planes, acceptance is paused until the issue is resolved."
    return [h1(f"{num}. Acceptance and Completion"), para(text)]

def section_fixed_approach(c, num):
    """Fixed Budget/Discovery: approach intro prose + activities table (Option A).

    Renders:
      1. approach_intro / approach_summary -- prose paragraph(s) describing the approach
      2. activities -- two-column table (Activity | Outcome) drawn from the source proposal
      3. phases -- sub-headed phase blocks (used by fixed_budget_scope if phases are defined)

    The Approach section must never be left empty. approach_intro and activities
    should always be populated from the source proposal or brief before generating.
    """
    parts = [h1(f"{num}. Approach Overview")]

    # 1. Prose intro (accept either field name)
    approach_intro = c.get("approach_intro") or c.get("approach_summary")
    if approach_intro:
        for line in (approach_intro if isinstance(approach_intro, list) else [approach_intro]):
            parts.append(para(line))

    # 2. Activities table -- two columns: Activity | Outcome
    activities = c.get("activities", [])
    if activities:
        parts.append(spacer())
        ac = [3500, W - 3500]
        parts.append(tbl_open(ac))
        parts.append(hdr_row(("Activity", ac[0]), ("Outcome", ac[1])))
        for act in activities:
            activity_text = act.get("activity", "") if isinstance(act, dict) else str(act)
            outcome_text  = act.get("outcome",   "") if isinstance(act, dict) else ""
            parts.append(row(
                _cell(activity_text, ac[0], bold=True),
                _cell(outcome_text,  ac[1])
            ))
        parts.append(tbl_close())

    # 3. Phase blocks (fixed_budget_scope may supply phases instead of / alongside activities)
    for phase in c.get("phases", []):
        parts.append(h2(phase.get("name", "")))
        if phase.get("dates"):
            parts.append(para(f"Dates:  {phase['dates']}", italic=True, color="666666"))
        if phase.get("description"):
            parts.append(para(phase["description"]))
        if phase.get("activities"):
            for act in phase["activities"]:
                parts.append(bullet(act))
        parts.append(spacer())

    return parts

def section_tm_invoicing(c, num):
    """T&M: monthly invoicing."""
    text = c.get("invoicing_text") or "Planes will invoice monthly in arrears based on time logged against the agreed day rates. Invoices are payable within 30 days of issue. Any pre-approved expenses will be invoiced alongside the monthly timesheet."
    return [h1(f"{num}. Invoicing"), para(text)]

# ──────────────────────────────────────────────────────────────────────────────
# CONTRACT TYPE BUILDERS
# ──────────────────────────────────────────────────────────────────────────────

def build_gated_fixed_phase(c):
    """Gated Fixed Phase Cost — most common Planes contract type."""
    parts = []
    n = 1
    parts += section_project_overview(c, n); n += 1
    parts += section_project_detail(c, n); n += 1
    parts += section_objectives(c, n); n += 1
    parts += section_completion_handover(c, n); n += 1
    parts += section_scope_changes(c, n); n += 1
    parts += section_gated_approach_overview(c, n); n += 1
    parts += section_phases(c, n); n += 1
    parts += section_deliverables(c, n); n += 1
    parts += section_ways_of_working(c, n); n += 1
    parts += section_client_responsibilities(c, n); n += 1
    parts += section_out_of_scope(c, n); n += 1
    parts += section_roles_day_rates(c, n); n += 1
    parts += section_gated_cost_breakdown(c, n); n += 1
    parts += section_invoicing(c, n); n += 1
    parts += section_cancellation(c, n); n += 1
    parts += section_signatures(c, n)
    return parts

def build_fixed_budget_scope(c):
    """Fixed Budget and Scope."""
    parts = []
    n = 1
    parts += section_project_overview(c, n); n += 1
    parts += section_project_detail(c, n); n += 1
    parts += section_objectives(c, n); n += 1
    parts += section_scope_changes(c, n); n += 1
    parts += section_fixed_approach(c, n); n += 1
    parts += section_deliverables(c, n); n += 1
    parts += section_ways_of_working(c, n); n += 1
    parts += section_client_responsibilities(c, n); n += 1
    parts += section_out_of_scope(c, n); n += 1
    parts += section_team_allocation(c, n); n += 1
    parts += section_fixed_cost_breakdown(c, n); n += 1
    parts += section_invoicing(c, n); n += 1
    parts += section_acceptance(c, n); n += 1
    parts += section_cancellation(c, n); n += 1
    parts += section_signatures(c, n)
    return parts

def build_fixed_cost_discovery(c):
    """Fixed Cost Discovery — standalone discovery/research phase."""
    parts = []
    n = 1
    parts += section_project_overview(c, n); n += 1
    parts += section_project_detail(c, n); n += 1
    parts += section_objectives(c, n); n += 1
    parts += section_scope_changes(c, n); n += 1
    parts += section_fixed_approach(c, n); n += 1
    parts += section_deliverables(c, n); n += 1
    parts += section_ways_of_working(c, n); n += 1
    parts += section_client_responsibilities(c, n); n += 1
    parts += section_out_of_scope(c, n); n += 1
    parts += section_team_allocation(c, n); n += 1
    parts += section_fixed_cost_breakdown(c, n); n += 1
    parts += section_invoicing(c, n); n += 1
    parts += section_acceptance(c, n); n += 1
    parts += section_cancellation(c, n); n += 1
    parts += section_signatures(c, n)
    return parts

def build_time_and_materials(c):
    """Time and Materials — retainer/flexible engagements."""
    parts = []
    n = 1
    parts += section_project_overview(c, n); n += 1
    parts += section_project_detail(c, n); n += 1
    parts += section_scope_changes(c, n); n += 1
    # Approach (no phases for T&M)
    if c.get("approach_intro"):
        parts += [h1(f"{n}. Approach")] + [para(l) for l in (c["approach_intro"] if isinstance(c["approach_intro"], list) else [c["approach_intro"]])]
    else:
        parts += [h1(f"{n}. Approach"), para("Planes will work on an ongoing, flexible basis. Scope and priorities will be agreed on a rolling basis and may evolve week to week in line with the Client\u2019s needs.")]
    n += 1
    parts += section_ways_of_working(c, n); n += 1
    parts += section_client_responsibilities(c, n); n += 1
    parts += section_out_of_scope(c, n); n += 1
    parts += section_tm_rates(c, n); n += 1
    parts += section_tm_invoicing(c, n); n += 1
    parts += section_cancellation(c, n); n += 1
    parts += section_signatures(c, n)
    return parts

BUILDERS = {
    "gated_fixed_phase":     build_gated_fixed_phase,
    "fixed_budget_scope":    build_fixed_budget_scope,
    "fixed_cost_discovery":  build_fixed_cost_discovery,
    "time_and_materials":    build_time_and_materials,
}

# ──────────────────────────────────────────────────────────────────────────────
# NUMBERING XML
# ──────────────────────────────────────────────────────────────────────────────

NUMBERING_XML = '''<?xml version="1.0" encoding="utf-8"?>
<w:numbering xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
             xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:abstractNum w:abstractNumId="0">
    <w:multiLevelType w:val="hybridMultilevel"/>
    <w:lvl w:ilvl="0">
      <w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="&#x2022;"/>
      <w:lvlJc w:val="left"/>
      <w:pPr><w:ind w:left="360" w:hanging="360"/></w:pPr>
      <w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr>
    </w:lvl>
  </w:abstractNum>
  <w:abstractNum w:abstractNumId="1">
    <w:multiLevelType w:val="hybridMultilevel"/>
    <w:lvl w:ilvl="0">
      <w:start w:val="1"/><w:numFmt w:val="decimal"/><w:lvlText w:val="%1."/>
      <w:lvlJc w:val="left"/>
      <w:pPr><w:ind w:left="360" w:hanging="360"/></w:pPr>
      <w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr>
    </w:lvl>
  </w:abstractNum>
  <w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num>
  <w:num w:numId="2"><w:abstractNumId w:val="1"/></w:num>
</w:numbering>'''

# ──────────────────────────────────────────────────────────────────────────────
# DOCUMENT ASSEMBLY
# ──────────────────────────────────────────────────────────────────────────────

def extract_cover_xml(template_xml):
    """Extract the cover page section from the template document.xml."""
    match = re.search(r'(.*?)<w:p[ >].*?<w:pStyle w:val="Heading1"', template_xml, re.DOTALL)
    if match:
        return match.group(1)
    # Fallback: take content up to first major section
    lines = template_xml.split('\n')
    return '\n'.join(lines[:445])

def update_cover(cover_xml, client_name, project_name, date):
    """Replace template placeholders with actual values."""
    replacements = [
        ('<w:t xml:space="preserve">Client</w:t>',  f'<w:t xml:space="preserve">{esc(client_name)}</w:t>'),
        ('<w:t xml:space="preserve">Project</w:t>', f'<w:t xml:space="preserve">{esc(project_name)}</w:t>'),
        ('<w:t xml:space="preserve">Date</w:t>',    f'<w:t xml:space="preserve">{esc(date)}</w:t>'),
        ('>Amtivo<', f'>{esc(client_name)}<'),
        ('>Amtivo </w:t>', f'>{esc(client_name)}<'),
    ]
    for old, new in replacements:
        cover_xml = cover_xml.replace(old, new)
    return cover_xml

def update_header(header_xml, client_name, project_name):
    """Update header text: replace 'Amtivo' or any existing client name."""
    header_xml = re.sub(r'>([^<]+?)\s*&#8197;\s*&#124;', f'>{esc(client_name)}  \u2502', header_xml)
    header_xml = header_xml.replace('>Amtivo<', f'>{esc(client_name)}<')
    header_xml = header_xml.replace('>Amtivo </w:t>', f'>{esc(client_name)}</w:t>')
    return header_xml


# Cover page section break — no header/footer so cover stays clean
COVER_SECT_BREAK = '''<w:p>
  <w:pPr>
    <w:sectPr>
      <w:pgSz w:w="11900" w:h="16840"/>
      <w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="709" w:footer="850" w:gutter="0"/>
    </w:sectPr>
  </w:pPr>
</w:p>'''

# Body pages: rId8=header, rId9=footer (from template.docx rels)
FINAL_SECT = '''<w:sectPr>
  <w:headerReference w:type="default" r:id="rId8"/>
  <w:footerReference w:type="default" r:id="rId9"/>
  <w:pgSz w:w="11906" w:h="16838"/>
  <w:pgMar w:bottom="1440" w:top="1440" w:left="1440" w:right="1440" w:header="708" w:footer="708" w:gutter="0"/>
</w:sectPr>'''

COVER_IMAGE_REL = '<Relationship Id="rId20" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/cover-image.png"/>'


def load_cover_body(assets_dir, client_name, project_name, date):
    """Load cover_body.xml, swap image rId, replace {Client}/{Project Name}/{Date}."""
    cover_path = os.path.join(assets_dir, 'cover_body.xml')
    with open(cover_path, 'r', encoding='utf-8') as f:
        cover = f.read()
    # The cover image was rId4 in the source docx — remap to rId20 to avoid conflicts
    cover = cover.replace('r:embed="rId4"', 'r:embed="rId20"')
    # Replace text placeholders inside floating text boxes
    cover = cover.replace('{Client}',       esc(client_name))
    cover = cover.replace('{Project Name}', esc(project_name))
    cover = cover.replace('{Date}',         esc(date))
    return cover


def add_cover_image_rel(rels_path):
    """Add cover image relationship to document.xml.rels."""
    with open(rels_path, 'r', encoding='utf-8') as f:
        rels = f.read()
    if 'rId20' not in rels:
        rels = rels.replace('</Relationships>', f'  {COVER_IMAGE_REL}\n</Relationships>')
        with open(rels_path, 'w', encoding='utf-8') as f:
            f.write(rels)


def generate(config_path, template_path, output_path):
    with open(config_path, 'r', encoding='utf-8') as f:
        c = json.load(f)

    contract_type = c.get("contract_type", "gated_fixed_phase")
    builder = BUILDERS.get(contract_type)
    if not builder:
        raise ValueError(f"Unknown contract_type: {contract_type}. Valid options: {list(BUILDERS.keys())}")

    # Locate assets dir (same folder as this script)
    assets_dir = os.path.dirname(os.path.abspath(__file__))

    # Unpack template to temp dir
    tmp = tempfile.mkdtemp(prefix="sow_build_")
    with zipfile.ZipFile(template_path, 'r') as z:
        z.extractall(tmp)

    # ── Cover page ─────────────────────────────────────────────────────────────
    cover_image_src = os.path.join(assets_dir, 'cover-image.png')
    cover_body_path = os.path.join(assets_dir, 'cover_body.xml')
    has_cover = os.path.exists(cover_body_path) and os.path.exists(cover_image_src)

    cover_section = ""
    if has_cover:
        media_dir = os.path.join(tmp, 'word', 'media')
        os.makedirs(media_dir, exist_ok=True)
        shutil.copy(cover_image_src, os.path.join(media_dir, 'cover-image.png'))
        rels_path = os.path.join(tmp, 'word', '_rels', 'document.xml.rels')
        add_cover_image_rel(rels_path)
        cover_body = load_cover_body(
            assets_dir,
            c.get("client_name", ""),
            c.get("project_name", ""),
            c.get("date", "")
        )
        cover_section = f"{cover_body}\n{COVER_SECT_BREAK}\n"

    # ── Build body sections ────────────────────────────────────────────────────
    body_parts = builder(c)
    body_content = '\n'.join(body_parts)

    # ── Assemble full document.xml ─────────────────────────────────────────────
    doc_path = os.path.join(tmp, 'word', 'document.xml')
    with open(doc_path, 'r', encoding='utf-8') as f:
        template_xml = f.read()

    # Preserve namespace declarations from the template up to <w:body>
    body_tag_pos = template_xml.index('<w:body>') + len('<w:body>')
    doc_header = template_xml[:body_tag_pos]

    new_doc = f'''{doc_header}
{cover_section}{body_content}
{FINAL_SECT}
  </w:body>
</w:document>'''

    with open(doc_path, 'w', encoding='utf-8') as f:
        f.write(new_doc)

    # ── Update numbering.xml ───────────────────────────────────────────────────
    numbering_path = os.path.join(tmp, 'word', 'numbering.xml')
    with open(numbering_path, 'w', encoding='utf-8') as f:
        f.write(NUMBERING_XML)

    # ── Update header ──────────────────────────────────────────────────────────
    header_path = os.path.join(tmp, 'word', 'header1.xml')
    if os.path.exists(header_path):
        with open(header_path, 'r', encoding='utf-8') as f:
            header = f.read()
        header = update_header(header, c.get("client_name", ""), c.get("project_name", ""))
        with open(header_path, 'w', encoding='utf-8') as f:
            f.write(header)

    # ── Pack back to docx ──────────────────────────────────────────────────────
    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zout:
        for root, dirs, files in os.walk(tmp):
            for fname in files:
                fpath = os.path.join(root, fname)
                arcname = os.path.relpath(fpath, tmp)
                zout.write(fpath, arcname)

    shutil.rmtree(tmp)
    print(f"Generated: {output_path}")
    return output_path


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Planes SOW Generator")
    parser.add_argument("--template", required=True, help="Path to template.docx")
    parser.add_argument("--config",   required=True, help="Path to config JSON file")
    parser.add_argument("--output",   required=True, help="Output .docx path")
    args = parser.parse_args()
    generate(args.config, args.template, args.output)
