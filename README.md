<p align="right">
  <strong>English</strong> | <a href="README_zh.md">中文</a>
</p>

# Stock Analysis — Cursor Skill & OpenClaw Plugin

A dual-platform stock analysis tool that performs **comprehensive, structured stock research** — from data gathering to actionable investment advice.

Works on both **[Cursor](https://www.cursor.com/)** (as an Agent Skill) and **[OpenClaw](https://docs.openclaw.ai/)** (as a Plugin + Workflow).

---

## Features

When you say *"分析一下 WOLF 股票"* or *"Analyze NVDA stock"*, the agent executes an **8-phase analysis**:

| Phase | Content |
|-------|---------|
| 1 | **Data Gathering** — parallel web searches for financials, price, technicals, analysts, industry, news |
| 2 | **Company Overview** — profile, sector, products, milestones |
| 3 | **Fundamental Analysis** — balance sheet, profitability, margins, cash flow, growth |
| 4 | **Technical Analysis** — MA (8/20/50/200), RSI, MACD, MFI, support/resistance |
| 5 | **Analyst Ratings** — consensus, individual analysts, options sentiment |
| 6 | **Risk Assessment** — company / industry / stock-level risks |
| 7 | **Scoring** — 8-dimension weighted model (1-10) → grade A-F |
| 8 | **Investment Advice** — scenarios, position sizing, entry/exit, stop-loss, alternatives |

## Scoring System

| Dimension | Weight | Dimension | Weight |
|-----------|--------|-----------|--------|
| Financial Health | 20% | Technical Setup | 10% |
| Profitability | 15% | Valuation | 10% |
| Growth Potential | 15% | Industry Outlook | 10% |
| Competitive Moat | 15% | Risk Management | 5% |

| Score | Grade | Verdict | Max Position |
|-------|-------|---------|-------------|
| 8-10 | A | Strong Buy | 8-10% |
| 6-8 | B | Buy | 5-7% |
| 4-6 | C | Hold / Watch | 2-4% |
| 2-4 | D | Reduce | 1-2% |
| 0-2 | F | Sell | 0% |

---

## Installation

### Cursor (Agent Skill)

```bash
# Personal skill (all projects)
git clone https://github.com/xincxiong/cursor-skill-stock-analysis.git \
  ~/.cursor/skills/stock-analysis

# Project-level skill
git clone https://github.com/xincxiong/cursor-skill-stock-analysis.git \
  .cursor/skills/stock-analysis
```

Restart Cursor or start a new chat. The skill auto-activates on stock analysis requests.

### OpenClaw (Plugin)

#### Option A: Install from npm / ClawHub

```bash
openclaw plugins install openclaw-stock-analysis
```

Then enable in `~/.openclaw/openclaw.json`:

```json5
{
  plugins: {
    entries: {
      "stock-analysis": {
        enabled: true,
        config: {
          language: "auto",   // "auto", "zh", or "en"
          searchCount: 8
        }
      }
    }
  },
  tools: {
    allow: ["stock_analyze", "stock_score"]
  }
}
```

#### Option B: Install from source

```bash
cd ~/.openclaw/extensions
git clone https://github.com/xincxiong/cursor-skill-stock-analysis.git stock-analysis
cd stock-analysis && npm install
```

Restart the OpenClaw gateway.

#### Option C: Use as Workflow (requires openclaw-workflow plugin)

```bash
# Install the workflow plugin first
openclaw plugins install openclaw-workflow

# Copy workflow definition
cp workflows/stock-analysis.yaml ~/.openclaw/workflows/

# Run the analysis
openclaw workflow run stock-analysis --var ticker=WOLF --var company=Wolfspeed
```

---

## Usage

### Cursor

Just chat naturally:

- "分析一下 WOLF 股票"
- "Analyze NVDA — should I buy?"
- "Give me a stock research report on AAPL"

### OpenClaw

The plugin registers two tools:

#### `stock_analyze` (primary)

Full 8-phase analysis. Parameters:

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `ticker` | string | Yes | Stock ticker (e.g. `WOLF`) |
| `company` | string | No | Company name (auto-resolved) |
| `depth` | enum | No | `quick` / `standard` / `deep` (default: `standard`) |

Depth levels:

| Depth | Phases | Use Case |
|-------|--------|----------|
| `quick` | Overview + Score | Fast screening |
| `standard` | Full 8-phase | Regular analysis |
| `deep` | + Options sentiment, short interest, alternatives | Deep dive |

#### `stock_score` (optional)

Standalone scoring when you already have the data:

```
stock_score({ ticker: "WOLF", data: { debtToEquity: 4.49, netMargin: -89.4, beta: 3.01, priceToBook: 1.19, industryPB: 10.99 }})
```

### Workflow Mode

The `workflows/stock-analysis.yaml` defines a DAG pipeline:

```
search-financials ──┐
search-price ───────┼── fundamental-analysis ──┐
search-news ────────┘                          │
search-technicals ──┬── technical-analysis ────┼── scoring ── advice ── assemble
search-analysts ────┴── sentiment-analysis ────┤
search-industry ────┬── risk-assessment ───────┘
search-news ────────┘
```

Data gathering runs in parallel (up to 4 concurrent), analysis phases run when dependencies complete, final scoring and advice are sequential.

---

## File Structure

```
stock-analysis/
├── SKILL.md                          # Cursor skill entry (auto-discovered)
├── scoring-guide.md                  # Cursor scoring reference
├── package.json                      # OpenClaw plugin manifest (npm)
├── openclaw.plugin.json              # OpenClaw plugin config schema
├── tsconfig.json                     # TypeScript config
├── src/
│   ├── index.ts                      # OpenClaw plugin entry point
│   └── prompts/
│       ├── analysis-workflow.md      # Analysis phase template
│       └── scoring-rubric.md         # Scoring criteria
├── workflows/
│   └── stock-analysis.yaml           # OpenClaw workflow DAG
└── README.md
```

## Language

Both platforms auto-detect and match the user's language. Chinese input → Chinese output.

## Disclaimer

This tool generates analysis for **educational and reference purposes only**. It does not constitute investment advice. All investment decisions should be made independently based on your own financial situation and risk tolerance.

## License

MIT
