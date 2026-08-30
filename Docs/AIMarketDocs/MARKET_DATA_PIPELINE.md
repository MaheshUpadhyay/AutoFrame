# AI MARKET INTELLIGENCE

# MARKET DATA PIPELINE SPECIFICATION

**Document Version:** 1.0
**Status:** Core System Specification
**Market:** India
**Primary Exchanges:** NSE, BSE, MCX
**Asset Classes:** Equity, Futures, Options, Commodities
**Timezone:** Asia/Kolkata (IST)

---

# 1. PURPOSE

The Market Data Pipeline is responsible for collecting, validating, normalizing, storing, and distributing all data required by the AI Market Intelligence platform.

The pipeline must provide reliable data to:

```text
Signal Engine
Quant Model
Risk Engine
Recommendation Engine
Portfolio Engine
Alert Engine
Backtesting Engine
AI Research Engine
UI Dashboard
```

The pipeline is a foundational layer.

No downstream engine should directly depend on random external APIs.

Architecture:

```text
EXTERNAL DATA SOURCES
        ↓
DATA INGESTION
        ↓
RAW DATA
        ↓
VALIDATION
        ↓
NORMALIZATION
        ↓
QUALITY CHECK
        ↓
DATABASE
        ↓
FEATURE ENGINEERING
        ↓
SIGNAL ENGINE
        ↓
RISK ENGINE
        ↓
RECOMMENDATION ENGINE
        ↓
UI / ALERTS / RESEARCH
```

---

# 2. GOLDEN RULE

The application must NEVER generate a BUY/SELL recommendation directly from unvalidated external data.

Every data point must pass:

```text
INGEST
→ VALIDATE
→ NORMALIZE
→ TIMESTAMP
→ QUALITY CHECK
→ STORE
→ CONSUME
```

---

# 3. DATA CATEGORIES

The system must support the following categories.

```text
1. Market Prices
2. OHLCV
3. Corporate Fundamentals
4. Corporate Actions
5. FII/DII
6. Mutual Funds
7. Institutional Holdings
8. Bulk Deals
9. Block Deals
10. Promoter Activity
11. Options Chain
12. Futures
13. Commodities
14. Global Markets
15. Currency
16. Bonds/Yields
17. Volatility
18. News
19. Macro Economics
20. Geopolitical Events
21. Sector Data
22. Market Breadth
23. IPO / Corporate Events
24. Earnings
25. Dividends
26. Economic Calendar
```

---

# 4. DATA SOURCE PRIORITY

Sources must be classified by reliability.

```text
TIER 1
Official exchange / regulator / government sources

TIER 2
Licensed / authorized market-data providers

TIER 3
Reputable financial-data providers

TIER 4
News / research providers

TIER 5
Secondary aggregators
```

The system should prefer the highest-quality available source.

---

# 5. SOURCE REGISTRY

Every source must be registered in the database.

Example:

```text
DataSource

id
name
provider
category
asset_type
endpoint
authentication_type
frequency
priority
status
last_success
last_failure
latency
reliability_score
```

---

# 6. NO HARD-CODED DATA PROVIDERS

The application must not hard-code market-data providers throughout the codebase.

Instead:

```text
DataSource
     ↓
Provider Adapter
     ↓
Normalized Data
```

This allows providers to be replaced without rewriting the application.

---

# 7. PROVIDER ADAPTER ARCHITECTURE

Each external provider must have its own adapter.

Example:

```text
providers/
    nse/
    bse/
    mcx/
    global/
    news/
    fundamentals/
```

Each adapter must implement a standard interface.

Example conceptual interface:

```text
connect()
authenticate()
fetch()
validate()
normalize()
disconnect()
```

---

# 8. RAW DATA LAYER

Never immediately discard the original external response.

Store raw responses where legally and operationally appropriate.

Example:

```text
RawMarketData

source
received_at
request_time
response_time
payload
checksum
status
```

Raw data is useful for:

```text
Debugging
Auditing
Reprocessing
Provider migration
Model validation
Data-quality investigations
```

---

# 9. NORMALIZED DATA

All providers must map into a common internal schema.

Example:

```text
Instrument
Symbol
Exchange
AssetType
Currency
Expiry
Strike
OptionType
```

and:

```text
MarketTick
InstrumentId
Timestamp
Open
High
Low
Close
LastPrice
Volume
OpenInterest
Bid
Ask
```

---

# 10. INSTRUMENT MASTER

Maintain a master instrument table.

Fields:

```text
instrument_id
exchange
symbol
trading_symbol
isin
name
asset_type
sector
industry
lot_size
tick_size
currency
expiry
strike
option_type
active
created_at
updated_at
```

---

# 11. SYMBOL NORMALIZATION

Different sources may use different symbols.

Example:

```text
RELIANCE
RELIANCE.NS
RELIANCE-EQ
```

These must map to one internal instrument.

Use:

```text
Canonical Instrument ID
```

as the internal identifier.

Never use external symbols as the primary database key.

---

# 12. MARKET DATA TYPES

Support:

```text
LTP
OHLC
Volume
Open Interest
Bid
Ask
Bid Quantity
Ask Quantity
VWAP
Turnover
Settlement Price
Previous Close
52W High
52W Low
```

---

# 13. REAL-TIME DATA

When real-time data is available, capture:

```text
Timestamp
LTP
Bid
Ask
Volume
OI
OHLC
Market Status
```

Each record must contain the source timestamp where available.

---

# 14. TICK DATA

Tick data should not necessarily be stored forever.

Retention should be configurable.

Example:

```text
Raw ticks:
7–30 days

Aggregated 1-minute:
1–2 years

5-minute:
Multiple years

Daily:
Permanent
```

Actual retention depends on storage availability and licensing restrictions.

---

# 15. OHLC TIMEFRAMES

Support:

```text
1 minute
3 minute
5 minute
10 minute
15 minute
30 minute
1 hour
4 hour
Daily
Weekly
Monthly
```

Only create a timeframe if required by the strategy/model.

---

# 16. CANDLE GENERATION

Higher timeframes should be generated consistently from lower-level data when possible.

Example:

```text
1-minute
    ↓
5-minute
    ↓
15-minute
    ↓
1-hour
    ↓
Daily
```

Candle boundaries must use:

```text
Asia/Kolkata
```

and official market session timings.

---

# 17. CORPORATE ACTION ADJUSTMENT

Support:

```text
Stock Split
Bonus
Rights Issue
Dividend
Merger
Demerger
Face Value Change
Symbol Change
```

Historical prices must support adjusted and unadjusted versions.

Never overwrite original raw prices.

---

# 18. ADJUSTED PRICE MODEL

Maintain:

```text
Raw Price
Adjusted Price
Adjustment Factor
Adjustment Event
```

Backtesting must use correctly adjusted historical data.

---

# 19. VOLUME ADJUSTMENT

Corporate-action adjustments must also be considered when calculating historical volume-based indicators where appropriate.

---

# 20. MARKET CALENDAR

Maintain an exchange calendar.

Include:

```text
Trading Date
Holiday
Special Session
Pre-open
Market Open
Market Close
Post-close
Expiry
Settlement
```

Do not assume Monday-Friday automatically means trading day.

---

# 21. MARKET SESSION ENGINE

The pipeline must know:

```text
PRE_MARKET
MARKET_OPEN
MARKET_CLOSING
POST_MARKET
CLOSED
HOLIDAY
SPECIAL_SESSION
```

This status is consumed by all engines.

---

# 22. EQUITY DATA

Collect:

```text
Equity Price
OHLCV
Volume
Delivery
Market Cap
Sector
Industry
Corporate Actions
Earnings
Fundamentals
Institutional Holdings
Bulk Deals
Block Deals
Promoter Data
```

---

# 23. FUTURES DATA

Collect:

```text
Underlying
Expiry
LTP
OHLC
Volume
Open Interest
OI Change
Basis
Settlement
Lot Size
```

---

# 24. OPTIONS DATA

Collect:

```text
Underlying
Expiry
Strike
Call/Put
LTP
Bid
Ask
Volume
OI
OI Change
IV
Delta
Gamma
Theta
Vega
```

Greeks may be:

```text
Provider supplied
```

or calculated internally.

The calculation method must be recorded.

---

# 25. OPTION CHAIN

The pipeline must construct normalized option chains.

Structure:

```text
Underlying
    ↓
Expiry
    ↓
Strike
    ├── CE
    └── PE
```

---

# 26. OPTION DATA VALIDATION

Reject or flag:

```text
Negative LTP
Negative OI
Impossible bid/ask
Bid > Ask
Invalid strike
Invalid expiry
Invalid timestamp
Duplicate records
```

---

# 27. FUTURES VALIDATION

Validate:

```text
Expiry
Contract
Lot Size
Price
OI
Volume
```

against instrument master.

---

# 28. COMMODITY DATA

Support MCX and relevant international reference data.

Examples:

```text
Gold
Silver
Crude Oil
Natural Gas
Copper
Aluminium
Zinc
Lead
Other supported contracts
```

---

# 29. COMMODITY CROSS-MARKET DATA

For commodities such as gold and crude:

Collect where available:

```text
MCX Price
International Reference Price
USD
USDINR
Inventory
Supply/Demand
Geopolitical Risk
```

---

# 30. GLOBAL MARKET DATA

Collect major global indices.

Examples:

```text
S&P 500
NASDAQ
Dow Jones
DAX
FTSE
CAC
Nikkei
Hang Seng
Shanghai Composite
KOSPI
```

Also:

```text
VIX
US 10Y
Dollar Index
USDINR
```

---

# 31. GLOBAL MARKET TIMING

The system must account for different time zones.

Store:

```text
Source Timestamp
UTC Timestamp
IST Timestamp
```

Never compare timestamps without timezone normalization.

---

# 32. CURRENCY DATA

Support:

```text
USDINR
EURINR
GBPINR
JPYINR
DXY
```

Currency data is particularly important for:

```text
Imported commodities
IT exporters
Oil
Gold
Foreign flows
Macro analysis
```

---

# 33. BOND/YIELD DATA

Collect where available:

```text
India 10Y
US 10Y
Yield Change
Yield Spread
```

Yield movements may be used by the macro engine.

---

# 34. INDIA VIX

Track:

```text
Current VIX
Change
Percent Change
Historical Percentile
Trend
Volatility Regime
```

---

# 35. MARKET BREADTH

Calculate:

```text
Advances
Declines
Unchanged
Advance/Decline Ratio
Stocks Above 20 DMA
Stocks Above 50 DMA
Stocks Above 100 DMA
Stocks Above 200 DMA
52W Highs
52W Lows
```

---

# 36. SECTOR DATA

Track major Indian sectors.

For each sector:

```text
Price
Change
Volume
Relative Strength
Breadth
Momentum
FII/DII Activity
Top Constituents
```

---

# 37. SECTOR ROTATION

Calculate:

```text
1D
1W
1M
3M
6M
1Y
```

relative performance.

Classify sectors:

```text
Leading
Improving
Weakening
Lagging
```

---

# 38. FII DATA

Collect:

```text
FII Equity Buy
FII Equity Sell
FII Net
FII Futures
FII Options
```

Store:

```text
Daily
5-Day
20-Day
Monthly
Year-to-Date
```

---

# 39. DII DATA

Collect:

```text
DII Buy
DII Sell
DII Net
```

with the same aggregation periods.

---

# 40. FII/DII DATA QUALITY

Institutional-flow data must include:

```text
Source
Publication Date
Market Date
Received Timestamp
```

Never confuse publication date with trading date.

---

# 41. MUTUAL FUND DATA

Where reliable data is available:

```text
Fund
Company
Stock
Holding
Shares
Value
Percentage
Previous Holding
Change
```

---

# 42. BIG INVESTOR DATA

Track:

```text
Bulk Deals
Block Deals
Large Institutional Transactions
Mutual Fund Changes
Insurance Changes
Promoter Changes
Large Shareholder Changes
```

---

# 43. BIG INVESTOR EVENT

Normalize into:

```text
Investor
Company
Action
Quantity
Price
Value
Date
Source
```

Action:

```text
BUY
SELL
INCREASE
DECREASE
NEW_POSITION
EXIT
```

---

# 44. BIG INVESTOR INTERPRETATION

The pipeline only provides facts.

Example:

```text
Investor:
Institutional Fund

Action:
BUY

Quantity:
X

Price:
₹X
```

The Signal Engine decides whether the event is bullish/bearish.

Do NOT make investment recommendations in the data layer.

---

# 45. FUNDAMENTAL DATA

Collect:

```text
Revenue
EBITDA
EBIT
PAT
EPS
Cash Flow
Free Cash Flow
Debt
Cash
Assets
Liabilities
Equity
ROE
ROCE
Margins
PE
PB
PEG
Dividend Yield
```

---

# 46. FUNDAMENTAL PERIODS

Store:

```text
Quarterly
TTM
Annual
```

Do not mix quarterly and annual values without explicit period metadata.

---

# 47. FUNDAMENTAL RESTATEMENT

If historical financial data changes:

Keep:

```text
Original Value
Updated Value
Effective Date
Source
```

Do not silently overwrite history.

---

# 48. EARNINGS DATA

Track:

```text
Earnings Date
Revenue
Revenue Growth
EPS
EPS Growth
EBITDA
Margins
Actual vs Estimate
Management Guidance
```

---

# 49. CORPORATE EVENTS

Track:

```text
Results
Dividend
Bonus
Split
Buyback
Rights
Merger
Demerger
Promoter Transaction
IPO
Delisting
Regulatory Action
```

---

# 50. NEWS DATA

News pipeline should collect:

```text
Headline
Summary
Source
Published Time
URL
Company
Sector
Country
Category
Sentiment
Impact
```

---

# 51. NEWS CATEGORIZATION

Classify:

```text
Company
Sector
Market
Macro
Geopolitical
Commodity
Currency
Regulatory
Corporate
Earnings
```

---

# 52. NEWS IMPACT

Classify:

```text
LOW
MEDIUM
HIGH
CRITICAL
```

Impact must be determined using a combination of:

```text
Rule Engine
Historical Impact
NLP Model
Market Reaction
```

---

# 53. NEWS DUPLICATION

Multiple sources may report the same event.

The pipeline must detect duplicates.

Use:

```text
Headline similarity
Entity similarity
Timestamp proximity
Event similarity
```

Group duplicates into one event.

---

# 54. NEWS EVENT MODEL

Instead of treating 10 articles as 10 independent events:

```text
10 articles
      ↓
1 MARKET EVENT
      ↓
Multiple sources
```

This prevents double counting.

---

# 55. GEOPOLITICAL DATA

Track events such as:

```text
War
Conflict
Sanctions
Trade Restrictions
Shipping Disruption
Oil Supply Risk
Political Crisis
Central Bank Decisions
Major Elections
International Agreements
```

---

# 56. GEOPOLITICAL EVENT STRUCTURE

Store:

```text
Event
Country
Region
Start Time
Severity
Affected Commodity
Affected Sector
Affected Country
Source
```

---

# 57. MACRO DATA

Track:

```text
RBI Policy
Fed Policy
Interest Rates
Inflation
CPI
WPI
GDP
PMI
Employment
Trade Balance
Current Account
Fiscal Data
Bond Yields
```

---

# 58. ECONOMIC CALENDAR

Maintain upcoming events:

```text
Event
Country
Expected Time
Importance
Previous
Forecast
Actual
```

Importance:

```text
LOW
MEDIUM
HIGH
CRITICAL
```

---

# 59. DATA FRESHNESS

Every data record must have:

```text
event_time
received_time
processed_time
```

---

# 60. FRESHNESS STATES

```text
LIVE
RECENT
DELAYED
STALE
EXPIRED
```

Thresholds must be configurable per data type.

Example:

```text
Market Tick:
seconds

FII/DII:
daily

Fundamentals:
quarterly

News:
minutes/hours
```

Do not use one global freshness threshold.

---

# 61. DATA QUALITY SCORE

Every data source should receive a quality score:

```text
0–100
```

Factors:

```text
Completeness
Freshness
Accuracy
Consistency
Latency
Reliability
```

---

# 62. RECORD QUALITY

Each dataset should contain:

```text
quality_score
quality_status
```

Example:

```text
Quality:
94/100

Status:
GOOD
```

---

# 63. DATA VALIDATION RULES

Validate:

```text
Schema
Type
Range
Timestamp
Duplicates
Missing Values
Cross-source consistency
```

---

# 64. PRICE VALIDATION

Flag:

```text
Price <= 0
Extreme unexplained jumps
Impossible OHLC
High < Low
Close outside expected range
```

Do not automatically delete anomalous values.

Flag them for investigation.

---

# 65. OHLC VALIDATION

Rules:

```text
High >= Open
High >= Close
High >= Low

Low <= Open
Low <= Close
Low <= High
```

---

# 66. VOLUME VALIDATION

Flag:

```text
Negative Volume
Impossible values
Large unexplained spikes
Missing volume
```

A spike should be flagged, not automatically discarded.

---

# 67. DUPLICATE DETECTION

Unique combination:

```text
Instrument
Timestamp
Data Type
Source
```

must prevent accidental duplicate ingestion.

---

# 68. OUT-OF-ORDER DATA

If data arrives late:

```text
Event Time < Latest Event Time
```

the system must not blindly discard it.

Route it through a late-data handler.

---

# 69. LATE DATA

Late data may trigger:

```text
Recalculation
Feature Update
Signal Re-evaluation
Backfill
Audit Log
```

---

# 70. MISSING DATA

If data is missing:

```text
Do not fabricate
Do not interpolate blindly
Do not use stale values silently
```

The downstream model must know that data is missing.

---

# 71. DATA IMPUTATION

Any imputation must be explicitly marked:

```text
actual
estimated
imputed
```

Signals should generally prefer actual data.

---

# 72. SOURCE FAILOVER

If primary source fails:

```text
Primary
   ↓
Failure
   ↓
Secondary
   ↓
Validation
   ↓
Continue
```

Do not automatically trust secondary data.

---

# 73. FAILOVER RULE

Failover must consider:

```text
Source Quality
Data Freshness
Consistency
Availability
```

---

# 74. CONFLICTING DATA

If two sources disagree:

```text
Source A:
₹1,425

Source B:
₹1,426
```

The system must:

```text
Record both
Compare timestamps
Apply source priority
Flag discrepancy if necessary
```

---

# 75. MARKET DATA CONSENSUS

For critical values:

```text
Primary source
+
Secondary verification
```

may be used.

Do not blindly average prices from different providers.

---

# 76. DATA LATENCY

Track:

```text
Provider Timestamp
Received Timestamp
Processing Timestamp
```

Calculate:

```text
Network Latency
Processing Latency
Total Latency
```

---

# 77. LATENCY MONITORING

Dashboard:

```text
Market Data:
120 ms

News:
1.8 sec

Options:
250 ms
```

Alert when latency exceeds configurable thresholds.

---

# 78. RATE LIMITING

Every provider adapter must respect:

```text
API Rate Limit
Request Limit
Burst Limit
Daily Limit
```

The system must not intentionally bypass provider restrictions.

---

# 79. REQUEST QUEUE

Use a queue:

```text
Scheduler
    ↓
Request Queue
    ↓
Provider Adapter
    ↓
Response Queue
```

This prevents uncontrolled concurrent requests.

---

# 80. RETRY POLICY

For temporary failures:

```text
Retry
Retry
Retry
Failover
```

Use exponential backoff.

Do not repeatedly hammer a failed provider.

---

# 81. CIRCUIT BREAKER

If a source repeatedly fails:

```text
CLOSED
↓
FAILURES
↓
OPEN
↓
WAIT
↓
HALF OPEN
↓
RECOVER
↓
CLOSED
```

---

# 82. CONNECTIVITY MONITOR

The application must continuously monitor internet connectivity.

States:

```text
ONLINE
LIMITED
OFFLINE
```

---

# 83. OFFLINE MODE

When offline:

```text
Stop live ingestion
Preserve existing data
Continue local analysis where valid
Display stale indicators
Queue permitted requests
```

Do not generate supposedly live recommendations.

---

# 84. INTERNET RECOVERY

When internet returns:

```text
Connectivity Restored
       ↓
Determine Missing Period
       ↓
Backfill Required Data
       ↓
Validate
       ↓
Store
       ↓
Recalculate Features
       ↓
Run Analysis
       ↓
Generate Alerts
```

---

# 85. GAP DETECTION

After reconnecting:

```text
Last Local Timestamp
+
Current Server Timestamp
```

determine the missing period.

Example:

```text
Last data:
10:21:10

Internet restored:
10:35:00

Gap:
13m 50s
```

---

# 86. BACKFILL

Backfill only what is required.

Priority:

```text
1. Market prices
2. Options
3. Futures
4. FII/DII
5. News
6. Global
7. Fundamentals
8. Other
```

---

# 87. ANALYSIS TRIGGER

After successful backfill:

```text
DATA UPDATED
     ↓
FEATURES UPDATED
     ↓
SIGNAL ENGINE
     ↓
RISK ENGINE
     ↓
RECOMMENDATION ENGINE
     ↓
ALERT ENGINE
```

---

# 88. EVENT-DRIVEN ARCHITECTURE

Prefer events rather than constant polling wherever practical.

Example:

```text
MarketDataUpdated
NewsEventDetected
InstitutionalFlowUpdated
OptionsUpdated
InternetRestored
CorporateEventDetected
```

These events may trigger downstream processing.

---

# 89. DATA BUS

Use an internal event bus/message queue.

Example:

```text
MarketDataUpdated
        ↓
┌───────────────┬───────────────┬──────────────┐
│ Signal Engine │ Risk Engine   │ UI           │
└───────────────┴───────────────┴──────────────┘
```

---

# 90. FEATURE ENGINEERING

Raw data must be transformed into model features.

Examples:

```text
Returns
Momentum
Volatility
RSI
MACD
Moving Averages
ATR
Volume Change
OI Change
PCR
FII Trend
DII Trend
Relative Strength
Sector Strength
Global Correlation
```

Feature engineering belongs in a dedicated layer.

---

# 91. FEATURE VERSIONING

Every feature set must have:

```text
Feature Version
Calculation Method
Created Timestamp
Input Data Version
```

This is required for reproducible backtesting.

---

# 92. LOOK-AHEAD BIAS PREVENTION

Historical models must only use information that was available at that point in time.

Example:

If an earnings result was released at:

```text
16:00 IST
```

the model must NOT use that information for a 15:30 signal on the same day.

This rule is mandatory.

---

# 93. POINT-IN-TIME DATA

Historical datasets must preserve:

```text
When information became available
```

not merely:

```text
What the final historical dataset says today
```

---

# 94. SURVIVORSHIP BIAS PREVENTION

Historical backtests must account for:

```text
Delisted companies
Merged companies
Bankrupt companies
Index constituent changes
Symbol changes
```

Do not backtest only today's surviving companies.

---

# 95. DATA SNAPSHOTS

Before major model runs, optionally create a snapshot:

```text
Market Snapshot
Data Version
Timestamp
Feature Version
```

This makes research reproducible.

---

# 96. DATA AUDIT LOG

Record:

```text
Source
Request
Response
Timestamp
Status
Validation Result
Transformation
Errors
```

---

# 97. ERROR LOG

Every failure should record:

```text
Timestamp
Provider
Endpoint
Error
Retry Count
Resolution
```

---

# 98. DATA MONITORING DASHBOARD

Display:

```text
Sources Online
Sources Failed
Last Update
Data Latency
Data Quality
Missing Data
Backfill Status
Queue Size
```

---

# 99. PIPELINE HEALTH SCORE

Calculate:

```text
Pipeline Health:
0–100
```

Example:

```text
Market Data       98
Options           95
FII/DII            92
News               87
Global             96

Overall:
94/100
```

---

# 100. DATA PRIORITY

During high-load situations:

Priority:

```text
CRITICAL
Market Price
Options
Futures
Risk Data

HIGH
News
FII/DII
Global Markets

MEDIUM
Fundamentals
Institutional Data

LOW
Historical enrichment
Non-critical analytics
```

---

# 101. MARKET OPEN PRIORITY

Before and during market hours:

```text
REAL-TIME MARKET DATA
OPTIONS
FUTURES
VOLUME
OI
BREADTH
```

must receive highest priority.

---

# 102. MARKET CLOSED PRIORITY

After market close:

```text
End-of-Day Data
FII/DII
Corporate Events
News
Research
Backtesting
Fundamentals
```

can receive higher priority.

---

# 103. PRE-MARKET PIPELINE

Before market open:

```text
Global Markets
Overnight News
GIFT NIFTY / relevant pre-market indicator
FII/DII
Currency
Crude
Gold
Bond Yields
Geopolitics
Macro Events
Corporate Announcements
```

must be collected.

---

# 104. PRE-MARKET ANALYSIS

After required data is available:

```text
PreMarketDataReady
       ↓
Market Regime
       ↓
Risk Assessment
       ↓
Sector Analysis
       ↓
Stock Ranking
       ↓
Options Setup
       ↓
Pre-Market Report
```

---

# 105. POST-MARKET PIPELINE

After market close:

```text
Final Prices
Volume
OI
FII/DII
Corporate Events
News
Global Setup
```

must be synchronized.

Then:

```text
Daily Analysis
```

is executed.

---

# 106. DAILY DATA CHECK

At end of day:

```text
Missing Instruments
Missing Candles
Invalid Prices
Corporate Actions
Corporate Events
Duplicate Records
```

must be checked.

---

# 107. DATA RETENTION

Retention must be configurable.

Example:

```text
Tick:
7–30 days

Intraday:
1–3 years

Daily:
10+ years

Fundamentals:
10+ years

News:
5+ years where legally permitted

Events:
Long-term
```

Actual retention must respect provider licensing and storage constraints.

---

# 108. DATABASE PARTITIONING

Large tables should be partitioned by:

```text
Date
Asset Type
Exchange
```

where appropriate.

---

# 109. CACHING

Use local cache for:

```text
Frequently accessed stocks
Indices
Watchlists
Portfolio
Recent news
Latest market snapshot
```

Cache must include:

```text
Timestamp
TTL
Source
Version
```

---

# 110. CACHE INVALIDATION

Never allow stale cache to appear as live data.

Display:

```text
Cached
Updated X minutes ago
```

where appropriate.

---

# 111. DATABASE CONSISTENCY

Transactions must ensure:

```text
Raw Data
Normalized Data
Feature Data
```

do not become partially updated in ways that create invalid signals.

---

# 112. DATA VERSIONING

Every major dataset should have:

```text
dataset_version
source_version
schema_version
feature_version
```

---

# 113. MODEL INPUT CONTRACT

Before data reaches a model, verify:

```text
Required Fields Present
Freshness Acceptable
Quality Acceptable
No Critical Errors
Correct Timestamp
Correct Instrument
Correct Market Session
```

If validation fails:

```text
MODEL MUST NOT RUN
```

or must explicitly operate in degraded mode.

---

# 114. DEGRADED MODE

If non-critical data is unavailable:

Example:

```text
News unavailable
```

The system may still run:

```text
Technical
Fundamental
Institutional
```

if sufficient data exists.

But confidence must be reduced and the missing component shown.

---

# 115. CRITICAL DATA FAILURE

If critical data is unavailable:

```text
Price
Options
Risk
```

then affected recommendations must be:

```text
DISABLED
```

---

# 116. CONFIDENCE ADJUSTMENT

Missing data should reduce confidence.

Example:

```text
Normal:
Confidence 82%

News unavailable:
Confidence 74%
```

The exact adjustment belongs to the Recommendation Engine.

The pipeline must provide the data-quality metadata.

---

# 117. DATA LINEAGE

Every recommendation should be traceable back to:

```text
Recommendation
↓
Model Version
↓
Feature Version
↓
Feature Values
↓
Normalized Data
↓
Source Data
↓
Provider
```

This is mandatory.

---

# 118. RESEARCH REPRODUCIBILITY

Given:

```text
Instrument
Timestamp
Model Version
Feature Version
Data Snapshot
```

the system should be able to reproduce the analysis as closely as possible.

---

# 119. LEGAL / LICENSING REQUIREMENT

The implementation must respect:

```text
Exchange Data Licensing
Provider Terms
API Terms
Redistribution Restrictions
News Licensing
Copyright
Rate Limits
```

Do not scrape or redistribute data merely because it is technically accessible.

Use approved/licensed sources where required.

---

# 120. NO DEPENDENCY ON ONE SOURCE

The production system must avoid a single point of failure.

Critical datasets should have:

```text
Primary Source
Secondary Source
Fallback Strategy
```

where feasible and legally permitted.

---

# 121. DATA QUALITY ALERTS

Generate alerts for:

```text
Source Failure
Stale Data
High Latency
Missing Data
Conflicting Prices
Large Data Gaps
Provider Schema Change
Authentication Failure
Rate Limit
```

---

# 122. PROVIDER SCHEMA CHANGE

If an external provider changes its API schema:

```text
Detect
↓
Reject invalid data
↓
Raise System Alert
↓
Disable affected pipeline
↓
Use fallback source if available
```

Do not silently ingest malformed data.

---

# 123. PIPELINE SCHEDULER

The scheduler must support:

```text
Every X seconds
Every X minutes
Hourly
Daily
Market Open
Market Close
Before Market Open
After Market Close
Event Driven
```

---

# 124. SCHEDULE EXAMPLES

Market prices:

```text
High frequency during market hours
```

FII/DII:

```text
After official release
```

Fundamentals:

```text
When new filing/results becomes available
```

News:

```text
Continuous
```

Daily historical data:

```text
After market close
```

---

# 125. JOB PRIORITY

Each job has:

```text
Priority
Frequency
Timeout
Retry Count
Dependency
```

---

# 126. JOB DEPENDENCIES

Example:

```text
Market Data
     ↓
Feature Calculation
     ↓
Signal Engine
     ↓
Risk Engine
     ↓
Recommendation Engine
     ↓
Alert Engine
```

A dependent job must not run on incomplete critical inputs.

---

# 127. ANALYSIS TRIGGER TYPES

Support:

```text
TIME_TRIGGER
DATA_TRIGGER
EVENT_TRIGGER
USER_TRIGGER
RECOVERY_TRIGGER
```

Examples:

```text
Internet restored → Recovery Trigger

Major news → Event Trigger

User clicks Analyze → User Trigger
```

---

# 128. USER MANUAL REFRESH

User can request:

```text
Refresh Market
Refresh Stock
Refresh Options
Refresh Research
Run Full Analysis
```

The system must respect rate limits.

---

# 129. FULL ANALYSIS

Manual "Full Analysis" should execute:

```text
Data Validation
Market Regime
Global Markets
FII/DII
Big Investors
Sector Rotation
Technical
Fundamentals
Options
Commodities
News
Macro
Geopolitical
Risk
Recommendations
Alerts
```

---

# 130. DATA PIPELINE PERFORMANCE

Monitor:

```text
Ingestion Rate
Processing Rate
Queue Length
Latency
Error Rate
Database Write Time
Feature Calculation Time
```

---

# 131. DATA OBSERVABILITY

Provide metrics:

```text
records_received
records_validated
records_rejected
records_normalized
records_stored
processing_latency
source_latency
error_rate
```

---

# 132. DATA REJECTION

Rejected data must not disappear.

Store:

```text
RejectedRecord
Reason
Source
Timestamp
Payload Reference
```

for debugging.

---

# 133. DATA QUALITY REPORT

Generate periodic report:

```text
DATA QUALITY REPORT

Market Data:
98%

Options:
96%

FII/DII:
99%

News:
91%

Fundamentals:
95%

Overall:
96%
```

---

# 134. DATA SOURCE SCORE

Each source should have:

```text
Reliability
Freshness
Latency
Completeness
Error Rate
```

and an overall score.

---

# 135. SOURCE RANKING

When selecting between multiple sources:

```text
Source Score
+
Freshness
+
Completeness
+
Availability
```

determine preferred source.

---

# 136. SECURITY

API credentials must be stored securely.

Never store secrets in:

```text
Git
Source Code
Markdown
Logs
UI
Database Plain Text
```

Use:

```text
Environment Variables
OS Secure Credential Store
Encrypted Secret Storage
```

where appropriate.

---

# 137. PRIVACY

Portfolio information must remain local unless the user explicitly enables synchronization.

---

# 138. DESKTOP-FIRST ARCHITECTURE

The initial application should be able to operate primarily on the user's desktop.

Recommended architecture:

```text
Desktop UI
    ↓
Local Application Services
    ↓
Local Database
    ↓
Data Pipeline
    ↓
External Providers
```

---

# 139. LOCAL DATABASE

The local database should support:

```text
SQLite
```

for initial development.

The architecture should allow future migration to:

```text
PostgreSQL
```

or another production database.

---

# 140. LOCAL-FIRST PRINCIPLE

The application should preserve:

```text
Last Valid Market State
Research
Watchlists
Portfolio
Signals
Alerts
Historical Data
```

even when internet is unavailable.

---

# 141. INTERNET IS REQUIRED FOR

```text
Live Prices
Latest News
Latest FII/DII
Latest Big Investor Activity
Global Markets
Current Options
Current Commodities
Current Geopolitical Events
```

---

# 142. INTERNET IS NOT REQUIRED FOR

Where locally cached data exists:

```text
Historical Charts
Previous Research
Backtesting
Portfolio Analysis
Stored Alerts
Model Health
Historical Signals
```

---

# 143. DATA FLOW EXAMPLE

Example:

```text
NIFTY PRICE UPDATE
       ↓
Provider Adapter
       ↓
Validation
       ↓
Normalization
       ↓
Database
       ↓
Feature Update
       ↓
Technical Signal
       ↓
Market Regime
       ↓
Risk Engine
       ↓
Recommendation Engine
       ↓
Alert Engine
       ↓
Dashboard
```

---

# 144. BIG INVESTOR DATA FLOW

```text
Bulk/Block Deal
       ↓
Source
       ↓
Validation
       ↓
Investor Identification
       ↓
Company Mapping
       ↓
Historical Comparison
       ↓
Institutional Activity Feature
       ↓
Signal Engine
```

---

# 145. NEWS DATA FLOW

```text
News Article
       ↓
Source Validation
       ↓
Duplicate Detection
       ↓
Entity Extraction
       ↓
Event Classification
       ↓
Sentiment
       ↓
Impact
       ↓
Market Mapping
       ↓
Signal Engine
```

---

# 146. GEOPOLITICAL DATA FLOW

```text
Event
       ↓
Source Validation
       ↓
Country/Region
       ↓
Severity
       ↓
Commodity Mapping
       ↓
Sector Mapping
       ↓
Company Mapping
       ↓
Risk Engine
```

---

# 147. DATA FRESHNESS IN RECOMMENDATIONS

Every recommendation must know:

```text
Age of Price Data
Age of News
Age of Institutional Data
Age of Fundamentals
Age of Global Data
```

This information should influence recommendation confidence.

---

# 148. DATA SNAPSHOT FOR SIGNALS

When generating a recommendation, store:

```text
Signal Timestamp

Price Snapshot
Technical Snapshot
Fundamental Snapshot
FII/DII Snapshot
Big Investor Snapshot
Options Snapshot
Global Snapshot
Macro Snapshot
News Snapshot
Risk Snapshot
```

This creates an auditable recommendation.

---

# 149. SIGNAL IMMUTABILITY

Once a historical signal is generated:

Do not silently rewrite its original inputs.

If corrected data arrives:

```text
Original Signal
Corrected Analysis
```

must remain distinguishable.

---

# 150. HISTORICAL SIGNAL AUDIT

Store:

```text
Signal
Generated At
Input Data Version
Model Version
Outcome
```

This is required for model validation.

---

# 151. DATA PIPELINE GOLDEN RULES

The implementation must follow:

```text
1. Never fabricate missing data.

2. Never silently use stale data.

3. Never hide data-source failures.

4. Never mix timezones incorrectly.

5. Never introduce look-ahead bias.

6. Never ignore corporate actions.

7. Never delete anomalous data without logging.

8. Never let unvalidated data reach critical models.

9. Never depend permanently on one provider.

10. Never make BUY/SELL decisions inside the data pipeline.
```

---

# 152. DEFINITION OF DONE

The Market Data Pipeline is complete when it supports:

```text
✓ Provider adapters
✓ Source registry
✓ Instrument master
✓ Market calendar
✓ Market sessions
✓ Real-time data
✓ Historical data
✓ OHLCV
✓ Futures
✓ Options
✓ Commodities
✓ FII/DII
✓ Big investors
✓ Institutional holdings
✓ Fundamentals
✓ Corporate actions
✓ Earnings
✓ News
✓ Macro data
✓ Geopolitical events
✓ Global markets
✓ Currency
✓ Bonds/yields
✓ India VIX
✓ Market breadth
✓ Sector data
✓ Data validation
✓ Data normalization
✓ Data quality
✓ Data freshness
✓ Source failover
✓ Rate limiting
✓ Retry
✓ Circuit breaker
✓ Offline mode
✓ Internet recovery
✓ Automatic backfill
✓ Event-driven processing
✓ Feature versioning
✓ Point-in-time data
✓ Look-ahead bias prevention
✓ Survivorship-bias prevention
✓ Data lineage
✓ Audit logs
✓ Pipeline monitoring
✓ Error handling
✓ Local caching
✓ Secure credential handling
✓ Historical reproducibility
```

---

# 153. FINAL ARCHITECTURE PRINCIPLE

The Market Data Pipeline must remain independent from investment decisions.

Its responsibility is:

```text
GET THE BEST AVAILABLE DATA
        ↓
VERIFY IT
        ↓
NORMALIZE IT
        ↓
STORE IT
        ↓
EXPOSE ITS QUALITY
```

It must NOT decide:

```text
BUY
SELL
HOLD
```

Those decisions belong to:

```text
QUANT MODEL
SIGNAL ENGINE
RISK ENGINE
RECOMMENDATION ENGINE
```

The pipeline's job is to make sure those engines receive the **right information, at the right time, with the right timestamp and an honest indication of data quality.**
