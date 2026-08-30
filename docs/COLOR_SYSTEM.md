# 🎨 AutoDesk Engine — Complete Color System & Design Tokens

> **Design Theme:** Clean Modern Developer-Tool Design System  
> **Font Stack:** `Inter` (Sans) + `JetBrains Mono` (Mono)

## Current Feature Context

These tokens support the implemented landing page, animated pipeline and feature sections, About page, submission modal, and 3-column live dashboard cockpit. The system uses high-contrast charcoal outlines, warm off-white canvas surfaces, crisp white panels, and vibrant status accents (red, emerald, amber, blue, violet) across the request workflow.

---

## 1. 🔲 Surface & Background Colors

| Token | Hex / Value | Description & Purpose |
|:---|:---|:---|
| `--bg-canvas` | `#f7f6f2` | Primary application background (Warm Off-White / Light Beige) |
| `--bg-panel` | `#ffffff` | Container panels, main card backgrounds |
| `--bg-panel-elevated` | `#fcfbfa` | Modals, dropdowns, floating elements |
| `--bg-card-hover` | `#f3f1eb` | Hover state for interactive cards |
| `--bg-surface-active` | `#ece9e0` | Active / selected ticket item background |
| `--bg-input` | `#fcfbf9` | Input textareas and form fields |

---

## 2. ⚡ Primary Accent & Semantic Colors

| Token | Hex / Value | Usage & Meaning |
|:---|:---|:---|
| `--accent-red` | `#dc2626` | Primary action button, urgent tickets, critical flags |
| `--accent-red-hover` | `#b91c1c` | Hover state for primary red actions |
| `--accent-emerald` | `#059669` | Success status, verified attendance, dispatched certificates |
| `--accent-amber` | `#d97706` | Warnings, human operator review queue, pending checks |
| `--accent-blue` | `#2563eb` | Links, informational badges, Notion integration highlights |
| `--accent-violet` | `#7c3aed` | Gemini AI classification tags, NLP entities |

---

## 3. ✍️ Typography Colors

| Token | Hex / Value | Purpose |
|:---|:---|:---|
| `--text-primary` | `#18181b` | Main headings, primary content, dark charcoal text |
| `--text-secondary` | `#52525b` | Subtitles, secondary descriptions, metadata |
| `--text-muted` | `#71717a` | Timestamps, placeholder labels, disabled text |
| `--text-white` | `#ffffff` | High-contrast text on colored buttons and dark badges |

---

## 4. 📐 Structural Borders & Tactical Shadows

| Token | CSS Value | Usage |
|:---|:---|:---|
| `--border-charcoal` | `#18181b` | Main 2px–3px structured card & button borders |
| `--border-subtle` | `#e2dfd6` | Subtle dividers and secondary outlines |
| `--border-mid` | `#cbd5e1` | Medium contrast borders |
| `--shadow-card` | `2px 2px 0px #18181b` | Offset tactical card shadow |
| `--shadow-card-hover` | `3px 3px 0px #18181b` | Hover elevation shadow |
| `--shadow-button` | `2px 2px 0px #18181b` | Button press shadow |

---

## 5. 💻 CSS Variables Block (Direct from `src/app/globals.css`)

```css
:root {
  /* Surface Colors — Warm Off-White System */
  --bg-canvas: #f7f6f2;
  --bg-panel: #ffffff;
  --bg-panel-elevated: #fcfbfa;
  --bg-card-hover: #f3f1eb;
  --bg-surface-active: #ece9e0;
  --bg-input: #fcfbf9;

  /* Borders & Outlines — Dark Charcoal */
  --border-charcoal: #18181b;
  --border-subtle: #e2dfd6;
  --border-mid: #cbd5e1;

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 18px;

  /* Accents */
  --accent-red: #dc2626;
  --accent-red-hover: #b91c1c;
  --accent-emerald: #059669;
  --accent-amber: #d97706;
  --accent-blue: #2563eb;
  --accent-violet: #7c3aed;

  /* Typography */
  --text-primary: #18181b;
  --text-secondary: #52525b;
  --text-muted: #71717a;
  --text-white: #ffffff;

  /* Tactical Developer Shadows */
  --shadow-card: 2px 2px 0px #18181b;
  --shadow-card-hover: 3px 3px 0px #18181b;
  --shadow-button: 2px 2px 0px #18181b;
  --shadow-subtle: 0 1px 3px rgba(0, 0, 0, 0.05);
}
```
