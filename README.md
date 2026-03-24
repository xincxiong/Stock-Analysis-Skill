# cursor-skill-stock-analysis

A [Cursor](https://www.cursor.com/) Agent Skill that performs **comprehensive, structured stock analysis** — from data gathering to actionable investment advice — in a single conversation turn.

## What It Does

When you say something like *"分析一下 WOLF 股票"* or *"Should I buy NVDA?"*, the Agent automatically executes an **8-phase analysis workflow**:

| Phase | Content |
|-------|---------|
| 1. Data Gathering | Parallel web searches for financials, price, technicals, analyst ratings, industry, and news |
| 2. Company Overview | Business profile, sector, key products, recent milestones |
| 3. Fundamental Analysis | Balance sheet, profitability, margins, cash flow, growth drivers |
| 4. Technical Analysis | Moving averages (8/20/50/200 SMA), RSI, MACD, MFI, support/resistance levels |
| 5. Analyst Ratings | Consensus ratings, individual analyst breakdown, options sentiment (put/call ratio, IV) |
| 6. Risk Assessment | Company-specific, industry, and stock-level risks |
| 7. Comprehensive Scoring | 8-dimension weighted scoring system (1–10) with letter grade (A–F) |
| 8. Investment Advice | Scenario analysis, position sizing, entry/exit strategy, stop-loss, alternatives |

## Scoring System

The skill uses a **weighted multi-dimensional scoring model**:

| Dimension | Weight |
|-----------|--------|
| Financial Health | 20% |
| Profitability | 15% |
| Growth Potential | 15% |
| Competitive Moat | 15% |
| Technical Setup | 10% |
| Valuation | 10% |
| Industry Outlook | 10% |
| Risk Management | 5% |

Each dimension is scored 1–10 using the detailed rubric in `scoring-guide.md`, then combined into a weighted composite score mapped to an investment grade:

| Score | Grade | Verdict |
|-------|-------|---------|
| 8–10 | A | Strong Buy |
| 6–8 | B | Buy |
| 4–6 | C | Hold / Watch |
| 2–4 | D | Reduce |
| 0–2 | F | Sell |

## File Structure

```
stock-analysis/
├── SKILL.md           # Main workflow (311 lines) — the 8-phase analysis framework
├── scoring-guide.md   # Scoring rubric (115 lines) — detailed criteria for each dimension
└── README.md          # This file
```

## Installation

### Option 1: Personal skill (available across all projects)

```bash
git clone https://github.com/xincxiong/cursor-skill-stock-analysis.git \
  ~/.cursor/skills/stock-analysis
```

### Option 2: Project-level skill (shared via repo)

```bash
git clone https://github.com/xincxiong/cursor-skill-stock-analysis.git \
  .cursor/skills/stock-analysis
```

After cloning, **restart Cursor** or open a new chat — the skill will be automatically discovered.

## Trigger Phrases

The skill activates when you mention any of:

- "分析一下 XX 股票" / "analyze XX stock"
- "stock research" / "stock forecast"
- "should I buy/sell [ticker]"
- "investment analysis"
- Or simply mention a stock ticker for evaluation

## Example Output

A typical analysis report includes:

- **Financial snapshot** — price, market cap, 52-week range, P/E, P/B, D/E, etc.
- **Balance sheet & profitability tables** — assets, liabilities, margins, cash flow
- **Technical chart analysis** — MA system, momentum indicators, key price levels
- **Analyst consensus** — ratings from major Wall Street firms with target prices
- **Risk matrix** — categorized company/industry/stock risks
- **Weighted scorecard** — 8 dimensions with rationale
- **Scenario analysis** — bull/base/bear/worst case with probability-weighted target
- **Actionable advice** — batch entry plan, stop-loss, take-profit, position sizing by investor profile

## Language

The skill automatically matches the user's language. Chinese input produces Chinese output; English input produces English output.

## Disclaimer

This skill generates analysis for **educational and reference purposes only**. It does not constitute investment advice. All investment decisions should be made independently based on your own financial situation and risk tolerance.

## License

MIT
