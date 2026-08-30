# AI MARKET INTELLIGENCE

## DATA SOURCES SPECIFICATION

**Document Version:** 1.0
**Status:** Architecture Specification
**Market:** India
**Primary Exchanges:** NSE, BSE, MCX
**Purpose:** Define approved data sources, source priority, ingestion strategy, reliability, licensing considerations, fallback mechanisms and data validation.

---

# 1. PURPOSE

AI Market Intelligence depends on high-quality external data.

The application must never generate market information by guessing, hallucinating, extrapolating unavailable information, or relying on a single uncontrolled source.

Every important market data point must have:

```text
SOURCE
+
SOURCE TIMESTAMP
+
RETRIEVAL TIMESTAMP
+
DATA QUALITY
+
SOURCE RELIABILITY
```

The system must be able to answer:

> Where did this information come from?

---

# 2. SOURCE HIERARCHY

Data sources must be classified into the following levels.

```text
LEVEL 1
Official / Regulatory / Exchange

LEVEL 2
Licensed Professional Market Data Provider

LEVEL 3
Reputable Financial Data Provider

LEVEL 4
Reputable Financial News Provider

LEVEL 5
Secondary Aggregator

LEVEL 6
Social Media / Unverified Sources
```

The system should prefer higher-level sources whenever possible.

---

# 3. GOLDEN RULE

Never use a low-quality source when a higher-quality source is available for the same data.

For example:

```text
NSE official data
    >
licensed market-data provider
    >
financial aggregator
    >
social media
```

---

# 4. SOURCE TYPES

Every source must have a `source_type`.

Allowed values:

```text
OFFICIAL_EXCHANGE
REGULATORY
GOVERNMENT
LICENSED_DATA_PROVIDER
BROKER_API
NEWS_PROVIDER
FINANCIAL_MEDIA
AGGREGATOR
RESEARCH_PROVIDER
SOCIAL_MEDIA
INTERNAL_CALCULATION
```

---

# 5. SOURCE RELIABILITY SCORE

Every source must have a reliability score:

```text
0–100
```

Suggested interpretation:

```text
90–100 = Very High
80–89  = High
70–79  = Good
50–69  = Moderate
30–49  = Low
0–29   = Untrusted
```

This score is configurable.

It must NOT be hard-coded into the AI model.

---

# 6. PRIMARY DATA CATEGORIES

The application requires data for:

```text
1. Equity prices
2. Index prices
3. Futures
4. Options
5. Options Open Interest
6. Options IV
7. Options Greeks
8. Equity volume
9. Market breadth
10. Corporate actions
11. Fundamentals
12. Earnings
13. FII activity
14. DII activity
15. Institutional holdings
16. Mutual fund holdings
17. Promoter activity
18. Bulk deals
19. Block deals
20. Insider transactions
21. Global markets
22. Currency
23. Interest rates
24. Bonds / yields
25. Commodities
26. Economic indicators
27. RBI events
28. Central-bank events
29. Geopolitical events
30. News
31. Analyst estimates
32. Sector data
33. Market sentiment
```

---

# 7. OFFICIAL INDIAN SOURCES

The system should prioritize official sources wherever practical.

Primary sources include:

```text
NSE
BSE
MCX
SEBI
RBI
Government of India
Ministry of Finance
NSDL
CDSL
AMFI
Company regulatory filings
```

Official sources should be preferred for:

```text
Exchange data
Corporate announcements
Corporate actions
Regulatory disclosures
Institutional activity
Company filings
Mutual fund information
Promoter disclosures
Market statistics
```

---

# 8. NSE

Use NSE as a primary source for NSE-related information where legally and technically permitted.

Potential datasets:

```text
Equity prices
Indices
Market statistics
Option chain
Futures
Options
Open interest
Corporate announcements
Corporate actions
Market breadth
FII/DII information
```

The ingestion system must respect NSE:

```text
Terms of use
robots restrictions
rate limits
access restrictions
data licensing
```

Do not implement aggressive scraping.

---

# 9. BSE

Use BSE as a primary source for BSE-related information where legally and technically permitted.

Potential datasets:

```text
Equity prices
Corporate announcements
Corporate actions
Company filings
Bulk deals
Block deals
Shareholding information
Market statistics
```

Respect all:

```text
Terms
Licensing
Rate limits
Access policies
```

---

# 10. MCX

MCX should be the preferred official exchange source for commodity-related market information where permitted.

Potential data:

```text
Gold
Gold Mini
Silver
Crude Oil
Crude Oil Mini
Natural Gas
Other listed commodities
```

---

# 11. SEBI

SEBI should be used for regulatory and disclosure information.

Potential information:

```text
Regulatory announcements
Market regulations
Insider trading disclosures
Promoter disclosures
Institutional information
Investor-related statistics
Regulatory actions
```

---

# 12. RBI

RBI should be a primary source for:

```text
Interest rates
Monetary policy
RBI announcements
Foreign exchange information
Liquidity information
Economic statistics
Banking system information
```

RBI information can materially affect:

```text
Banks
NBFCs
Financial stocks
Bond markets
INR
Inflation expectations
Equities
```

---

# 13. NSDL / CDSL

Use depository information where legally and technically available.

Potential information:

```text
FPI activity
Foreign ownership
Depository statistics
Shareholding-related information
```

---

# 14. AMFI

Use AMFI for mutual-fund related information where available.

Potential data:

```text
Mutual fund holdings
AUM
Fund flows
Scheme information
Industry statistics
```

---

# 15. COMPANY FILINGS

Company filings should be considered high-value fundamental information.

Potential information:

```text
Quarterly results
Annual results
Investor presentations
Earnings releases
Guidance
Management commentary
Board decisions
Corporate actions
Material events
Acquisitions
Divestments
Debt changes
Promoter activity
```

The system must store:

```text
publication_time
available_at
source_url
document_type
company_id
```

---

# 16. PROFESSIONAL MARKET DATA PROVIDERS

The architecture must support licensed market-data providers.

The provider should be abstracted behind an interface.

Example:

```text
MarketDataProvider
    ├── get_quotes()
    ├── get_ohlcv()
    ├── get_option_chain()
    ├── get_open_interest()
    ├── get_instruments()
    └── get_market_status()
```

The application must NOT tightly couple the scoring engine to one provider.

---

# 17. BROKER APIs

The application may optionally support broker APIs.

Examples may include:

```text
Zerodha
Groww
Angel One
Upstox
ICICI Direct
5paisa
Dhan
Fyers
```

Broker APIs may be used for:

```text
Market data
Quotes
Historical data
Paper trading
Portfolio information
```

However:

## Broker integration must remain separate from the research engine.

The research engine must continue working without a broker account.

---

# 18. IMPORTANT BROKER RULE

Broker API availability must never be assumed.

The system must implement:

```text
Provider Adapter
```

Example:

```text
BrokerProvider
    ↓
ZerodhaAdapter
GrowwAdapter
DhanAdapter
OtherAdapter
```

This makes the system replaceable.

---

# 19. REAL-TIME MARKET DATA

Real-time data should be obtained from a source that explicitly permits the intended use.

Required fields:

```text
instrument
timestamp
LTP
bid
ask
volume
open
high
low
previous_close
open_interest
source
```

The application must identify whether data is:

```text
REAL_TIME
DELAYED
SNAPSHOT
END_OF_DAY
```

---

# 20. HISTORICAL MARKET DATA

Historical data is required for:

```text
Backtesting
Technical analysis
Momentum
Volatility
Drawdown analysis
Regime detection
Signal validation
Model training
```

Minimum required history:

```text
Daily:
Prefer 10+ years where available.

Intraday:
Use the maximum legally/licensed period available.
```

The model must not claim a backtest period longer than the actual available clean data.

---

# 21. OPTIONS DATA

Options data is one of the most important components.

Required:

```text
Strike
Expiry
CE/PE
LTP
Volume
Open Interest
Change in OI
Bid
Ask
IV
Underlying price
Timestamp
```

Optional:

```text
Greeks
Historical IV
IV percentile
IV rank
```

---

# 22. OPTIONS DATA VALIDATION

The system must detect:

```text
Missing strikes
Missing expiry
Duplicate contracts
Stale OI
Invalid prices
Negative volume
Incorrect timestamps
Impossible bid/ask relationships
```

Invalid data must not directly enter the signal engine.

---

# 23. FII/DII DATA

FII/DII data should preferably come from official exchange/regulatory sources.

Store:

```text
Date
Category
Buy value
Sell value
Net value
Segment
Source
Publication time
```

The application should calculate:

```text
1D
3D
5D
10D
20D
1M
3M
```

rolling flows.

---

# 24. INSTITUTIONAL HOLDINGS

This is a core feature of AI Market Intelligence.

Track:

```text
Mutual Funds
FII/FPI
Insurance Companies
Banks
Pension Funds
Sovereign Funds
Promoters
Institutional Investors
```

Where data is available, capture:

```text
Investor
Company
Shares held
Ownership %
Previous ownership %
Change
Transaction date
Reporting period
```

---

# 25. BIG INVESTOR / SMART MONEY DATA

The application must specifically track:

```text
WHO IS BUYING?
WHO IS SELLING?
HOW MUCH?
WHEN?
IS THE POSITION INCREASING?
IS IT A NEW POSITION?
IS IT A CONTINUOUS ACCUMULATION?
IS MULTIPLE INSTITUTIONS ACCUMULATING?
```

This information feeds:

```text
SMART_MONEY_SCORE
```

---

# 26. SMART MONEY MUST NOT BE A SINGLE SOURCE

Do not define smart money as:

```text
"Investor X bought the stock."
```

Instead calculate it from multiple evidence sources:

```text
Institutional holding changes
+
Bulk deals
+
Block deals
+
Promoter activity
+
Mutual fund activity
+
FII/DII flows
+
Price/volume confirmation
```

---

# 27. BULK AND BLOCK DEALS

Track:

```text
Date
Company
Buyer
Seller
Quantity
Price
Value
Transaction type
```

These should be mapped to the relevant instrument.

---

# 28. INSIDER / PROMOTER ACTIVITY

Track:

```text
Promoter buying
Promoter selling
Pledge increase
Pledge reduction
Insider buying
Insider selling
```

Promoter accumulation should be treated differently from ordinary institutional activity.

---

# 29. GLOBAL MARKETS

The system must monitor major global markets.

Minimum watchlist:

```text
S&P 500
NASDAQ
Dow Jones
Russell 2000
Nikkei 225
Hang Seng
Shanghai Composite
FTSE 100
DAX
CAC 40
```

Additional markets can be configured later.

---

# 30. GLOBAL FUTURES

Where reliable data is available:

```text
US index futures
European futures
Asian futures
```

Use them for:

```text
Pre-market sentiment
Risk-on / risk-off
Gap probability
Global correlation
```

---

# 31. VOLATILITY

Monitor:

```text
India VIX
CBOE VIX
Other major volatility indices
```

Use volatility for:

```text
Market regime
Options strategy suitability
Risk adjustment
Position sizing
Signal confidence
```

---

# 32. CURRENCY

Important currency data:

```text
USDINR
DXY
EURUSD
USDJPY
Other major FX pairs
```

USDINR is particularly important for Indian market analysis.

---

# 33. COMMODITIES

Monitor at least:

```text
Crude Oil
Gold
Silver
Natural Gas
Copper
```

Commodity movements should be mapped to Indian sectors.

Example:

```text
Crude ↑
    ↓
Inflation pressure
    ↓
Oil marketing / aviation / paint / chemical impact
```

---

# 34. BOND YIELDS

Monitor:

```text
US 10Y
US 2Y
India 10Y
```

Potential derived features:

```text
Yield spread
Yield change
Curve steepening
Curve inversion
```

---

# 35. ECONOMIC CALENDAR

The application should maintain an economic event calendar.

Events:

```text
US CPI
US Jobs
US GDP
Fed decision
ECB decision
RBI decision
India CPI
India WPI
India GDP
India PMI
IIP
Trade data
Employment data
```

Each event must contain:

```text
Expected
Previous
Actual
Release time
Importance
Country
Source
```

---

# 36. MACRO DATA RULE

Never use future economic information in historical backtests.

Use:

```text
available_at
```

rather than simply:

```text
period
```

---

# 37. GEOPOLITICAL DATA

Geopolitical information should come from multiple reputable sources.

Potential categories:

```text
War
Military conflict
Sanctions
Trade restrictions
Shipping disruption
Oil supply disruption
Political instability
Major elections
Diplomatic events
Natural disasters
```

The system should NOT directly translate a headline into a BUY/SELL signal.

Instead:

```text
EVENT
 ↓
SEVERITY
 ↓
AFFECTED COUNTRIES
 ↓
AFFECTED COMMODITIES
 ↓
AFFECTED SECTORS
 ↓
MARKET TRANSMISSION
 ↓
MODEL SCORE
```

---

# 38. NEWS SOURCES

The architecture must support multiple reputable news sources.

Potential categories:

```text
International news agencies
Indian financial news
Business newspapers
Exchange announcements
Company announcements
Government announcements
Central-bank announcements
```

Use licensed APIs/feeds wherever required.

---

# 39. NEWS RELIABILITY

Every source gets:

```text
reliability_score
```

News from an official company filing should receive a different treatment from an unverified social-media post.

---

# 40. SOCIAL MEDIA

Social media can be used as:

```text
EARLY SIGNAL
```

but NOT as:

```text
PRIMARY FACT
```

Social-media information must never directly trigger a high-confidence BUY/SELL signal without independent confirmation.

---

# 41. NEWS SENTIMENT

The AI may calculate:

```text
Sentiment
Importance
Novelty
Market relevance
Confidence
```

But sentiment alone must never generate a trade.

Example:

```text
News Score = +80
```

does NOT mean:

```text
BUY
```

It becomes one input to the composite model.

---

# 42. SOURCE CROSS-VALIDATION

For critical information:

```text
Primary Source
      +
Secondary Source
```

should be compared where possible.

Example:

```text
Company announcement
+
Exchange announcement
```

If the values disagree:

```text
FLAG_CONFLICT
```

and prevent high-confidence model usage until resolved.

---

# 43. SOURCE PRIORITY

Default priority:

```text
1. Official exchange/regulator
2. Company filing
3. Licensed professional data
4. Reputable financial data provider
5. Reputable news provider
6. Aggregator
7. Social media
```

The priority must be configurable.

---

# 44. DATA PROVIDER ADAPTER

Every provider must implement a common interface.

Example:

```text
interface MarketDataProvider {

    get_instruments()

    get_quote(instrument)

    get_ohlcv(instrument, timeframe, start, end)

    get_option_chain(underlying, expiry)

    get_open_interest(contract)

    get_market_status()

}
```

Additional interfaces:

```text
FundamentalDataProvider
InstitutionalDataProvider
NewsProvider
MacroDataProvider
GeopoliticalDataProvider
GlobalMarketProvider
```

---

# 45. PROVIDER REGISTRY

Maintain a provider registry.

Example:

```text
Provider
--------
Name
Category
Priority
Reliability
Available datasets
Rate limits
License
API status
Last successful request
```

---

# 46. FAILOVER

If the primary provider becomes unavailable:

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

But:

## Never silently switch sources without recording the source change.

---

# 47. PROVIDER HEALTH

Track:

```text
ONLINE
DEGRADED
OFFLINE
RATE_LIMITED
AUTH_ERROR
DATA_ERROR
UNKNOWN
```

The desktop dashboard should show provider health.

---

# 48. INTERNET AVAILABILITY

The desktop application is designed to work in two states.

## ONLINE

```text
Internet available
 ↓
Synchronize
 ↓
Validate
 ↓
Calculate
 ↓
Generate fresh research
```

## OFFLINE

```text
Internet unavailable
 ↓
Use stored data
 ↓
Display last update
 ↓
Do not generate false "live" signals
```

---

# 49. INTERNET RECOVERY

When internet becomes available:

```text
CONNECTIVITY DETECTED
        ↓
CHECK PROVIDER HEALTH
        ↓
IDENTIFY MISSING DATA
        ↓
DOWNLOAD INCREMENTAL DATA
        ↓
VALIDATE
        ↓
STORE RAW DATA
        ↓
UPDATE FEATURES
        ↓
UPDATE FACTOR SCORES
        ↓
UPDATE MARKET REGIME
        ↓
GENERATE SIGNALS
```

---

# 50. DATA FRESHNESS

Every data point must have a freshness classification.

```text
LIVE
RECENT
STALE
VERY_STALE
UNKNOWN
```

Example:

```text
Price updated:
10 seconds ago → LIVE

Price updated:
10 minutes ago → RECENT

Price updated:
2 hours ago → STALE

Price updated:
2 days ago → VERY_STALE
```

Thresholds must be configurable by dataset.

---

# 51. SIGNAL DATA REQUIREMENT

Before generating a signal, the engine must check:

```text
Is price data fresh?
Is options data fresh?
Is relevant news fresh?
Is institutional data current?
Is global data available?
Is macro data available?
Are there data conflicts?
```

If critical information is missing:

```text
NO_TRADE
```

may be preferable to a low-quality BUY/SELL.

---

# 52. DATA QUALITY SCORE

Every model input should have:

```text
data_quality_score
```

between:

```text
0–100
```

Example:

```text
Price Data       98
Options Data     95
Fundamentals     92
News             80
Institutional    90
Global           96
```

Composite data quality can then be calculated.

---

# 53. DATA SOURCE CONFIDENCE

Source reliability and data quality are different.

Example:

```text
Official NSE source
Reliability = 98

But today's data is incomplete.
Data quality = 60
```

Do not confuse these two concepts.

---

# 54. LICENSING REQUIREMENT

Before production deployment, verify the licensing terms of every provider.

The system must distinguish:

```text
FREE
FREE_WITH_RESTRICTIONS
PERSONAL_USE
NON_COMMERCIAL
COMMERCIAL_LICENSE_REQUIRED
REAL_TIME_LICENSE_REQUIRED
REDISTRIBUTION_RESTRICTED
UNKNOWN
```

Do not assume that publicly visible data is automatically free for commercial redistribution.

---

# 55. API CREDENTIALS

Credentials must never be committed into Git.

Use:

```text
.env
OS secure credential store
encrypted configuration
secret manager
```

Never:

```text
API_KEY = "123456"
```

inside source code.

---

# 56. RATE LIMITS

Every provider adapter must implement:

```text
Rate Limiter
Retry Policy
Exponential Backoff
Request Queue
Circuit Breaker
```

Never continuously hammer an API.

---

# 57. REQUEST CACHING

Cache data that does not need repeated retrieval.

Examples:

```text
Instrument master
Company metadata
Historical fundamentals
Corporate actions
Previous trading sessions
```

Do not repeatedly download unchanged information.

---

# 58. INCREMENTAL DOWNLOAD

Use:

```text
last_successful_timestamp
```

or equivalent checkpoint.

Example:

```text
Last successful:
2026-08-30 10:00

Next request:
2026-08-30 10:00 → current
```

Do not download years of history every time the application starts.

---

# 59. RAW DATA STORAGE

Raw provider responses should be stored when legally permitted and technically practical.

Recommended:

```text
raw_data/
    provider/
        dataset/
            date/
```

or an equivalent database/object-storage architecture.

The raw record must be traceable to:

```text
provider
request
timestamp
dataset
```

---

# 60. DATA NORMALIZATION

Different providers use different:

```text
Symbol names
Timestamp formats
Units
Currencies
Contract names
Expiry formats
```

The ingestion layer must normalize these before the research engine uses them.

---

# 61. INSTRUMENT MAPPING

Create a central instrument mapping layer.

Example:

```text
Provider A:
RELIANCE

Provider B:
RELIANCE-EQ

NSE:
RELIANCE

Internal:
instrument_id = 12345
```

All must map to the same internal instrument.

---

# 62. OPTIONS MAPPING

Option contracts must be mapped using:

```text
Underlying
Expiry
Strike
CE/PE
Exchange
```

Do not identify an option solely by its display symbol.

---

# 63. COMMODITY MAPPING

Commodity contracts must include:

```text
Commodity
Contract month
Expiry
Exchange
Lot size
Unit
```

This is particularly important for MCX contracts.

---

# 64. DATA RECONCILIATION

For critical datasets, compare:

```text
Provider A
Provider B
Official Source
```

where possible.

If discrepancy exceeds configured tolerance:

```text
DATA_CONFLICT
```

must be generated.

---

# 65. PRICE ANOMALY DETECTION

The system should detect suspicious movements.

Examples:

```text
Price changed +50% in 1 minute
Volume suddenly 100x normal
Negative price
High < Low
LTP outside bid/ask bounds
```

These should trigger:

```text
DATA_QUALITY_WARNING
```

rather than automatically becoming trading signals.

---

# 66. CORPORATE ACTION VALIDATION

When detecting:

```text
Split
Bonus
Dividend
Merger
Demerger
```

validate against an official or high-confidence source.

Corporate actions can otherwise corrupt historical backtests.

---

# 67. NEWS DEDUPLICATION

The same event may appear across 20 websites.

The system should cluster similar stories.

Example:

```text
20 articles
      ↓
1 underlying event
      ↓
event_id
```

This prevents one event from receiving 20x weighting.

---

# 68. NEWS EVENT CLUSTER

Each cluster should contain:

```text
event_id
headline
first_seen
last_seen
sources
affected_entities
sentiment
importance
confidence
```

---

# 69. GEOPOLITICAL EVENT CLUSTER

Similar geopolitical news must be grouped.

Example:

```text
Headline 1
Headline 2
Headline 3
Headline 4
       ↓
Same underlying event
       ↓
ONE geopolitical event
```

Avoid double-counting.

---

# 70. DATA AVAILABILITY MATRIX

Maintain a machine-readable configuration such as:

```text
dataset
provider
priority
real_time
historical
frequency
license_status
reliability
enabled
```

Example:

```text
OHLCV
NSE
1
YES
YES
1m/Daily
LICENSE_CHECK
95
TRUE
```

---

# 71. PROVIDER CONFIGURATION

Store provider configuration outside the scoring engine.

Example:

```text
providers.yaml
```

Possible structure:

```text
provider:
  name:
  type:
  priority:
  datasets:
  rate_limit:
  reliability_score:
  license_status:
  enabled:
```

---

# 72. NO HARD-CODED PROVIDER LOGIC

Bad:

```text
if NSE:
    call_specific_function()
```

Preferred:

```text
provider_registry
        ↓
provider_adapter
        ↓
standardized_response
```

This allows future provider replacement.

---

# 73. AI ACCESS TO DATA

The AI reasoning layer must never directly browse random websites and make unsupported claims during normal signal generation.

Preferred architecture:

```text
External Sources
       ↓
Data Ingestion
       ↓
Validated Database
       ↓
Research Engine
       ↓
AI Explanation Layer
```

The AI receives structured evidence.

---

# 74. AI SOURCE CITATIONS

Every AI-generated research explanation should be capable of identifying:

```text
Data source
Source timestamp
Relevant event
Model calculation
```

Example:

```text
BUY score increased because:

FII flow: +₹X
Institutional accumulation: +X
Price momentum: +X
Sector strength: +X
Options positioning: +X
```

The AI must not invent supporting reasons.

---

# 75. SOURCE TIMESTAMP

For every important input store:

```text
event_time
published_at
available_at
retrieved_at
```

This is critical for backtesting and real-time decisions.

---

# 76. POINT-IN-TIME RULE

The most important rule for research:

> The model may only use information that was available at the exact decision timestamp.

Example:

```text
Decision:
10:00 AM

News published:
10:05 AM

```

The 10:05 AM news must NOT influence the 10:00 AM signal.

---

# 77. BACKTEST DATA SOURCE RULE

Backtesting must use the same data methodology that would have been available in production.

Do not:

```text
Use today's revised data
to simulate yesterday's decision
```

unless the revision was actually available at that historical time.

---

# 78. DATA SOURCE FAILURE POLICY

If a critical source fails:

```text
DO NOT GUESS
DO NOT FABRICATE
DO NOT SUBSTITUTE RANDOM DATA
```

Instead:

```text
mark data stale
reduce confidence
or generate NO_TRADE
```

depending on severity.

---

# 79. CRITICAL DATA

Critical datasets include:

```text
Current price
Market status
Options OI
Options price
Major corporate announcements
Major geopolitical events
Major macro events
```

Missing critical data should significantly reduce signal confidence.

---

# 80. NON-CRITICAL DATA

Examples:

```text
Secondary sentiment
Minor news
Historical commentary
Low-impact indicators
```

Missing non-critical data may reduce confidence without completely blocking the signal.

---

# 81. SOURCE CONFIDENCE IN MODEL

The scoring engine may use:

```text
source_reliability
data_quality
data_freshness
cross_source_agreement
```

to determine evidence confidence.

Example:

```text
Evidence Confidence =
Source Reliability
× Data Quality
× Freshness
× Cross-Source Agreement
```

The exact formula must be defined in `QUANT_MODEL.md`.

---

# 82. DATA SOURCE AUDIT

Every ingestion run must record:

```text
Provider
Dataset
Start time
End time
Records received
Records accepted
Records rejected
Errors
Latency
```

---

# 83. PROVIDER MONITORING DASHBOARD

The desktop application should eventually show:

```text
DATA PROVIDERS

NSE             🟢
BSE             🟢
MCX             🟢
Market Data API 🟢
News            🟢
Global Markets  🟢
Macro           🟢
Geopolitical    🟢
```

and:

```text
Last update
Data freshness
Failed requests
```

---

# 84. MARKET DATA STATUS

Before showing:

```text
BUY
SELL
STRONG BUY
STRONG SELL
```

the application should display:

```text
DATA QUALITY: 94/100
DATA FRESHNESS: LIVE
SOURCE AGREEMENT: HIGH
```

---

# 85. SIGNAL BLOCKING CONDITIONS

The signal engine must be allowed to return:

```text
NO_TRADE
```

when:

```text
Critical data missing
Critical data stale
Major provider conflict
Market status uncertain
Options data unavailable for an options strategy
Corporate action unresolved
Model data quality below threshold
```

---

# 86. SOURCE CHANGE MANAGEMENT

If a provider is replaced:

```text
Old Provider
     ↓
New Provider
```

the system must record:

```text
effective_date
reason
migration_version
validation_result
```

Historical calculations must remain reproducible.

---

# 87. PROVIDER TESTING

Each provider adapter must have automated tests for:

```text
Authentication
Request
Response parsing
Missing fields
Rate limit
Timeout
Invalid response
Duplicate data
Timestamp handling
Symbol mapping
```

---

# 88. MOCK PROVIDERS

Development must support mock data providers.

Example:

```text
MockMarketDataProvider
MockNewsProvider
MockOptionsProvider
```

This allows development without repeatedly calling external APIs.

---

# 89. COST MANAGEMENT

Track provider usage:

```text
Requests today
Requests this month
Data volume
Estimated cost
Rate-limit usage
```

This is important because the application may eventually use multiple paid APIs.

---

# 90. PROVIDER COST OPTIMIZATION

Do not retrieve expensive data unnecessarily.

Example:

```text
Daily fundamental data
```

does not need to be downloaded every minute.

Whereas:

```text
Index price
Option chain
```

may require frequent updates during market hours.

---

# 91. DATA REFRESH FREQUENCY

Suggested architecture:

```text
Market price:
Seconds/minutes depending on licensed source

Options:
Minutes during market hours

FII/DII:
Daily / when published

Fundamentals:
Quarterly / event-driven

Institutional holdings:
Reporting-period based

Global markets:
Minutes / end-of-day depending on source

Macro:
Event-driven

News:
Near real-time where licensed

Geopolitical:
Event-driven
```

Exact intervals must be configurable.

---

# 92. MARKET HOURS

The scheduler must understand Indian market sessions.

Do not continuously request market data when the market is closed unless required for:

```text
Global markets
News
Macro
Overnight events
```

---

# 93. PRE-MARKET ANALYSIS

Before Indian market opens, collect:

```text
Global market performance
US close
Asian market status
US futures
Crude
Gold
USDINR
DXY
India VIX
Overnight news
Geopolitical events
Macro events
FII/DII previous session
```

Generate:

```text
PRE_MARKET_SENTIMENT
```

not an automatic BUY/SELL.

---

# 94. INTRADAY ANALYSIS

During market hours:

```text
Price
Volume
OI
Options
Market breadth
Sector rotation
FII/DII
News
Global markets
```

should be monitored.

---

# 95. POST-MARKET ANALYSIS

After market close:

```text
Daily OHLC
Volume
Market breadth
FII/DII
Institutional activity
Sector performance
Options OI changes
Global markets
News
Corporate events
```

Update the research database.

---

# 96. OVERNIGHT ANALYSIS

When Indian markets are closed:

```text
US markets
Global futures
Asian markets
Currencies
Commodities
Geopolitical developments
News
Macro events
```

can continue updating.

---

# 97. SOURCE PRIORITY CONFIGURATION

The source priority must be configurable.

Example:

```text
PRICE:
1. Official exchange
2. Licensed provider
3. Broker API

FUNDAMENTALS:
1. Company filing
2. Official exchange
3. Licensed provider

NEWS:
1. Official announcement
2. Reputable news provider
3. Financial media
4. Aggregator
```

---

# 98. DO NOT USE GOOGLE SEARCH AS PRIMARY MARKET DATA

General web search may be useful for:

```text
Research
Discovery
Finding official documents
Context
```

but should not be treated as a structured market-data feed.

---

# 99. DO NOT USE LLM KNOWLEDGE AS MARKET DATA

The LLM's internal knowledge must never be used for:

```text
Current price
Current FII flow
Current OI
Current news
Current holdings
Current market status
```

These must come from live/validated sources.

---

# 100. FINAL ARCHITECTURE

The complete data architecture should be:

```text
                    INTERNET
                       │
       ┌───────────────┼────────────────┐
       │               │                │
   EXCHANGES       DATA PROVIDERS      NEWS
       │               │                │
       └───────────────┼────────────────┘
                       ↓
               PROVIDER ADAPTERS
                       ↓
                RAW DATA LAYER
                       ↓
              VALIDATION ENGINE
                       ↓
              NORMALIZATION ENGINE
                       ↓
               CENTRAL DATABASE
                       ↓
                FEATURE ENGINE
                       ↓
               FACTOR ENGINE
                       ↓
                QUANT MODEL
                       ↓
                SIGNAL ENGINE
                       ↓
                AI EXPLANATION
                       ↓
             DESKTOP DASHBOARD
```

---

# 101. MOST IMPORTANT PRINCIPLE

AI Market Intelligence is NOT:

```text
Internet
   ↓
AI
   ↓
BUY/SELL
```

It must be:

```text
Reliable Sources
       ↓
Validated Data
       ↓
Historical Database
       ↓
Quantitative Features
       ↓
Institutional / Smart Money Analysis
       ↓
Options Analysis
       ↓
Fundamental Analysis
       ↓
Technical Analysis
       ↓
Global/Macro Analysis
       ↓
Geopolitical Analysis
       ↓
Composite Model
       ↓
Risk Engine
       ↓
BUY / SELL / NO TRADE
       ↓
AI Explanation
```

---

# 102. DEVELOPMENT REQUIREMENT

Claude Code must NOT immediately implement every provider.

First create:

```text
Provider Interface
Provider Registry
Mock Provider
Data Source Configuration
Data Quality Framework
Provider Health Monitor
```

Then implement providers incrementally.

---

# 103. PROVIDER IMPLEMENTATION ORDER

Recommended:

## Stage 1

```text
Official Indian market/instrument data
Basic OHLCV
Market status
Trading calendar
```

## Stage 2

```text
Options chain
Open Interest
Futures
```

## Stage 3

```text
FII/DII
Bulk/block deals
Institutional activity
Corporate announcements
```

## Stage 4

```text
Fundamentals
Earnings
Valuation
```

## Stage 5

```text
Global markets
USDINR
DXY
Crude
Gold
VIX
Bond yields
```

## Stage 6

```text
News
Macro
Geopolitical events
```

## Stage 7

```text
Smart Money engine
Factor engine
Signal engine
```

---

# 104. CLAUDE CODE IMPLEMENTATION RULE

Before writing provider-specific code, Claude Code must:

1. Read `MASTER_SPEC.md`.
2. Read `PRODUCT_REQUIREMENT.md`.
3. Read `QUANT_MODEL.md`.
4. Read `DATABASE_SPEC.md`.
5. Read this `DATA_SOURCES.md`.
6. Identify which datasets are required by V1.
7. Identify which datasets require licensed access.
8. Identify which providers are actually available.
9. Avoid implementing an unsupported provider API.
10. Create provider interfaces first.
11. Create mock providers.
12. Create automated tests.
13. Only then implement real provider adapters.

---

# 105. NO FAKE DATA

Claude Code must NEVER create fake live market data to make the application appear functional.

For development:

```text
MOCK DATA
```

must be explicitly labelled.

For production:

```text
REAL DATA ONLY
```

must be used.

---

# 106. NO FAKE SIGNALS

The application must never display:

```text
BUY
SELL
STRONG BUY
STRONG SELL
```

using fabricated data.

If required data is unavailable:

```text
NO TRADE
```

or:

```text
INSUFFICIENT DATA
```

must be displayed.

---

# 107. DATA SOURCE DOCUMENTATION

Every production provider must have documentation containing:

```text
Provider name
Official website
API documentation
Dataset availability
Authentication method
Rate limits
Historical availability
Real-time availability
Licensing
Commercial-use restrictions
Known limitations
Fallback provider
```

---

# 108. FINAL OBJECTIVE

The purpose of this specification is to ensure that AI Market Intelligence becomes a:

```text
DATA-DRIVEN RESEARCH PLATFORM
```

rather than:

```text
AI STOCK TIP GENERATOR
```

The application should produce trading/investment ideas only after evaluating multiple independent evidence sources.

The system must always be capable of saying:

```text
BUY
SELL
HOLD
NO TRADE
INSUFFICIENT DATA
```

and must prefer:

```text
NO TRADE
```

over a low-confidence or unsupported recommendation.

---

# 109. SOURCE-OF-TRUTH RULE

For current market information:

```text
DATABASE + VALIDATED LIVE SOURCES
```

are the source of truth.

For calculations:

```text
QUANTITATIVE MODEL
```

is the source of truth.

For explanations:

```text
AI
```

is the explanation layer.

The AI must never become the source of truth for market facts.
