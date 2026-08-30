# AI MARKET INTELLIGENCE — CLAUDE CODE DEVELOPMENT PROMPTS

## Purpose

This file contains the step-by-step prompts to give Claude Code while building the AI Market Intelligence application.

**Important:** Run these prompts one at a time. Do not give Claude the entire file at once.

After each step, review Claude's output and verify tests before moving to the next step.

---

# STEP 1 — Architecture Understanding

```text
You are the lead architect and senior engineering manager for this project.

We are building AI Market Intelligence, a desktop research and decision-support application for Indian financial markets.

The application will cover:

- NSE equities
- BSE equities
- NIFTY and other indices
- Futures
- Options
- MCX commodities
- Institutional investor activity
- FII/DII activity
- Mutual fund activity
- Big investor activity
- Technical analysis
- Fundamental analysis
- Options analysis
- Global markets
- Macroeconomic conditions
- Geopolitical events
- News and sentiment
- Market regime
- Quantitative scoring
- Risk analysis
- Backtesting
- Portfolio analysis
- AI/LLM-assisted research
- Buy/Sell/Hold/No-Trade decision support
- Alerts
- Automatic background analysis when internet connectivity is available

IMPORTANT:

I have already created the project's specification documents.

Before writing ANY application code, read ALL of these files:

MASTER_SPEC.md
PRODUCT_REQUIREMENTS.md
QUANT_MODEL.md
DATABASE_SPEC.md
DATA_SOURCES.md
SYSTEM_ARCHITECTURE.md
SIGNAL_ENGINE.md
BACKTESTING_SPEC.md
RISK_ENGINE.md
RECOMMENDATION_ENGINE.md
PORTFOLIO_ENGINE.md
MODEL_VALIDATION.md
ALERT_ENGINE.md
UI_UX_SPEC.md
MARKET_DATA_PIPELINE.md
AI_LLM_SPEC.md
API_CONTRACTS.md

Do not start coding yet.

Do not modify any files.

Do not install packages.

Do not make assumptions where the specification is unclear.

Your first task is to understand the complete system and produce:

1. A summary of the architecture.
2. The dependency relationship between all modules.
3. The recommended technology stack.
4. The recommended implementation order.
5. The minimum viable product (MVP).
6. The production architecture.
7. Potential conflicts or contradictions between the specification documents.
8. Missing requirements that must be resolved before implementation.
9. Risks in the proposed architecture.
10. A phased development roadmap.

At the end, give me a section titled:

"RECOMMENDED FIRST DEVELOPMENT TASK"

with the exact first task you recommend implementing.
```

---

# STEP 2 — Architecture Consistency Review

```text
Good.

Do not start implementation yet.

Now perform an architecture consistency review.

Compare every specification document against MASTER_SPEC.md and identify:

1. Contradictory requirements
2. Duplicate responsibilities
3. Missing interfaces
4. Missing database entities
5. Missing API contracts
6. Missing data sources
7. Incorrect dependencies
8. Potential circular dependencies
9. Scalability problems
10. Security problems
11. Data-quality problems
12. Problems with real-time market data
13. Problems with historical data
14. Problems with options data
15. Problems with commodity data
16. Problems with FII/DII and institutional data
17. Problems with AI/LLM integration
18. Problems with backtesting
19. Problems with preventing look-ahead bias
20. Problems that could produce misleading Buy/Sell signals

Do not modify the documents yet.

Give me a prioritized list:

CRITICAL
HIGH
MEDIUM
LOW

For each issue explain:

- Current specification
- Problem
- Recommended solution
- Which document needs modification
```

---

# STEP 3 — Fix the Specifications

```text
Now update the specification documents to resolve the CRITICAL and HIGH priority issues you identified.

Rules:

1. Do not remove important functionality.
2. Preserve the overall architecture.
3. Maintain compatibility between documents.
4. Update dependent specifications when required.
5. Keep API_CONTRACTS.md synchronized.
6. Keep DATABASE_SPEC.md synchronized.
7. Keep MASTER_SPEC.md synchronized.
8. Add version numbers to changed specifications.
9. Add a short CHANGELOG section to each modified document.
10. Do not write application source code.

After making the changes, perform another consistency check.

Report exactly which files were modified and why.
```

---

# STEP 4 — Create Project Skeleton

```text
The architecture and specifications are now approved.

Create the initial project skeleton.

IMPORTANT:

Do not implement business logic yet.

First create the directory structure, configuration structure, development environment and foundational modules.

Follow:

MASTER_SPEC.md
SYSTEM_ARCHITECTURE.md
DATABASE_SPEC.md
API_CONTRACTS.md

The architecture should clearly separate:

- Backend/API
- Database
- Market data
- Feature engineering
- Quant engine
- Signal engine
- Risk engine
- Recommendation engine
- Portfolio engine
- News
- Macro
- Geopolitical analysis
- Institutional investor analysis
- AI/LLM
- Alerts
- Backtesting
- Model validation
- Desktop UI
- Tests
- Configuration
- Logging

Use clean architecture and dependency inversion where appropriate.

Do not implement trading execution.

Do not connect to a broker for placing orders.

Do not invent data sources.

Do not hard-code API keys.

Create:

- README.md
- .gitignore
- .env.example
- project configuration
- backend structure
- frontend/desktop structure
- test structure
- database migration structure
- logging structure
- configuration management

After creating the skeleton:

1. Show me the complete directory tree.
2. Explain the responsibility of every major directory.
3. Verify that the structure matches SYSTEM_ARCHITECTURE.md.
4. Run the basic tests/build/lint checks.
5. Fix any structural problems.

Do not proceed to implementing the market-data pipeline yet.
```

---

# STEP 5 — Database Foundation

```text
Now implement the database foundation.

Read:

DATABASE_SPEC.md
API_CONTRACTS.md
SYSTEM_ARCHITECTURE.md

Implement only the database layer.

Requirements:

1. Create the database schema.
2. Create migrations.
3. Create models/entities.
4. Create repositories.
5. Add indexes defined in DATABASE_SPEC.md.
6. Add appropriate foreign keys.
7. Add timestamps.
8. Add source tracking.
9. Add data-quality fields.
10. Add model-version tracking where specified.
11. Add audit fields where specified.

Do not implement:

- trading logic
- Buy/Sell signals
- AI analysis
- recommendation logic
- broker integration

After implementation:

1. Run migrations on a clean database.
2. Verify all tables.
3. Verify relationships.
4. Run database tests.
5. Report any mismatch with DATABASE_SPEC.md.

Stop after the database foundation is complete.
```

---

# STEP 6 — Market Data Pipeline

```text
Now implement the Market Data Pipeline.

Read:

MARKET_DATA_PIPELINE.md
DATA_SOURCES.md
DATABASE_SPEC.md
API_CONTRACTS.md
SYSTEM_ARCHITECTURE.md

Implement the data ingestion architecture.

Requirements:

- Provider abstraction
- Data normalization
- Data validation
- Data freshness tracking
- Source tracking
- Retry mechanism
- Rate limiting
- Error handling
- Logging
- Caching
- Database persistence
- Duplicate detection
- Data-quality scoring
- Offline handling
- Internet recovery
- Provider failure handling

Do NOT invent API credentials.

Use environment variables for provider configuration.

Where an external provider is not yet configured, create a clean provider interface/mock adapter rather than pretending live data exists.

Implement automated tests.

Do not implement the Quant Model yet.

Stop when the Market Data Pipeline is stable and tested.
```

---

# STEP 7 — Quant Model

```text
Now implement the Quant Model.

Read:

QUANT_MODEL.md
DATABASE_SPEC.md
API_CONTRACTS.md
SIGNAL_ENGINE.md
MODEL_VALIDATION.md
BACKTESTING_SPEC.md

Implement the quantitative feature and scoring system exactly according to the specifications.

Requirements:

- Deterministic calculations
- Versioned models
- Feature calculation
- Technical indicators
- Factor scoring
- Data-quality checks
- Missing-data handling
- No look-ahead bias
- No future information leakage
- Reproducible results
- Unit tests
- Boundary-condition tests

Every output must include:

- timestamp
- instrument
- model version
- score
- direction
- factor scores
- data quality

Do not use an LLM to calculate quantitative indicators.

Do not generate Buy/Sell recommendations yet.

Stop after the Quant Model passes tests.
```

---

# STEP 8 — Signal Engine

```text
Implement SIGNAL_ENGINE.md.

The Signal Engine must consume the Quant Model and approved market features.

It must:

- Evaluate trend
- Evaluate momentum
- Evaluate volume
- Evaluate relative strength
- Evaluate relevant market context
- Detect signal confirmation
- Detect conflicting signals
- Generate signal strength
- Generate invalidation conditions
- Track model version

It must NOT:

- place trades
- bypass Risk Engine
- use undocumented data
- allow the LLM to alter scores

Implement tests for:

- bullish conditions
- bearish conditions
- neutral conditions
- conflicting signals
- insufficient data
- stale data

Stop after tests pass.
```

---

# STEP 9 — Risk Engine

```text
Implement RISK_ENGINE.md.

The Risk Engine is an authoritative safety layer.

It must evaluate:

- volatility
- stop-loss distance
- risk/reward
- position sizing
- portfolio exposure
- concentration
- market regime
- liquidity where data is available
- options-specific risk
- commodity-specific risk
- stale/low-quality data
- abnormal market conditions

The Risk Engine must be able to reject a signal.

IMPORTANT:

No AI component can override a Risk Engine rejection.

Implement:

- deterministic risk calculations
- risk score
- risk classification
- maximum position size
- rejection reasons
- warnings
- tests

Stop after the Risk Engine passes all tests.
```

---

# STEP 10 — Recommendation Engine

```text
Implement RECOMMENDATION_ENGINE.md.

The Recommendation Engine must combine:

- Quant Model
- Signal Engine
- Risk Engine
- Market Regime
- Institutional data
- Macro context
- Global market context
- News
- Geopolitical context
- Options context where applicable

Generate:

STRONG_BUY
BUY
HOLD
SELL
STRONG_SELL
NO_TRADE

Every recommendation must include:

- score
- confidence
- entry
- target
- stop loss
- risk/reward
- time horizon
- supporting factors
- contradicting factors
- invalidation conditions
- data quality
- model versions

IMPORTANT:

A recommendation must never be generated when required critical data is unavailable or stale.

Implement complete unit and integration tests.

Do not connect to a broker.
```

---

# STEP 11 — Institutional / Big Investor Intelligence

```text
Now implement the Institutional Investor Intelligence component.

The purpose is to identify where significant investors and institutions are allocating capital.

Read:

QUANT_MODEL.md
SIGNAL_ENGINE.md
RECOMMENDATION_ENGINE.md
DATA_SOURCES.md
DATABASE_SPEC.md

Track where available:

- FII activity
- DII activity
- Mutual funds
- Insurance companies
- Institutional ownership changes
- Significant shareholder changes
- Bulk deals
- Block deals
- Promoter activity
- Large investor accumulation/distribution
- Sector-level institutional flows

Create:

1. Institutional Activity Score
2. Investor Accumulation Score
3. Investor Distribution Score
4. Sector Institutional Flow Score
5. Big Investor Trend
6. Institutional Confidence

Do not treat one investor transaction as automatically bullish or bearish.

Consider:

- transaction size
- historical ownership
- repeated accumulation/distribution
- sector allocation
- company fundamentals
- price reaction
- time period

Integrate the resulting scores into the Quant/Signal/Recommendation pipeline according to the specifications.

Implement tests and source tracking.
```

---

# STEP 12 — News, Macro, Global and Geopolitical Context

```text
Now implement the external-context intelligence layer.

Implement:

1. News Engine
2. Macro Engine
3. Global Market Engine
4. Geopolitical Event Engine
5. Commodity Context Engine
6. Currency Context Engine
7. Bond Yield Context Engine

Each engine must:

- track source
- track publication time
- track retrieval time
- assess freshness
- detect duplicates
- classify relevance
- calculate impact
- expose structured data to the Recommendation Engine

Do not let an LLM directly modify quantitative scores.

AI may interpret structured information, but deterministic scoring must remain in the appropriate engine.

Add tests for provider failure, stale data and duplicate events.
```

---

# STEP 13 — Options Intelligence Engine

```text
Now implement the Options Intelligence Engine.

Read:

QUANT_MODEL.md
SIGNAL_ENGINE.md
RISK_ENGINE.md
RECOMMENDATION_ENGINE.md
DATABASE_SPEC.md
API_CONTRACTS.md

Implement:

- option chain ingestion
- strike analysis
- expiry analysis
- Open Interest
- Change in Open Interest
- volume
- implied volatility
- Put/Call Ratio
- support/resistance inference
- IV regime
- options market structure
- unusual activity detection
- expiry-specific analysis

Support:

NIFTY
BANK NIFTY
relevant index derivatives
liquid stock derivatives

Do not assume that high OI automatically means support/resistance.

Include context and confirmation.

Add comprehensive tests.

Do not implement automatic options trading.
```

---

# STEP 14 — Backtesting

```text
Now implement BACKTESTING_SPEC.md.

The backtesting system must prevent:

- look-ahead bias
- survivorship bias where applicable
- future data leakage
- unrealistic fills
- unrealistic transaction costs
- incorrect corporate-action handling
- incorrect option expiry handling

Include:

- historical simulation
- transaction costs
- slippage
- brokerage/charges abstraction
- position sizing
- stop loss
- target
- drawdown
- CAGR
- Sharpe
- Sortino
- win rate
- profit factor
- expectancy
- number of trades

Every backtest must record:

- strategy version
- model version
- data version
- date range
- assumptions

Create tests specifically designed to detect look-ahead bias.

Do not optimize parameters blindly.
```

---

# STEP 15 — Model Validation

```text
Implement MODEL_VALIDATION.md.

Implement:

- train/test separation where applicable
- walk-forward validation
- out-of-sample testing
- robustness testing
- parameter sensitivity
- regime testing
- performance degradation monitoring

A strategy must not be promoted to production merely because it performs well in one historical period.

Implement model lifecycle:

EXPERIMENTAL
BACKTESTED
VALIDATED
PAPER_TRADING
PRODUCTION
RETIRED

Add automated validation tests.
```

---

# STEP 16 — AI / LLM Integration

```text
Now implement AI_LLM_SPEC.md.

The LLM is an analysis and explanation layer.

It is NOT the source of truth for:

- prices
- indicators
- financial statements
- FII/DII numbers
- options OI
- portfolio values
- risk calculations

Build a structured AI context packet containing verified data from the system.

The AI should:

- explain the market
- explain the recommendation
- identify supporting evidence
- identify contradictions
- identify risks
- identify catalysts
- generate scenarios
- explain uncertainty
- summarize news
- connect macro/geopolitical events to markets

The AI must never:

- invent market data
- invent sources
- change quantitative scores
- override Risk Engine
- place trades
- claim certainty
- present predictions as guaranteed returns

Validate all structured AI output against schemas.

Reject malformed AI responses.

Record:

- model
- prompt version
- timestamp
- context ID
- input hash
- output hash
```

---

# STEP 17 — Desktop UI

```text
Now implement the desktop application UI according to UI_UX_SPEC.md.

The main dashboard should provide:

MARKET OVERVIEW

- NIFTY
- BANK NIFTY
- Sensex
- India VIX
- market breadth
- sector performance

INSTITUTIONAL

- FII
- DII
- mutual funds
- big investor activity

GLOBAL

- US markets
- Asian markets
- European markets
- USDINR
- crude
- gold
- bond yields

OPPORTUNITIES

- Strong Buy
- Buy
- Hold
- Sell
- No Trade

For each opportunity show:

- current price
- entry
- target
- stop loss
- risk/reward
- score
- confidence
- reasons
- risks
- invalidation

Also implement:

- watchlist
- stock detail
- options analysis
- commodity analysis
- portfolio
- alerts
- reports
- AI research/chat
- system/data health

The UI must never calculate financial decisions itself.

It should consume backend APIs.
```

---

# STEP 18 — Automatic Internet / Background Intelligence

```text
Now implement the automatic background intelligence workflow.

The application should continuously monitor internet connectivity.

When internet becomes available:

1. Detect connectivity.
2. Synchronize required market data.
3. Synchronize news.
4. Synchronize institutional data.
5. Synchronize macro/global data.
6. Synchronize geopolitical events.
7. Validate freshness and quality.
8. Detect material changes.
9. Recalculate affected features.
10. Recalculate quantitative models.
11. Recalculate signals.
12. Run Risk Engine.
13. Generate/update recommendations.
14. Generate AI explanations where appropriate.
15. Generate alerts.
16. Update the desktop dashboard.

Do not repeatedly run expensive AI analysis when nothing material has changed.

Implement:

- scheduling
- event-driven updates
- caching
- deduplication
- retry
- backoff
- rate limiting
- offline mode
- internet recovery
- job status
- logging

The system must remain usable when offline.

Never present cached data as live data.
```

---

# STEP 19 — Paper Trading

```text
Implement PAPER_TRADING mode.

Important:

No real broker order execution.

When the Recommendation Engine generates a signal, simulate:

- entry
- stop loss
- target
- position size
- transaction costs
- slippage
- profit/loss

Track the results exactly as if the recommendation had been followed.

Create a performance dashboard.

Track:

- total signals
- winning signals
- losing signals
- win rate
- average return
- average loss
- maximum drawdown
- profit factor
- expectancy
- performance by market regime
- performance by sector
- performance by asset type
- performance by recommendation score

The purpose is to validate whether the research system actually produces useful signals before considering real trading integration.
```

---

# STEP 20 — Final System Audit

```text
Perform a complete system audit.

Read ALL specification files again.

Verify:

1. Architecture
2. Database
3. API contracts
4. Market data
5. Quant model
6. Signal engine
7. Risk engine
8. Recommendation engine
9. Institutional intelligence
10. Options engine
11. Commodity engine
12. News
13. Macro
14. Global markets
15. Geopolitical analysis
16. AI/LLM
17. Backtesting
18. Model validation
19. Paper trading
20. Alerts
21. Desktop UI
22. Offline mode
23. Internet recovery
24. Security
25. Logging
26. Testing
27. Performance

Run the complete automated test suite.

Identify:

CRITICAL
HIGH
MEDIUM
LOW

issues.

Do not hide failures.

Do not claim the system is production-ready unless the evidence supports that conclusion.

Generate:

FINAL_SYSTEM_AUDIT.md
```

---

# DEVELOPMENT RULES FOR CLAUDE CODE

These rules apply to every step.

1. Read the relevant specification files before coding.
2. Never silently change a specification.
3. Never invent market-data providers or API credentials.
4. Never hard-code secrets.
5. Never allow the LLM to override deterministic risk controls.
6. Never allow the LLM to place real trades.
7. Never treat cached/stale data as live.
8. Never use future information in historical calculations.
9. Never introduce look-ahead bias.
10. Write tests with every major implementation.
11. Keep API contracts synchronized.
12. Keep database specifications synchronized.
13. Track model and schema versions.
14. Preserve auditability and source traceability.
15. Prefer small, testable modules over large monolithic files.
16. If a requirement is ambiguous, stop and report it rather than guessing.
17. Before moving to the next development step, run the relevant test suite.
18. Never claim a strategy is profitable without backtesting and out-of-sample/paper-trading evidence.
19. Treat the application as a research and decision-support system, not a guaranteed-profit system.
20. Do not implement autonomous real-money trading in Version 1.

---

# RECOMMENDED DEVELOPMENT ORDER

```text
01  Architecture Review
02  Specification Correction
03  Project Skeleton
04  Database
05  Market Data Pipeline
06  Quant Model
07  Signal Engine
08  Risk Engine
09  Recommendation Engine
10  Institutional / Big Investor Intelligence
11  News / Macro / Global / Geopolitical
12  Options Engine
13  Backtesting
14  Model Validation
15  AI / LLM
16  Desktop UI
17  Automatic Background Intelligence
18  Paper Trading
19  Final Audit
```

---

# IMPORTANT WORKFLOW

After each prompt:

```text
CLAUDE CODE
    ↓
IMPLEMENT
    ↓
RUN TESTS
    ↓
REVIEW OUTPUT
    ↓
FIX ISSUES
    ↓
COMMIT TO GIT
    ↓
NEXT STEP
```

Do not skip directly from architecture to a complete application.

The goal is to build a system that can be measured, audited and improved continuously.
