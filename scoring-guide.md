# Stock Analysis Scoring Guide

Detailed rubric for the 8 scoring dimensions.

## 1. Financial Health (Weight: 20%)

| Score | Criteria |
|-------|----------|
| 9-10 | Net cash position, D/E < 0.3, strong current ratio (>3) |
| 7-8 | Manageable debt, D/E < 1.0, current ratio > 2 |
| 5-6 | Moderate leverage, D/E 1-2, adequate liquidity |
| 3-4 | High leverage, D/E 2-4, tight liquidity |
| 1-2 | Distressed, D/E > 4, bankruptcy risk, cash burn exceeds reserves |

## 2. Profitability (Weight: 15%)

| Score | Criteria |
|-------|----------|
| 9-10 | Net margin > 20%, expanding margins, strong FCF generation |
| 7-8 | Net margin 10-20%, stable margins, positive FCF |
| 5-6 | Net margin 0-10%, or recently turned profitable |
| 3-4 | Negative margins but improving, path to profitability visible |
| 1-2 | Deep losses, margins worsening, no clear path to profitability |

## 3. Growth Potential (Weight: 15%)

| Score | Criteria |
|-------|----------|
| 9-10 | Revenue growing > 30% YoY, massive TAM, accelerating growth |
| 7-8 | Revenue growing 15-30%, large TAM, multiple growth vectors |
| 5-6 | Revenue growing 5-15%, moderate TAM |
| 3-4 | Revenue flat or slightly declining, limited growth catalysts |
| 1-2 | Revenue declining > 10%, shrinking market, loss of market share |

## 4. Competitive Moat (Weight: 15%)

| Score | Criteria |
|-------|----------|
| 9-10 | Dominant market position, strong IP/patents, high switching costs, network effects |
| 7-8 | Clear technology or brand leadership, meaningful barriers to entry |
| 5-6 | Some differentiation but intensifying competition |
| 3-4 | Commoditized product, low barriers, losing share |
| 1-2 | No meaningful moat, intense price competition, easily replaced |

## 5. Technical Setup (Weight: 10%)

| Score | Criteria |
|-------|----------|
| 9-10 | Price above all key MAs, golden cross, RSI 50-65, strong volume |
| 7-8 | Price above 200 SMA, constructive base pattern, bullish MACD |
| 5-6 | Mixed signals, price between key MAs, neutral RSI |
| 3-4 | Price below 200 SMA, bearish MACD, declining volume |
| 1-2 | Death cross, RSI < 30 (or false oversold), breakdown below support |

## 6. Valuation (Weight: 10%)

| Score | Criteria |
|-------|----------|
| 9-10 | Significantly undervalued on multiple metrics (P/E, P/B, P/S, DCF) vs peers |
| 7-8 | Moderately undervalued vs peers and historical averages |
| 5-6 | Fairly valued, in line with peers |
| 3-4 | Moderately overvalued, or "value trap" (cheap for a reason) |
| 1-2 | Significantly overvalued, or unable to value (negative earnings, no revenue) |

## 7. Industry Outlook (Weight: 10%)

| Score | Criteria |
|-------|----------|
| 9-10 | Secular growth megatrend (AI, EV), strong tailwinds, large expanding TAM |
| 7-8 | Growing industry, favorable demand trends |
| 5-6 | Stable/mature industry, modest growth |
| 3-4 | Cyclical downturn or structural headwinds |
| 1-2 | Declining industry, regulatory threats, disruption risk |

## 8. Risk Management (Weight: 5%)

| Score | Criteria |
|-------|----------|
| 9-10 | Low Beta (<1), diversified revenue, strong governance, no dilution risk |
| 7-8 | Moderate Beta (1-1.5), manageable concentration, clean governance |
| 5-6 | Elevated Beta (1.5-2), some concentration risk |
| 3-4 | High Beta (2-3), significant dilution or insider selling, governance concerns |
| 1-2 | Extreme Beta (>3), active dilution, bankruptcy history, fraud/governance red flags |

## Position Sizing Guidelines

Based on composite score:

| Score | Max Position Size (% of portfolio) |
|-------|-------------------------------------|
| 8-10 | Up to 8-10% (high conviction) |
| 6-8 | Up to 5-7% (moderate conviction) |
| 4-6 | Up to 2-4% (speculative / satellite) |
| 2-4 | Up to 1-2% (small bet only) |
| 0-2 | 0% (avoid) |

## Risk-Adjusted Return Framework

When computing probability-weighted target price:

```
Expected Return = Σ (Probability_i × Target_i) / Current Price - 1
```

Compare Expected Return vs Risk-Free Rate (10Y Treasury yield). If Expected
Return < Risk-Free Rate, the risk-reward is unfavorable.

## Stop-Loss Guidelines

| Stock Type | Suggested Stop-Loss |
|-----------|-------------------|
| Large cap, low beta | -8% to -12% |
| Mid cap, moderate beta | -12% to -18% |
| Small cap, high beta | -18% to -25% |
| Speculative / turnaround | -25% to -35% |
