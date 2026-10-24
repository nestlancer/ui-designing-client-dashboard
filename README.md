# Nestlancer — Client Portal redesign (2030)

This repo holds the **existing** client portal UI (45 screenshots) and the **build specification for its 2030 replacement**.

```
.
├── Nestlancer-clients-screenshots/   ← current portal, 45 screens (read-only)
├── docs/
│   ├── legacy-audit-45-screens.md    ← what exists today
│   └── meridian-page-prompts/        ← ★ run these (split build)
│       ├── README.md                 ← shared contract + workflow
│       ├── 00-foundation.md
│       ├── 01-orientation.md
│       ├── 02-work.md
│       ├── 03-money.md
│       ├── 04-conversation.md
│       ├── 05-files.md
│       ├── 06-account.md
│       └── 07-states-qa.md
├── PROMPT-2030-CLIENT-PORTAL.md      ← full canon (tokens, dataset, DoD)
└── meridian-lab/                     ← hand-authored output (created by agents)
```

## How to build (recommended)

Same pattern as homepage section prompts (`ui-designing-homepage/docs/homepage-section-prompts/`):

1. Open this repo as the working directory.
2. Paste **shared contract** from [`docs/meridian-page-prompts/README.md`](docs/meridian-page-prompts/README.md) + **one** numbered part (`00` → `07`).
3. Review on disk → approve → next part.

| Part | Scope | Approx. files |
|---|---|---|
| 00 Foundation | Tokens, CSS, icons, shell-reference | ~8 |
| 01 Orientation | Overview, launcher, notifications | 6 |
| 02 Work | Requests, projects, milestone rail | 8 |
| 03 Money | Billing, payments, quotes, invoices | 10 |
| 04 Conversation | Messages, thread | 3 |
| 05 Files | Library + preview | 2 |
| 06 Account | Profile + settings | 6 |
| 07 States + QA | Empty/loading/error/mobile + set QA | 4+ |

Canon if a part is ambiguous: [`PROMPT-2030-CLIENT-PORTAL.md`](PROMPT-2030-CLIENT-PORTAL.md) (master wins).

### Preview

```bash
cd meridian-lab && python3 -m http.server 8130
```

## Why the split

The master prompt defines **40 pages**. Running it as one session burned context and stalled after foundation files. Part prompts keep each agent session small—like homepage `01-hero.md` … `06-closing-cta.md`.

## Ground rules

1. Hand-author HTML/CSS onto disk under `meridian-lab/` — no generators.
2. No JavaScript in pages (`details` / `popover` / `:has()` only).
3. One dataset (master §8); money must reconcile.
4. Do not dump full file bodies into chat.
5. Do not push/commit/switch branch unless asked.

## What the 2030 portal is

> 2030 doesn't mean neon. It means the software stopped asking the client to do the system's work.

Ambient Now bar · one decision per screen · addressable Navigator with provenance. Paper-and-ink Meridian language — full detail in the master prompt §3–§4.
