# MASTER PROJECT PROMPT

## AI-Powered Indian Stock Market Research & Decision Intelligence Desktop Application

You are the lead software architect, quantitative researcher, financial-data engineer, AI engineer, cybersecurity engineer, and senior full-stack developer for this project.

Your task is to design and build a production-quality **desktop market research and decision-intelligence application for Indian financial markets**.

The application is NOT intended to be a simple stock screener.

It must continuously analyze Indian equity, equity derivatives/options, and commodities together with global markets, institutional activity, macroeconomic conditions, news, geopolitical events, technical indicators, fundamentals, options positioning, and other relevant factors.

The application should produce **research-driven BUY / SELL / HOLD / ACCUMULATE / REDUCE / NO-TRADE signals with confidence scores, reasoning, entry/exit levels, risk/reward, invalidation conditions, and historical performance statistics**.

The application must never claim certainty or guaranteed returns.

---

# 1. PRODUCT VISION

Build a desktop application called:

**Indian Market Intelligence Engine**

The core philosophy is:

> DATA → VALIDATION → FEATURE ENGINEERING → QUANTITATIVE ANALYSIS → MARKET REGIME → RISK ANALYSIS → SIGNAL → AI EXPLANATION → BACKTEST → FEEDBACK LOOP

Do NOT build:

> NEWS → LLM → BUY

The quantitative/rules/model layer must generate the underlying signal.

The AI/LLM layer should primarily:

* interpret information
* analyze unstructured information
* identify relationships
* explain signals
* summarize research
* identify risks
* compare conflicting evidence
* generate human-readable research reports

The system must maintain complete auditability of how every signal was produced.

---

# 2. IMPORTANT DESIGN PRINCIPLE

Do not start by implementing everything.

First create:

1. Architecture
2. Requirements
3. Database schema
4. Data-provider abstraction
5. Signal-engine architecture
6. Backtesting architecture
7. UI wireframe
8. Security model
9. Regulatory/compliance boundaries
10. Development roadmap

Then implement the system incrementally.

Do NOT make the application dependent on one market-data provider.

Create provider interfaces so providers can be replaced later.

Example:

MarketDataProvider
NewsProvider
FundamentalDataProvider
OptionsDataProvider
MacroDataProvider
InstitutionalDataProvider

The system must support mock/demo providers for development and testing.

---

# 3. DESKTOP APPLICATION

Build a proper desktop application.

Preferred architecture:

* Frontend: React + TypeScript
* Desktop shell: Electron or Tauri
* Backend/API: Python + FastAPI
* Quantitative engine: Python
* Database: PostgreSQL
* Time-series storage: TimescaleDB where appropriate
* Cache: Redis
* Background jobs: Celery/RQ/APScheduler or equivalent
* Charts: TradingView Lightweight Charts or another high-quality charting library
* AI integration: provider abstraction supporting multiple LLMs
* Packaging: Windows installer first

Design the architecture so macOS/Linux can be supported later.

The application must NOT require internet for basic startup.

---

# 4. INTERNET-CONNECTIVITY MODEL

The application must continuously monitor internet connectivity.

When internet is unavailable:

* show OFFLINE status
* continue using cached data
* show exact last-update timestamps
* do not pretend data is live
* disable signals that require unavailable data
* queue required synchronization jobs

When internet becomes available:

1. Detect connectivity
2. Authenticate data providers
3. Synchronize market data
4. Synchronize news
5. Synchronize institutional data
6. Synchronize macro/global data
7. Validate timestamps
8. Detect missing data
9. Run feature calculations
10. Determine market regime
11. Run signal engines
12. Run risk engine
13. Update watchlists
14. Run alerts
15. Store complete analysis snapshot
16. Generate AI explanation
17. Update prediction-performance database
18. Notify user

The system must never silently use stale data.

Every data point must have:

* source
* timestamp
* received timestamp
* market timestamp
* freshness status
* provider
* quality status

---

# 5. MARKET COVERAGE

The system must eventually support:

## Indian Equity

* NSE
* BSE
* NIFTY 50
* NIFTY Next 50
* NIFTY Midcap
* NIFTY Smallcap
* sector indices
* individual equities

## Equity Derivatives

* NIFTY
* BANKNIFTY
* FINNIFTY
* MIDCPNIFTY
* stock futures
* stock options
* index options

## Commodities

Initially:

* Gold
* Gold Mini
* Silver
* Silver Mini
* Crude Oil
* Crude Oil Mini
* Natural Gas
* Natural Gas Mini

Architect the system so additional MCX instruments can be added easily.

---

# 6. GLOBAL MARKET ENGINE

Monitor relevant global markets.

At minimum:

## USA

* S&P 500
* Nasdaq
* Dow Jones
* VIX
* US 10Y yield
* USD Index
* Fed decisions
* CPI
* employment data
* GDP
* major economic releases

## Asia

* Nikkei
* Hang Seng
* Shanghai Composite
* Shenzhen
* KOSPI
* Taiwan markets

## Europe

* FTSE
* DAX
* CAC

Also monitor:

* Brent
* WTI
* gold
* copper
* natural gas
* dollar index
* US Treasury yields

Create a:

**GLOBAL RISK SCORE: 0–100**

and:

**GLOBAL MARKET BIAS**

Possible values:

* Strong Bullish
* Bullish
* Neutral
* Bearish
* Strong Bearish
* Risk-Off
* Risk-On

---

# 7. MARKET REGIME ENGINE

Before generating stock signals, determine the current market regime.

Possible regimes:

* Strong Bull
* Bull
* Weak Bull
* Sideways
* Weak Bear
* Bear
* Strong Bear
* High Volatility
* Panic/Risk-Off
* Event Driven

Use:

* index trend
* breadth
* volatility
* FII positioning
* global markets
* sector rotation
* credit/liquidity conditions
* options positioning
* macro environment
* news/geopolitical risk

The regime must influence signal weights.

For example:

Momentum strategies should receive higher weight during strong trending markets.

Mean-reversion strategies may receive higher weight during range-bound markets.

Aggressive long option buying should be penalized during unfavorable volatility regimes.

---

# 8. TECHNICAL ANALYSIS ENGINE

Build a comprehensive technical engine.

Indicators:

* SMA
* EMA
* WMA
* VWAP
* RSI
* MACD
* ADX
* ATR
* Bollinger Bands
* Stochastic
* CCI
* MFI
* OBV
* Supertrend
* Ichimoku where useful

Price structure:

* higher highs
* higher lows
* lower highs
* lower lows
* breakouts
* breakdowns
* consolidation
* gap analysis
* support
* resistance
* trendlines
* 52-week high/low
* all-time high/low where relevant

Volume:

* volume expansion
* relative volume
* delivery percentage where available
* volume-price divergence
* accumulation/distribution

Create:

**TECHNICAL SCORE: 0–100**

---

# 9. FUNDAMENTAL ANALYSIS ENGINE

Analyze companies using:

## Growth

* revenue growth
* EBITDA growth
* PAT growth
* EPS growth
* CAGR

## Profitability

* ROE
* ROCE
* operating margin
* net margin

## Balance Sheet

* debt/equity
* interest coverage
* cash
* free cash flow
* working capital

## Valuation

* P/E
* forward P/E where available
* PEG
* P/B
* EV/EBITDA
* EV/Sales
* dividend yield

## Quality

* promoter holding
* promoter pledge
* institutional ownership
* auditor concerns
* related-party transactions
* governance signals
* cash-flow quality

## Earnings

Compare:

* current quarter
* previous quarter
* same quarter previous year
* estimates where legally/licensed data is available

Generate:

**FUNDAMENTAL SCORE: 0–100**

---

# 10. FII / DII ENGINE

Track:

* FII/FPI cash activity
* DII cash activity
* index futures positioning
* stock futures positioning
* options positioning where available
* sector-level institutional flows
* institutional ownership changes

Do not merely display FII/DII numbers.

Interpret them.

Example:

FII selling + index futures short buildup + rising VIX

should produce a stronger bearish risk score than FII selling alone.

Create:

**INSTITUTIONAL FLOW SCORE: 0–100**

---

# 11. SMART MONEY / BIG INVESTOR ENGINE

This is a core feature.

Track institutional and major-investor activity wherever reliable public/licensed data is available.

Categories:

* Mutual funds
* Insurance companies
* FPIs/FIIs
* AIFs
* large institutional investors
* promoters
* major disclosed investors
* bulk deals
* block deals
* institutional ownership changes
* significant holding changes
* new institutional entries
* institutional exits

Track:

* NEW ENTRY
* ACCUMULATION
* HOLDING
* PARTIAL EXIT
* MAJOR EXIT
* COMPLETE EXIT

The system must distinguish between:

"Investor bought"

and:

"Investor increased strategic exposure."

Do NOT assume that copying a famous investor is automatically bullish.

Possible reasons for buying/selling must be considered:

* portfolio rebalancing
* profit taking
* fund flows
* hedging
* strategic investment
* corporate transaction
* index changes
* short-term trade
* long-term investment

Create:

**SMART MONEY SCORE: 0–100**

Also calculate:

**SMART MONEY SECTOR ROTATION**

Example:

Defence ↑↑
Financials ↑
IT ↓
Consumer ↓

Create a dedicated screen:

# FOLLOW THE MONEY

Show:

* biggest accumulation
* biggest institutional entries
* biggest exits
* sector rotation
* unusual block/bulk deals
* institutional ownership changes

---

# 12. OPTIONS INTELLIGENCE ENGINE

Build a complete options analytics system.

For each expiry and strike:

* Call OI
* Put OI
* change in OI
* volume
* IV
* LTP
* bid/ask
* PCR
* max pain
* underlying price
* expiry
* Greeks

Greeks:

* Delta
* Gamma
* Theta
* Vega

Detect:

* long buildup
* short buildup
* short covering
* long unwinding
* call writing
* put writing
* call unwinding
* put unwinding
* unusual OI
* unusual volume
* IV expansion
* IV contraction

Generate:

**OPTIONS SENTIMENT SCORE: 0–100**

Do not automatically recommend naked option buying.

Evaluate risk/reward.

Possible strategies:

* Long Call
* Long Put
* Bull Call Spread
* Bear Put Spread
* Bull Put Spread
* Bear Call Spread
* Iron Condor
* Calendar Spread
* Covered Call
* Protective Put

Only recommend strategies when the strategy's risk profile matches the detected market regime.

---

# 13. COMMODITY ENGINE

Build separate models for commodities.

## Gold

Monitor:

* USD
* US yields
* Fed
* inflation
* central-bank buying
* geopolitical risk
* risk-off conditions

## Crude

Monitor:

* Brent
* WTI
* OPEC/OPEC+
* inventories
* Middle East
* supply disruptions
* shipping disruptions
* China demand
* USD

## Natural Gas

Monitor:

* weather
* storage
* production
* LNG
* demand
* US data

Create:

**COMMODITY FUNDAMENTAL SCORE**

and:

**COMMODITY TECHNICAL SCORE**

---

# 14. NEWS INTELLIGENCE ENGINE

Build a multi-source news aggregation layer.

Never trust a single news source.

For every article store:

* headline
* source
* publication time
* URL
* author if available
* entities
* sectors
* instruments
* sentiment
* importance
* reliability score

Classify:

* corporate
* macroeconomic
* geopolitical
* regulatory
* commodity
* earnings
* M&A
* management
* legal
* policy
* market structure

Create:

**NEWS SENTIMENT SCORE: -100 to +100**

and:

**NEWS IMPORTANCE: 0–100**

The AI must distinguish:

* confirmed event
* reported event
* rumor
* opinion
* speculation

Do not generate trading signals from unverified rumors.

---

# 15. GEOPOLITICAL INTELLIGENCE ENGINE

Track events such as:

* wars
* military escalation
* sanctions
* tariffs
* elections
* trade restrictions
* shipping disruptions
* energy supply disruptions
* diplomatic crises
* central-bank policy
* major government policy changes

Map events to affected assets.

Example:

Middle East escalation

→ crude oil risk ↑
→ shipping risk ↑
→ inflation risk ↑
→ aviation risk ↑
→ paint/chemical input risk ↑
→ gold safe-haven demand ↑

Create:

**GEOPOLITICAL RISK SCORE: 0–100**

and affected-sector mapping.

---

# 16. MACROECONOMIC ENGINE

Monitor:

* RBI
* Fed
* ECB
* inflation
* GDP
* PMI
* unemployment
* interest rates
* bond yields
* currency
* liquidity
* government borrowing
* fiscal policy
* monetary policy

Create:

**MACRO SCORE: 0–100**

---

# 17. SECTOR ROTATION ENGINE

Track sectors:

* Banking
* Financial Services
* IT
* Pharma
* Auto
* FMCG
* Energy
* Metals
* Realty
* Infrastructure
* Defence
* Telecom
* Chemicals
* PSU
* Consumer
* Capital Goods

Calculate:

* relative strength
* momentum
* institutional flow
* earnings momentum
* valuation
* news
* global sensitivity

Generate:

**SECTOR LEADERS**
**SECTOR LAGGARDS**
**SECTOR ROTATION**

---

# 18. STOCK DECISION ENGINE

Create a unified scoring engine.

Initial scoring model:

Technical                 15%
Fundamental               15%
Momentum                  10%
Institutional Flow        10%
Smart Money               10%
Sector Strength             8%
Options                    8%
News/Sentiment              7%
Global Market               5%
Macro                       5%
Geopolitical                4%
Valuation                   3%

Total = 100%

However:

DO NOT permanently hard-code these weights.

Create a configurable weighting system.

The backtesting engine must later determine whether different market regimes require different weights.

For example:

Bull market weights
Bear market weights
Sideways weights
High-volatility weights

---

# 19. SIGNAL CLASSIFICATION

Generate:

* STRONG BUY
* BUY
* ACCUMULATE
* HOLD
* REDUCE
* SELL
* STRONG SELL
* NO TRADE

Example:

85–100 = STRONG BUY
75–84 = BUY
65–74 = ACCUMULATE
50–64 = HOLD
35–49 = REDUCE
20–34 = SELL
0–19 = STRONG SELL

BUT:

A high score must not automatically produce BUY.

Risk filters can override the signal.

For example:

If:

* liquidity is poor
* spread is too wide
* event risk is extreme
* data is stale
* stop-loss cannot be defined
* expected reward/risk is poor

then:

**NO TRADE**

---

# 20. RISK ENGINE

Every trade signal must include:

* Entry
* Stop loss
* Target 1
* Target 2
* Expected holding period
* Risk/reward
* Maximum loss
* volatility
* liquidity
* invalidation condition

Example:

BUY ABC

Confidence: 82/100

Entry: ₹1,250
Stop: ₹1,205
Target 1: ₹1,340
Target 2: ₹1,410

Risk/Reward: 1:2
Expected holding: 2–6 weeks

Invalidation:

Price closes below ₹1,205 with abnormal volume.

Never generate a target without explaining the methodology used to calculate it.

---

# 21. NO-TRADE ENGINE

This is mandatory.

The system must be allowed to say:

**NO TRADE**

Reasons may include:

* insufficient edge
* conflicting indicators
* extreme volatility
* poor liquidity
* uncertain news
* weak risk/reward
* insufficient data
* market regime mismatch

Never force a recommendation.

---

# 22. BACKTESTING ENGINE

This is one of the most important modules.

Every signal must be stored historically.

Store:

* signal timestamp
* instrument
* signal
* score
* confidence
* entry
* stop
* target
* market regime
* factor scores
* data used
* source
* eventual result

Calculate:

* win rate
* average win
* average loss
* expectancy
* profit factor
* CAGR
* maximum drawdown
* Sharpe
* Sortino
* recovery factor
* consecutive losses
* risk/reward
* holding period
* slippage
* transaction costs

Avoid look-ahead bias.

Avoid survivorship bias.

Avoid data leakage.

Use walk-forward validation.

Separate:

* training
* validation
* testing

---

# 23. PREDICTION TRACKING

Every recommendation must become a measurable prediction.

Example:

2026-08-30

BUY RELIANCE

Score: 84

Entry: ₹X
Target: ₹Y
Stop: ₹Z

Later calculate:

* target hit
* stop hit
* neither
* time expiry
* maximum favorable excursion
* maximum adverse excursion

Track performance by:

* stock
* sector
* strategy
* market regime
* confidence range
* factor combination

The system should eventually answer:

> "When my model gives confidence 80+, what percentage of signals historically succeed?"

This is more important than an arbitrary AI confidence number.

---

# 24. AI RESEARCH ENGINE

Use LLMs to interpret structured and unstructured information.

AI should:

* summarize earnings
* analyze annual reports
* analyze conference calls
* summarize major news
* interpret geopolitical events
* identify affected sectors
* explain quantitative signals
* compare bull vs bear arguments
* identify missing information
* identify contradictions
* generate research reports

Every AI-generated statement must contain source references internally.

Never allow the AI to fabricate:

* prices
* earnings
* institutional holdings
* news
* analyst targets
* financial results

If information is unavailable:

say:

**DATA NOT AVAILABLE**

---

# 25. AI SHOULD CHALLENGE THE SIGNAL

For every BUY signal, create:

## Bull Case

Why could the stock rise?

## Bear Case

Why could the stock fall?

## Contradicting Evidence

What factors disagree?

## Key Risks

What could invalidate the thesis?

## Final Quantitative Decision

BUY / SELL / HOLD / NO TRADE

This prevents confirmation bias.

---

# 26. RESEARCH REPORT

For every strong signal generate:

### Instrument

### Signal

### Confidence

### Current Price

### Entry

### Target

### Stop Loss

### Risk/Reward

### Time Horizon

### Technical Analysis

### Fundamental Analysis

### Institutional Analysis

### Smart Money Analysis

### Options Analysis

### Sector Analysis

### Global Market Impact

### Macro Impact

### Geopolitical Impact

### News Analysis

### Bull Case

### Bear Case

### Risks

### Invalidation

### Historical Backtest

### Data Freshness

### Sources

---

# 27. DASHBOARD

Create a professional financial-terminal-style dashboard.

Main dashboard:

## MARKET PULSE

NIFTY
BANK NIFTY
SENSEX
MIDCAP
SMALLCAP

Global Markets

FII/DII

VIX

USD/INR

Gold

Crude

Market Breadth

Market Regime

Geopolitical Risk

---

# 28. TOP OPPORTUNITIES

Display:

## TOP BUY OPPORTUNITIES

Rank by:

* score
* confidence
* expected return
* risk/reward
* liquidity

Also:

## TOP SELL OPPORTUNITIES

## TOP BREAKOUTS

## TOP MOMENTUM

## SMART MONEY ACCUMULATION

## INSTITUTIONAL EXITS

## OPTIONS OPPORTUNITIES

## COMMODITY OPPORTUNITIES

---

# 29. WATCHLIST

Allow custom watchlists.

Each watchlist item should display:

* price
* trend
* score
* signal
* confidence
* technical score
* fundamental score
* institutional score
* smart money score
* options score
* news score
* risk level

---

# 30. ALERT SYSTEM

Create alerts for:

* BUY signal
* SELL signal
* score crossing threshold
* breakout
* breakdown
* unusual volume
* unusual OI
* FII change
* DII change
* institutional accumulation
* institutional exit
* major news
* geopolitical event
* crude spike
* gold breakout
* VIX spike
* global market shock

Desktop notification should show:

**WHY THIS MATTERS**

not merely:

"Price changed."

---

# 31. DAILY MARKET REPORT

Automatically generate:

## MORNING REPORT

Before market open, when required data is available:

* global markets
* SGX/GIFT Nifty or current legally available equivalent
* US close
* Asia
* crude
* gold
* USD/INR
* FII/DII
* important news
* economic calendar
* geopolitical risks
* expected volatility
* sectors to watch
* stocks to watch
* options levels

## MIDDAY REPORT

Detect major changes.

## MARKET CLOSE REPORT

* what happened
* why it happened
* institutional activity
* sector rotation
* important signals
* next-day watchlist

---

# 32. ECONOMIC CALENDAR

Create a calendar for:

* RBI
* Fed
* ECB
* CPI
* GDP
* PMI
* employment
* crude inventories
* major earnings
* elections
* budgets
* policy decisions

Mark events:

LOW
MEDIUM
HIGH
EXTREME

---

# 33. DATA QUALITY ENGINE

Every analysis must have a data-quality score.

Example:

DATA QUALITY: 94/100

Factors:

* price freshness
* options freshness
* news freshness
* fundamental freshness
* institutional-data freshness
* missing fields

If data quality falls below a threshold:

**Do not generate a strong signal.**

---

# 34. SOURCE PRIORITY

Create source hierarchy.

Priority:

1. Official exchange/regulator/government source
2. Licensed market-data provider
3. Company filing
4. Established financial news provider
5. Secondary financial source
6. Social media

Social media should NEVER automatically create a BUY/SELL signal.

Use social media only as an early-warning signal requiring verification.

---

# 35. DATABASE DESIGN

Create tables/entities for:

* instruments
* exchanges
* prices
* OHLC
* volumes
* corporate_actions
* fundamentals
* financial_statements
* earnings
* institutional_holdings
* fii_activity
* dii_activity
* bulk_deals
* block_deals
* options_chain
* options_greeks
* futures
* news
* geopolitical_events
* macro_data
* global_markets
* sectors
* market_regimes
* technical_features
* fundamental_features
* signals
* signal_factors
* trades
* backtest_results
* model_versions
* predictions
* alerts
* watchlists
* data_sources
* data_quality
* ai_reports

Use migrations.

Never store important data only in JSON blobs.

---

# 36. MODEL VERSIONING

Every signal must identify:

* model version
* configuration version
* data version
* timestamp
* factor weights

Example:

MODEL:

v0.1.7

This allows historical analysis.

Never silently change the algorithm and then compare old results with new results.

---

# 37. LEARNING SYSTEM

Initially use deterministic quantitative models.

Then introduce ML.

Potential models:

* Logistic Regression
* Random Forest
* XGBoost
* LightGBM
* time-series models
* regime classifiers

Do not introduce deep learning merely because it sounds sophisticated.

Use the simplest model that produces statistically meaningful improvement.

Every ML model must be compared against:

* buy-and-hold
* simple technical strategy
* random baseline
* existing model

---

# 38. FACTOR DISCOVERY

The system should eventually identify which factors matter most.

Example:

For bullish trades:

Technical momentum + institutional accumulation + sector strength

may outperform other combinations.

Calculate:

* feature importance
* factor contribution
* regime-specific performance
* feature correlation
* factor decay

Do not assume causation merely from correlation.

---

# 39. PORTFOLIO ENGINE

Later phase.

Allow the user to enter:

* holdings
* quantity
* average price
* investment amount

Then calculate:

* portfolio value
* P&L
* sector exposure
* concentration
* beta
* volatility
* drawdown
* correlation
* risk

Generate:

**Portfolio Risk Score**

And detect:

* overconcentration
* duplicate exposure
* excessive sector exposure
* excessive correlation

---

# 40. PERSONALIZED DECISION LAYER

Keep this disabled by default until regulatory requirements are understood.

If enabled later, allow:

* risk appetite
* investment horizon
* capital
* maximum acceptable loss
* portfolio exposure

The system must distinguish between:

**GENERAL MARKET RESEARCH**

and:

**PERSONALIZED INVESTMENT ADVICE**

Do not blur the two.

---

# 41. COMPLIANCE GUARDRAILS

This application is initially a personal research/decision-support utility.

Do NOT assume it is legally permitted to provide personalized investment advice or commercial Buy/Sell recommendations to third parties.

Before any public/commercial release:

* review applicable SEBI Research Analyst requirements
* review Investment Adviser requirements
* review AI/ML requirements
* review advertising rules
* review performance-claim rules
* review data licensing
* review exchange redistribution requirements
* consult a qualified Indian securities-law professional

Never claim:

* guaranteed returns
* guaranteed accuracy
* risk-free trades
* guaranteed profit
* "90% accurate"
* "sure shot"
* "100% prediction"

Do not fabricate performance.

If showing historical strategy performance, clearly separate:

* backtest
* paper trade
* live result

Do not mix them.

---

# 42. DATA LICENSING

Never scrape or redistribute exchange data without verifying the applicable terms.

Build provider interfaces.

Keep credentials in:

* environment variables
* encrypted local storage where necessary

Never hard-code API keys.

The application must display:

**DATA SOURCE**
**DATA TIMESTAMP**
**DATA LICENSE STATUS**

when appropriate.

---

# 43. SECURITY

Implement:

* encrypted credentials
* secure local storage
* HTTPS
* API authentication
* input validation
* SQL injection protection
* rate limiting
* logging
* error handling
* secure update mechanism

Never expose API keys to the frontend.

---

# 44. OBSERVABILITY

Create structured logs.

Log:

* data-provider failures
* stale data
* model failures
* AI failures
* signal-generation failures
* synchronization failures
* notification failures

Create a diagnostic page:

## SYSTEM HEALTH

Market Data: 🟢
News: 🟢
Options: 🟢
Fundamentals: 🟢
Global Data: 🟡
AI: 🟢
Database: 🟢
Internet: 🟢

---

# 45. FAILURE SAFETY

If anything critical fails:

DO NOT generate a misleading signal.

Examples:

No options data:

→ options factor disabled

Stale price:

→ signal disabled

News provider unavailable:

→ news factor disabled

Fundamental data stale:

→ fundamental score marked stale

The system should degrade gracefully.

---

# 46. USER EXPERIENCE

The UI must be professional.

Avoid a generic AI chatbot appearance.

Use:

* financial-terminal style
* tables
* charts
* scorecards
* heatmaps
* timelines
* alerts
* drill-down views

The user should be able to click:

STOCK

→ Why?

→ Technical

→ Fundamental

→ Institutional

→ Smart Money

→ Options

→ News

→ Global

→ Risk

→ Backtest

→ Historical signals

---

# 47. "WHY THIS SIGNAL?" FEATURE

This is mandatory.

When the user clicks:

BUY

show:

## WHY?

1. Technical trend positive
2. Institutional accumulation
3. Sector outperforming
4. Earnings momentum positive
5. Options positioning supportive
6. Global environment supportive

Then:

## WHAT CAN GO WRONG?

1. Global risk-off
2. Sector reversal
3. Break below support
4. Negative company news

Then:

## WHAT WOULD CHANGE OUR VIEW?

Clearly define the invalidation conditions.

---

# 48. SIGNAL EXAMPLE

The application should produce something similar to:

---

RELIANCE

🟢 BUY

Overall Score: 84/100
Confidence: 81/100

Entry: ₹XXXX
Target 1: ₹XXXX
Target 2: ₹XXXX
Stop: ₹XXXX

Risk: MEDIUM
Risk/Reward: 1:2.4
Expected Holding: 2–6 weeks

TECHNICAL: 87
FUNDAMENTAL: 79
INSTITUTIONAL: 83
SMART MONEY: 88
SECTOR: 84
OPTIONS: 81
NEWS: 76
GLOBAL: 72
MACRO: 70
GEOPOLITICAL: 68

WHY?

[AI explanation]

BULL CASE

[AI explanation]

BEAR CASE

[AI explanation]

INVALIDATION

[conditions]

HISTORICAL PERFORMANCE

Similar setups:
127

Winning:
82

Win Rate:
64.6%

Average Return:
X%

Average Drawdown:
X%

---

Never present these statistics unless they are actually calculated from stored historical data.

---

# 49. NO-TRADE EXAMPLE

NIFTY

🟡 NO TRADE

Score: 56/100

Reasons:

* FII positioning bearish
* DII supportive
* global markets mixed
* options positioning conflicting
* volatility elevated
* technical structure unclear
* risk/reward insufficient

Recommendation:

WAIT.

Trigger for bullish view:

NIFTY closes above XXXX with volume.

Trigger for bearish view:

NIFTY closes below XXXX.

---

# 50. DEVELOPMENT PROCESS

Use the following development sequence.

PHASE 0
Architecture and requirements.

PHASE 1
Desktop shell + database + configuration.

PHASE 2
Market-data abstraction + mock provider.

PHASE 3
NIFTY + major equity technical engine.

PHASE 4
Fundamental engine.

PHASE 5
FII/DII + Smart Money engine.

PHASE 6
News + geopolitical engine.

PHASE 7
Global market engine.

PHASE 8
Market regime.

PHASE 9
Signal engine.

PHASE 10
Risk engine.

PHASE 11
Backtesting.

PHASE 12
Options.

PHASE 13
Commodities.

PHASE 14
AI research/explanation.

PHASE 15
Alerts.

PHASE 16
Portfolio.

PHASE 17
Performance optimization.

PHASE 18
Production packaging.

---

# 51. TESTING

Create:

* unit tests
* integration tests
* API tests
* database tests
* model tests
* backtest tests
* UI tests
* security tests

For financial calculations, create deterministic test fixtures.

Pay special attention to:

* timezone
* trading holidays
* expiry dates
* corporate actions
* stock splits
* bonuses
* dividends
* symbol changes
* delisted stocks
* contract rollover

---

# 52. FINANCIAL DATA CORRECTNESS

Never use future data in historical analysis.

For every backtest:

The model must only use information that would have been available at that exact historical timestamp.

This is mandatory.

Prevent:

* look-ahead bias
* survivorship bias
* future leakage
* revised-data leakage

---

# 53. PERFORMANCE

The application must be able to analyze a large universe without freezing the UI.

Use:

* background workers
* caching
* incremental calculations
* asynchronous APIs
* batch processing
* database indexing

Never run heavy analysis on the UI thread.

---

# 54. CONFIGURATION

Create a configuration screen for:

* data providers
* API keys
* update intervals
* watchlists
* signal threshold
* notification preferences
* AI provider
* model
* backtesting parameters
* risk limits

---

# 55. USER CONTROL

The user must be able to turn individual research factors on/off.

Example:

Technical: ON
Fundamental: ON
FII/DII: ON
Smart Money: ON
Options: ON
News: ON
Global: ON
Geopolitical: ON

This should allow research experimentation.

---

# 56. RESEARCH EXPERIMENT MODE

Create a mode where the user can ask:

"Show me what would happen if Smart Money weight increased from 10% to 20%."

The system should run an experiment and compare:

* signal count
* win rate
* expectancy
* drawdown
* CAGR
* Sharpe

Do not alter the production model automatically.

---

# 57. PAPER TRADING

Before any broker integration, implement paper trading.

Every signal can be tracked as:

PAPER BUY
PAPER SELL

Record:

* theoretical entry
* theoretical exit
* slippage assumption
* brokerage assumption
* taxes/charges assumption

Keep paper performance separate from backtest performance.

---

# 58. BROKER INTEGRATION

Do NOT implement live order execution in the first version.

Design an interface:

BrokerAdapter

Future implementations may include supported Indian brokers.

Initially:

SIGNAL ONLY

Then:

PAPER TRADING

Then, only after appropriate compliance/security review:

ORDER PREVIEW

Then potentially:

LIVE EXECUTION

Never automatically place an order merely because the AI generated BUY.

---

# 59. AI CHAT ASSISTANT

Add a research assistant later.

The user should be able to ask:

"Why is NIFTY bearish today?"

"Which sectors have smart-money accumulation?"

"Show me stocks where technical and institutional scores are both above 80."

"What changed from yesterday?"

"Why did the model change RELIANCE from BUY to HOLD?"

"Which factors are currently causing market risk?"

"Find stocks with positive earnings + institutional accumulation + bullish technical structure."

The assistant must answer using the application's structured database, not hallucinated knowledge.

---

# 60. DAILY LEARNING

At the end of each trading day:

1. Store all signals
2. Store market outcome
3. Compare prediction vs reality
4. Calculate errors
5. Analyze failed predictions
6. Group failures by market regime
7. Identify systematic weaknesses
8. Generate a model-review report

Example:

## MODEL REVIEW

Last 30 days:

Technical breakout signals:
Win rate 68%

Institutional accumulation signals:
Win rate 72%

Options signals:
Win rate 54%

Geopolitical-event signals:
Win rate 41%

Recommendation:

Reduce confidence contribution of geopolitical-only signals until further validation.

The model must NOT automatically modify itself without validation.

---

# 61. MODEL GOVERNANCE

Maintain:

* model versions
* configuration versions
* experiment history
* validation reports
* deployment date
* rollback capability

Every production model change must be reproducible.

---

# 62. DOCUMENTATION

Create:

README.md
ARCHITECTURE.md
DATABASE.md
DATA_PROVIDERS.md
SIGNAL_ENGINE.md
RISK_ENGINE.md
BACKTESTING.md
AI_ENGINE.md
SECURITY.md
COMPLIANCE.md
DEVELOPMENT.md
DEPLOYMENT.md

Also create:

docs/

with diagrams.

---

# 63. INITIAL IMPLEMENTATION

Do NOT attempt the entire system in one generation.

Start by creating:

1. repository
2. project structure
3. architecture
4. database schema
5. desktop shell
6. backend
7. mock market-data provider
8. dashboard
9. technical-analysis engine
10. signal-engine skeleton
11. test framework
12. configuration management

Then run all tests.

After that, continue feature-by-feature.

After every major phase:

* run tests
* inspect errors
* fix errors
* update documentation
* commit changes
* provide a concise implementation report

---

# 64. CODING RULES

Use clean production-quality code.

Rules:

* TypeScript strict mode
* Python type hints
* Pydantic models
* meaningful names
* modular architecture
* dependency injection where appropriate
* no giant files
* no hard-coded secrets
* no duplicated business logic
* no magic numbers
* configuration-driven thresholds
* extensive logging
* error handling
* automated tests

Never write fake implementations and label them production-ready.

If a data provider is unavailable, explicitly implement:

MockProvider

and clearly mark it as MOCK.

---

# 65. DATA PROVIDER RULE

Before implementing any real provider:

Research its current API, licensing, terms and authentication.

Do not guess API endpoints.

Do not scrape websites unless the terms explicitly permit it.

Create an adapter layer so providers can be replaced.

---

# 66. IMPORTANT FINANCIAL SAFETY RULE

This system is a research and decision-support system.

It must never guarantee market outcomes.

Every recommendation must contain uncertainty.

Use language such as:

"Model indicates..."

"Historical probability..."

"Risk/reward..."

"Conditions supporting the thesis..."

"Invalidation condition..."

Never:

"Guaranteed"

"Sure shot"

"Certain profit"

"100% accurate"

---

# 67. FIRST TASK

Before writing large amounts of code:

1. Inspect the development environment.
2. Determine available Node.js, Python, Git, PostgreSQL and other dependencies.
3. Propose the final architecture.
4. Create the repository structure.
5. Create ARCHITECTURE.md.
6. Create DEVELOPMENT.md.
7. Create DATABASE.md.
8. Create the initial database migrations.
9. Create the desktop application shell.
10. Create the backend health endpoint.
11. Create a mock market-data provider.
12. Create automated tests.
13. Start the application.
14. Verify that the frontend can communicate with the backend.
15. Report exactly what has been completed.

Do not proceed to live market-data integration until the architecture and mock system are working.

---

# 68. IMPORTANT: ASK BEFORE IRREVERSIBLE DECISIONS

If you reach a decision involving:

* paid data provider
* legal/regulatory interpretation
* live trading
* real-money execution
* security architecture
* data redistribution
* destructive database migration

STOP and explain the decision and alternatives before proceeding.

For normal implementation decisions, do not repeatedly ask for confirmation.

Make sensible engineering decisions and document them.

---

# 69. SUCCESS CRITERIA

The final application should eventually answer:

1. What is happening in Indian markets?
2. Why is it happening?
3. Which sectors are strongest?
4. Which stocks have the best setups?
5. Where are institutions investing?
6. Where are FIIs investing?
7. Where are DIIs investing?
8. Where is smart money accumulating?
9. Where are institutions exiting?
10. What does the options market indicate?
11. What is happening in commodities?
12. What is happening globally?
13. What geopolitical events matter?
14. What macroeconomic events matter?
15. What are the highest-probability setups?
16. What is the risk/reward?
17. What would invalidate the trade?
18. How did similar signals perform historically?
19. What is the model's current accuracy by regime?
20. When should I NOT trade?

---

# 70. FINAL PRODUCT PRINCIPLE

The application must behave like a combination of:

* institutional research desk
* quantitative research platform
* derivatives desk
* commodity research desk
* macro research desk
* geopolitical intelligence platform
* portfolio risk system
* AI research assistant

But it must remain transparent.

The user should always be able to drill down from:

SIGNAL

→ SCORE

→ FACTORS

→ DATA

→ SOURCES

→ HISTORICAL PERFORMANCE

→ RISK

→ INVALIDATION

The objective is NOT to predict the market perfectly.

The objective is to find:

**repeatable, statistically validated, risk-adjusted opportunities while avoiding low-quality trades.**

Start with architecture and the mock-data MVP now.
Do not build everything simultaneously.
Proceed phase-by-phase and maintain a working application at every stage.
