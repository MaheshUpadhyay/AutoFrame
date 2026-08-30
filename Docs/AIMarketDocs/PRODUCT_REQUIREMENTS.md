# AI MARKET INTELLIGENCE

## Product Requirements Document (PRD)

**Document Version:** 1.0
**Status:** Product Definition
**Target Platform:** Windows Desktop
**Market:** Indian Financial Markets
**Primary Markets:** NSE, BSE, MCX

---

# 1. Product Vision

AI Market Intelligence is a desktop-based quantitative market research and decision-support application designed to analyze Indian financial markets continuously when internet connectivity is available.

The application will analyze multiple categories of information simultaneously instead of relying on a single technical indicator or news source.

The objective is to identify high-quality market opportunities using:

* Quantitative analysis
* Technical analysis
* Fundamental analysis
* Institutional activity
* Smart Money activity
* Options data
* Market breadth
* Sector strength
* Global markets
* Macroeconomic conditions
* Geopolitical events
* Financial news
* Risk analysis
* Historical patterns
* Backtesting

The application should produce transparent research signals such as:

* STRONG BUY
* BUY
* ACCUMULATE
* HOLD
* REDUCE
* SELL
* STRONG SELL
* NO TRADE

The system must never represent a signal as a guaranteed profit.

---

# 2. Core Product Principle

The application must NOT behave like a simple chatbot that predicts stock prices.

The core architecture must be:

RAW DATA
→ DATA QUALITY
→ FEATURE ENGINEERING
→ FACTOR ANALYSIS
→ MARKET REGIME
→ COMPOSITE SCORE
→ RISK ANALYSIS
→ HISTORICAL VALIDATION
→ SIGNAL
→ AI EXPLANATION

The quantitative engine is responsible for generating the underlying signal.

The AI engine is responsible for:

* Explaining the signal
* Summarizing supporting factors
* Explaining risks
* Comparing bullish and bearish factors
* Answering research questions
* Generating human-readable reports

The AI engine must not independently override the quantitative engine.

---

# 3. Target Users

The initial application is intended for an individual market participant who wants a single research platform for:

* Long-term investing
* Positional investing
* Swing trading
* Futures research
* Options research
* Commodity research

The application should eventually support multiple users, but Version 1 is designed primarily for a single desktop user.

---

# 4. Markets Covered

## 4.1 Equity

The application should support:

* NSE equities
* BSE equities
* Large-cap stocks
* Mid-cap stocks
* Small-cap stocks
* ETFs where reliable data is available
* Index constituents

Initial focus should be on liquid securities.

---

# 5. Indices

The system should support major Indian indices, including where reliable data is available:

* NIFTY 50
* BANK NIFTY
* FINNIFTY
* MIDCAP indices
* sector indices
* Sensex
* other relevant NSE/BSE indices

The system architecture must allow new indices to be added without redesigning the application.

---

# 6. Futures

The application should support analysis of:

* Index futures
* Stock futures
* Commodity futures

Analysis should include:

* Price
* Volume
* Open Interest
* Change in Open Interest
* Basis
* Expiry
* Rollover information where available
* Futures positioning

---

# 7. Options

The application should support:

* Index options
* Stock options
* Commodity options where reliable data exists

The options engine should eventually analyze:

* Call OI
* Put OI
* Change in OI
* Volume
* Implied Volatility
* IV percentile
* Put/Call ratios
* Strike concentration
* Option Greeks
* Futures basis
* Expiry structure
* Unusual activity
* Support/resistance derived from option positioning

Options analysis must be treated separately from equity analysis.

---

# 8. Commodities

The application should eventually support MCX commodities, including relevant contracts such as:

* Gold
* Gold Mini
* Silver
* Crude Oil
* Natural Gas
* Other liquid MCX contracts

Commodity analysis must also consider relevant global factors.

Examples:

Gold:

* USD
* US Treasury yields
* geopolitical risk
* central-bank activity
* global risk sentiment

Crude Oil:

* OPEC/OPEC+
* geopolitical events
* US inventory
* global demand
* USD
* global growth

The system must use asset-specific factor relationships rather than applying the same model to every commodity.

---

# 9. Investment Horizons

The application must support multiple research horizons.

## Short Term

Approximately:

* Intraday
* 1–5 trading days

## Swing

Approximately:

* 5–30 trading days

## Positional

Approximately:

* 1–3 months

## Investment

Approximately:

* 6–12 months

## Long Term

Approximately:

* 1–10+ years

The same security may receive different signals for different horizons.

Example:

SHORT TERM: SELL

SWING: HOLD

LONG TERM: BUY

This is valid and should be clearly displayed.

---

# 10. Analysis Factors

The application should eventually analyze the following major factors.

## 10.1 Technical Analysis

Possible inputs include:

* Price trend
* Moving averages
* EMA
* SMA
* RSI
* MACD
* ADX
* ATR
* Bollinger Bands
* Momentum
* Rate of Change
* Support/resistance
* Breakouts
* Price structure
* Volume
* Relative volume
* Delivery data where available
* Accumulation/distribution

Exact formulas and weights will be defined separately in `QUANT_MODEL.md`.

---

# 11. Fundamental Analysis

The fundamental engine should analyze:

### Growth

* Revenue growth
* Profit growth
* EPS growth
* Earnings consistency
* Growth acceleration

### Profitability

* ROE
* ROCE
* EBITDA margin
* Net margin

### Balance Sheet

* Debt/equity
* Interest coverage
* Cash
* Free cash flow
* Liquidity

### Earnings Quality

* Operating cash flow
* Cash conversion
* Receivables
* Working capital
* Margin stability

### Management and Governance

* Promoter ownership
* Promoter pledge
* Promoter buying/selling
* Auditor concerns
* Corporate governance issues
* Related-party concerns

Exact formulas will be defined in `QUANT_MODEL.md`.

---

# 12. Smart Money / Big Investor Analysis

This is a core feature of the product.

The application should identify where major institutional and sophisticated investors are increasing or reducing exposure.

The system should monitor, where reliable and legally available:

* FII/FPI holdings
* DII holdings
* Mutual fund holdings
* Insurance-company holdings
* Institutional ownership
* Promoter activity
* Bulk deals
* Block deals
* Significant disclosed investors
* Major shareholder changes
* Institutional accumulation/distribution

The system should focus on CHANGE in ownership rather than only current ownership.

Example:

Previous holding:

1.20%

Current holding:

2.10%

Change:

+0.90 percentage points

This should be interpreted as institutional accumulation.

The system should also calculate:

* Accumulation
* Distribution
* Accumulation velocity
* Number of institutions accumulating
* Number of institutions exiting
* Concentration
* Persistence of accumulation

Smart Money analysis must clearly display the source and date of the information.

---

# 13. FII/DII Analysis

The system should monitor:

* Daily FII activity
* Daily DII activity
* Cash market activity
* Futures positioning where available
* Options positioning where available
* Rolling flows
* Short-term trends
* Medium-term trends

The system should distinguish:

* Daily activity
* 5-day activity
* 20-day activity
* Longer-term trends

A single day's buying/selling should not automatically produce a BUY/SELL signal.

---

# 14. Sector Analysis

Every stock should be evaluated relative to its sector.

The application should analyze:

* Sector momentum
* Sector relative strength
* Sector performance vs NIFTY
* Sector breadth
* Institutional activity
* Earnings momentum
* Valuation
* Sector-specific news
* Macro sensitivity

Example:

A technically strong banking stock in a strongly performing banking sector should receive stronger confirmation than an otherwise identical stock in a weak sector.

---

# 15. Market Breadth

The application should monitor overall market health using:

* Advance/Decline ratio
* Stocks above 20 DMA
* Stocks above 50 DMA
* Stocks above 200 DMA
* New highs
* New lows
* Sector breadth
* Breadth momentum

Market breadth should help determine whether a market movement is broad-based or concentrated in a small number of securities.

---

# 16. Global Market Analysis

The system should monitor relevant global markets and indicators.

Possible inputs include:

* S&P 500
* Nasdaq
* Dow Jones
* major Asian markets
* European markets
* US futures
* VIX
* USD
* USD/INR
* US Treasury yields
* crude oil
* gold
* other relevant global indicators

Global information should be interpreted according to the Indian asset being analyzed.

Example:

Rising crude oil may have different implications for:

* Airlines
* Paint companies
* Tyre companies
* Oil producers
* Oil marketing companies

---

# 17. Macroeconomic Analysis

The application should monitor relevant macroeconomic factors including:

* RBI policy
* Federal Reserve policy
* Interest rates
* Inflation
* GDP
* PMI
* liquidity
* bond yields
* currency
* credit conditions

Macro factors should be mapped to individual sectors/assets rather than being treated as universally bullish or bearish.

---

# 18. Geopolitical Intelligence

The system should detect important geopolitical events.

Examples:

* Wars
* Military escalation
* Sanctions
* Trade restrictions
* Tariffs
* Shipping disruptions
* OPEC decisions
* Political instability
* Major international agreements
* Supply-chain disruptions

The system must identify:

EVENT
→ ECONOMIC CHANNEL
→ ASSET IMPACT
→ SECTOR IMPACT
→ STOCK/COMMODITY IMPACT

For example:

Geopolitical escalation
→ Oil supply risk
→ Crude oil increases
→ Input costs increase
→ Airlines/paint/chemical sectors may be negatively affected.

The system must avoid simplistic rules such as:

"War = SELL everything."

---

# 19. News Intelligence

The application should collect relevant financial news from reliable sources.

News processing should consider:

* Sentiment
* Importance
* Source reliability
* Event type
* Affected company
* Affected sector
* Affected commodity
* Global impact
* Time decay
* Confirmation from multiple sources

Unverified rumors must have very low influence.

Official company announcements and regulatory disclosures should receive higher reliability.

---

# 20. Market Regime

The system must identify the current market regime.

Possible regimes:

* Strong Bull
* Bull
* Neutral
* Sideways
* Bear
* Strong Bear
* High Volatility
* Crisis/Risk-Off

Market regime should influence:

* Signal thresholds
* Factor weights
* Risk limits
* Position sizing recommendations
* Confidence

The exact regime algorithm will be defined in `QUANT_MODEL.md`.

---

# 21. Composite Score

Every security should eventually receive a composite research score:

0–100

The score should combine the individual factor scores.

Example:

Technical: 88
Fundamental: 81
Smart Money: 92
Sector: 85
Options: 79
Global: 68
Risk: 31

The final score must be explainable.

The application must show how each factor contributed to the result.

Exact weights and mathematical formulas will be defined separately in:

`QUANT_MODEL.md`

---

# 22. Risk Engine

Risk must be independent from the bullish/bearish score.

The risk engine should consider:

* Volatility
* ATR
* Beta
* Liquidity
* Bid/ask spread
* Gap risk
* Event risk
* Earnings risk
* Options IV
* Drawdown
* Market regime
* Geopolitical exposure

The system should produce:

**Risk Score: 0–100**

Higher score means higher risk.

---

# 23. Evidence Quality

Every signal must have an evidence-quality score.

The system should evaluate:

* Data freshness
* Data completeness
* Source reliability
* Number of independent confirmations
* Missing data
* Stale data

Example:

Composite Score: 86

Evidence Quality: 51

Final result:

NO TRADE / INSUFFICIENT DATA

The system must never produce a strong signal from poor-quality data.

---

# 24. Factor Agreement

The system should calculate whether different factors agree.

Example:

Technical: 90
Smart Money: 88
Sector: 85
Fundamental: 82

High agreement.

This should increase confidence.

Conversely:

Technical: 92
Fundamental: 28
Smart Money: 20
Options: 25

This represents a high-conflict setup and should reduce confidence.

---

# 25. Signal Stability

The system should monitor how stable a signal is over time.

Example:

09:30 BUY
10:00 BUY
10:30 BUY
11:00 BUY

Stable.

But:

09:30 BUY
10:00 SELL
10:30 BUY
11:00 SELL

Unstable.

Signal instability should reduce confidence and may result in:

NO TRADE.

---

# 26. Historical Validation

Every signal must eventually be compared with historical outcomes.

The system should determine how similar setups performed historically.

Example:

127 comparable historical setups

Profitable: 90

Unprofitable: 37

Historical success rate:

70.9%

This is NOT a guarantee of future performance.

The system should display this as historical model evidence.

---

# 27. BUY / SELL Decision

The final decision should not depend only on the composite score.

The decision engine should consider:

* Composite score
* Risk
* Evidence quality
* Factor agreement
* Signal stability
* Market regime
* Liquidity
* Expected reward/risk
* Historical performance
* Event risk

Possible final signals:

* STRONG BUY
* BUY
* ACCUMULATE
* HOLD
* REDUCE
* SELL
* STRONG SELL
* NO TRADE

---

# 28. Entry / Stop Loss / Target

Where appropriate, the system should calculate:

* Suggested entry zone
* Stop-loss
* Target 1
* Target 2
* Risk/reward ratio
* Expected holding period

Targets must be derived from the quantitative model.

The AI must not invent price targets.

---

# 29. Research Explanation

For every signal, the application should provide:

### Why the signal was generated

### Bullish factors

### Bearish factors

### Smart Money activity

### Technical setup

### Fundamental situation

### Options positioning

### Sector situation

### Global environment

### Macro environment

### Geopolitical risks

### Key events to watch

### What would invalidate the signal

Example:

> BUY — Score 84/100

> Primary reasons:
>
> * Strong technical trend
> * Institutional accumulation
> * Sector outperforming NIFTY
> * Positive earnings trend

> Risks:
>
> * Elevated valuation
> * High market volatility
> * Upcoming earnings event

---

# 30. Watchlist

Users should be able to create watchlists.

Example:

MY WATCHLIST

* Reliance
* HDFC Bank
* TCS
* Infosys
* ICICI Bank
* Gold
* Crude Oil

The application should automatically analyze watchlist securities whenever fresh data becomes available.

---

# 31. Market Scanner

The application should provide scanners such as:

### Strong BUY candidates

### Strong SELL candidates

### Institutional accumulation

### Smart Money accumulation

### Breakouts

### High relative volume

### Unusual options activity

### Sector leaders

### Sector laggards

### Oversold

### Overbought

### Fundamental quality

### High-risk opportunities

### Long-term opportunities

---

# 32. Alerts

The application should support desktop notifications for important events.

Examples:

* BUY signal generated
* SELL signal generated
* Signal changed
* Stop-loss reached
* Target reached
* Smart Money accumulation detected
* Large block deal detected
* Major geopolitical event
* Important company announcement
* Unusual options activity
* Market regime changed

Users should be able to configure alert thresholds.

---

# 33. Internet Connectivity

The application must work even when internet access is unavailable.

When offline:

* Existing historical data remains available
* Existing analysis remains viewable
* The UI remains functional
* No fake "live" information is displayed

When internet becomes available:

1. Detect connectivity.
2. Check provider availability.
3. Synchronize missing data.
4. Validate the data.
5. Update the database.
6. Recalculate affected models.
7. Generate new signals if required.
8. Record synchronization logs.

---

# 34. Automatic Analysis

The application should operate as a background research utility.

When internet is available, it should periodically:

1. Check market status.
2. Fetch relevant data.
3. Validate data.
4. Store raw data.
5. Generate features.
6. Run quantitative models.
7. Evaluate signals.
8. Update watchlists.
9. Generate alerts.
10. Store results.

The scheduling system must respect Indian market hours and exchange holidays.

---

# 35. Paper Trading

Before any live trading integration, the application should support paper trading.

Users should be able to simulate:

* Equity trades
* Futures trades
* Options trades
* Commodity trades

The system should calculate:

* Entry
* Exit
* P&L
* Brokerage assumptions
* Slippage
* Taxes/charges assumptions
* Maximum drawdown
* Win rate

No real order execution is permitted in the initial product.

---

# 36. Backtesting

The system must provide historical backtesting.

Users should be able to select:

* Security
* Strategy/model
* Date range
* Capital
* Position sizing
* Entry rules
* Exit rules
* Stop loss
* Target
* Transaction costs
* Slippage

The system should report:

* Number of trades
* Win rate
* Loss rate
* Net return
* CAGR
* Profit factor
* Expectancy
* Maximum drawdown
* Sharpe ratio
* Sortino ratio
* Average holding period
* Best trade
* Worst trade

---

# 37. No Look-Ahead Bias

This is a mandatory product requirement.

Historical analysis must use only information that was actually available at that point in time.

For example:

If a company announced results on August 15, the model must not use those results when generating a historical signal for August 14.

Data should therefore maintain concepts such as:

* Event time
* Period end
* Published time
* Available time
* Ingestion time

---

# 38. Model Versioning

Every signal must record:

* Model name
* Model version
* Parameters
* Factor weights
* Data version
* Timestamp

Example:

`SWING_MODEL_V1.0`

Future versions:

`SWING_MODEL_V1.1`

`SWING_MODEL_V2.0`

Historical results must never be silently recalculated using a new model version.

---

# 39. Auditability

For every generated signal, the system must be able to answer:

* What data was used?
* When was the data obtained?
* Which provider supplied it?
* Which model generated the signal?
* Which version of the model was used?
* What were the factor scores?
* What weights were used?
* Why was the signal generated?
* What risks existed?
* What happened afterward?

The application must maintain an audit trail.

---

# 40. AI Requirements

The AI assistant should be able to answer questions such as:

"What is happening in NIFTY today?"

"Why did the model give a BUY signal for Reliance?"

"Which stocks have strong institutional accumulation?"

"Which sectors are showing relative strength?"

"Why is the model bearish on this stock?"

"What changed since yesterday?"

"Which factors are currently conflicting?"

"Show me high-quality swing opportunities."

"Explain the options positioning."

AI responses must be based on structured application data.

AI must clearly distinguish:

* Data
* Model result
* Historical evidence
* Interpretation
* Uncertainty

AI must never claim certainty about future prices.

---

# 41. No Guaranteed Returns

The product must never promise:

* Guaranteed profit
* Guaranteed returns
* Guaranteed accuracy
* Guaranteed win rate

All signals must be presented as research/model outputs with uncertainty.

Historical performance must not be presented as a guarantee of future performance.

---

# 42. Regulatory / Compliance Design

The application must be designed so that compliance requirements can be incorporated before the product is distributed to other users or used as a commercial research/advisory service.

The architecture should support:

* Risk disclosures
* AI-use disclosures where required
* Data-source attribution
* Research records
* Audit trails
* Model version history
* Signal history
* User acknowledgements

The application must not automatically execute trades in Version 1.

Any public/commercial release must undergo appropriate legal and regulatory review before providing securities research/advisory services to customers.

---

# 43. Performance Requirements

The desktop application should:

* Start quickly
* Remain responsive during background analysis
* Never freeze the UI during data synchronization
* Perform heavy calculations in background workers
* Cache frequently used data
* Avoid unnecessary API calls
* Recover from temporary network failures
* Continue operating with partial data

---

# 44. Reliability Requirements

The system must handle:

* Internet disconnection
* API timeout
* API rate limits
* Invalid data
* Missing data
* Duplicate data
* Provider outage
* Database failure
* Application restart
* Partial synchronization

The system must never silently use invalid or stale data.

---

# 45. Security Requirements

The application must:

* Never hard-code API keys
* Store credentials securely
* Use environment/configuration management
* Encrypt sensitive credentials where appropriate
* Maintain application logs
* Avoid exposing API keys in logs
* Validate external data
* Restrict dangerous operations

No broker order execution is required in Version 1.

---

# 46. Product Phases

## Phase 1 — Architecture

Create the application foundation.

## Phase 2 — Market Data

Implement market data ingestion and storage.

## Phase 3 — Technical Engine

Implement technical indicators and validation.

## Phase 4 — Fundamental Engine

Implement fundamental analysis.

## Phase 5 — Smart Money

Implement institutional ownership and transaction analysis.

## Phase 6 — FII/DII

Implement institutional flow analysis.

## Phase 7 — Sector & Breadth

Implement sector and market breadth engines.

## Phase 8 — Options

Implement derivatives and options analytics.

## Phase 9 — Global/Macro

Implement global and macro analysis.

## Phase 10 — News/Geopolitical

Implement event intelligence.

## Phase 11 — Market Regime

Implement regime detection.

## Phase 12 — Composite Signal Engine

Combine all factors.

## Phase 13 — Risk Engine

Implement risk and reward/risk analysis.

## Phase 14 — Backtesting

Validate historical performance.

## Phase 15 — AI Research Assistant

Add AI explanations and research interaction.

## Phase 16 — Desktop Dashboard

Complete the desktop UI.

## Phase 17 — Paper Trading

Add simulated trading.

## Phase 18 — Production Hardening

Testing, security, reliability and packaging.

---

# 47. Definition of Success

The product should NOT be judged by whether it predicts every market movement.

Success means:

1. The system uses reliable data.
2. The methodology is transparent.
3. Signals are reproducible.
4. Historical testing is honest.
5. There is no look-ahead bias.
6. Risk is explicitly considered.
7. Smart Money activity is incorporated.
8. Global and geopolitical factors are incorporated.
9. Signals can be explained.
10. Model performance can be measured over time.
11. Poor-quality data prevents unreliable signals.
12. Every signal is auditable.
13. The system improves based on measured evidence rather than intuition.

---

# 48. Documents That Define Implementation

This document defines WHAT the product should do.

The following documents will define HOW each component works:

`MASTER_SPEC.md`

* Overall system specification

`QUANT_MODEL.md`

* Exact mathematical formulas
* Factor calculations
* Weights
* Scoring methodology

`DATABASE_SPEC.md`

* Tables
* Columns
* Relationships
* Indexes
* Data retention

`DATA_SOURCES.md`

* Approved data sources
* Provider interfaces
* Data freshness
* Source reliability

`SIGNAL_ENGINE.md`

* Signal-generation rules
* Risk filters
* Confidence
* Signal states

`BACKTESTING_SPEC.md`

* Backtesting methodology
* Metrics
* Look-ahead protection
* Walk-forward testing

`AI_ENGINE.md`

* AI responsibilities
* Prompt architecture
* Grounding
* Explanation rules

`UI_SPEC.md`

* Desktop application screens
* Dashboard
* Charts
* Watchlists
* Alerts
* Research views

`SECURITY_COMPLIANCE.md`

* Security
* Audit
* Data protection
* Regulatory considerations

---

# 49. Implementation Rule

Claude Code must treat this document as a product-level requirement.

Claude must NOT invent financial methodology when implementing features.

When a requirement is unclear:

1. Stop.
2. Identify the ambiguity.
3. Explain the available options.
4. Ask for clarification.

Do not silently choose financial rules that could materially affect BUY/SELL signals.

---

# 50. Current Status

PRODUCT REQUIREMENTS DEFINED

Quantitative formulas:
NOT YET DEFINED

Database schema:
NOT YET DEFINED

Data providers:
NOT YET APPROVED

Signal engine:
NOT YET IMPLEMENTED

Backtesting:
NOT YET IMPLEMENTED

AI engine:
NOT YET IMPLEMENTED

Live trading:
NOT PERMITTED

The next specification to be created is:

`MASTER_SPEC.md`

After that:

`QUANT_MODEL.md`

The quantitative model must be formally specified and reviewed before implementation of the signal engine begins.
