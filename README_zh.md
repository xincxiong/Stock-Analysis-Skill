<p align="right">
  <a href="README.md">English</a> | <strong>中文</strong>
</p>

# Stock Analysis — Cursor 技能 & OpenClaw 插件

一个双平台股票分析工具，执行**全面的、结构化的股票研究** —— 从数据采集到可执行的投资建议。

同时支持 **[Cursor](https://www.cursor.com/)**（Agent Skill）和 **[OpenClaw](https://docs.openclaw.ai/)**（插件 + 工作流）。

---

## 功能

当你说 *"分析一下 WOLF 股票"* 或 *"Analyze NVDA stock"*，Agent 会自动执行 **8 阶段分析**：

| 阶段 | 内容 |
|------|------|
| 1 | **数据采集** — 并行搜索财务数据、股价、技术指标、分析师评级、行业动态、新闻 |
| 2 | **公司概况** — 公司简介、行业、核心产品、近期里程碑 |
| 3 | **基本面分析** — 资产负债表、盈利能力、利润率、现金流、增长驱动力 |
| 4 | **技术面分析** — 均线系统（8/20/50/200 SMA）、RSI、MACD、MFI、支撑/阻力位 |
| 5 | **分析师评级** — 共识评级、个别分析师明细、期权市场情绪 |
| 6 | **风险评估** — 公司/行业/股票三层风险 |
| 7 | **综合评分** — 8 维度加权模型（1-10 分）→ A-F 等级 |
| 8 | **投资建议** — 场景分析、仓位管理、进出场策略、止损、替代标的 |

## 评分体系

| 维度 | 权重 | 维度 | 权重 |
|------|------|------|------|
| 财务健康 | 20% | 技术面 | 10% |
| 盈利能力 | 15% | 估值 | 10% |
| 成长性 | 15% | 行业前景 | 10% |
| 竞争护城河 | 15% | 风险管理 | 5% |

| 得分 | 等级 | 判定 | 最大仓位 |
|------|------|------|----------|
| 8-10 | A | 强力买入 | 8-10% |
| 6-8 | B | 买入 | 5-7% |
| 4-6 | C | 持有 / 观望 | 2-4% |
| 2-4 | D | 减持 | 1-2% |
| 0-2 | F | 卖出 | 0% |

---

## 安装

### Cursor（Agent Skill）

```bash
# 个人级技能（所有项目可用）
git clone https://github.com/xincxiong/cursor-skill-stock-analysis.git \
  ~/.cursor/skills/stock-analysis

# 项目级技能（通过仓库共享）
git clone https://github.com/xincxiong/cursor-skill-stock-analysis.git \
  .cursor/skills/stock-analysis
```

重启 Cursor 或新开对话即可生效，技能会在股票分析请求时自动激活。

### OpenClaw（插件）

#### 方式 A：从 npm / ClawHub 安装

```bash
openclaw plugins install openclaw-stock-analysis
```

在 `~/.openclaw/openclaw.json` 中启用：

```json5
{
  plugins: {
    entries: {
      "stock-analysis": {
        enabled: true,
        config: {
          language: "auto",   // "auto"（自动匹配）、"zh"（中文）、"en"（英文）
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

#### 方式 B：从源码安装

```bash
cd ~/.openclaw/extensions
git clone https://github.com/xincxiong/cursor-skill-stock-analysis.git stock-analysis
cd stock-analysis && npm install
```

重启 OpenClaw 网关。

#### 方式 C：工作流模式（需要 openclaw-workflow 插件）

```bash
# 先安装工作流插件
openclaw plugins install openclaw-workflow

# 复制工作流定义
cp workflows/stock-analysis.yaml ~/.openclaw/workflows/

# 运行分析
openclaw workflow run stock-analysis --var ticker=WOLF --var company=Wolfspeed
```

---

## 使用方法

### Cursor

自然对话即可触发：

- "分析一下 WOLF 股票"
- "帮我研究一下英伟达的股票"
- "AAPL 值得买入吗？"

### OpenClaw

插件注册了两个工具：

#### `stock_analyze`（主工具）

完整 8 阶段分析。参数：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `ticker` | string | 是 | 股票代码（如 `WOLF`） |
| `company` | string | 否 | 公司全称（可自动识别） |
| `depth` | enum | 否 | `quick` / `standard` / `deep`（默认 `standard`） |

分析深度：

| 深度 | 包含阶段 | 适用场景 |
|------|----------|----------|
| `quick` | 概况 + 评分 | 快速筛选 |
| `standard` | 完整 8 阶段 | 常规分析 |
| `deep` | + 期权情绪、空头数据、替代标的 | 深度研究 |

#### `stock_score`（可选工具）

已有数据时独立计算评分：

```
stock_score({ ticker: "WOLF", data: { debtToEquity: 4.49, netMargin: -89.4, beta: 3.01, priceToBook: 1.19, industryPB: 10.99 }})
```

### 工作流模式

`workflows/stock-analysis.yaml` 定义了 DAG 流水线：

```
search-financials ──┐
search-price ───────┼── fundamental-analysis ──┐
search-news ────────┘                          │
search-technicals ──┬── technical-analysis ────┼── scoring ── advice ── assemble
search-analysts ────┴── sentiment-analysis ────┤
search-industry ────┬── risk-assessment ───────┘
search-news ────────┘
```

数据采集阶段并行执行（最多 4 路并发），分析阶段在依赖完成后运行，最终评分和建议顺序执行。

---

## 文件结构

```
stock-analysis/
├── SKILL.md                          # Cursor 技能入口（自动发现）
├── scoring-guide.md                  # Cursor 评分参考
├── package.json                      # OpenClaw 插件包（npm）
├── openclaw.plugin.json              # OpenClaw 插件配置模式
├── tsconfig.json                     # TypeScript 配置
├── src/
│   ├── index.ts                      # OpenClaw 插件入口
│   └── prompts/
│       ├── analysis-workflow.md      # 分析流程模板
│       └── scoring-rubric.md         # 评分标准
├── workflows/
│   └── stock-analysis.yaml           # OpenClaw 工作流 DAG
└── README.md
```

## 语言支持

两个平台都会自动检测并匹配用户语言。中文输入 → 中文输出，英文输入 → 英文输出。

## 免责声明

本工具生成的分析仅供**学习和参考**，不构成任何投资建议。所有投资决策应根据个人财务状况和风险承受能力独立做出。投资有风险，入市需谨慎。

## 许可证

MIT
