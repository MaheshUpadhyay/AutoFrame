# AI MARKET INTELLIGENCE

## DATABASE SPECIFICATION

**Document Version:** 1.0
**Database Status:** V1 Architecture
**Market:** Indian Equity, F&O and Commodities
**Primary Markets:** NSE, BSE, MCX
**Primary Purpose:** Store reliable historical and real-time market intelligence for research, scoring, backtesting and signal generation.

---

# 1. PURPOSE

This document defines the database architecture for AI Market Intelligence.

The database must support:

* Indian equities
* Indices
* Futures
* Options
* Commodities
* Historical prices
* OHLCV
* Corporate fundamentals
* FII/DII activity
* Institutional holdings
* Mutual fund holdings
* Promoter activity
* Bulk/block deals
* Options open interest
* Options Greeks
* Market breadth
* Global markets
* Currency
* Commodities
* Macro-economic data
* News
* Geopolitical events
* Market regimes
* Quantitative factor scores
* Trading signals
* Backtesting
* Signal outcomes
* Model versions
* Data quality
* Audit history

---

# 2. CORE DATABASE PRINCIPLE

The database must strictly separate:

```text
RAW DATA
    ↓
CLEANED DATA
    ↓
DERIVED FEATURES
    ↓
FACTOR SCORES
    ↓
MODEL SCORES
    ↓
SIGNALS
    ↓
OUTCOMES
```

Never overwrite raw market data with calculated values.

---

# 3. GOLDEN RULE

## RAW DATA MUST NEVER BE MODIFIED

If a provider sends:

```text
Price = 2450.50
```

store that original value.

If later the calculation engine determines:

```text
Adjusted Price = 2438.20
```

the adjusted value must be stored separately.

This is critical for:

* Backtesting
* Auditing
* Reproducibility
* Debugging
* Model comparison

---

# 4. DATABASE TECHNOLOGY

Recommended V1 architecture:

```text
PostgreSQL
```

Use PostgreSQL as the primary relational database.

Recommended extensions where appropriate:

```text
TimescaleDB
```

for high-volume time-series market data.

Use:

```text
Redis
```

only as a cache.

Redis must NOT be treated as the permanent source of truth.

---

# 5. DATABASE LAYERS

Organize data logically into schemas.

Recommended:

```text
market
fundamental
institutional
options
macro
news
research
model
signals
backtest
system
audit
```

---

# 6. MARKET SCHEMA

The `market` schema contains price and trading information.

Tables:

```text
market.instruments
market.exchanges
market.trading_sessions
market.ohlcv
market.daily_prices
market.adjusted_prices
market.corporate_actions
market.market_breadth
market.index_data
market.futures_prices
```

---

# 7. INSTRUMENT MASTER

Table:

```text
market.instruments
```

Purpose:

Store every security/instrument known to the system.

Required fields:

```text
id
symbol
trading_symbol
company_name
short_name
isin
exchange
instrument_type
asset_class
sector
industry
underlying_instrument_id
lot_size
tick_size
currency
expiry_date
strike_price
option_type
listing_date
delisting_date
is_active
created_at
updated_at
```

---

# 8. INSTRUMENT TYPES

Supported values:

```text
EQUITY
INDEX
FUTURE
OPTION
COMMODITY
COMMODITY_FUTURE
COMMODITY_OPTION
ETF
CURRENCY
```

---

# 9. ASSET CLASSES

Examples:

```text
EQUITY
INDEX
DERIVATIVE
COMMODITY
CURRENCY
```

---

# 10. INSTRUMENT IDENTIFICATION

Do not use symbol alone as a unique identifier.

Use a stable internal:

```text
instrument_id
```

because symbols can change.

ISIN should be stored where available.

For derivatives, identity must include:

```text
Underlying
Expiry
Strike
Option Type
```

---

# 11. EXCHANGE TABLE

Table:

```text
market.exchanges
```

Fields:

```text
id
exchange_code
exchange_name
country
timezone
currency
market_type
is_active
```

Examples:

```text
NSE
BSE
MCX
```

---

# 12. TRADING SESSIONS

Table:

```text
market.trading_sessions
```

Fields:

```text
id
exchange_id
trading_date
session_start
session_end
is_trading_day
holiday_reason
created_at
```

This is essential for:

* Holidays
* Missing candles
* Backtesting
* Market-open checks
* Expiry calculations

Never assume every calendar day is a trading day.

---

# 13. OHLCV TABLE

Table:

```text
market.ohlcv
```

Fields:

```text
id
instrument_id
exchange_id
timestamp
timeframe
open
high
low
close
volume
value_traded
open_interest
source_id
is_adjusted
created_at
```

Timeframes:

```text
1m
5m
15m
30m
1h
1D
1W
1M
```

---

# 14. OHLC DATA RULES

Validation rules:

```text
high >= open
high >= close
low <= open
low <= close
high >= low
volume >= 0
```

Invalid records must be rejected or quarantined.

---

# 15. DATA SOURCE

Every external dataset must record:

```text
source_id
```

This allows the system to answer:

> Where did this number come from?

---

# 16. PRICE ADJUSTMENTS

Corporate actions can affect historical prices.

Store:

```text
market.corporate_actions
```

Supported events:

```text
SPLIT
BONUS
RIGHTS
DIVIDEND
MERGER
DEMERGER
DELISTING
SYMBOL_CHANGE
```

Adjusted historical data must never overwrite raw historical data.

---

# 17. FUNDAMENTAL SCHEMA

Tables:

```text
fundamental.financial_periods
fundamental.income_statement
fundamental.balance_sheet
fundamental.cash_flow
fundamental.ratios
fundamental.earnings
fundamental.guidance
fundamental.analyst_estimates
```

---

# 18. FINANCIAL PERIODS

Table:

```text
fundamental.financial_periods
```

Fields:

```text
id
instrument_id
period_type
period_start
period_end
report_date
filing_date
fiscal_year
fiscal_quarter
source_id
```

Period types:

```text
QUARTERLY
HALF_YEARLY
ANNUAL
TTM
```

---

# 19. INCOME STATEMENT

Store:

```text
revenue
operating_income
ebitda
ebit
interest_expense
profit_before_tax
tax
net_profit
eps
```

Also store:

```text
reported_currency
unit
source_id
```

---

# 20. BALANCE SHEET

Store:

```text
total_assets
total_liabilities
equity
cash
total_debt
short_term_debt
long_term_debt
inventory
receivables
payables
```

---

# 21. CASH FLOW

Store:

```text
operating_cash_flow
investing_cash_flow
financing_cash_flow
capital_expenditure
free_cash_flow
```

---

# 22. FUNDAMENTAL RATIOS

Table:

```text
fundamental.ratios
```

Potential fields:

```text
pe
forward_pe
pb
ps
ev_ebitda
roe
roce
roa
debt_equity
net_debt_ebitda
interest_coverage
ebitda_margin
net_margin
fcf_yield
dividend_yield
peg
```

Do not assume every ratio is appropriate for every sector.

---

# 23. EARNINGS

Table:

```text
fundamental.earnings
```

Store:

```text
actual_eps
estimated_eps
actual_revenue
estimated_revenue
eps_surprise
revenue_surprise
guidance_change
earnings_date
```

---

# 24. INSTITUTIONAL SCHEMA

This is one of the most important sections of the database.

Tables:

```text
institutional.investors
institutional.holdings
institutional.holding_changes
institutional.fii_dii_flows
institutional.mutual_fund_holdings
institutional.insurance_holdings
institutional.bulk_deals
institutional.block_deals
institutional.promoter_transactions
```

---

# 25. INVESTOR MASTER

Table:

```text
institutional.investors
```

Fields:

```text
id
investor_name
investor_type
country
institution_category
quality_score
source_id
is_active
created_at
updated_at
```

Investor types:

```text
FII
DII
MUTUAL_FUND
INSURANCE
BANK
PENSION
SOVEREIGN
PROMOTER
INSTITUTIONAL
OTHER
```

---

# 26. INSTITUTION QUALITY SCORE

Each institution may have:

```text
quality_score
```

between:

```text
0–100
```

This must NOT represent whether the investor is always correct.

It represents the reliability/importance of the institution as an information source for the model.

---

# 27. HOLDINGS TABLE

Table:

```text
institutional.holdings
```

Fields:

```text
id
investor_id
instrument_id
reporting_period
holding_quantity
holding_percentage
market_value
source_id
reported_at
```

---

# 28. HOLDING CHANGES

Table:

```text
institutional.holding_changes
```

Calculated fields:

```text
previous_holding_percentage
current_holding_percentage
change_percentage_points
quantity_change
market_value_change
direction
```

Direction:

```text
ACCUMULATION
REDUCTION
UNCHANGED
NEW_POSITION
EXIT
```

---

# 29. SMART MONEY SNAPSHOT

Create a derived table:

```text
institutional.smart_money_scores
```

Fields:

```text
id
instrument_id
calculation_date
ownership_change_score
institution_breadth_score
persistence_score
transaction_magnitude_score
acceleration_score
institution_quality_score
concentration_score
smart_money_score
confidence
data_quality
model_version
```

---

# 30. BIG INVESTOR CONVICTION

Store:

```text
big_investor_conviction_score
```

This represents the combined evidence of:

```text
Who is buying
How much
How many investors
How consistently
How recently
Whether positions are increasing
```

This must be calculated from underlying data.

Do NOT manually enter this score.

---

# 31. FII/DII FLOWS

Table:

```text
institutional.fii_dii_flows
```

Fields:

```text
id
trade_date
investor_type
buy_value
sell_value
net_value
segment
source_id
```

Segments:

```text
EQUITY
FUTURES
OPTIONS
DEBT
COMMODITY
```

---

# 32. BULK DEALS

Table:

```text
institutional.bulk_deals
```

Fields:

```text
id
trade_date
instrument_id
client_name
client_type
buy_sell
quantity
price
transaction_value
source_id
```

---

# 33. BLOCK DEALS

Same concept as bulk deals, but keep a separate table because market mechanics and reporting classifications differ.

---

# 34. PROMOTER ACTIVITY

Table:

```text
institutional.promoter_transactions
```

Store:

```text
promoter_name
transaction_type
quantity
price
holding_before
holding_after
pledge_change
transaction_date
source_id
```

---

# 35. OPTIONS SCHEMA

Tables:

```text
options.option_contracts
options.option_chain
options.open_interest_history
options.options_volume
options.greeks
options.implied_volatility
options.max_pain
options.oi_levels
```

---

# 36. OPTION CONTRACT

Table:

```text
options.option_contracts
```

Fields:

```text
id
instrument_id
underlying_id
expiry_date
strike_price
option_type
lot_size
tick_size
listing_date
is_active
```

Option type:

```text
CE
PE
```

---

# 37. OPTION CHAIN

Table:

```text
options.option_chain
```

Fields:

```text
id
timestamp
underlying_id
contract_id
strike_price
option_type
expiry_date
open
high
low
close
ltp
volume
open_interest
change_in_oi
bid_price
ask_price
bid_quantity
ask_quantity
implied_volatility
source_id
```

---

# 38. OPEN INTEREST HISTORY

Store time-series OI separately where high-frequency history is required.

Fields:

```text
timestamp
contract_id
open_interest
change_in_oi
volume
source_id
```

---

# 39. OPTIONS GREEKS

Store:

```text
delta
gamma
theta
vega
rho
```

Also store:

```text
calculation_timestamp
calculation_method
model_version
```

Greeks may change depending on volatility assumptions.

---

# 40. IMPLIED VOLATILITY

Store:

```text
iv
iv_rank
iv_percentile
historical_volatility
```

The calculation method must be documented.

---

# 41. OPTION POSITIONING

Derived table:

```text
options.oi_levels
```

Store:

```text
underlying_id
expiry_date
calculation_date
call_oi
put_oi
call_oi_change
put_oi_change
pcr
max_pain
highest_call_oi_strike
highest_put_oi_strike
support_zone
resistance_zone
confidence
model_version
```

---

# 42. COMMODITY DATA

Commodity instruments use the same instrument master.

Additional commodity metadata:

```text
contract_month
expiry
delivery_type
contract_unit
quote_unit
```

Examples:

```text
GOLD
GOLDM
CRUDEOIL
CRUDEOILM
SILVER
NATURALGAS
```

---

# 43. GLOBAL MARKET DATA

Schema:

```text
macro.global_markets
```

Store:

```text
instrument
country
market
timestamp
open
high
low
close
change_percent
volume
source_id
```

Examples:

```text
S&P 500
NASDAQ
Dow Jones
Nikkei
Hang Seng
Shanghai Composite
FTSE
DAX
```

---

# 44. GLOBAL MARKET INDICATORS

Store:

```text
VIX
USD
DXY
USDINR
US Treasury Yields
Gold
Crude Oil
```

as separate instruments or standardized market indicators.

---

# 45. MACRO DATA

Table:

```text
macro.economic_indicators
```

Fields:

```text
id
indicator_name
country
value
previous_value
expected_value
unit
release_time
period
source_id
```

Examples:

```text
CPI
GDP
PMI
Interest Rate
Unemployment
Industrial Production
Inflation
Retail Sales
```

---

# 46. CENTRAL BANK EVENTS

Table:

```text
macro.central_bank_events
```

Store:

```text
bank
country
meeting_date
decision
rate_before
rate_after
statement
event_importance
source_id
```

Banks:

```text
RBI
FED
ECB
BOJ
BOE
```

---

# 47. GEOPOLITICAL SCHEMA

Tables:

```text
macro.geopolitical_events
macro.geopolitical_impacts
```

---

# 48. GEOPOLITICAL EVENT

Fields:

```text
id
event_time
country
region
event_type
severity
escalation_probability
description
source_id
confidence
created_at
updated_at
```

Event types:

```text
WAR
CONFLICT
SANCTIONS
TRADE_RESTRICTION
ELECTION
TERROR_EVENT
SUPPLY_DISRUPTION
DIPLOMATIC_EVENT
OTHER
```

---

# 49. GEOPOLITICAL IMPACT

Map events to:

```text
asset
sector
commodity
currency
country
```

Store:

```text
impact_direction
impact_strength
transmission_channel
confidence
```

Example:

```text
Geopolitical event
→ Crude Oil
→ Indian inflation
→ Interest rates
→ Banking sector
```

---

# 50. NEWS SCHEMA

Tables:

```text
news.sources
news.articles
news.article_entities
news.sentiment
news.events
```

---

# 51. NEWS SOURCES

Fields:

```text
id
source_name
source_type
reliability_score
country
website
is_verified
```

Source types:

```text
OFFICIAL
REGULATORY
COMPANY
NEWS_AGENCY
FINANCIAL_MEDIA
SOCIAL_MEDIA
OTHER
```

---

# 52. NEWS ARTICLES

Fields:

```text
id
source_id
title
summary
url
published_at
retrieved_at
language
content_hash
importance
```

Store only legally permitted content.

Do not unnecessarily store copyrighted full articles.

---

# 53. NEWS ENTITY MAPPING

Table:

```text
news.article_entities
```

Map an article to:

```text
instrument
company
sector
commodity
country
currency
index
```

---

# 54. NEWS SENTIMENT

Fields:

```text
article_id
sentiment
sentiment_score
market_impact_score
confidence
model_version
calculated_at
```

Sentiment:

```text
VERY_BEARISH
BEARISH
NEUTRAL
BULLISH
VERY_BULLISH
```

---

# 55. NEWS DEDUPLICATION

Use:

```text
content_hash
```

and normalized title/source/time checks to prevent duplicate articles.

---

# 56. RESEARCH SCHEMA

Tables:

```text
research.features
research.factor_scores
research.market_regimes
research.valuations
research.support_resistance
```

---

# 57. FEATURE STORE

Table:

```text
research.features
```

This stores calculated variables used by models.

Examples:

```text
rsi_14
macd
adx
atr
relative_volume
distance_from_200dma
momentum_1m
momentum_3m
momentum_6m
momentum_12m
relative_strength
```

Each feature must have:

```text
instrument_id
timestamp
feature_name
feature_value
calculation_version
```

---

# 58. FACTOR SCORES

Table:

```text
research.factor_scores
```

Fields:

```text
id
instrument_id
timestamp
factor_name
score
confidence
data_quality
evidence_count
calculation_version
```

Factor names:

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

---

# 59. MARKET REGIME

Table:

```text
research.market_regimes
```

Fields:

```text
id
timestamp
market
regime
regime_score
volatility_score
breadth_score
trend_score
liquidity_score
confidence
model_version
```

Regimes:

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

---

# 60. VALUATION SNAPSHOT

Table:

```text
research.valuations
```

Store:

```text
instrument_id
timestamp
pe
forward_pe
pb
ev_ebitda
peg
fcf_yield
relative_sector_valuation
relative_historical_valuation
valuation_score
model_version
```

---

# 61. SUPPORT AND RESISTANCE

Table:

```text
research.support_resistance
```

Fields:

```text
instrument_id
timestamp
level_type
price
strength
source_method
confidence
```

Methods may include:

```text
PRICE_ACTION
MOVING_AVERAGE
VOLUME_PROFILE
OPTIONS_OI
PREVIOUS_HIGH_LOW
FIBONACCI
```

---

# 62. MODEL SCHEMA

Tables:

```text
model.models
model.model_versions
model.factor_weights
model.thresholds
model.parameters
model.approvals
```

---

# 63. MODEL MASTER

Table:

```text
model.models
```

Fields:

```text
id
model_name
asset_type
time_horizon
description
status
created_at
updated_at
```

Examples:

```text
EQUITY_SWING
EQUITY_LONG_TERM
INDEX_SWING
OPTIONS_DIRECTIONAL
COMMODITY_GOLD
COMMODITY_CRUDE
```

---

# 64. MODEL VERSION

Table:

```text
model.model_versions
```

Fields:

```text
id
model_id
version
status
created_at
approved_at
approved_by
training_start
training_end
validation_start
validation_end
test_start
test_end
notes
```

Statuses:

```text
DRAFT
BACKTESTING
VALIDATION
APPROVED
PRODUCTION
RETIRED
```

---

# 65. FACTOR WEIGHTS

Table:

```text
model.factor_weights
```

Fields:

```text
model_version_id
factor_name
weight
effective_from
effective_to
```

The sum of active weights must equal:

```text
1.0
```

---

# 66. MODEL PARAMETERS

Table:

```text
model.parameters
```

Store:

```text
parameter_name
parameter_value
parameter_type
model_version_id
```

Examples:

```text
RSI_PERIOD = 14
ATR_PERIOD = 14
MAX_RISK = 1%
MIN_CONFIDENCE = 65
```

---

# 67. SIGNAL SCHEMA

Tables:

```text
signals.signal
signals.signal_factors
signals.signal_levels
signals.signal_events
```

---

# 68. SIGNAL MASTER

Table:

```text
signals.signal
```

Required fields:

```text
id
instrument_id
model_version_id
timestamp
signal
composite_score
confidence
risk_score
evidence_quality
factor_agreement
signal_stability
historical_evidence
expected_value
market_regime
status
```

Signals:

```text
STRONG_BUY
BUY
ACCUMULATE
HOLD
REDUCE
SELL
STRONG_SELL
NO_TRADE
```

---

# 69. SIGNAL FACTORS

Table:

```text
signals.signal_factors
```

Store the exact factor values used to generate a signal.

Fields:

```text
signal_id
factor_name
factor_score
weight
weighted_score
confidence
data_quality
evidence_summary
```

This is essential for explainability.

---

# 70. SIGNAL LEVELS

Table:

```text
signals.signal_levels
```

Store:

```text
signal_id
entry_price
stop_loss
target_1
target_2
target_3
risk_per_unit
reward_per_unit
reward_risk_ratio
position_size
maximum_account_risk
```

---

# 71. SIGNAL EVENTS

Track changes:

```text
signal created
signal updated
signal strengthened
signal weakened
signal invalidated
target hit
stop hit
signal expired
```

---

# 72. SIGNAL STATUS

Possible statuses:

```text
ACTIVE
TARGET_1_HIT
TARGET_2_HIT
STOPPED
INVALIDATED
EXPIRED
CLOSED
```

---

# 73. BACKTEST SCHEMA

Tables:

```text
backtest.runs
backtest.trades
backtest.performance
backtest.factor_performance
backtest.regime_performance
```

---

# 74. BACKTEST RUN

Fields:

```text
id
model_version_id
instrument_universe
start_date
end_date
initial_capital
transaction_cost_model
slippage_model
parameters_snapshot
created_at
```

---

# 75. BACKTEST TRADES

Fields:

```text
id
backtest_run_id
instrument_id
entry_timestamp
entry_price
exit_timestamp
exit_price
quantity
direction
stop_loss
target
gross_pnl
transaction_cost
slippage
net_pnl
return_percent
holding_period
```

---

# 76. BACKTEST PERFORMANCE

Store:

```text
total_return
cagr
win_rate
loss_rate
profit_factor
average_win
average_loss
max_drawdown
sharpe_ratio
sortino_ratio
calmar_ratio
number_of_trades
average_holding_period
```

---

# 77. FACTOR PERFORMANCE

Store performance contribution of:

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
Breadth
```

---

# 78. REGIME PERFORMANCE

Break performance down by:

```text
BULL
BEAR
SIDEWAYS
HIGH_VOLATILITY
CRISIS
RECOVERY
```

---

# 79. DATA QUALITY SCHEMA

Tables:

```text
system.data_sources
system.data_ingestion_runs
system.data_quality_checks
system.data_gaps
system.provider_status
```

---

# 80. DATA SOURCES

Table:

```text
system.data_sources
```

Fields:

```text
id
provider_name
provider_type
api_endpoint
data_type
priority
reliability_score
rate_limit
is_active
created_at
```

Never hard-code provider credentials in the database.

---

# 81. INGESTION RUN

Table:

```text
system.data_ingestion_runs
```

Store:

```text
run_id
source_id
dataset
start_time
end_time
records_received
records_inserted
records_rejected
status
error_message
```

---

# 82. DATA QUALITY CHECKS

Each dataset should be validated.

Examples:

```text
Missing candles
Duplicate records
Invalid OHLC
Negative volume
Unexpected price jump
Stale data
Source outage
Timestamp mismatch
```

---

# 83. DATA GAPS

Table:

```text
system.data_gaps
```

Store:

```text
instrument_id
expected_start
expected_end
actual_missing_start
actual_missing_end
timeframe
reason
detected_at
```

---

# 84. PROVIDER STATUS

Track:

```text
ONLINE
DEGRADED
OFFLINE
RATE_LIMITED
AUTH_ERROR
UNKNOWN
```

The application must display provider health.

---

# 85. AUDIT SCHEMA

The application must maintain an audit trail.

Table:

```text
audit.events
```

Store:

```text
id
timestamp
user/system
action
entity_type
entity_id
old_value
new_value
reason
```

---

# 86. SIGNAL REPRODUCIBILITY

Every production signal must be reproducible.

Given:

```text
signal_id
```

the system should be able to reconstruct:

```text
Input data
Feature values
Factor scores
Factor weights
Model version
Thresholds
Risk parameters
Final signal
```

---

# 87. SNAPSHOT REQUIREMENT

At signal generation time, create a model-input snapshot.

Table:

```text
research.signal_input_snapshot
```

Store:

```text
signal_id
feature_name
feature_value
source_timestamp
source_id
```

This prevents future data updates from changing the historical explanation of an old signal.

---

# 88. NO LOOK-AHEAD DATA

Historical calculations must use only information that was actually available at that time.

Example:

If quarterly results were published on:

```text
15-Aug-2026
```

the model must NOT use those results for:

```text
10-Aug-2026
```

even if the database later contains the results.

The system must track:

```text
available_at
```

for relevant data.

---

# 89. POINT-IN-TIME DATA

Where applicable, store both:

```text
event_time
available_at
```

Example:

```text
Earnings Period:
Q1 FY27

Publication:
15-Aug-2026 16:00

available_at:
15-Aug-2026 16:00
```

Backtests must use `available_at`.

---

# 90. SURVIVORSHIP BIAS PROTECTION

Historical universes must include securities that were later:

```text
delisted
merged
bankrupt
suspended
```

Do not backtest only today's surviving companies.

---

# 91. SYMBOL CHANGE HANDLING

Maintain an instrument identity independent of trading symbol.

Example:

```text
instrument_id = 12345
```

can have:

```text
OLD_SYMBOL
NEW_SYMBOL
```

This prevents historical data fragmentation.

---

# 92. TIMEZONE

Store timestamps in:

```text
UTC
```

and convert to:

```text
Asia/Kolkata
```

for Indian market display.

Never mix timezone-naive timestamps.

---

# 93. DECIMAL PRECISION

Financial values should use appropriate decimal types.

Do NOT use floating-point types for critical monetary values where precision matters.

Examples:

```text
NUMERIC
DECIMAL
```

should be preferred.

---

# 94. INDEXING

Important indexes:

```text
instrument_id + timestamp
instrument_id + date
symbol
isin
expiry_date
underlying_id + expiry_date
investor_id + instrument_id
signal timestamp
model_version_id
source_id + timestamp
```

Time-series tables must be optimized for date-range queries.

---

# 95. PARTITIONING

Large time-series tables should eventually be partitioned by:

```text
month
year
```

or an appropriate time-series strategy.

Especially:

```text
market.ohlcv
options.option_chain
options.open_interest_history
```

---

# 96. RETENTION

Do not automatically delete historical market data.

The application should distinguish:

```text
HOT DATA
WARM DATA
ARCHIVED DATA
```

Historical data is valuable for backtesting.

---

# 97. DATA FRESHNESS

Every dataset must expose:

```text
last_updated_at
data_age
freshness_status
```

Possible status:

```text
LIVE
RECENT
STALE
VERY_STALE
UNKNOWN
```

---

# 98. SOURCE PRIORITY

Multiple sources may provide the same data.

Store:

```text
primary_source
secondary_source
fallback_source
```

If primary data fails, the system may use a validated fallback.

---

# 99. CONFLICTING DATA

If two providers disagree:

```text
Provider A = 2500
Provider B = 2502
```

do not silently choose one.

The data engine should:

1. Detect conflict.
2. Compare source reliability.
3. Apply configured precedence.
4. Record the decision.
5. Preserve both raw values where possible.

---

# 100. DATABASE RELATIONSHIP OVERVIEW

Conceptually:

```text
INSTRUMENT
    │
    ├── OHLCV
    ├── FUNDAMENTALS
    ├── INSTITUTIONAL HOLDINGS
    ├── OPTIONS
    ├── NEWS
    ├── FEATURES
    ├── FACTOR SCORES
    └── SIGNALS
             │
             ├── ENTRY
             ├── STOP
             ├── TARGET
             └── OUTCOME
```

---

# 101. SMART MONEY RELATIONSHIP

```text
INVESTOR
   │
   └── HOLDING
          │
          └── HOLDING CHANGE
                    │
                    ▼
             SMART MONEY SCORE
                    │
                    ▼
              SIGNAL ENGINE
```

---

# 102. NEWS RELATIONSHIP

```text
NEWS SOURCE
     │
     └── ARTICLE
           │
           ├── ENTITY
           ├── SENTIMENT
           └── MARKET IMPACT
                    │
                    ▼
               NEWS SCORE
```

---

# 103. MODEL RELATIONSHIP

```text
MODEL
  │
  └── MODEL VERSION
         │
         ├── FACTOR WEIGHTS
         ├── PARAMETERS
         └── THRESHOLDS
                  │
                  ▼
               SIGNAL
```

---

# 104. SIGNAL RELATIONSHIP

```text
SIGNAL
 │
 ├── FACTOR SCORES
 ├── INPUT SNAPSHOT
 ├── ENTRY/STOP/TARGET
 ├── MARKET REGIME
 └── OUTCOME
```

---

# 105. DATA INGESTION ARCHITECTURE

Data should flow through:

```text
EXTERNAL PROVIDER
       ↓
INGESTION SERVICE
       ↓
RAW DATA
       ↓
VALIDATION
       ↓
CLEAN DATA
       ↓
FEATURE ENGINE
       ↓
FACTOR ENGINE
       ↓
MODEL ENGINE
       ↓
SIGNAL ENGINE
```

---

# 106. INTERNET CONNECTIVITY REQUIREMENT

The desktop application may operate offline.

When internet is unavailable:

```text
OFFLINE MODE
```

The application should:

* Continue displaying previously stored data.
* Continue displaying previous signals.
* Show data freshness.
* Queue non-critical tasks.
* NOT generate fresh signals using stale data.

When internet becomes available:

```text
CONNECT
 ↓
CHECK PROVIDERS
 ↓
SYNC MISSING DATA
 ↓
VALIDATE
 ↓
RECALCULATE FEATURES
 ↓
RECALCULATE SCORES
 ↓
GENERATE NEW SIGNALS
```

---

# 107. INCREMENTAL SYNC

Do not download the entire database every time.

Use:

```text
last_successful_timestamp
```

or equivalent checkpoint.

Only retrieve missing/new data.

---

# 108. FAILED SYNC

If synchronization fails:

```text
retry
```

with exponential backoff.

Do not create duplicate records.

Use unique constraints/idempotent ingestion.

---

# 109. DUPLICATE PROTECTION

Every ingestion process must be idempotent.

Repeatedly receiving the same record must NOT create duplicate records.

Use appropriate unique keys such as:

```text
instrument_id
+
timestamp
+
timeframe
+
source_id
```

where applicable.

---

# 110. DATABASE BACKUP

The application must support:

```text
automatic backup
manual backup
restore
backup verification
```

At minimum:

```text
daily backup
```

for the production database.

---

# 111. DATABASE SECURITY

Never store:

```text
API keys
passwords
broker credentials
secret tokens
```

as plain text.

Use environment variables or secure credential storage.

---

# 112. PERSONAL TRADING ACCOUNT DATA

If broker integration is added later, keep broker/account information isolated.

Do not mix:

```text
RESEARCH DATA
```

with:

```text
PERSONAL ACCOUNT DATA
```

---

# 113. REAL TRADING SAFETY

The database must distinguish:

```text
RESEARCH SIGNAL
PAPER TRADE
LIVE TRADE
```

A research signal must never automatically become a live order.

---

# 114. MODEL OUTPUT STORAGE

For every generated signal, store the exact:

```text
model version
factor weights
factor scores
data snapshot
risk score
confidence
entry
stop
target
expected value
```

---

# 115. EXPLANATION STORAGE

The AI explanation should be generated from structured quantitative data.

Store:

```text
signal_id
explanation
generated_at
ai_model
prompt_version
```

However:

## The AI explanation is NOT the source of truth.

The quantitative database remains the source of truth.

---

# 116. AI SAFETY AGAINST HALLUCINATION

AI must never invent:

```text
FII buying
Institutional holdings
Company results
News
Prices
Options OI
Targets
```

AI must retrieve these values from structured database records.

If data is unavailable:

```text
DATA NOT AVAILABLE
```

must be returned.

---

# 117. DATABASE MIGRATIONS

Use a proper migration system.

Never manually modify production schema without a migration.

Every change must have:

```text
migration version
description
timestamp
rollback strategy
```

---

# 118. TEST DATABASE

Maintain:

```text
development
test
production
```

databases/environments.

Never use production data for destructive development testing.

---

# 119. SEED DATA

The development environment should contain synthetic/sample data.

It must be clearly marked:

```text
SYNTHETIC
```

Synthetic data must never be presented as real market information.

---

# 120. DATABASE HEALTH MONITORING

Monitor:

```text
Database size
Query latency
Failed queries
Connection count
Disk usage
Ingestion failures
Data freshness
Missing data
Duplicate records
```

---

# 121. MINIMUM V1 TABLES

Do NOT build every table immediately.

V1 minimum:

```text
market.instruments
market.exchanges
market.trading_sessions
market.ohlcv

fundamental.financial_periods
fundamental.income_statement
fundamental.balance_sheet
fundamental.cash_flow
fundamental.ratios

institutional.investors
institutional.holdings
institutional.holding_changes
institutional.fii_dii_flows
institutional.bulk_deals

options.option_contracts
options.option_chain

macro.global_markets
macro.economic_indicators
macro.geopolitical_events

news.sources
news.articles
news.article_entities
news.sentiment

research.features
research.factor_scores
research.market_regimes

model.models
model.model_versions
model.factor_weights
model.parameters

signals.signal
signals.signal_factors
signals.signal_levels
signals.signal_input_snapshot

backtest.runs
backtest.trades
backtest.performance

system.data_sources
system.data_ingestion_runs
system.data_quality_checks

audit.events
```

---

# 122. IMPLEMENTATION PRIORITY

Implement in this order:

## Phase 1

```text
Instrument Master
Exchange
Trading Calendar
OHLCV
Data Sources
Data Ingestion
Data Quality
```

## Phase 2

```text
FII/DII
Institutional Holdings
Bulk/Block Deals
Smart Money
```

## Phase 3

```text
Fundamentals
Ratios
Earnings
Valuation
```

## Phase 4

```text
Technical Features
Momentum
Market Breadth
Sector
```

## Phase 5

```text
Options
OI
IV
Greeks
```

## Phase 6

```text
Global
Macro
Geopolitical
News
```

## Phase 7

```text
Factor Engine
Composite Model
Signal Engine
```

## Phase 8

```text
Backtesting
Performance
Model Validation
```

---

# 123. DATABASE DESIGN PRINCIPLE

The database must answer these questions:

### Market

> What happened to the price?

### Fundamentals

> How healthy is the company?

### Institutions

> Who is buying and selling?

### Smart Money

> Where is sophisticated capital accumulating?

### Options

> How is the derivatives market positioned?

### Global

> What is happening outside India?

### Macro

> What economic forces are changing?

### Geopolitics

> What events can affect markets?

### News

> What information has recently changed?

### Model

> How did we calculate the score?

### Signal

> Why did we generate BUY/SELL/NO TRADE?

### Backtest

> Did this methodology actually work historically?

---

# 124. MOST IMPORTANT DESIGN DECISION

Never create a database that stores only:

```text
BUY
SELL
HOLD
```

Instead store the complete evidence chain:

```text
RAW DATA
 ↓
FEATURES
 ↓
FACTOR SCORES
 ↓
WEIGHTS
 ↓
COMPOSITE SCORE
 ↓
RISK
 ↓
CONFIDENCE
 ↓
EXPECTED VALUE
 ↓
SIGNAL
 ↓
OUTCOME
```

This is what will allow AI Market Intelligence to become a genuine research platform instead of a simple stock-tip application.

---

# 125. FINAL REQUIREMENT

Claude Code must treat this document as the database architecture source of truth.

Before implementing tables:

1. Review this specification.
2. Identify normalization issues.
3. Identify missing foreign-key relationships.
4. Identify indexing requirements.
5. Identify high-volume tables.
6. Identify time-series tables.
7. Identify point-in-time data requirements.
8. Identify data-retention requirements.
9. Produce an ER diagram.
10. Produce PostgreSQL migration scripts.
11. Create database tests.
12. Validate migrations on an empty database.
13. Validate migrations on sample historical data.
14. Do not connect live trading functionality.

The first implementation milestone is:

```text
DATABASE
+
INSTRUMENT MASTER
+
MARKET DATA INGESTION
+
DATA QUALITY
```

Only after this is stable should the quantitative scoring engine be connected.
