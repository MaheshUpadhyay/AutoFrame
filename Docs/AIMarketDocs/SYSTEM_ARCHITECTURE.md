# AI MARKET INTELLIGENCE

# SYSTEM ARCHITECTURE SPECIFICATION

**Document Version:** 1.0
**Status:** Architecture Specification
**Market:** India
**Primary Markets:** NSE, BSE, MCX
**Application Type:** Desktop Application
**Primary Purpose:** Market research, quantitative analysis, investment/trading signals and continuous market intelligence.

---

# 1. ARCHITECTURE OBJECTIVE

AI Market Intelligence is a desktop-based market research and decision-support platform for Indian:

* Equity
* Futures
* Options
* Commodities

The application continuously collects market and external information when internet connectivity is available, validates and stores the information, calculates quantitative factors, evaluates market conditions, identifies opportunities and generates:

```text
BUY
SELL
HOLD
NO TRADE
INSUFFICIENT DATA
```

recommendations.

The application must NOT depend on the AI alone for trading decisions.

The architecture must follow:

```text
DATA
  ↓
VALIDATION
  ↓
NORMALIZATION
  ↓
DATABASE
  ↓
FEATURE ENGINE
  ↓
FACTOR ENGINE
  ↓
QUANT MODEL
  ↓
RISK ENGINE
  ↓
SIGNAL ENGINE
  ↓
AI EXPLANATION
  ↓
USER
```

---

# 2. DESIGN PRINCIPLES

The system must follow these principles.

## 2.1 Data First

No analysis without reliable data.

## 2.2 No Hallucinated Market Data

The AI must never invent:

* prices
* volume
* OI
* FII/DII flows
* institutional holdings
* news
* financial results
* geopolitical events
* market status

## 2.3 Modular Architecture

Every major capability must be replaceable.

## 2.4 Provider Independence

The system must not depend permanently on one market-data provider.

## 2.5 Auditability

Every recommendation must be explainable and reproducible.

## 2.6 Point-in-Time Correctness

Historical analysis must only use information that was actually available at that historical timestamp.

## 2.7 Risk Before Recommendation

The system must evaluate risk before generating a high-confidence recommendation.

## 2.8 NO TRADE Is a Valid Result

The system must be comfortable saying:

```text
NO TRADE
```

when evidence is weak or conflicting.

---

# 3. HIGH-LEVEL ARCHITECTURE

```text
                         ┌──────────────────────┐
                         │      INTERNET        │
                         └──────────┬───────────┘
                                    │
                  ┌─────────────────┼──────────────────┐
                  │                 │                  │
                  ▼                 ▼                  ▼
             EXCHANGES       MARKET DATA APIs       NEWS
             NSE/BSE/MCX       BROKER APIs         MACRO
                  │                 │             GEOPOLITICAL
                  └─────────────────┼──────────────────┘
                                    │
                                    ▼
                         ┌────────────────────┐
                         │ DATA INGESTION     │
                         │ ENGINE             │
                         └─────────┬──────────┘
                                   │
                                   ▼
                         ┌────────────────────┐
                         │ VALIDATION ENGINE  │
                         └─────────┬──────────┘
                                   │
                                   ▼
                         ┌────────────────────┐
                         │ NORMALIZATION      │
                         │ ENGINE             │
                         └─────────┬──────────┘
                                   │
                                   ▼
                         ┌────────────────────┐
                         │ CENTRAL DATABASE   │
                         └─────────┬──────────┘
                                   │
             ┌─────────────────────┼──────────────────────┐
             │                     │                      │
             ▼                     ▼                      ▼
      FEATURE ENGINE        NEWS/EVENT ENGINE       SMART MONEY
             │                     │                      │
             └─────────────────────┼──────────────────────┘
                                   │
                                   ▼
                         ┌────────────────────┐
                         │ FACTOR ENGINE      │
                         └─────────┬──────────┘
                                   │
                                   ▼
                         ┌────────────────────┐
                         │ QUANT MODEL        │
                         └─────────┬──────────┘
                                   │
                                   ▼
                         ┌────────────────────┐
                         │ RISK ENGINE        │
                         └─────────┬──────────┘
                                   │
                                   ▼
                         ┌────────────────────┐
                         │ SIGNAL ENGINE      │
                         └─────────┬──────────┘
                                   │
                                   ▼
                         ┌────────────────────┐
                         │ AI EXPLANATION     │
                         └─────────┬──────────┘
                                   │
                                   ▼
                         ┌────────────────────┐
                         │ DESKTOP DASHBOARD  │
                         └────────────────────┘
```

---

# 4. APPLICATION LAYERS

The application should be divided into the following layers.

```text
1. Presentation Layer
2. Application Layer
3. Research Layer
4. Quantitative Layer
5. Data Layer
6. Integration Layer
7. Infrastructure Layer
```

---

# 5. PRESENTATION LAYER

The desktop UI is responsible for displaying:

```text
Market Dashboard
Watchlist
Stock Analysis
Options Analysis
Commodity Analysis
Signals
Portfolio
Alerts
News
Smart Money
Market Regime
FII/DII
Global Markets
System Health
Data Sources
Settings
```

The UI must never directly access external APIs.

Architecture:

```text
UI
 ↓
Application Services
 ↓
Database / Analysis Engine
```

---

# 6. APPLICATION LAYER

The application layer coordinates workflows.

Responsibilities:

```text
Start application
Detect internet
Start synchronization
Schedule analysis
Request analysis
Generate signals
Trigger alerts
Manage watchlists
Manage user preferences
Manage configuration
```

Example services:

```text
MarketService
AnalysisService
SignalService
AlertService
PortfolioService
WatchlistService
SyncService
SystemHealthService
```

---

# 7. DATA INGESTION ENGINE

The Data Ingestion Engine retrieves external data.

Responsibilities:

```text
Connect to provider
Authenticate
Request data
Parse response
Timestamp response
Validate response
Store raw response
Send normalized data downstream
```

It must support multiple providers.

---

# 8. PROVIDER ADAPTER ARCHITECTURE

Use an adapter pattern.

```text
                Provider Interface
                       │
       ┌───────────────┼────────────────┐
       │               │                │
       ▼               ▼                ▼
   NSE Adapter     Broker Adapter    News Adapter
       │               │                │
       ▼               ▼                ▼
   Provider A       Provider B       Provider C
```

The research engine must only communicate with the standardized interface.

---

# 9. PROVIDER REGISTRY

Create:

```text
ProviderRegistry
```

Responsibilities:

```text
Register providers
Enable/disable providers
Determine priority
Check provider health
Select fallback
Track failures
Track rate limits
```

Example:

```text
ProviderRegistry
    ↓
Primary Provider
    ↓
Fallback Provider
    ↓
Mock Provider
```

---

# 10. INTERNET CONNECTIVITY SERVICE

The application must detect internet connectivity automatically.

Component:

```text
ConnectivityService
```

Possible states:

```text
ONLINE
OFFLINE
CONNECTING
DEGRADED
UNKNOWN
```

The application must not assume internet availability.

---

# 11. ONLINE WORKFLOW

When internet becomes available:

```text
ConnectivityService
        ↓
ONLINE
        ↓
Provider Health Check
        ↓
Determine Missing/Stale Data
        ↓
Incremental Synchronization
        ↓
Validation
        ↓
Normalization
        ↓
Database Update
        ↓
Feature Recalculation
        ↓
Factor Recalculation
        ↓
Market Regime Update
        ↓
Signal Generation
        ↓
Alerts
```

---

# 12. OFFLINE WORKFLOW

When internet is unavailable:

```text
ConnectivityService
        ↓
OFFLINE
        ↓
Use Local Database
        ↓
Display Last Known Data
```

The application must clearly display:

```text
OFFLINE
LAST UPDATED: YYYY-MM-DD HH:MM
```

It must never represent stale data as live data.

---

# 13. INTERNET RECOVERY

When connectivity returns:

```text
OFFLINE
   ↓
Internet Detected
   ↓
Calculate Missing Data
   ↓
Incremental Sync
   ↓
Validate
   ↓
Update Database
   ↓
Run Analysis
```

The system must avoid downloading everything from scratch.

---

# 14. SCHEDULER

Create a central:

```text
MarketScheduler
```

It controls all periodic activities.

Responsibilities:

```text
Pre-market analysis
Market-hours analysis
Post-market analysis
Overnight analysis
News monitoring
Global market monitoring
FII/DII update
Portfolio update
Database maintenance
Provider health checks
```

---

# 15. SCHEDULER MUST BE MARKET-AWARE

The scheduler must understand:

```text
Indian market holidays
Trading sessions
Pre-market
Normal market
Post-market
MCX sessions
Weekend
Global market sessions
```

Do not hard-code dates.

Use a configurable trading calendar.

---

# 16. ANALYSIS CYCLES

The system should have:

## PRE-MARKET

Collect:

```text
Global markets
US close
Asian markets
US futures
Crude
Gold
USDINR
DXY
India VIX
Overnight news
Geopolitical events
Macro events
FII/DII
```

Generate:

```text
Market Bias
Sector Bias
Watchlist Opportunities
Risk Warnings
```

---

## INTRADAY

Monitor:

```text
Price
Volume
Open Interest
Options
Market breadth
Sector rotation
FII/DII
News
Global markets
Volatility
```

---

## POST-MARKET

Process:

```text
Closing prices
Volume
Breadth
FII/DII
Institutional activity
Options OI
Sector performance
Corporate announcements
News
```

---

## OVERNIGHT

Monitor:

```text
US markets
Asian markets
Global futures
Commodities
Currencies
Geopolitical events
Major global news
Macro events
```

---

# 17. CENTRAL DATABASE

The database is the central source for the research engine.

Architecture:

```text
External Data
     ↓
Validated Data
     ↓
Database
     ↓
Research
```

The UI should primarily retrieve data from the database instead of repeatedly calling external APIs.

Refer to:

```text
DATABASE_SPEC.md
```

for the complete database design.

---

# 18. RAW DATA LAYER

Store raw external responses where legally permitted.

Purpose:

```text
Audit
Debugging
Reprocessing
Historical reconstruction
Provider comparison
```

Raw data should never be directly used by the UI.

---

# 19. NORMALIZED DATA LAYER

All external data must be transformed into common internal structures.

Example:

```text
External Provider
      ↓
Provider Adapter
      ↓
Normalized MarketQuote
```

Example object:

```text
MarketQuote {
    instrumentId
    timestamp
    open
    high
    low
    close
    ltp
    volume
    openInterest
    source
}
```

---

# 20. FEATURE ENGINE

The Feature Engine calculates measurable features.

Categories:

```text
Technical
Momentum
Trend
Volatility
Volume
Liquidity
Market Breadth
Options
Fundamental
Valuation
Institutional
Smart Money
Macro
Global
Commodity
Currency
Geopolitical
Sentiment
```

---

# 21. TECHNICAL FEATURE ENGINE

Calculate features such as:

```text
SMA
EMA
RSI
MACD
ADX
ATR
Bollinger Bands
VWAP
Support
Resistance
Breakouts
Trend strength
Momentum
Volume anomalies
```

Indicators should be treated as evidence, not automatic trading rules.

---

# 22. OPTIONS FEATURE ENGINE

Calculate:

```text
Call OI
Put OI
Change in OI
Put/Call Ratio
IV
IV Rank
IV Percentile
Max Pain
Option volume
OI concentration
Strike concentration
Support zones
Resistance zones
```

Where valid data is available, calculate:

```text
Delta
Gamma
Theta
Vega
```

---

# 23. FUNDAMENTAL FEATURE ENGINE

Calculate:

```text
Revenue growth
Profit growth
EPS growth
ROE
ROCE
Debt/Equity
Operating margin
Net margin
Free cash flow
PE
PB
EV/EBITDA
Dividend yield
Earnings growth
Valuation percentile
```

The system must account for sector differences.

---

# 24. SMART MONEY ENGINE

This is a dedicated component.

Inputs:

```text
FII/FPI
DII
Mutual Funds
Insurance
Promoters
Insiders
Bulk Deals
Block Deals
Institutional Holdings
Price/Volume Confirmation
```

Output:

```text
SMART_MONEY_SCORE
```

The system should identify:

```text
Accumulation
Distribution
Institutional entry
Institutional exit
Promoter accumulation
Promoter selling
Unusual institutional activity
```

---

# 25. SECTOR ROTATION ENGINE

The system should rank sectors.

Example:

```text
IT
BANKING
AUTO
PHARMA
ENERGY
METALS
REALTY
FMCG
CONSUMER
INFRA
```

Calculate:

```text
Sector momentum
Relative strength
Institutional flow
Volume
Breadth
News
Global correlation
```

Output:

```text
STRONG
IMPROVING
NEUTRAL
WEAKENING
WEAK
```

---

# 26. GLOBAL MARKET ENGINE

Track:

```text
S&P 500
NASDAQ
Dow Jones
Russell 2000
Nikkei
Hang Seng
Shanghai
FTSE
DAX
CAC
```

Also:

```text
VIX
US 10Y
DXY
USDINR
Crude
Gold
```

Calculate:

```text
Global Risk Score
Risk-On/Risk-Off
Global Momentum
Correlation
```

---

# 27. MACRO ENGINE

Track:

```text
Inflation
Interest rates
RBI policy
Fed policy
GDP
PMI
Employment
Liquidity
Bond yields
Currency
```

Output:

```text
MACRO_BIAS
```

---

# 28. GEOPOLITICAL ENGINE

Track events such as:

```text
Wars
Military escalation
Sanctions
Trade restrictions
Political events
Shipping disruptions
Energy supply disruption
Major elections
International conflicts
```

Each event should have:

```text
Severity
Probability
Countries affected
Sectors affected
Commodities affected
Market impact
Time horizon
Confidence
```

The system must avoid emotional or sensational interpretation.

---

# 29. NEWS ENGINE

The News Engine:

```text
Collects news
      ↓
Deduplicates
      ↓
Clusters events
      ↓
Identifies entities
      ↓
Calculates sentiment
      ↓
Calculates importance
      ↓
Maps affected stocks/sectors
```

The same underlying event must not be counted multiple times simply because many websites reported it.

---

# 30. MARKET REGIME ENGINE

The application must identify the current market regime.

Possible regimes:

```text
STRONG_BULL
BULL
NEUTRAL
VOLATILE_BULL
VOLATILE_BEAR
BEAR
STRONG_BEAR
CRISIS
```

Factors:

```text
Index trend
Breadth
Volatility
FII/DII
Global markets
Liquidity
Macro
Credit conditions
Sector rotation
```

---

# 31. FACTOR ENGINE

The Factor Engine converts raw features into normalized scores.

Example:

```text
Technical Score
Momentum Score
Fundamental Score
Valuation Score
Options Score
Smart Money Score
Sector Score
Global Score
Macro Score
Geopolitical Score
Sentiment Score
```

Each score:

```text
0–100
```

---

# 32. QUANT MODEL

The Quant Model combines factor scores.

Example architecture:

```text
Technical
Momentum
Fundamental
Valuation
Options
Smart Money
Sector
Global
Macro
Geopolitical
Sentiment
      ↓
Weighted Model
      ↓
Composite Score
```

The exact weights and formulas are defined in:

```text
QUANT_MODEL.md
```

Do not duplicate the formulas here.

---

# 33. RISK ENGINE

The Risk Engine evaluates:

```text
Volatility
ATR
Liquidity
Drawdown
Market regime
Event risk
Gap risk
Options risk
Correlation
Position size
Stop-loss distance
Risk/reward
```

It can override an otherwise attractive signal.

Example:

```text
High Score
+
Extreme Volatility
+
Major Event Tomorrow
=
NO TRADE
```

---

# 34. SIGNAL ENGINE

The Signal Engine converts model output into an actionable recommendation.

Possible output:

```text
STRONG BUY
BUY
HOLD
SELL
STRONG SELL
NO TRADE
```

Every signal must contain:

```text
Instrument
Signal
Composite Score
Confidence
Risk Level
Entry Zone
Stop Loss
Target Zone
Expected Holding Period
Reason
Invalidation Conditions
Timestamp
Data Quality
```

---

# 35. SIGNAL CONFIDENCE

Confidence must not simply equal the model score.

It should consider:

```text
Model strength
Data quality
Data freshness
Source reliability
Factor agreement
Market regime
Risk
Conflicting evidence
```

---

# 36. SIGNAL EXPLANATION

Every signal must answer:

```text
WHY?
```

Example:

```text
BUY RELIANCE

Score: 78/100
Confidence: 82%

Positive:
+ Strong price momentum
+ Institutional accumulation
+ Sector strength
+ Improving earnings trend

Negative:
- Elevated volatility

Risk:
Medium

Invalidation:
Below ₹X
```

The exact values must come from the model.

---

# 37. AI EXPLANATION LAYER

The AI is responsible for:

```text
Explaining model output
Summarizing news
Connecting evidence
Explaining risk
Answering user questions
Generating research reports
```

The AI is NOT responsible for independently inventing signals.

Architecture:

```text
Structured Evidence
       ↓
Quant Model
       ↓
Signal
       ↓
AI
       ↓
Human-readable explanation
```

---

# 38. AI GUARDRAILS

The AI must:

```text
Never invent data
Never invent sources
Never invent prices
Never claim certainty
Never hide conflicting evidence
Never override risk rules
Never convert weak evidence into confidence
```

If evidence is insufficient:

```text
INSUFFICIENT DATA
```

must be returned.

---

# 39. INVESTMENT HORIZON ENGINE

Signals must support different horizons:

```text
INTRADAY
SWING
SHORT_TERM
MEDIUM_TERM
LONG_TERM
```

The model weights can vary by horizon.

For example:

```text
Intraday:
Price + volume + options + market regime

Long-term:
Fundamentals + valuation + earnings + institutional ownership
```

Exact weighting belongs in `QUANT_MODEL.md`.

---

# 40. EQUITY ENGINE

For equity:

```text
Market regime
+
Sector
+
Technical
+
Fundamental
+
Valuation
+
Smart money
+
News
+
Macro
+
Global
+
Risk
```

generate the research score.

---

# 41. OPTIONS ENGINE

Options analysis must be separate from equity analysis.

It must consider:

```text
Underlying trend
IV
OI
Change in OI
Volume
Greeks
Expiry
Time decay
Liquidity
Bid/ask spread
Event risk
```

The system must never recommend an option simply because the underlying has a BUY score.

---

# 42. OPTIONS STRATEGY ENGINE

Potential strategies:

```text
CALL BUY
PUT BUY
BULL CALL SPREAD
BEAR PUT SPREAD
COVERED CALL
PROTECTIVE PUT
NO TRADE
```

Only enable strategies that satisfy liquidity and risk requirements.

---

# 43. COMMODITY ENGINE

Support:

```text
Gold
Gold Mini
Silver
Crude Oil
Crude Oil Mini
Natural Gas
Copper
Other supported MCX contracts
```

Consider:

```text
Global commodity price
USDINR
International supply/demand
Geopolitics
Inventory
Macro
Technical trend
Open interest
```

---

# 44. WATCHLIST ENGINE

Users can maintain:

```text
Stocks
Indices
Options
Commodities
```

The application periodically recalculates watchlist scores.

Example:

```text
Watchlist
----------------------------------
RELIANCE       82   BUY
HDFCBANK       76   BUY
TCS            63   HOLD
INFY           42   SELL
GOLDM          79   BUY
```

---

# 45. OPPORTUNITY SCANNER

The scanner should identify opportunities across the supported universe.

Filters:

```text
High score
Improving score
Momentum
Breakout
Institutional accumulation
Unusual volume
Options activity
Valuation
Sector strength
```

Output:

```text
Top Opportunities
```

---

# 46. ALERT ENGINE

Alerts should be generated when important conditions occur.

Examples:

```text
Signal changed
Score crossed threshold
Breakout detected
Institutional accumulation detected
Major news
Geopolitical event
Large OI change
Stop loss reached
Target reached
Market regime changed
```

---

# 47. ALERT PRIORITY

Levels:

```text
INFO
LOW
MEDIUM
HIGH
CRITICAL
```

Critical alerts should be reserved for significant events.

---

# 48. NOTIFICATION CHANNELS

Architecture should support:

```text
Desktop notification
Sound
Email
Telegram
WhatsApp
Mobile notification
```

These should be implemented through adapters.

Example:

```text
NotificationService
       │
       ├── Desktop
       ├── Email
       ├── Telegram
       └── Other
```

---

# 49. PORTFOLIO ENGINE

Optional portfolio tracking:

```text
Holdings
Average price
Quantity
Current price
P&L
Allocation
Sector exposure
Risk
Drawdown
```

Portfolio analysis should be separate from the signal engine.

---

# 50. PAPER TRADING

Before any future broker integration, the system should support paper trading.

Architecture:

```text
Signal
 ↓
Paper Trade
 ↓
Entry
 ↓
Exit
 ↓
P&L
 ↓
Performance Analysis
```

This is required for validating the model before real-money automation.

---

# 51. BACKTESTING ENGINE

The system must support:

```text
Historical data
Point-in-time data
Historical signals
Historical entry
Historical exit
Transaction costs
Slippage
Taxes/fees where modeled
```

Output:

```text
Win rate
Average return
Maximum drawdown
Profit factor
Sharpe ratio
Sortino ratio
Expectancy
Number of trades
```

---

# 52. WALK-FORWARD VALIDATION

Do not rely only on a single historical backtest.

Support:

```text
Training period
Validation period
Test period
Walk-forward testing
```

This reduces overfitting.

---

# 53. MODEL VERSIONING

Every signal must store:

```text
model_version
factor_version
data_version
signal_timestamp
```

Example:

```text
Model:
v1.0.3
```

If the model changes, historical results must remain reproducible.

---

# 54. RESEARCH SNAPSHOT

Every generated signal should create a research snapshot.

Example:

```text
SignalSnapshot

instrument
timestamp
market_regime
factor_scores
risk_score
data_quality
source_summary
model_version
signal
confidence
```

This allows later investigation:

```text
"What did the model know at that time?"
```

---

# 55. DAILY RESEARCH REPORT

The system should generate:

```text
Morning Report
Intraday Update
Closing Report
Overnight Report
Weekly Report
```

Reports should contain:

```text
Market overview
Global markets
FII/DII
Sector rotation
Smart money
Top opportunities
Top risks
News
Geopolitical events
Options view
Commodity view
```

---

# 56. SYSTEM HEALTH

The dashboard must show:

```text
Internet
Database
Data providers
Scheduler
Analysis engine
News engine
Signal engine
Notification engine
```

Example:

```text
SYSTEM HEALTH

Internet        🟢
Database        🟢
Market Data     🟢
Options Data    🟢
News            🟢
Global Data     🟢
Analysis        🟢
Signals         🟢
Notifications   🟢
```

---

# 57. ERROR HANDLING

No component should crash the entire application because one provider failed.

Example:

```text
News Provider ❌
       ↓
News degraded
       ↓
Other systems continue
```

Only critical failures should stop dependent processes.

---

# 58. CIRCUIT BREAKER

External providers must use circuit breakers.

If a provider repeatedly fails:

```text
Provider
   ↓
Failures
   ↓
Circuit Open
   ↓
Fallback Provider
```

After a cooldown:

```text
Health Check
   ↓
Recovery
   ↓
Circuit Closed
```

---

# 59. LOGGING

Use structured logs.

Every important operation should record:

```text
timestamp
level
component
operation
provider
instrument
message
error
duration
```

Levels:

```text
DEBUG
INFO
WARNING
ERROR
CRITICAL
```

---

# 60. AUDIT LOG

Maintain a separate audit log for:

```text
Signal generated
Signal changed
Signal cancelled
Model version changed
Configuration changed
Provider changed
Data conflict
Risk override
User action
```

---

# 61. SECURITY

Sensitive information must never be stored in source code.

Use:

```text
Environment variables
Encrypted configuration
OS credential store
```

Protect:

```text
API keys
Broker credentials
Notification credentials
Database credentials
```

---

# 62. DESKTOP APPLICATION ARCHITECTURE

The application should be structured so that the UI is independent of the research engine.

Preferred:

```text
Desktop UI
    ↓
Local Application API / Service Layer
    ↓
Research Engine
    ↓
Database
```

This allows future migration to:

```text
Web App
Mobile App
Cloud Service
```

without rewriting the core research engine.

---

# 63. DESKTOP STARTUP

When application starts:

```text
START
 ↓
Load configuration
 ↓
Initialize database
 ↓
Initialize logging
 ↓
Check internet
 ↓
Check provider health
 ↓
Load market calendar
 ↓
Load latest database state
 ↓
Start scheduler
 ↓
Start required synchronization
 ↓
Run analysis
 ↓
Display dashboard
```

---

# 64. DESKTOP SHUTDOWN

Before shutdown:

```text
Save state
Flush logs
Complete database transactions
Save scheduler state
Save provider checkpoints
Close connections
```

The application must recover safely after an unexpected shutdown.

---

# 65. DATABASE-FIRST DESIGN

Do not allow every UI screen to independently call external APIs.

Bad:

```text
Dashboard → NSE
Options → NSE
Portfolio → Broker
News → News API
```

Preferred:

```text
External APIs
      ↓
Data Layer
      ↓
Database
      ↓
All UI screens
```

---

# 66. EVENT-DRIVEN INTERNAL ARCHITECTURE

Use internal events where appropriate.

Examples:

```text
MarketDataUpdated
OptionsDataUpdated
NewsReceived
GeopoliticalEventDetected
InstitutionalDataUpdated
MarketRegimeChanged
SignalGenerated
SignalChanged
ProviderFailed
InternetConnected
InternetDisconnected
```

Example:

```text
MarketDataUpdated
       ↓
Feature Engine
       ↓
Factor Engine
       ↓
Signal Engine
```

---

# 67. EVENT BUS

Create:

```text
EventBus
```

Components can subscribe to relevant events.

Example:

```text
EventBus
 ├── FeatureEngine
 ├── NewsEngine
 ├── SignalEngine
 ├── AlertEngine
 └── DashboardService
```

Avoid tightly coupling components.

---

# 68. CACHING

Use caching for frequently requested information.

Examples:

```text
Current quotes
Latest market regime
Latest factor scores
Latest signals
Instrument metadata
```

Cache invalidation must be timestamp-based.

---

# 69. PERFORMANCE REQUIREMENT

The system should not recalculate the entire market universe every time one stock changes.

Use incremental processing.

Example:

```text
RELIANCE updated
      ↓
Recalculate RELIANCE-dependent features
      ↓
Recalculate RELIANCE signal
```

Only recalculate global factors when required.

---

# 70. SCALABILITY

Initial version may support:

```text
NIFTY 50
NIFTY NEXT 50
Major indices
Selected commodities
Selected options
User watchlist
```

Architecture must later support:

```text
Full NSE universe
Full BSE universe
Large options universe
Large commodity universe
```

without major redesign.

---

# 71. CONFIGURATION

Do not hard-code:

```text
Factor weights
Signal thresholds
Provider settings
Refresh intervals
Universe
Risk limits
Alert thresholds
```

These should be configurable.

However:

## Configuration changes must be versioned.

---

# 72. CONFIGURATION HIERARCHY

Use:

```text
Default Configuration
        ↓
Environment Configuration
        ↓
User Configuration
        ↓
Runtime Configuration
```

Higher-level configuration overrides lower-level configuration.

---

# 73. TESTING ARCHITECTURE

Testing must include:

```text
Unit Tests
Integration Tests
Provider Tests
Database Tests
Quant Model Tests
Backtest Tests
Signal Tests
UI Tests
Failure Tests
```

---

# 74. QUANT MODEL TESTING

Every scoring algorithm must have deterministic tests.

Example:

```text
Input Dataset
     ↓
Expected Score
     ↓
Actual Score
     ↓
PASS / FAIL
```

Changing the model intentionally should update the model version and expected results.

---

# 75. DATA FAILURE TESTING

Test:

```text
No internet
Provider timeout
Provider returns invalid JSON
Provider returns empty response
Missing fields
Stale data
Duplicate data
Conflicting data
Invalid timestamp
```

The system must fail safely.

---

# 76. SIGNAL SAFETY

Before publishing a signal:

```text
Data Validation
       ↓
Data Quality
       ↓
Model Calculation
       ↓
Risk Check
       ↓
Signal Validation
```

Only then:

```text
PUBLISH SIGNAL
```

---

# 77. SIGNAL LIFECYCLE

A signal should have a lifecycle:

```text
CREATED
ACTIVE
UPDATED
WEAKENED
INVALIDATED
TARGET_REACHED
STOPPED
EXPIRED
CANCELLED
```

---

# 78. SIGNAL INVALIDATION

Signals must include explicit invalidation conditions.

Example:

```text
BUY

Invalidated if:
Price < support
OR
Market regime changes
OR
Fundamental event invalidates thesis
OR
Risk threshold exceeded
```

---

# 79. SIGNAL HISTORY

Store every signal change.

Example:

```text
10:00 BUY
10:30 STRONG BUY
12:00 BUY
14:30 HOLD
15:20 SELL
```

Never overwrite historical signals.

---

# 80. PERFORMANCE TRACKING

The system must track how signals perform.

For every signal:

```text
Signal price
Maximum favorable excursion
Maximum adverse excursion
Exit price
Return
Holding time
Outcome
```

This is essential for determining whether the model actually works.

---

# 81. MODEL PERFORMANCE DASHBOARD

Show:

```text
Total Signals
Winning Signals
Losing Signals
Win Rate
Average Return
Median Return
Maximum Drawdown
Profit Factor
Expectancy
Performance by Sector
Performance by Horizon
Performance by Market Regime
```

Do NOT optimize the model only for win rate.

---

# 82. MODEL DRIFT

Monitor whether model performance deteriorates.

Example:

```text
Historical Win Rate: 64%
Recent Win Rate: 48%
```

This should trigger:

```text
MODEL_DRIFT_WARNING
```

---

# 83. NO AUTOMATIC SELF-MODIFICATION

The system must NOT automatically change model weights because recent signals performed poorly.

Model changes require:

```text
Backtesting
Validation
Approval
New Model Version
```

---

# 84. AI MODEL ABSTRACTION

The AI provider must also be replaceable.

Create:

```text
AIProvider
```

Example:

```text
AIProvider
   ├── ClaudeAdapter
   ├── OpenAIAdapter
   └── LocalModelAdapter
```

The quantitative engine must work even if AI is unavailable.

---

# 85. AI FAILURE MODE

If AI is unavailable:

```text
Quant Model
    ↓
Signal
    ↓
Structured Explanation
```

The application should continue operating.

AI is an enhancement, not a critical dependency for calculations.

---

# 86. RESEARCH CHAT

The desktop application should eventually provide a research assistant.

Examples:

```text
"Why is Reliance showing BUY?"

"Which sectors have strongest institutional accumulation?"

"Which stocks have improving fundamentals and momentum?"

"What changed in the market today?"

"Why did NIFTY fall today?"

"What are the biggest risks tomorrow?"
```

The AI must answer using database-backed evidence.

---

# 87. RESEARCH CHAT DATA FLOW

```text
User Question
      ↓
Intent Detection
      ↓
Database Query
      ↓
Research Engine
      ↓
Structured Evidence
      ↓
AI
      ↓
Answer
```

Do not let the AI answer current-market questions from its memory.

---

# 88. RESEARCH TRACE

Every AI answer should optionally provide:

```text
Data used
Timestamp
Sources
Calculations
Model version
```

This improves trust.

---

# 89. DESKTOP DASHBOARD

Main dashboard:

```text
==================================================
AI MARKET INTELLIGENCE
==================================================

MARKET REGIME
NIFTY       BULLISH
BANK NIFTY  NEUTRAL
VIX         MODERATE

GLOBAL
US          ▲
ASIA        ▼
DXY         ▲
CRUDE       ▲
GOLD        ▲

FII/DII
FII         ₹...
DII         ₹...

TOP OPPORTUNITIES
1. STOCK A     BUY       84
2. STOCK B     BUY       81
3. STOCK C     BUY       78

TOP RISKS
1. Geopolitical event
2. US market weakness
3. High volatility

SYSTEM
Internet       🟢
Market Data     🟢
News            🟢
Database        🟢
==================================================
```

---

# 90. STOCK DETAIL SCREEN

For each stock:

```text
Price
Chart
Technical Score
Fundamental Score
Valuation Score
Smart Money Score
Options Score
Sector Score
Global Score
Macro Score
News Score
Composite Score
Risk
Signal
Confidence
```

Also show:

```text
Why BUY?
Why NOT BUY?
What can invalidate this?
```

---

# 91. OPTIONS DETAIL SCREEN

Show:

```text
Underlying
Expiry
Strike
CE/PE
LTP
OI
Change OI
Volume
IV
Greeks
Liquidity
Spread
Signal
Risk
```

---

# 92. COMMODITY DETAIL SCREEN

Show:

```text
Commodity
Contract
Price
Trend
OI
Volume
Global price
USDINR
Macro
Geopolitical
Signal
Risk
```

---

# 93. MARKET BREADTH SCREEN

Show:

```text
Advances
Declines
Advance/Decline Ratio
New Highs
New Lows
Stocks above 20 DMA
Stocks above 50 DMA
Stocks above 200 DMA
```

---

# 94. SMART MONEY SCREEN

This is a major feature.

Show:

```text
Top Institutional Accumulation
Top Institutional Distribution
FII Buying
FII Selling
DII Buying
DII Selling
Mutual Fund Changes
Promoter Buying
Promoter Selling
Bulk Deals
Block Deals
```

Ranking:

```text
SMART MONEY SCORE
```

---

# 95. MARKET INTELLIGENCE TIMELINE

Create a timeline:

```text
09:00
Global markets positive

09:15
Indian market opens

10:05
Large institutional buying detected

11:20
Crude rises 2%

12:10
Geopolitical event detected

13:30
Banking sector weakens

14:15
Market regime confidence reduced

15:20
Signal changed from BUY → HOLD
```

This will help the user understand why the market view changes.

---

# 96. IMPORTANT EVENT ENGINE

Maintain a priority queue:

```text
CRITICAL
HIGH
MEDIUM
LOW
```

Examples:

```text
RBI decision       CRITICAL
Major war escalation HIGH
Large company result HIGH
Minor company news LOW
```

---

# 97. PREVENT DOUBLE COUNTING

The same information should not influence the model multiple times.

Example:

```text
Oil price ↑
News about oil ↑
News sentiment ↑
Commodity model ↑
```

These may all represent the same underlying event.

The architecture must support correlation/de-duplication logic.

---

# 98. FACTOR CORRELATION

The system should eventually monitor whether factors are highly correlated.

Example:

```text
Momentum
Technical
Price Trend
```

may contain overlapping information.

Avoid giving excessive combined weight to duplicate signals.

---

# 99. RESEARCH VS EXECUTION

Version 1 is:

```text
RESEARCH + SIGNALS + PAPER TRADING
```

NOT:

```text
AUTOMATIC REAL-MONEY TRADING
```

Broker execution must be a future optional module.

---

# 100. FUTURE BROKER EXECUTION

If eventually added:

```text
Signal
 ↓
Risk Validation
 ↓
User Confirmation
 ↓
Broker Adapter
 ↓
Order
```

Automatic execution must NOT be enabled by default.

---

# 101. DATABASE AS SINGLE INTERNAL SOURCE

All internal components should consume standardized database-backed information.

```text
Providers
   ↓
Database
   ↓
Everything Else
```

This provides:

```text
Consistency
Auditability
Reproducibility
Performance
Offline capability
```

---

# 102. COMPONENT DEPENDENCY RULE

High-level components must not depend directly on low-level provider implementations.

Bad:

```text
SignalEngine → NSE API
```

Correct:

```text
SignalEngine
     ↓
MarketDataRepository
     ↓
Database
```

---

# 103. REPOSITORY PATTERN

Use repositories such as:

```text
MarketRepository
OptionsRepository
FundamentalRepository
InstitutionalRepository
NewsRepository
MacroRepository
SignalRepository
PortfolioRepository
```

The research engine should consume repositories/interfaces.

---

# 104. DOMAIN SERVICES

Suggested domain services:

```text
MarketAnalysisService
StockAnalysisService
OptionsAnalysisService
CommodityAnalysisService
SmartMoneyService
SectorAnalysisService
RiskAnalysisService
SignalService
ResearchService
```

---

# 105. INFRASTRUCTURE SERVICES

Suggested infrastructure services:

```text
DatabaseService
ConnectivityService
SchedulerService
LoggingService
CacheService
NotificationService
ProviderHealthService
ConfigurationService
```

---

# 106. INITIAL IMPLEMENTATION PRIORITY

Claude Code must implement the system in stages.

## PHASE 1 — FOUNDATION

Build:

```text
Project structure
Configuration
Logging
Database connection
Migrations
Repository pattern
Event bus
Connectivity detection
Scheduler framework
Provider interfaces
Mock providers
```

DO NOT build the complete UI first.

---

## PHASE 2 — MARKET DATA

Implement:

```text
Instrument master
OHLCV
Market status
Trading calendar
Basic market dashboard
```

---

## PHASE 3 — OPTIONS

Implement:

```text
Option chain
OI
Change OI
Volume
IV
Options feature engine
```

---

## PHASE 4 — SMART MONEY

Implement:

```text
FII
DII
Institutional holdings
Bulk deals
Block deals
Promoter activity
Smart Money Score
```

---

## PHASE 5 — FUNDAMENTALS

Implement:

```text
Financial statements
Ratios
Earnings
Valuation
Fundamental Score
```

---

## PHASE 6 — GLOBAL + MACRO

Implement:

```text
Global indices
VIX
DXY
USDINR
Crude
Gold
Bond yields
Macro events
```

---

## PHASE 7 — NEWS + GEOPOLITICS

Implement:

```text
News ingestion
Deduplication
Event clustering
Sentiment
Geopolitical event engine
```

---

## PHASE 8 — QUANT MODEL

Implement the formulas defined in:

```text
QUANT_MODEL.md
```

---

## PHASE 9 — RISK ENGINE

Implement:

```text
Risk score
Position sizing
Stop-loss
Target
Risk/reward
Event risk
```

---

## PHASE 10 — SIGNAL ENGINE

Implement:

```text
BUY
SELL
HOLD
NO TRADE
```

with:

```text
Confidence
Evidence
Risk
Invalidation
```

---

## PHASE 11 — AI

Integrate Claude/other AI through:

```text
AIProvider
```

Use AI for:

```text
Explanation
Research
Summaries
Questions
```

Not raw signal generation.

---

## PHASE 12 — PAPER TRADING

Implement:

```text
Paper portfolio
Signal tracking
Trade simulation
Performance
Backtesting
```

---

# 107. DEVELOPMENT RULE FOR CLAUDE CODE

Before modifying code, Claude Code must read:

```text
PRODUCT_REQUIREMENT.md
MASTER_SPEC.md
QUANT_MODEL.md
DATABASE_SPEC.md
DATA_SOURCES.md
SYSTEM_ARCHITECTURE.md
```

The documents are the project's source of truth.

If code conflicts with the specifications:

```text
STOP
REPORT CONFLICT
DO NOT GUESS
```

---

# 108. CLAUDE CODE IMPLEMENTATION BEHAVIOR

Claude Code must:

```text
1. Inspect existing project.
2. Read all specification files.
3. Identify current implementation state.
4. Create a small implementation plan.
5. Implement one module at a time.
6. Run tests.
7. Fix failures.
8. Update documentation if architecture changes.
9. Never silently change model logic.
10. Never create fake live data.
```

---

# 109. CHANGE CONTROL

Every architecture-changing modification must document:

```text
What changed
Why it changed
Files affected
Database impact
Model impact
Testing impact
Backward compatibility
```

---

# 110. VERSION CONTROL

Use Git.

Recommended branches:

```text
main
develop
feature/*
bugfix/*
```

Never directly experiment on production/main without version control.

---

# 111. ENVIRONMENTS

Support:

```text
Development
Testing
Production
```

Configuration must differ between environments.

---

# 112. MOCK MODE

Development must support:

```text
MOCK_MODE=true
```

In mock mode:

```text
Fake/demo data
```

may be used.

The UI must visibly display:

```text
DEMO / MOCK DATA
```

---

# 113. LIVE MODE

Production:

```text
MOCK_MODE=false
```

Only validated external data may be used.

---

# 114. PAPER MODE

The application should also support:

```text
PAPER_TRADING=true
```

This must never place real broker orders.

---

# 115. REAL TRADING MODE

If eventually implemented:

```text
REAL_TRADING=false
```

must be the default.

Enabling it must require explicit user action and additional safety checks.

---

# 116. OBSERVABILITY

Track:

```text
Data latency
Analysis duration
Signal generation duration
Database latency
Provider failures
Queue size
Memory usage
CPU usage
```

---

# 117. RESOURCE MANAGEMENT

The desktop application should avoid:

```text
Unbounded memory usage
Unlimited database growth
Unlimited logs
Unlimited API requests
```

Implement:

```text
Data retention
Log rotation
Cache expiration
Database maintenance
```

---

# 118. DATA RETENTION

Retention periods must be configurable.

Example:

```text
Raw intraday data:
Configurable

Daily OHLC:
Long-term

Signals:
Permanent unless user deletes

Audit logs:
Long-term

News:
Configurable
```

---

# 119. DISASTER RECOVERY

The system should support:

```text
Database backup
Configuration backup
Model version backup
Signal history backup
```

The application should recover after:

```text
Crash
Power failure
Internet outage
Provider failure
Database corruption
```

where practical.

---

# 120. ARCHITECTURE QUALITY GATE

Before declaring a major feature complete, verify:

```text
□ Unit tests
□ Integration tests
□ Error handling
□ Logging
□ Configuration
□ Database migration
□ Offline behavior
□ Provider failure behavior
□ Data validation
□ Security
□ Documentation
```

---

# 121. FINAL SYSTEM

The final system should behave like:

```text
                    INTERNET
                       │
                       ▼
                DATA COLLECTION
                       │
                       ▼
              DATA VALIDATION
                       │
                       ▼
              CENTRAL DATABASE
                       │
       ┌───────────────┼────────────────┐
       ▼               ▼                ▼
   TECHNICAL       FUNDAMENTAL      SMART MONEY
       │               │                │
       └───────────────┼────────────────┘
                       │
       ┌───────────────┼────────────────┐
       ▼               ▼                ▼
     OPTIONS          GLOBAL           MACRO
       │               │                │
       └───────────────┼────────────────┘
                       │
                 GEOPOLITICAL
                       │
                       ▼
                 MARKET REGIME
                       │
                       ▼
                  FACTOR ENGINE
                       │
                       ▼
                  QUANT MODEL
                       │
                       ▼
                  RISK ENGINE
                       │
                       ▼
                 SIGNAL ENGINE
                       │
              ┌────────┴────────┐
              ▼                 ▼
             AI              ALERTS
              │
              ▼
         EXPLANATION
              │
              ▼
        DESKTOP DASHBOARD
```

---

# 122. CORE PHILOSOPHY

AI Market Intelligence must be built as:

```text
A QUANTITATIVE RESEARCH SYSTEM
WITH AN AI INTERFACE
```

and NOT as:

```text
AN AI THAT GUESSES STOCK PRICES.
```

The objective is to combine:

```text
Market Data
+
Fundamentals
+
Technical Analysis
+
Options
+
Institutional Activity
+
Smart Money
+
FII/DII
+
Sector Rotation
+
Global Markets
+
Macro Economics
+
Commodities
+
Currencies
+
Geopolitics
+
News
+
Risk Management
```

into a transparent, measurable and continuously improving research system.

The system must always prioritize:

```text
DATA QUALITY
+
RISK MANAGEMENT
+
POINT-IN-TIME ACCURACY
+
AUDITABILITY
+
BACKTESTING
+
DISCIPLINE
```

over generating frequent BUY/SELL recommendations.
