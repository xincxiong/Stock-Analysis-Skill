import { definePluginEntry } from "openclaw/plugin-sdk/plugin-entry";
import { Type } from "@sinclair/typebox";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadPrompt(name: string): string {
  return readFileSync(resolve(__dirname, "prompts", name), "utf-8");
}

export default definePluginEntry({
  id: "stock-analysis",
  name: "Stock Analysis",
  description:
    "Comprehensive stock analysis: fundamentals, technicals, analyst ratings, scoring, and investment advice",

  register(api) {
    const config = api.pluginConfig as {
      language?: string;
      searchCount?: number;
    };
    const searchCount = config.searchCount ?? 8;
    const language = config.language ?? "auto";

    // ── Tool 1: stock_analyze ──────────────────────────────────────────
    api.registerTool({
      name: "stock_analyze",
      description: [
        "Run a comprehensive multi-phase stock analysis.",
        "Covers: company overview, fundamental analysis (balance sheet, profitability, growth),",
        "technical analysis (MA, RSI, MACD, support/resistance), analyst ratings & sentiment,",
        "risk assessment, 8-dimension weighted scoring (1-10), and actionable investment advice",
        "(scenario analysis, position sizing, entry/exit strategy).",
        "Returns a structured research report.",
      ].join(" "),

      parameters: Type.Object({
        ticker: Type.String({
          description: "Stock ticker symbol, e.g. WOLF, NVDA, AAPL",
        }),
        company: Type.Optional(
          Type.String({
            description:
              "Full company name (optional, auto-resolved if omitted)",
          })
        ),
        depth: Type.Optional(
          Type.Union([
            Type.Literal("quick"),
            Type.Literal("standard"),
            Type.Literal("deep"),
          ], {
            description:
              "Analysis depth: quick (overview + score), standard (full 8-phase), deep (includes options sentiment & alternatives)",
            default: "standard",
          })
        ),
      }),

      async execute(_id, params) {
        const { ticker, company, depth = "standard" } = params;
        const companyLabel = company ?? ticker;

        const analysisPrompt = loadPrompt("analysis-workflow.md");
        const scoringGuide = loadPrompt("scoring-rubric.md");

        const searchQueries = buildSearchQueries(
          ticker,
          companyLabel,
          depth
        );

        const instructions = [
          `# Stock Analysis Request`,
          ``,
          `**Ticker:** ${ticker}`,
          `**Company:** ${companyLabel}`,
          `**Depth:** ${depth}`,
          `**Language:** ${language === "auto" ? "Match the user's language" : language}`,
          ``,
          `## Search Queries to Execute`,
          ``,
          `Run all of the following web searches in parallel, then synthesize results:`,
          ``,
          ...searchQueries.map((q, i) => `${i + 1}. \`${q}\``),
          ``,
          `## Analysis Workflow`,
          ``,
          analysisPrompt,
          ``,
          `## Scoring Rubric Reference`,
          ``,
          scoringGuide,
        ].join("\n");

        return {
          content: [{ type: "text", text: instructions }],
        };
      },
    });

    // ── Tool 2: stock_score ────────────────────────────────────────────
    api.registerTool(
      {
        name: "stock_score",
        description: [
          "Score a stock on 8 weighted dimensions (Financial Health 20%,",
          "Profitability 15%, Growth 15%, Moat 15%, Technicals 10%,",
          "Valuation 10%, Industry 10%, Risk 5%). Returns grade A-F",
          "with position sizing advice. Use after gathering stock data.",
        ].join(" "),

        parameters: Type.Object({
          ticker: Type.String({ description: "Stock ticker symbol" }),
          data: Type.Object({
            debtToEquity: Type.Optional(Type.Number()),
            currentRatio: Type.Optional(Type.Number()),
            netMargin: Type.Optional(Type.Number()),
            revenueGrowthYoY: Type.Optional(Type.Number()),
            beta: Type.Optional(Type.Number()),
            priceToBook: Type.Optional(Type.Number()),
            industryPB: Type.Optional(Type.Number()),
            rsi: Type.Optional(Type.Number()),
            priceVs200SMA: Type.Optional(
              Type.Union([
                Type.Literal("above"),
                Type.Literal("below"),
              ])
            ),
          }, {
            description: "Available financial metrics for scoring",
          }),
        }),

        async execute(_id, params) {
          const { ticker, data } = params;
          const scores = computeScores(data);
          const grade = scoreToGrade(scores.total);

          const report = [
            `# ${ticker} Scoring Report`,
            ``,
            `| Dimension | Score | Weight | Weighted |`,
            `|-----------|-------|--------|----------|`,
            ...scores.breakdown.map(
              (d) =>
                `| ${d.name} | ${d.score}/10 | ${d.weight}% | ${d.weighted.toFixed(2)} |`
            ),
            `| **Total** | | **100%** | **${scores.total.toFixed(2)}** |`,
            ``,
            `## Grade: ${grade.letter} — ${grade.verdict}`,
            ``,
            `**Recommended max position:** ${grade.maxPosition}`,
          ].join("\n");

          return { content: [{ type: "text", text: report }] };
        },
      },
      { optional: true }
    );

    api.logger.info("Stock Analysis plugin registered with 2 tools");
  },
});

// ── Helpers ──────────────────────────────────────────────────────────────

interface ScoreDimension {
  name: string;
  score: number;
  weight: number;
  weighted: number;
}

interface ScoreResult {
  breakdown: ScoreDimension[];
  total: number;
}

interface StockData {
  debtToEquity?: number;
  currentRatio?: number;
  netMargin?: number;
  revenueGrowthYoY?: number;
  beta?: number;
  priceToBook?: number;
  industryPB?: number;
  rsi?: number;
  priceVs200SMA?: "above" | "below";
}

function computeScores(data: StockData): ScoreResult {
  const dimensions: { name: string; weight: number; scoreFn: () => number }[] = [
    {
      name: "Financial Health",
      weight: 20,
      scoreFn: () => {
        const de = data.debtToEquity;
        if (de === undefined) return 5;
        if (de < 0.3) return 9;
        if (de < 1) return 7;
        if (de < 2) return 5;
        if (de < 4) return 3;
        return 1;
      },
    },
    {
      name: "Profitability",
      weight: 15,
      scoreFn: () => {
        const nm = data.netMargin;
        if (nm === undefined) return 5;
        if (nm > 20) return 9;
        if (nm > 10) return 7;
        if (nm > 0) return 5;
        if (nm > -20) return 3;
        return 1;
      },
    },
    {
      name: "Growth Potential",
      weight: 15,
      scoreFn: () => {
        const g = data.revenueGrowthYoY;
        if (g === undefined) return 5;
        if (g > 30) return 9;
        if (g > 15) return 7;
        if (g > 5) return 5;
        if (g > -5) return 3;
        return 1;
      },
    },
    { name: "Competitive Moat", weight: 15, scoreFn: () => 5 },
    {
      name: "Technical Setup",
      weight: 10,
      scoreFn: () => {
        let s = 5;
        if (data.priceVs200SMA === "above") s += 2;
        if (data.priceVs200SMA === "below") s -= 2;
        if (data.rsi !== undefined) {
          if (data.rsi >= 50 && data.rsi <= 65) s += 1;
          if (data.rsi < 30) s -= 1;
          if (data.rsi > 70) s -= 1;
        }
        return Math.max(1, Math.min(10, s));
      },
    },
    {
      name: "Valuation",
      weight: 10,
      scoreFn: () => {
        const pb = data.priceToBook;
        const ipb = data.industryPB;
        if (pb === undefined || ipb === undefined) return 5;
        const ratio = pb / ipb;
        if (ratio < 0.3) return 8;
        if (ratio < 0.6) return 7;
        if (ratio < 1) return 5;
        if (ratio < 1.5) return 3;
        return 1;
      },
    },
    { name: "Industry Outlook", weight: 10, scoreFn: () => 5 },
    {
      name: "Risk Management",
      weight: 5,
      scoreFn: () => {
        const b = data.beta;
        if (b === undefined) return 5;
        if (b < 1) return 9;
        if (b < 1.5) return 7;
        if (b < 2) return 5;
        if (b < 3) return 3;
        return 1;
      },
    },
  ];

  const breakdown = dimensions.map((d) => {
    const score = d.scoreFn();
    return {
      name: d.name,
      score,
      weight: d.weight,
      weighted: (score * d.weight) / 100,
    };
  });

  const total = breakdown.reduce((sum, d) => sum + d.weighted, 0);
  return { breakdown, total };
}

function scoreToGrade(total: number) {
  if (total >= 8) return { letter: "A", verdict: "Strong Buy", maxPosition: "8-10%" };
  if (total >= 6) return { letter: "B", verdict: "Buy", maxPosition: "5-7%" };
  if (total >= 4) return { letter: "C", verdict: "Hold / Watch", maxPosition: "2-4%" };
  if (total >= 2) return { letter: "D", verdict: "Reduce", maxPosition: "1-2%" };
  return { letter: "F", verdict: "Sell", maxPosition: "0% (avoid)" };
}

function buildSearchQueries(
  ticker: string,
  company: string,
  depth: string
): string[] {
  const year = new Date().getFullYear();
  const queries = [
    `${company} ${ticker} latest quarterly earnings revenue net income ${year}`,
    `${ticker} stock price market cap PE ratio 52 week high low`,
    `${ticker} technical analysis moving average RSI MACD support resistance`,
    `${ticker} analyst price target rating buy sell forecast ${year}`,
  ];

  if (depth !== "quick") {
    queries.push(
      `${company} industry competitors market share outlook ${year}`,
      `${company} ${ticker} latest news events ${year}`
    );
  }

  if (depth === "deep") {
    queries.push(
      `${ticker} options put call ratio implied volatility`,
      `${ticker} short interest institutional ownership insider trading`
    );
  }

  return queries;
}
