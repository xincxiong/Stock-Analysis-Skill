---
name: stock-analysis
description: >-
  Perform comprehensive stock analysis covering fundamentals, technicals, analyst
  ratings, risk assessment, scoring, and actionable investment advice. Use when
  user asks to "analyze a stock", "stock research", "should I buy/sell [ticker]",
  "stock forecast", "investment analysis", or mentions a stock ticker for evaluation.
---

# Stock Analysis

Perform a structured, multi-dimensional stock analysis. Gather real-time data via
web search, then synthesize into a complete investment research report.

## Workflow

Copy and track progress:

```
Analysis Progress:
- [ ] Phase 1: Data gathering (parallel searches)
- [ ] Phase 2: Company overview
- [ ] Phase 3: Fundamental analysis
- [ ] Phase 4: Technical analysis
- [ ] Phase 5: Analyst ratings & sentiment
- [ ] Phase 6: Risk assessment
- [ ] Phase 7: Comprehensive scoring
- [ ] Phase 8: Investment & trading advice
```

---

## Phase 1: Data Gathering

Run **parallel web searches** to maximize efficiency. Launch all at once:

1. **Company & financials**: `"[Company] [Ticker] latest quarterly earnings revenue net income 2026"`
2. **Stock price & valuation**: `"[Ticker] stock price market cap PE ratio 52 week high low"`
3. **Technical indicators**: `"[Ticker] technical analysis moving average RSI MACD support resistance"`
4. **Analyst ratings**: `"[Ticker] analyst price target rating buy sell forecast"`
5. **Industry & competition**: `"[Company] industry competitors market share outlook"`
6. **Recent events**: `"[Company] [Ticker] latest news events restructuring"`

Fetch key pages (earnings releases, data aggregators) for deeper data when search
excerpts are insufficient.

---

## Phase 2: Company Overview

Provide a concise profile:

| Item | Content |
|------|---------|
| Company name & ticker | Full name (Exchange: TICKER) |
| Sector / Industry | e.g. Semiconductors / SiC Power Devices |
| Core business | 1-2 sentence description |
| Key products/customers | Major revenue drivers |
| Recent milestones | Significant events in last 6 months |

---

## Phase 3: Fundamental Analysis

### 3A. Snapshot Table

| Metric | Value |
|--------|-------|
| Stock price | |
| Market cap | |
| Shares outstanding | |
| 52-week high / low | |
| Beta | |
| Next earnings date | |

### 3B. Balance Sheet Health

| Metric | Value |
|--------|-------|
| Total assets | |
| Total liabilities | |
| Cash & equivalents | |
| Debt-to-equity (D/E) | |
| Current ratio | Short-term assets / Short-term liabilities |
| P/B (price-to-book) | Compare vs industry avg |

Interpret: Is the company solvent? How leveraged? Any bankruptcy/restructuring history?

### 3C. Profitability

| Metric | Value |
|--------|-------|
| Latest quarterly revenue | |
| Revenue trend (QoQ, YoY) | |
| Gross margin | |
| Operating margin | |
| Net margin | |
| EPS (trailing & forward) | |
| P/E ratio | Compare vs industry avg |
| P/S ratio | If unprofitable, use this |
| Operating cash flow | |
| Free cash flow | |

Interpret: Is the company profitable? Improving or deteriorating? Path to profitability?

### 3D. Growth Drivers & Revenue Mix

- Revenue breakdown by segment/geography
- Key customer wins or losses
- New product launches
- Emerging growth vectors (e.g. AI, EV)

---

## Phase 4: Technical Analysis

### 4A. Moving Average System

| MA | Price Level | Signal |
|----|-------------|--------|
| 8-day SMA | | Short-term trend |
| 20-day SMA | | |
| 50-day SMA | | Medium-term trend |
| 200-day SMA | | Long-term trend |

Assess: Golden cross / death cross? Price above or below key MAs?

### 4B. Momentum Indicators

| Indicator | Value | Interpretation |
|-----------|-------|----------------|
| RSI (14) | | <30 oversold, >70 overbought |
| MACD | | Above/below signal line |
| MFI | | Money flow direction |

### 4C. Key Price Levels

| Type | Price | Significance |
|------|-------|--------------|
| Strong support | | |
| MA support | | |
| MA resistance | | |
| Strong resistance | | |
| 52-week extremes | | |

### 4D. Recent Price Action

Report: 1-week, 1-month, 3-month, 6-month, 1-year % changes.

### 4E. Technical Summary

One paragraph synthesizing: Is the stock in uptrend/downtrend/consolidation?
Where is price relative to key MAs? What are momentum indicators suggesting?

---

## Phase 5: Analyst Ratings & Sentiment

### 5A. Consensus Overview

| Source | Rating | Target Price | # Analysts |
|--------|--------|-------------|------------|
| Source 1 | | | |
| Source 2 | | | |

### 5B. Individual Analyst Breakdown

| Firm | Analyst | Rating | Target | Date |
|------|---------|--------|--------|------|
| | | | | |

### 5C. Options Market Sentiment (if available)

| Metric | Value | Interpretation |
|--------|-------|----------------|
| Put/Call ratio (OI) | | <1 bullish, >1 bearish |
| IV (implied volatility) | | Options pricing risk |
| IV skew (puts vs calls) | | Hedging demand signal |

---

## Phase 6: Risk Assessment

Enumerate and rate each risk:

### Company-Specific Risks
- Financial health (debt, cash burn, dilution)
- Operational (execution, supply chain, key person)
- Legal/regulatory

### Industry Risks
- Competition intensity
- Demand cyclicality
- Technology disruption
- Geopolitical / trade policy

### Stock-Specific Risks
- Liquidity / small-cap risk
- Volatility (Beta)
- Short interest
- Insider selling patterns

---

## Phase 7: Comprehensive Scoring

Rate each dimension 1-10, apply weights, compute weighted average:

| Dimension | Score (1-10) | Weight | Weighted | Rationale |
|-----------|-------------|--------|----------|-----------|
| Financial health | | 20% | | |
| Profitability | | 15% | | |
| Growth potential | | 15% | | |
| Competitive moat | | 15% | | |
| Technical setup | | 10% | | |
| Valuation | | 10% | | |
| Industry outlook | | 10% | | |
| Risk management | | 5% | | |
| **Total** | | **100%** | **X.XX** | |

### Rating Scale

| Score | Grade | Verdict |
|-------|-------|---------|
| 8-10 | A | Strong Buy |
| 6-8 | B | Buy |
| 4-6 | C | Hold / Watch |
| 2-4 | D | Reduce |
| 0-2 | F | Sell |

---

## Phase 8: Investment & Trading Advice

### 8A. Scenario Analysis

| Scenario | Probability | 12M Target | Trigger Conditions |
|----------|------------|------------|-------------------|
| Bull case | % | $ | |
| Base case | % | $ | |
| Bear case | % | $ | |
| Worst case | % | $ | |

Compute **probability-weighted target price**.

### 8B. Position Sizing

| Investor Profile | Recommended Allocation |
|-----------------|----------------------|
| Conservative | X% of portfolio |
| Moderate | X% of portfolio |
| Aggressive | X% of portfolio |

### 8C. Entry Strategy

Provide specific, actionable advice:

- **Batch buying plan**: Split into 3-4 tranches with price triggers
- **Tranche 1**: Price level, % of planned position
- **Tranche 2**: Price level, % of planned position
- **Tranche 3**: Price level, % of planned position
- **Reserve**: % held for post-catalyst deployment

### 8D. Exit Strategy

- **Take-profit levels**: Price targets with % to sell at each
- **Stop-loss**: Hard stop price with rationale
- **Trailing stop**: % below recent high

### 8E. For Existing Holders

| Current Status | Advice |
|---------------|--------|
| In profit | |
| Small loss (<10%) | |
| Large loss (>30%) | |

### 8F. For Short-Term Traders

- Key support/resistance for range trading
- Breakout/breakdown triggers
- Catalyst calendar (earnings, events)

### 8G. Alternative Investments

If the stock is high-risk, suggest 2-3 lower-risk alternatives in the same
sector/theme with brief comparison table.

### 8H. Key Catalyst Calendar

| Date | Event | Impact Level |
|------|-------|-------------|
| | | |

---

## Output Format

Structure the final report with clear headers matching Phases 2-8.
Use tables extensively for data density. End every report with:

1. **One-sentence summary** of the investment thesis
2. **Disclaimer**: "以上分析仅供参考，不构成投资建议。投资有风险，入市需谨慎。"

## Language

Default to the user's language. If user writes in Chinese, output in Chinese.

## Additional Resources

- For the scoring methodology details, see [scoring-guide.md](scoring-guide.md)
