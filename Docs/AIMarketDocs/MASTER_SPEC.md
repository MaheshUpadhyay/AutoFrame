# AI MARKET INTELLIGENCE

## MASTER SYSTEM SPECIFICATION

**Document Version:** 1.0
**Status:** Master Architecture & Product Specification
**Target Platform:** Windows Desktop
**Primary Market:** Indian Financial Markets
**Primary Exchanges:** NSE, BSE, MCX

---

# 1. PURPOSE

AI Market Intelligence is a desktop-based quantitative market research and decision-support platform designed to continuously analyze Indian financial markets when internet connectivity is available.

The system combines:

* Market data
* Technical analysis
* Fundamental analysis
* FII/FPI activity
* DII activity
* Smart Money / institutional activity
* Promoter activity
* Bulk/block deals
* Options and futures data
* Sector analysis
* Market breadth
* Global markets
* Macroeconomic indicators
* Financial news
* Geopolitical events
* Risk
* Historical market behavior
* Backtesting
* AI-assisted research

The system's purpose is NOT to predict every market movement.

Its purpose is to identify **high-quality, statistically validated market opportunities while clearly communicating uncertainty and risk.**

---

# 2. FUNDAMENTAL ARCHITECTURE PRINCIPLE

The system must follow this pipeline:

```text
RAW DATA
    ↓
DATA VALIDATION
    ↓
DATA NORMALIZATION
    ↓
FEATURE ENGINEERING
    ↓
FACTOR ENGINES
    ↓
MARKET REGIME
    ↓
COMPOSITE SCORING
    ↓
RISK ENGINE
    ↓
EVIDENCE QUALITY
    ↓
SIGNAL VALIDATION
    ↓
HISTORICAL VALIDATION
    ↓
FINAL SIGNAL
    ↓
AI EXPLANATION
```

The system must NOT follow:

```text
News
 ↓
LLM
 ↓
BUY
```

or:

```text
User Question
 ↓
LLM Guess
 ↓
BUY/SELL
```

---

# 3. SEPARATION OF RESPONSIBILITIES

The system must have clearly separated responsibilities.

## 3.1 Data Layer

Responsible for:

* Collecting data
* Validating data
* Normalizing data
* Timestamping data
* Storing data
* Detecting missing data
* Detecting duplicate data
* Detecting stale data
* Managing providers

The data layer must NOT generate trading signals.

---

# 4. Feature Layer

The feature layer converts raw information into measurable features.

Examples:

```text
Price
→ Returns
→ Moving averages
→ Volatility
→ Momentum
```

```text
Institutional holdings
→ Ownership change
→ Accumulation velocity
→ Institutional concentration
```

```text
Options
→ OI change
→ IV
→ PCR
→ Strike concentration
```

The feature layer must not directly generate BUY/SELL decisions.

---

# 5. Factor Engine

The factor engine converts features into standardized factor scores.

Initial factors:

```text
TECHNICAL
FUNDAMENTAL
MOMENTUM
FII_DII
SMART_MONEY
SECTOR
OPTIONS
NEWS
GLOBAL
MACRO
GEOPOLITICAL
VALUATION
MARKET_BREADTH
```

Each factor must produce a standardized score.

Initial standard:

```text
0 = extremely bearish
50 = neutral
100 = extremely bullish
```

However, individual factors may internally use different mathematical scales before normalization.

Exact formulas will be defined in:

`QUANT_MODEL.md`

---

# 6. DATA QUALITY ENGINE

Every data point must have metadata describing its reliability.

Minimum metadata should include:

```text
source
source_type
event_time
published_at
available_at
received_at
data_quality
```

The system must distinguish:

### Event Time

When something actually happened.

### Published Time

When information was publicly published.

### Available Time

When the application could legitimately use the information.

### Received Time

When the application obtained the information.

This distinction is mandatory for accurate backtesting.

---

# 7. NO LOOK-AHEAD BIAS

This is a critical system requirement.

Historical models must only use information that was available at the exact historical decision time.

Example:

A company publishes earnings on:

```text
15 August
```

A historical signal generated on:

```text
14 August
```

must NOT use those earnings.

Similarly, institutional ownership changes must only become available to the model after the information was publicly available.

The backtesting engine must enforce this rule at the data-access layer.

---

# 8. MARKET COVERAGE

The architecture must support:

## Equity

* NSE
* BSE

## Indices

* NIFTY
* BANK NIFTY
* Sensex
* Sector indices
* Other relevant indices

## Derivatives

* Index futures
* Stock futures
* Index options
* Stock options

## Commodities

* MCX futures
* MCX options where supported

The system must be extensible so additional instruments can be added without redesigning the core architecture.

---

# 9. RESEARCH HORIZONS

The system must support multiple models.

## Intraday Model

Approximately:

```text
Minutes → 1 trading day
```

## Short-Term Model

```text
1–5 trading days
```

## Swing Model

```text
5–30 trading days
```

## Positional Model

```text
1–3 months
```

## Investment Model

```text
6–12 months
```

## Long-Term Model

```text
1–10+ years
```

These models must not be forced to use identical factor weights.

---

# 10. CORE FACTOR ENGINES

The initial architecture must contain independent engines for:

```text
TechnicalEngine
FundamentalEngine
MomentumEngine
InstitutionalFlowEngine
SmartMoneyEngine
SectorEngine
OptionsEngine
NewsEngine
GlobalMarketEngine
MacroEngine
GeopoliticalEngine
ValuationEngine
MarketBreadthEngine
```

Each engine must:

1. Receive structured input.
2. Validate required data.
3. Calculate features.
4. Normalize results.
5. Produce a factor score.
6. Produce supporting evidence.
7. Report data quality.
8. Report missing inputs.
9. Never directly place trades.

---

# 11. TECHNICAL ENGINE

The Technical Engine will eventually analyze:

* Trend
* Moving averages
* EMA
* SMA
* RSI
* MACD
* ADX
* ATR
* Bollinger Bands
* Momentum
* ROC
* Price structure
* Breakouts
* Support
* Resistance
* Volume
* Relative volume
* Delivery data where available

Exact calculations will be defined in:

`QUANT_MODEL.md`

---

# 12. FUNDAMENTAL ENGINE

The Fundamental Engine will eventually analyze:

### Growth

* Revenue
* EBITDA
* PAT
* EPS
* Growth acceleration

### Profitability

* ROE
* ROCE
* Margins

### Balance Sheet

* Debt
* Interest coverage
* Cash
* Free cash flow

### Earnings Quality

* Cash conversion
* Receivables
* Working capital
* Earnings consistency

### Governance

* Promoter holding
* Promoter pledge
* Auditor concerns
* Related-party issues
* Governance warnings

Exact formulas will be specified separately.

---

# 13. SMART MONEY ENGINE

This is a core component.

The Smart Money Engine should analyze where significant investors are increasing or reducing exposure.

Potential information sources include:

* Institutional shareholding
* Mutual funds
* Insurance companies
* FII/FPI holdings
* DII holdings
* Promoter transactions
* Bulk deals
* Block deals
* Significant disclosed investor transactions
* Major shareholder changes

The system must prioritize:

```text
CHANGE IN POSITION
```

over simply:

```text
CURRENT POSITION
```

Example:

```text
Previous institutional holding: 1.20%
Current institutional holding: 2.10%

Change: +0.90 percentage points
```

The engine should eventually calculate:

* Accumulation
* Distribution
* Accumulation velocity
* Number of institutions accumulating
* Number of institutions exiting
* Persistence
* Concentration
* Magnitude

Exact scoring rules belong in:

`QUANT_MODEL.md`

---

# 14. FII/DII ENGINE

The engine must separately track:

* FII/FPI
* DII
* Cash market activity
* Futures positioning where available
* Options positioning where available
* Rolling flows

The system should support:

```text
Daily
5-day
20-day
Monthly
Quarterly
```

views.

A single day's flow must not automatically generate a trading signal.

---

# 15. SECTOR ENGINE

The system must compare stocks against their sectors.

It should analyze:

* Sector momentum
* Relative strength
* Institutional activity
* Earnings momentum
* Sector breadth
* Valuation
* Macro sensitivity
* Sector-specific news

Example:

```text
Stock performance
vs
Sector performance
vs
NIFTY performance
```

---

# 16. MARKET BREADTH ENGINE

The engine should monitor:

* Advance/Decline
* Stocks above 20 DMA
* Stocks above 50 DMA
* Stocks above 200 DMA
* New highs
* New lows
* Sector breadth
* Breadth momentum

Breadth should help determine whether market movements are broad-based or concentrated.

---

# 17. OPTIONS ENGINE

The Options Engine should eventually analyze:

* Call OI
* Put OI
* Change in OI
* Volume
* IV
* IV percentile
* PCR
* Strike concentration
* Greeks
* Futures basis
* Expiry structure
* Unusual activity

Options must be analyzed in context.

Example:

High Call OI does not automatically mean SELL.

The engine must evaluate:

* Price
* OI change
* Volume
* IV
* Time to expiry
* Historical behavior
* Market regime

---

# 18. GLOBAL MARKET ENGINE

The system should monitor relevant global indicators such as:

* S&P 500
* Nasdaq
* Dow Jones
* Asian markets
* European markets
* US futures
* VIX
* USD
* USD/INR
* US Treasury yields
* Gold
* Crude oil

Global factors must be mapped to individual assets rather than treated as universally bullish or bearish.

---

# 19. MACRO ENGINE

The Macro Engine should analyze:

* RBI
* Federal Reserve
* Interest rates
* Inflation
* GDP
* PMI
* Liquidity
* Bond yields
* Currency
* Credit conditions

Macro impact should be asset and sector specific.

---

# 20. GEOPOLITICAL ENGINE

The Geopolitical Engine must transform events into economic transmission chains.

The architecture should support:

```text
EVENT
 ↓
ECONOMIC CHANNEL
 ↓
COMMODITY/CURRENCY/RATE IMPACT
 ↓
SECTOR IMPACT
 ↓
SECURITY IMPACT
```

Example:

```text
Geopolitical escalation
        ↓
Oil supply concern
        ↓
Crude price increase
        ↓
Input cost increase
        ↓
Airlines/Paints/Chemicals affected
```

The system must not use simplistic rules such as:

```text
War = SELL
```

---

# 21. NEWS ENGINE

The News Engine should:

1. Collect permitted/reliable news.
2. Identify entities.
3. Identify event type.
4. Estimate sentiment.
5. Estimate importance.
6. Estimate source reliability.
7. Apply time decay.
8. Detect confirmation.
9. Map the event to assets/sectors.

The system should distinguish:

```text
Official disclosure
Regulatory announcement
Major financial publication
Reliable news report
Secondary publication
Unverified social content
```

Source reliability must influence the eventual score.

---

# 22. MARKET REGIME ENGINE

The Market Regime Engine identifies the current environment.

Possible regimes:

```text
STRONG_BULL
BULL
NEUTRAL
SIDEWAYS
BEAR
STRONG_BEAR
HIGH_VOLATILITY
CRISIS_RISK_OFF
```

Regime detection may consider:

* NIFTY trend
* Breadth
* Volatility
* Global markets
* FII/DII
* Credit conditions
* Market momentum

The regime can modify:

* Factor weights
* Signal thresholds
* Risk limits
* Confidence

Exact methodology belongs in:

`QUANT_MODEL.md`

---

# 23. COMPOSITE SCORING ENGINE

The Composite Engine combines factor scores.

Initial factor set:

```text
Technical
Fundamental
Momentum
FII/DII
Smart Money
Sector
Options
News
Global
Macro
Geopolitical
Valuation
Market Breadth
```

Each factor receives a weight.

Initial weights are NOT considered final.

They must be:

1. Version controlled.
2. Backtested.
3. Compared against alternatives.
4. Validated out-of-sample.

No weight should be changed silently.

---

# 24. DYNAMIC WEIGHTS

Different market regimes may require different factor weights.

For example:

```text
Bull Market
→ Momentum/Technical may become more important
```

```text
Bear Market
→ Risk/Fundamental/Institutional factors may become more important
```

```text
High Volatility
→ Risk/Options/Global factors may become more important
```

However, dynamic weighting must only be introduced after the baseline model is successfully backtested.

---

# 25. RISK ENGINE

Risk must be calculated separately from bullish/bearish scoring.

Potential inputs:

* Volatility
* ATR
* Beta
* Liquidity
* Bid/ask spread
* Gap risk
* Event risk
* Earnings risk
* IV
* Drawdown
* Market regime
* Geopolitical exposure

Output:

```text
Risk Score: 0–100
```

Higher score means higher risk.

---

# 26. EVIDENCE QUALITY ENGINE

Every signal must have an evidence-quality score.

The engine evaluates:

* Data completeness
* Data freshness
* Source reliability
* Number of independent confirmations
* Missing data
* Stale data
* Provider health

Example:

```text
Composite Score = 87
Evidence Quality = 52
```

The system may produce:

```text
NO TRADE
```

rather than a BUY/SELL signal.

---

# 27. FACTOR AGREEMENT

The system should measure how strongly factors agree.

Example:

```text
Technical = 90
Smart Money = 88
Sector = 85
Fundamental = 82
```

High agreement.

Whereas:

```text
Technical = 92
Fundamental = 25
Smart Money = 20
Options = 28
```

represents high conflict.

Factor conflict should reduce confidence.

---

# 28. SIGNAL STABILITY

Signals should be monitored over time.

Example:

```text
09:30 BUY
10:00 BUY
10:30 BUY
11:00 BUY
```

Stable.

But:

```text
09:30 BUY
10:00 SELL
10:30 BUY
11:00 SELL
```

Unstable.

Signal instability should reduce confidence and may produce:

```text
NO TRADE
```

---

# 29. HISTORICAL SIMILARITY ENGINE

The system should eventually identify historical market situations similar to the current setup.

It may compare:

* Factor scores
* Market regime
* Sector regime
* Volatility
* Technical structure
* Institutional activity
* Options positioning

Then determine how similar setups historically behaved.

Example:

```text
Similar historical setups: 127

Target reached before stop: 90
Stop reached before target: 37

Historical success rate: 70.9%
```

This must never be represented as a guarantee.

---

# 30. SIGNAL ENGINE

The Signal Engine receives:

```text
Composite Score
Risk Score
Evidence Quality
Factor Agreement
Signal Stability
Market Regime
Historical Evidence
Liquidity
Reward/Risk
Event Risk
```

It produces one of:

```text
STRONG BUY
BUY
ACCUMULATE
HOLD
REDUCE
SELL
STRONG SELL
NO TRADE
```

The exact decision thresholds belong in:

`SIGNAL_ENGINE.md`

---

# 31. ENTRY / STOP / TARGET ENGINE

Where applicable, the system should calculate:

* Entry zone
* Stop-loss
* Target 1
* Target 2
* Risk/reward
* Expected holding period

The quantitative engine must generate these values.

The AI must never invent them.

---

# 32. EXPECTED VALUE

The system should eventually calculate expected value based on historical/model probabilities.

Conceptually:

```text
Expected Value =
Probability of Target × Reward
-
Probability of Stop × Risk
```

Transaction costs and slippage must be included where appropriate.

Exact implementation belongs in:

`QUANT_MODEL.md`

---

# 33. AI ENGINE

The AI layer sits ABOVE the quantitative engine.

Architecture:

```text
QUANTITATIVE ENGINE
        ↓
STRUCTURED RESULT
        ↓
AI CONTEXT BUILDER
        ↓
LLM
        ↓
EXPLANATION
```

The AI may:

* Explain the signal
* Summarize factors
* Explain risks
* Compare assets
* Answer research questions
* Summarize news
* Explain market movements
* Explain options positioning
* Explain Smart Money activity

The AI must NOT:

* Invent market data
* Invent financial results
* Invent investor activity
* Invent targets
* Override quantitative signals without explicit system rules
* Claim certainty
* Claim guaranteed returns

---

# 34. AI GROUNDING

AI responses must be grounded in structured application data.

The AI context should include:

```text
Instrument
Timestamp
Market regime
Factor scores
Composite score
Risk score
Evidence score
Historical evidence
News
Data sources
Signal
Model version
```

The AI should clearly distinguish:

```text
FACT
MODEL RESULT
HISTORICAL EVIDENCE
INTERPRETATION
UNCERTAINTY
```

---

# 35. DATABASE ARCHITECTURE

The system should use a relational database suitable for financial time-series workloads.

The database must eventually contain domains for:

```text
Instruments
Market Data
Fundamentals
Institutional Data
Smart Money
Derivatives
Options
News
Geopolitical Events
Global Markets
Macro Data
Features
Factor Scores
Signals
Backtesting
Models
AI Analysis
Audit Logs
```

Exact schemas will be defined in:

`DATABASE_SPEC.md`

---

# 36. RAW DATA PRESERVATION

Raw source data should be preserved wherever legally and technically appropriate.

Do not store only calculated values.

Example:

Instead of only:

```text
RSI = 72
```

store sufficient raw data to reproduce the calculation.

This is required for:

* Debugging
* Auditing
* Model improvement
* Backtesting
* Recalculation

---

# 37. DATA PROVIDER ABSTRACTION

The system must not tightly couple the application to one data provider.

Architecture:

```text
DataProviderInterface
       │
       ├── Provider A
       ├── Provider B
       ├── Provider C
       └── Future Provider
```

The application should be able to replace a provider without rewriting the quantitative engine.

---

# 38. DATA PROVIDER FAILOVER

If the primary provider becomes unavailable:

1. Detect provider failure.
2. Log failure.
3. Attempt approved fallback provider.
4. Validate fallback data.
5. Mark the provider used.
6. Continue processing if data quality is sufficient.

If no reliable data is available:

```text
NO TRADE / DATA UNAVAILABLE
```

The system must never fabricate missing data.

---

# 39. INTERNET CONNECTIVITY

The application must support offline operation.

When offline:

* Existing data remains available.
* Existing reports remain accessible.
* No live signal is presented as current.
* Background synchronization waits.

When internet becomes available:

```text
Connectivity detected
        ↓
Provider health check
        ↓
Missing data identification
        ↓
Data synchronization
        ↓
Validation
        ↓
Feature recalculation
        ↓
Model recalculation
        ↓
Signal generation
        ↓
Alert generation
```

---

# 40. BACKGROUND PROCESSING

Heavy processing must not block the desktop UI.

Background tasks include:

* Data synchronization
* Feature calculation
* News processing
* Signal generation
* Backtesting
* Historical calculations
* AI analysis

The system must provide task status and logs.

---

# 41. SCHEDULER

The application should support scheduled jobs such as:

```text
Pre-market analysis
Market-open analysis
Intraday analysis
Post-market analysis
Daily institutional analysis
News monitoring
End-of-day model update
Historical data synchronization
```

Scheduling must respect:

* Indian market hours
* Weekends
* Exchange holidays
* Provider availability

---

# 42. MARKET STATUS

The application must know whether the relevant market is:

```text
PRE_MARKET
OPEN
CLOSED
HOLIDAY
HALTED
UNKNOWN
```

Signals must indicate the market status at the time they were generated.

---

# 43. WATCHLIST

Users must be able to create multiple watchlists.

Examples:

```text
Long Term
Swing
Options
Commodities
High Conviction
Research
```

Each watchlist can have custom alert settings.

---

# 44. MARKET SCANNERS

The system should eventually support scanners for:

```text
Strong Buy
Strong Sell
Breakouts
Breakdowns
Smart Money Accumulation
Institutional Accumulation
Unusual Options Activity
High Relative Volume
Sector Leaders
Sector Laggards
Oversold
Overbought
Fundamental Quality
Long-Term Opportunities
High-Risk Opportunities
```

---

# 45. ALERT SYSTEM

Alerts may be triggered by:

* New BUY signal
* New SELL signal
* Signal change
* Score threshold
* Smart Money activity
* Bulk deal
* Block deal
* Unusual options activity
* Major news
* Geopolitical event
* Market regime change
* Stop-loss
* Target

Alerts must be configurable.

---

# 46. PAPER TRADING

Version 1 must not place real trades.

Paper trading should eventually simulate:

* Equity
* Futures
* Options
* Commodities

Paper trading must include configurable:

* Brokerage
* Taxes
* Exchange charges
* Slippage
* Position sizing

---

# 47. LIVE TRADING

Live broker integration is explicitly OUT OF SCOPE for Version 1.

If live trading is introduced later:

* It must be isolated from the research engine.
* It must require explicit user confirmation.
* It must never automatically trade because an LLM generated a response.
* It must have independent risk controls.
* It must maintain complete audit logs.

---

# 48. BACKTESTING ENGINE

The backtesting engine must reproduce historical model decisions as they would have existed at that time.

It must account for:

* Historical prices
* Corporate actions
* Historical fundamentals
* Historical institutional data
* Historical options data where available
* Transaction costs
* Slippage
* Liquidity
* Expiry
* Market holidays

It must enforce no-look-ahead rules.

---

# 49. BACKTEST METRICS

The system should calculate:

```text
Total Trades
Winning Trades
Losing Trades
Win Rate
Net P&L
Gross Profit
Gross Loss
Profit Factor
Expectancy
CAGR
Maximum Drawdown
Sharpe Ratio
Sortino Ratio
Average Holding Period
Maximum Consecutive Losses
Maximum Consecutive Wins
```

Results must be available by:

* Asset
* Sector
* Market regime
* Model version
* Time period

---

# 50. MODEL VERSIONING

Every quantitative model must have:

```text
model_name
model_version
parameters
weights
creation_date
status
```

Examples:

```text
TECHNICAL_V1.0
SWING_V1.0
INVESTMENT_V1.0
OPTIONS_V1.0
```

Models must never silently change.

---

# 51. MODEL EXPERIMENTATION

Alternative models must be evaluated separately.

Example:

```text
SWING_V1.0
SWING_V1.1
SWING_V2.0
```

The system must compare:

* Performance
* Drawdown
* Stability
* Out-of-sample performance
* Regime performance

A model must not become the production model simply because it performed well on historical data.

---

# 52. WALK-FORWARD VALIDATION

Eventually, models should be evaluated using:

```text
TRAIN
 ↓
VALIDATE
 ↓
TEST
 ↓
MOVE FORWARD
 ↓
RETRAIN
```

The final performance evaluation must use unseen periods.

---

# 53. MODEL DRIFT

The system should monitor whether model performance deteriorates over time.

Monitor:

* Win rate
* Expectancy
* Drawdown
* Factor effectiveness
* Prediction calibration
* Signal frequency

If performance materially deteriorates:

```text
MODEL REVIEW REQUIRED
```

The system must not automatically replace the production model without validation.

---

# 54. USER INTERFACE

The desktop application should eventually provide:

## Dashboard

* Market status
* NIFTY
* BANK NIFTY
* Sensex
* Global markets
* FII/DII
* Market breadth
* VIX
* Top opportunities
* Major risks

## Stock Research

* Price chart
* Technical factors
* Fundamental factors
* Smart Money
* Institutional activity
* Options
* News
* Sector
* Global impact
* Model score
* Risk
* Signal

## Market Scanner

* BUY opportunities
* SELL opportunities
* Smart Money
* Options
* Breakouts
* Sector rotation

## Portfolio/Watchlist

* Positions
* Watchlists
* Signals
* Alerts

## Research Assistant

Natural-language interaction with the structured research database.

---

# 55. SIGNAL EXPLANATION UI

Every signal must provide a transparent explanation.

Example:

```text
RELIANCE

SIGNAL: BUY
SCORE: 84/100
CONFIDENCE: 78/100
RISK: 32/100
EVIDENCE QUALITY: 94/100
```

Then:

```text
Bullish Factors

Technical       +13.2
Smart Money     +11.8
Sector          +7.4
Fundamental     +8.1
Options         +6.8
```

And:

```text
Risks

Global          -2.4
Geopolitical    -1.5
Valuation       -1.2
```

The user should be able to drill into each factor.

---

# 56. SIGNAL HISTORY

Every generated signal must be stored.

Example:

```text
RELIANCE
27 Aug 2026 10:15
BUY
Score: 82

28 Aug 2026 11:30
BUY
Score: 86

29 Aug 2026 14:15
HOLD
Score: 68
```

This allows the user to understand how the model changed its view.

---

# 57. SIGNAL INVALIDATION

Every signal should define conditions that invalidate it.

Examples:

* Stop-loss reached
* Market regime changed
* Fundamental event invalidated thesis
* Smart Money reversed
* Technical structure broken
* Expected reward/risk deteriorated

The system should explicitly explain why a signal changed.

---

# 58. SECURITY

The application must:

* Never hard-code API keys.
* Never commit secrets to Git.
* Use environment variables or secure credential storage.
* Protect database credentials.
* Avoid logging secrets.
* Validate external data.
* Sanitize external inputs.
* Maintain audit logs.

---

# 59. RELIABILITY

The application must handle:

* Internet outages
* Provider outages
* API rate limits
* Invalid responses
* Missing data
* Duplicate data
* Database errors
* Application crashes
* Partial synchronization

The system should recover gracefully.

---

# 60. OBSERVABILITY

The system must maintain structured logs for:

```text
Data ingestion
Data validation
Provider health
Feature calculation
Model execution
Signal generation
AI execution
Backtesting
Errors
Warnings
```

Every important process should have:

```text
timestamp
component
status
duration
error
model_version
```

where applicable.

---

# 61. PERFORMANCE

The application should:

* Keep the UI responsive.
* Run heavy calculations asynchronously.
* Cache frequently accessed data.
* Avoid unnecessary API requests.
* Batch historical calculations where possible.
* Use efficient database indexes.
* Support incremental updates.

---

# 62. EXTENSIBILITY

The architecture must allow future additions such as:

* New exchanges
* New asset classes
* New data providers
* New quantitative factors
* New AI providers
* New machine-learning models
* New scanners
* New alert channels
* Mobile application
* Web dashboard
* Broker integrations

New modules should not require rewriting unrelated components.

---

# 63. MACHINE LEARNING

Machine learning is NOT required for the first working version.

The recommended progression is:

```text
V1
Rule-based quantitative model

↓

V1.x
Statistical optimization

↓

V2
Machine learning

↓

V3
Ensemble model
```

Potential future models:

* Logistic Regression
* Random Forest
* Gradient Boosting
* XGBoost
* LightGBM

Machine learning must only be introduced after establishing a reliable baseline.

---

# 64. ML TARGET

Future ML models should predict measurable outcomes rather than vague statements.

Example:

```text
Probability that Target is reached
before Stop Loss
within N trading days.
```

Possible horizons:

```text
5D
20D
60D
252D
```

Exact target definitions belong in:

`QUANT_MODEL.md`

---

# 65. AI MODEL PROVIDER

The AI layer should use an abstraction:

```text
AIProviderInterface
```

This allows future support for:

* Claude
* OpenAI
* Local LLM
* Other providers

The application must not hard-code itself to a single AI vendor.

---

# 66. AI COST CONTROL

AI calls should be minimized.

Do not send an LLM request for every tick.

Prefer:

```text
Market data
→ Quantitative calculation
→ Detect meaningful change
→ AI explanation only when necessary
```

AI should be triggered by:

* Significant signal change
* Important news
* Major market regime change
* User request
* Scheduled research summary

---

# 67. DATA FRESHNESS

Every displayed metric should have a timestamp.

Examples:

```text
Price: 10:31:25
FII/DII: 29 Aug 2026
Institutional holding: Q1 FY27
News: 10:29
Global market: 10:30
```

The UI must clearly show stale data.

---

# 68. SOURCE TRANSPARENCY

Where practical, the application should allow the user to see:

* Source
* Source timestamp
* Data timestamp
* Data provider
* Reliability level

The system must not present third-party data as internally generated information.

---

# 69. LEGAL / REGULATORY DESIGN

The product must be designed with the ability to support applicable financial research/advisory regulations before being distributed commercially.

The system should support:

* Disclosures
* AI-use disclosure where applicable
* Research records
* Audit trails
* Data-source attribution
* Model versioning
* Signal history
* Risk disclosures

The product must not promise guaranteed returns.

Before offering research/advisory services to external customers, obtain appropriate professional legal/regulatory review.

---

# 70. DEVELOPMENT PRINCIPLES

Claude Code must follow these principles:

### Principle 1

Do not invent financial methodology.

### Principle 2

Do not invent data.

### Principle 3

Do not silently substitute missing data.

### Principle 4

Do not use future data in historical analysis.

### Principle 5

Do not allow the LLM to directly generate BUY/SELL decisions.

### Principle 6

Every quantitative result must be reproducible.

### Principle 7

Every production signal must be auditable.

### Principle 8

Every model change must be versioned.

### Principle 9

Every external data source must be identifiable.

### Principle 10

When requirements are ambiguous, stop and ask for clarification rather than making assumptions that affect financial decisions.

---

# 71. DOCUMENT HIERARCHY

The project specifications have the following hierarchy:

```text
PRODUCT_REQUIREMENTS.md
        ↓
MASTER_SPEC.md
        ↓
┌───────────────────────────────┐
│                               │
QUANT_MODEL.md          DATABASE_SPEC.md
│                               │
SIGNAL_ENGINE.md        DATA_SOURCES.md
│                               │
BACKTESTING_SPEC.md     AI_ENGINE.md
│                               │
UI_SPEC.md              SECURITY_COMPLIANCE.md
│
└───────────────┬───────────────┘
                ↓
          IMPLEMENTATION
```

`PRODUCT_REQUIREMENTS.md` defines what the product should do.

`MASTER_SPEC.md` defines how the complete system fits together.

Specialized specification files define the detailed behavior of each subsystem.

---

# 72. CONFLICT RESOLUTION

If specifications conflict:

1. Security requirements take priority.
2. Data integrity requirements take priority.
3. No-look-ahead requirements take priority.
4. Quantitative methodology takes priority over AI interpretation.
5. Product requirements take priority over implementation convenience.
6. Ask the user if a material conflict remains.

Claude must not silently resolve material financial-model conflicts.

---

# 73. DEVELOPMENT PHASES

The implementation should follow this order.

## Phase 1

Architecture

## Phase 2

Product specification

## Phase 3

Quantitative model specification

## Phase 4

Database specification

## Phase 5

Data provider specification

## Phase 6

Data ingestion

## Phase 7

Technical engine

## Phase 8

Fundamental engine

## Phase 9

FII/DII engine

## Phase 10

Smart Money engine

## Phase 11

Sector and breadth engine

## Phase 12

Options engine

## Phase 13

Global and macro engine

## Phase 14

News and geopolitical engine

## Phase 15

Market regime engine

## Phase 16

Composite signal engine

## Phase 17

Risk engine

## Phase 18

Backtesting

## Phase 19

Historical validation

## Phase 20

AI research assistant

## Phase 21

Desktop dashboard

## Phase 22

Paper trading

## Phase 23

Production hardening

---

# 74. CURRENT DEVELOPMENT STATUS

At the creation of this document:

```text
Architecture: IN PROGRESS

Product Requirements: DEFINED

Quantitative Model: NOT DEFINED

Database Schema: NOT DEFINED

Data Providers: NOT APPROVED

Signal Engine: NOT IMPLEMENTED

Backtesting: NOT IMPLEMENTED

AI Engine: NOT IMPLEMENTED

Live Trading: NOT PERMITTED
```

---

# 75. NEXT REQUIRED DOCUMENT

The next document that must be created is:

```text
QUANT_MODEL.md
```

This document must define the exact mathematical methodology for:

* Technical Score
* Fundamental Score
* Momentum Score
* FII/DII Score
* Smart Money Score
* Sector Score
* Options Score
* News Score
* Global Score
* Macro Score
* Geopolitical Score
* Valuation Score
* Market Breadth Score
* Composite Score
* Risk Score
* Evidence Quality
* Factor Agreement
* Signal Stability
* Confidence
* Expected Value

No production BUY/SELL engine should be implemented until `QUANT_MODEL.md` has been reviewed and approved.

---

# 76. MASTER IMPLEMENTATION RULE

Claude Code must read:

```text
PRODUCT_REQUIREMENTS.md
MASTER_SPEC.md
```

before implementing any major subsystem.

Before implementing a specific subsystem, Claude must also read its corresponding specification.

Claude must not:

* Guess financial formulas.
* Guess scoring weights.
* Guess signal thresholds.
* Guess historical-validation rules.
* Guess data-source reliability.
* Guess trading rules.

If the required specification does not exist, Claude must stop and ask for the relevant specification.

---

# 77. FINAL PRODUCT PRINCIPLE

AI Market Intelligence is intended to behave like a disciplined quantitative research system, not a fortune-telling application.

The system should answer:

> "Based on the data available now, what does our model currently indicate, why does it indicate it, how strong is the evidence, what are the risks, and how have similar situations historically behaved?"

It should NOT claim:

> "This stock will definitely go up."

The product's credibility must come from:

```text
DATA QUALITY
+
TRANSPARENT METHODOLOGY
+
STATISTICAL VALIDATION
+
RISK MANAGEMENT
+
BACKTESTING
+
AUDITABILITY
+
CONTINUOUS MODEL EVALUATION
```

rather than from confident predictions.
