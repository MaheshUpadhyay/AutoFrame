# AI MARKET INTELLIGENCE

# RECOMMENDATION ENGINE SPECIFICATION

**Document Version:** 1.0
**Status:** Core Decision & User Recommendation Specification
**Market:** Indian Markets
**Asset Classes:** Equity, Futures, Options, Commodities

---

# 1. PURPOSE

The Recommendation Engine is the final decision layer of the AI Market Intelligence platform.

Its responsibility is to convert:

* Market Intelligence
* Technical Analysis
* Fundamental Analysis
* Quantitative Models
* Smart Money Analysis
* FII/DII Activity
* Global Market Conditions
* Geopolitical Conditions
* News
* Options Data
* Commodity Data
* Signal Engine output
* Risk Engine output
* Portfolio Context

into a clear, explainable and risk-aware market recommendation.

The Recommendation Engine must NOT blindly follow the highest signal score.

It must combine opportunity, probability, risk and portfolio context.

---

# 2. CORE OBJECTIVE

The Recommendation Engine must answer:

> "Given all currently available information, what is the most rational action for this instrument right now?"

Possible answers:

```text
STRONG_BUY
BUY
BUY_SMALL
ACCUMULATE
HOLD
WAIT
WATCH
SELL
SELL_SMALL
REDUCE
EXIT
STRONG_SELL
NO_TRADE
```

---

# 3. IMPORTANT PRINCIPLE

The application must distinguish between:

```text
MARKET VIEW
SIGNAL
RECOMMENDATION
TRADE PLAN
```

Example:

```text
Market View:
Bullish

Signal:
BUY

Risk:
High

Recommendation:
BUY_SMALL
```

Another:

```text
Market View:
Bullish

Signal:
STRONG_BUY

Risk:
Extreme

Recommendation:
NO_TRADE
```

---

# 4. RECOMMENDATION PIPELINE

```text
                   MARKET DATA
                       │
                       ▼
              MARKET INTELLIGENCE
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
      TECHNICAL    FUNDAMENTAL   SMART MONEY
          │            │            │
          └────────────┼────────────┘
                       ▼
                  QUANT MODEL
                       │
                       ▼
                 SIGNAL ENGINE
                       │
                       ▼
                  RISK ENGINE
                       │
                       ▼
             RECOMMENDATION ENGINE
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
       BUY/SELL       WAIT       NO TRADE
                       │
                       ▼
                TRADE PLAN
```

---

# 5. INPUTS

The Recommendation Engine receives:

```text
instrument
asset_class

signal_score
signal_direction
signal_confidence

technical_score
fundamental_score
quant_score
smart_money_score
macro_score
sentiment_score
geopolitical_score

market_regime
sector_regime

risk_score
risk_level

expected_return
expected_value
risk_reward

volatility
liquidity

portfolio_exposure
sector_exposure
correlation

event_risk

fii_score
dii_score
institutional_score

options_score
commodity_score

data_quality
model_reliability

entry_price
entry_zone
stop_loss
targets

timestamp
```

---

# 6. FINAL RECOMMENDATION SCORE

The Recommendation Engine should calculate a normalized score:

```text
Recommendation Score: 0–100
```

Initial framework:

```text
Signal Quality             25%
Technical Evidence         15%
Fundamental Evidence       10%
Smart Money                10%
Market/Macro               10%
Expected Return            10%
Risk-Reward                 5%
Sentiment                   5%
Data/Model Reliability     10%
```

Risk should NOT simply be added as a positive factor.

Risk acts as a penalty and hard constraint.

---

# 7. RISK ADJUSTMENT

Conceptually:

```text
Adjusted Recommendation Score =

Raw Opportunity Score
-
Risk Penalty
```

Example:

```text
Raw Score:
88

Risk Penalty:
18

Adjusted Score:
70
```

---

# 8. HARD RISK OVERRIDE

The Recommendation Engine must return:

```text
NO_TRADE
```

when the Risk Engine returns a hard rejection.

Signal strength cannot override a hard risk restriction.

---

# 9. RECOMMENDATION BANDS

Default:

```text
90–100:
STRONG_BUY

80–89:
BUY

70–79:
BUY_SMALL / ACCUMULATE

60–69:
WATCH / WAIT

45–59:
HOLD

30–44:
REDUCE / SELL_SMALL

20–29:
SELL

0–19:
STRONG_SELL
```

These thresholds must be configurable.

---

# 10. CONFIDENCE SCORE

Every recommendation must include:

```text
Confidence:
0–100
```

Confidence represents:

```text
How reliable is the evidence supporting this recommendation?
```

It must NOT simply represent expected return.

---

# 11. CONFIDENCE INPUTS

Confidence should consider:

```text
Factor Agreement
Historical Model Accuracy
Data Quality
Sample Size
Signal Strength
Market Regime Stability
Model Reliability
Recent Model Performance
```

---

# 12. FACTOR AGREEMENT

Calculate:

```text
Factor Agreement Score
```

Example:

```text
Technical:
+82

Fundamental:
+75

Smart Money:
+79

Macro:
+65

Sentiment:
+70
```

Strong alignment increases confidence.

---

# 13. CONFLICTING SIGNALS

Example:

```text
Technical:
+85

Fundamental:
+80

Smart Money:
-70

Macro:
-40
```

The recommendation must not blindly produce:

```text
BUY
```

Instead:

```text
BUY_SMALL
```

or:

```text
WAIT
```

depending on risk.

---

# 14. RECOMMENDATION TYPES

## STRONG BUY

Requirements should normally include:

```text
High signal score
Strong factor alignment
Positive market regime
Acceptable risk
Positive expected value
Good liquidity
Acceptable risk/reward
No critical event risk
```

---

# 15. BUY

Requirements:

```text
Strong positive evidence
Moderate or low risk
Positive expected value
Acceptable risk/reward
Reasonable confidence
```

---

# 16. BUY_SMALL

Use when:

```text
Signal is positive
but risk is elevated
```

Examples:

```text
High volatility
Event approaching
Factor disagreement
High correlation
Moderate liquidity
Uncertain market regime
```

---

# 17. ACCUMULATE

Use primarily for investment-oriented equity opportunities.

Conditions may include:

```text
Strong long-term fundamentals
Positive long-term trend
Reasonable valuation
Institutional support
Temporary short-term weakness
Acceptable long-term risk
```

The engine should distinguish:

```text
TRADING BUY
```

from:

```text
INVESTMENT ACCUMULATE
```

---

# 18. HOLD

Use when:

```text
Existing position remains valid
but new entry is unattractive
```

Example:

```text
Existing Position:
BUY

Current Signal:
NEUTRAL

Recommendation:
HOLD
```

---

# 19. WAIT

Use when:

```text
Potential opportunity exists
but entry timing is poor.
```

Example:

```text
Bullish long-term
but price is extended.
```

---

# 20. WATCH

Use when:

```text
Setup is developing
but confirmation is missing.
```

Example:

```text
Technical:
Bullish

Fundamental:
Positive

Breakout:
Not confirmed

Recommendation:
WATCH
```

---

# 21. SELL

Use when:

```text
Bearish evidence
+
acceptable confidence
+
negative expected direction
```

---

# 22. REDUCE

Use when:

```text
Existing position remains potentially valid
but risk has increased.
```

Examples:

```text
Valuation excessive
Risk increasing
Portfolio concentration excessive
Momentum deteriorating
Major event approaching
```

---

# 23. EXIT

Use when the original investment/trade thesis is invalidated.

Examples:

```text
Stop Loss triggered
Fundamental thesis broken
Technical structure broken
Unexpected major event
Model reversal
Risk limit breached
```

---

# 24. NO TRADE

This is a valid and important recommendation.

Use when:

```text
Risk too high
Expected value insufficient
Poor liquidity
Data unavailable
Risk/reward unacceptable
Signal conflict too high
Event risk extreme
Portfolio exposure too high
Model reliability too low
```

---

# 25. EQUITY RECOMMENDATION MODEL

For equity, separate:

```text
SHORT_TERM_TRADE
SWING_TRADE
POSITIONAL
LONG_TERM_INVESTMENT
```

The same stock may receive different recommendations for different horizons.

---

# 26. EQUITY HORIZONS

Default:

```text
Intraday:
Minutes to hours

Swing:
2–15 trading days

Positional:
2 weeks–6 months

Long Term:
6 months+
```

These must be configurable.

---

# 27. EQUITY OUTPUT

Example:

```text
HDFC BANK

Long-Term View:
BULLISH

Swing View:
BUY

Recommendation:
BUY_SMALL

Entry:
₹1,020–₹1,035

Stop:
₹985

Target:
₹1,090 / ₹1,140

Risk/Reward:
1:2.1

Confidence:
84/100

Risk:
MODERATE
```

---

# 28. LONG-TERM INVESTMENT RECOMMENDATION

For long-term recommendations, prioritize:

```text
Revenue Growth
Profit Growth
ROE
ROCE
Debt
Cash Flow
Margins
Valuation
Competitive Advantage
Management Quality
Promoter Holding
Institutional Ownership
Industry Growth
Market Share
Corporate Governance
```

Technical signals should have lower weight than for short-term trades.

---

# 29. OPTIONS RECOMMENDATION

Options must NOT simply produce:

```text
BUY CALL
```

or:

```text
BUY PUT
```

The engine must first determine:

```text
Underlying Direction
Expected Move
Time Horizon
Implied Volatility
Expected Volatility
Theta
Gamma
Liquidity
Expiry
Risk/Reward
```

---

# 30. OPTION ACTIONS

Supported:

```text
BUY_CALL
BUY_PUT
SELL_CALL
SELL_PUT
BULL_CALL_SPREAD
BEAR_PUT_SPREAD
BULL_PUT_SPREAD
BEAR_CALL_SPREAD
IRON_CONDOR
STRADDLE
STRANGLE
NO_TRADE
```

The strategy recommendation should be selected based on market conditions.

---

# 31. OPTIONS STRATEGY SELECTION

Example:

```text
Underlying:
Strong Bullish

IV:
Moderate

Expected Move:
High

Recommendation:
BUY_CALL
```

Another:

```text
Underlying:
Bullish

IV:
Very High

Expected Move:
Moderate

Recommendation:
BULL_CALL_SPREAD
```

Another:

```text
Underlying:
Neutral

IV:
High

Expected Move:
Low

Recommendation:
IRON_CONDOR
```

Another:

```text
Underlying:
Uncertain

IV:
High

Recommendation:
NO_TRADE
```

---

# 32. OPTION CONTRACT SELECTION

The Recommendation Engine should rank contracts based on:

```text
Liquidity
Bid/Ask Spread
OI
Volume
Delta
IV
IV Rank
Theta
Gamma
Days to Expiry
Expected Move
Risk/Reward
```

---

# 33. OPTION ENTRY OUTPUT

Example:

```text
NIFTY

View:
BULLISH

Strategy:
BULL CALL SPREAD

BUY:
25,000 CE

SELL:
25,300 CE

Expiry:
[date]

Maximum Loss:
₹X

Maximum Profit:
₹Y

Breakeven:
₹Z

Risk/Reward:
1:2.3

Confidence:
81
```

---

# 34. OPTIONS NO-TRADE

Reject option trades when:

```text
Spread too wide
Liquidity too low
IV unsuitable
Theta too high
Expiry too close
Expected move insufficient
Risk/reward poor
Underlying signal weak
```

---

# 35. COMMODITY RECOMMENDATION

Commodity recommendations should consider:

```text
Global Benchmark
USD
Supply/Demand
Inventory
Weather
Geopolitics
Interest Rates
Global Economic Data
Local Futures Price
Basis
Contract Expiry
Volatility
```

---

# 36. COMMODITY OUTPUT

Example:

```text
GOLD MINI

View:
BULLISH

Recommendation:
BUY

Entry:
₹XX,XXX–₹XX,XXX

Stop:
₹XX,XXX

Target:
₹XX,XXX

Risk/Reward:
1:2.4

Confidence:
82

Risk:
MODERATE
```

---

# 37. MULTI-TIMEFRAME ANALYSIS

The engine must analyze:

```text
5m
15m
30m
1H
4H
Daily
Weekly
Monthly
```

where applicable.

---

# 38. TIMEFRAME AGREEMENT

Example:

```text
15m:
Bullish

1H:
Bullish

Daily:
Bullish

Weekly:
Bullish
```

This increases confidence.

---

# 39. TIMEFRAME CONFLICT

Example:

```text
15m:
Bullish

1H:
Bearish

Daily:
Bullish

Weekly:
Bullish
```

The engine should reduce confidence for short-term trading.

---

# 40. MULTI-TIMEFRAME OUTPUT

Display:

```text
Short Term:
Bullish

Swing:
Bullish

Positional:
Bullish

Long Term:
Neutral
```

---

# 41. ENTRY ZONE

Do not always output a single price.

Prefer:

```text
Entry Zone:
₹1,020–₹1,035
```

when appropriate.

---

# 42. ENTRY QUALITY

Classify:

```text
EXCELLENT_ENTRY
GOOD_ENTRY
FAIR_ENTRY
EXTENDED
BAD_ENTRY
```

---

# 43. EXTENDED PRICE

If price has already moved substantially beyond the calculated entry zone:

```text
Recommendation:
WAIT
```

instead of chasing.

---

# 44. BREAKOUT CONFIRMATION

For breakout strategies, confirm:

```text
Price Breakout
Volume Confirmation
Relative Strength
Market Support
Sector Support
```

---

# 45. FALSE BREAKOUT RISK

Increase risk if:

```text
Breakout
+
Low Volume
+
Weak Market
```

---

# 46. NEWS IMPACT

News must be classified:

```text
VERY_POSITIVE
POSITIVE
NEUTRAL
NEGATIVE
VERY_NEGATIVE
```

---

# 47. NEWS QUALITY

News confidence must consider:

```text
Source Reliability
Number of Independent Sources
Official Announcement
Rumor vs Confirmed
Recency
Materiality
```

Rumors must never be treated as confirmed facts.

---

# 48. NEWS-CONFLICT LOGIC

Example:

```text
Technical:
BUY

News:
Major Negative

Fundamental:
Neutral
```

Recommendation may become:

```text
WAIT
```

until the impact is understood.

---

# 49. GEOPOLITICAL CONDITIONS

The Recommendation Engine must consider:

```text
War
Sanctions
Trade War
Oil Supply Disruption
Shipping Disruption
Political Crisis
Major Diplomatic Events
```

---

# 50. GEOPOLITICAL IMPACT BY ASSET

The engine must calculate:

```text
Positive Impact
Negative Impact
Neutral Impact
Unknown Impact
```

for each asset.

Do not assume the same geopolitical impact for all assets.

---

# 51. GLOBAL MARKET INFLUENCE

Consider:

```text
US Markets
European Markets
Asian Markets
US Treasury Yield
DXY
VIX
Oil
Gold
Major Commodity Prices
```

when relevant.

---

# 52. FII/DII

Include:

```text
FII Net Flow
DII Net Flow
FII Futures Position
FII Options Position
Sector-wise Institutional Activity
```

where reliable data is available.

---

# 53. BIG INVESTOR / SMART MONEY

This is a core component.

Track:

```text
Mutual Fund Holdings
FII Holdings
DII Holdings
Institutional Ownership
Bulk Deals
Block Deals
Promoter Buying
Promoter Selling
Insider Transactions
Major Investor Changes
```

---

# 54. SMART MONEY SIGNAL

Generate:

```text
STRONG_ACCUMULATION
ACCUMULATION
NEUTRAL
DISTRIBUTION
STRONG_DISTRIBUTION
```

---

# 55. SMART MONEY CHANGE

More important than absolute ownership is the CHANGE in ownership.

Calculate:

```text
Current Institutional Ownership
-
Previous Institutional Ownership
```

and:

```text
Current Holding
-
Previous Holding
```

---

# 56. SMART MONEY CONCENTRATION

Identify:

```text
Number of institutions accumulating
Number of institutions distributing
Magnitude of buying
Magnitude of selling
```

---

# 57. SMART MONEY CONFIRMATION

Example:

```text
Technical:
Bullish

Fundamental:
Bullish

Institutional:
Accumulation

FII:
Buying

DII:
Buying
```

This should significantly strengthen the recommendation.

---

# 58. SMART MONEY DIVERGENCE

Example:

```text
Price:
Rising

Institutional Holdings:
Falling
```

Generate:

```text
SMART_MONEY_DIVERGENCE
```

and reduce confidence.

---

# 59. SECTOR ROTATION

The system should detect:

```text
Money moving INTO sector
Money moving OUT OF sector
```

and include this in recommendations.

---

# 60. RELATIVE STRENGTH

Compare stock against:

```text
NIFTY
Relevant Sector Index
Peer Group
```

---

# 61. STOCK LEADERSHIP

Classify:

```text
LEADER
OUTPERFORMER
MARKET_PERFORMER
UNDERPERFORMER
LAGGARD
```

---

# 62. FUNDAMENTAL VS TECHNICAL

The weighting depends on horizon.

For short-term trading:

```text
Technical:
Higher weight

Fundamental:
Lower weight
```

For long-term investing:

```text
Fundamental:
Higher weight

Technical:
Lower weight
```

---

# 63. RECOMMENDATION HORIZON

Every recommendation must include:

```text
horizon
```

Example:

```text
Intraday
Swing
Positional
Long Term
```

---

# 64. HOLDING PERIOD

Provide an estimated holding period.

Example:

```text
Expected Holding:
3–7 trading days
```

This is an estimate, not a guarantee.

---

# 65. ENTRY CONDITIONS

A recommendation may have conditional triggers.

Example:

```text
BUY only if:
Price closes above ₹1,035
AND
Volume > 20-day average
```

---

# 66. CONDITIONAL RECOMMENDATION

Support:

```text
BUY_IF
SELL_IF
WAIT_FOR
BREAKOUT_IF
BREAKDOWN_IF
```

---

# 67. TRADE INVALIDATION

Every actionable recommendation must specify:

```text
Invalidation Price
```

or:

```text
Invalidation Condition
```

---

# 68. RECOMMENDATION EXPIRY

Recommendations must expire.

Example:

```text
Valid Until:
2026-09-02 15:30
```

or:

```text
Valid for:
2 trading sessions
```

---

# 69. RE-EVALUATION

The system must automatically re-evaluate when:

```text
Price changes materially
New major news arrives
FII/DII data changes
Institutional activity changes
Market regime changes
Risk changes
Technical structure changes
```

---

# 70. INTERNET-CONNECTED MODE

When the desktop application detects internet connectivity:

```text
CONNECT
↓
VALIDATE DATA SOURCES
↓
DOWNLOAD LATEST DATA
↓
CHECK DATA QUALITY
↓
UPDATE FEATURES
↓
RUN MODELS
↓
RUN SIGNAL ENGINE
↓
RUN RISK ENGINE
↓
RUN RECOMMENDATION ENGINE
↓
UPDATE DASHBOARD
```

---

# 71. INTERNET DISCONNECTED MODE

If internet is unavailable:

```text
Use cached data
```

but mark it:

```text
DATA_STATUS:
STALE
```

No new actionable recommendation should be generated from critically stale data.

---

# 72. AUTOMATIC RE-ANALYSIS

The system should support configurable intervals:

```text
1 minute
5 minutes
15 minutes
30 minutes
1 hour
End of day
```

depending on asset class.

---

# 73. CHANGE-BASED RE-ANALYSIS

Immediate analysis should be triggered by significant events.

Examples:

```text
Price move > configured threshold
Volume spike
Major news
FII/DII update
Large block deal
Geopolitical event
Market regime change
```

---

# 74. RECOMMENDATION CHANGE

If:

```text
BUY
```

becomes:

```text
WAIT
```

the system must explain why.

Example:

```text
Recommendation Changed

Previous:
BUY

Current:
WAIT

Reason:
Breakout failed and volume confirmation disappeared.
```

---

# 75. RECOMMENDATION HISTORY

Store every recommendation.

Example:

```text
Timestamp
Instrument
Previous Recommendation
New Recommendation
Signal Score
Risk Score
Confidence
Reason
```

---

# 76. RECOMMENDATION VERSIONING

Every recommendation must store:

```text
recommendation_id
model_version
signal_engine_version
risk_engine_version
recommendation_engine_version
data_timestamp
```

---

# 77. AUDITABILITY

The user must be able to answer:

> "Why did the system recommend BUY at that time?"

The application should reconstruct:

```text
Data
Signals
Risk
Factors
Model Output
Recommendation
```

---

# 78. EXPLAINABILITY

Every recommendation must provide:

```text
TOP POSITIVE FACTORS
TOP NEGATIVE FACTORS
RISK FACTORS
KEY TRIGGERS
INVALIDATION CONDITIONS
```

---

# 79. POSITIVE FACTORS

Example:

```text
✓ Strong price momentum
✓ Sector outperforming NIFTY
✓ FII accumulation
✓ DII accumulation
✓ Positive earnings trend
✓ Breakout with volume
```

---

# 80. NEGATIVE FACTORS

Example:

```text
⚠ Elevated valuation
⚠ High volatility
⚠ Earnings announcement approaching
⚠ Market breadth weakening
```

---

# 81. TOP 3 FACTORS

The UI should show the three strongest reasons behind the recommendation.

Example:

```text
WHY BUY?

1. Institutional accumulation
2. Strong technical breakout
3. Positive sector momentum
```

---

# 82. TOP 3 RISKS

Example:

```text
KEY RISKS

1. High volatility
2. Major event tomorrow
3. Market trend weakening
```

---

# 83. FINAL USER-FACING FORMAT

The default recommendation card should look like:

```text
┌──────────────────────────────────────────┐
│ HDFC BANK                                │
│                                          │
│ 🟢 BUY                                   │
│                                          │
│ Score: 84/100                            │
│ Confidence: 86/100                      │
│ Risk: MODERATE                           │
│                                          │
│ Entry: ₹1,020–₹1,035                    │
│ Stop: ₹985                               │
│ Target 1: ₹1,090                         │
│ Target 2: ₹1,140                         │
│                                          │
│ Risk/Reward: 1 : 2.1                     │
│ Suggested Allocation: ₹XX,XXX            │
│ Maximum Planned Loss: ₹X,XXX             │
│                                          │
│ Horizon: Swing                           │
│ Expected Holding: 3–7 days               │
│                                          │
│ WHY?                                     │
│ ✓ Strong momentum                        │
│ ✓ Institutional accumulation             │
│ ✓ Sector outperforming                   │
│                                          │
│ RISKS                                    │
│ ⚠ Elevated volatility                    │
│ ⚠ Earnings approaching                   │
└──────────────────────────────────────────┘
```

---

# 84. DETAILED ANALYSIS SCREEN

The user can expand:

```text
Market
Technical
Fundamental
Smart Money
FII/DII
Macro
Geopolitical
News
Options
Risk
Portfolio
Model
```

---

# 85. MARKET SCORECARD

Example:

```text
Market Regime:
BULL

NIFTY Trend:
Bullish

India VIX:
Moderate

FII:
Positive

DII:
Positive

Global Markets:
Positive

Geopolitical Risk:
Moderate
```

---

# 86. FACTOR SCORECARD

Example:

```text
Technical       88
Fundamental     79
Smart Money     91
Macro           72
Sentiment       68
Quant           84
```

---

# 87. RISK SCORECARD

Example:

```text
Overall Risk:
38

Volatility:
42

Liquidity:
15

Event:
55

Portfolio:
30

Correlation:
25
```

---

# 88. FINAL SCORE

Example:

```text
Opportunity:
86

Risk:
38

Confidence:
84

Final:
BUY
```

---

# 89. RECOMMENDATION LANGUAGE

The system should use clear language.

Prefer:

```text
"BUY — moderate risk"
```

instead of:

```text
"Extremely bullish guaranteed winner"
```

---

# 90. NO GUARANTEE

The application must never state:

```text
Guaranteed profit
Sure shot
100% accuracy
Risk-free
Certain winner
Guaranteed return
```

---

# 91. UNCERTAINTY STATEMENT

Each recommendation may include:

```text
"This recommendation is model-based and subject to market,
data and execution risk."
```

---

# 92. DATA SOURCE TRANSPARENCY

The detailed screen should show:

```text
Source
Timestamp
Data freshness
```

for major inputs.

---

# 93. CONFLICT WARNING

If significant disagreement exists:

```text
⚠ FACTOR CONFLICT

Technical: Bullish
Fundamental: Neutral
Smart Money: Bearish
Macro: Neutral
```

Recommendation should be downgraded.

---

# 94. EVENT WARNING

Example:

```text
⚠ EVENT RISK

RBI policy announcement in 18 hours.

Position size reduced.
```

---

# 95. SMART MONEY WARNING

Example:

```text
⚠ SMART MONEY DIVERGENCE

Price:
+8%

Institutional Holdings:
-4%

Recommendation downgraded from BUY to BUY_SMALL.
```

---

# 96. MARKET REGIME WARNING

Example:

```text
⚠ MARKET REGIME

NIFTY trend has changed from BULL to SIDEWAYS.

New long positions require stronger confirmation.
```

---

# 97. PORTFOLIO-AWARE RECOMMENDATION

The same stock can have different recommendations for different portfolios.

Example:

```text
Standalone Analysis:
BUY

User Portfolio:
Already 25% exposed to banking

Final:
BUY_SMALL
```

The recommendation engine must therefore receive portfolio context.

---

# 98. WATCHLIST

The system should support:

```text
WATCHLIST
```

with statuses:

```text
WATCH
READY
TRIGGERED
INVALIDATED
```

---

# 99. OPPORTUNITY RANKING

The engine should rank opportunities.

Example:

```text
TODAY'S TOP OPPORTUNITIES

1. ABC
BUY
Score 91
Confidence 88

2. XYZ
BUY
Score 87
Confidence 84

3. PQR
BUY_SMALL
Score 79
Confidence 81
```

---

# 100. OPPORTUNITY QUALITY

Rank by:

```text
Expected Value
Confidence
Risk
Liquidity
Risk/Reward
Portfolio Fit
```

NOT simply by signal score.

---

# 101. BEST TRADE OF THE DAY

The application may identify:

```text
BEST OPPORTUNITY
```

but only if:

```text
Data quality is sufficient
Risk is acceptable
Liquidity is adequate
Expected value is positive
```

---

# 102. NO BEST TRADE

If nothing meets minimum standards:

```text
NO HIGH-QUALITY OPPORTUNITY TODAY
```

This is preferable to forcing a trade.

---

# 103. MARKET SUMMARY

The desktop dashboard should show:

```text
MARKET STATUS

NIFTY:
Bullish

BANK NIFTY:
Neutral

SENSEX:
Bullish

India VIX:
Moderate

FII:
Buying

DII:
Buying

Global:
Positive

Geopolitical Risk:
Elevated

Overall Market Risk:
Moderate
```

---

# 104. DAILY MARKET REPORT

Generate:

```text
Morning Analysis
Intraday Updates
Pre-Close Analysis
End-of-Day Report
```

---

# 105. MORNING REPORT

Include:

```text
Overnight Global Markets
US Close
Asian Markets
GIFT NIFTY
DXY
US Yields
Oil
Gold
FII/DII
Major News
Geopolitical Events
Today's Economic Calendar
Today's Corporate Events
Expected Market Bias
Key Levels
Top Opportunities
Major Risks
```

---

# 106. END-OF-DAY REPORT

Include:

```text
Market Performance
Sector Performance
FII/DII
Institutional Activity
Top Winners
Top Losers
Volume Leaders
Breakouts
Breakdowns
New Signals
Recommendation Changes
Risk Changes
Tomorrow's Watchlist
```

---

# 107. ALERT ENGINE INTEGRATION

Generate alerts for:

```text
NEW_BUY
NEW_SELL
SIGNAL_UPGRADE
SIGNAL_DOWNGRADE
ENTRY_TRIGGERED
STOP_TRIGGERED
TARGET_REACHED
RISK_INCREASED
RISK_DECREASED
SMART_MONEY_CHANGE
FII_REVERSAL
DII_REVERSAL
MAJOR_NEWS
GEOPOLITICAL_EVENT
MARKET_REGIME_CHANGE
```

---

# 108. ALERT PRIORITY

```text
CRITICAL
HIGH
MEDIUM
LOW
INFO
```

---

# 109. CRITICAL ALERT EXAMPLE

```text
CRITICAL

NIFTY Market Regime Changed

Previous:
BULL

Current:
BEAR

Portfolio long exposure:
68%

Risk Engine:
Defensive Mode

Recommended Action:
REDUCE EXPOSURE
```

---

# 110. RECOMMENDATION QUALITY MONITORING

The system must track:

```text
Recommendation Accuracy
Win Rate
Average Return
Average Loss
Profit Factor
Expected vs Actual Return
Maximum Drawdown
Sharpe Ratio
Sortino Ratio
```

---

# 111. OUTCOME TRACKING

For every recommendation record:

```text
Recommendation Price
Actual Entry
Maximum Favorable Excursion
Maximum Adverse Excursion
Exit Price
Return
Holding Period
Outcome
```

---

# 112. RECOMMENDATION PERFORMANCE BY TYPE

Track separately:

```text
Equity
Futures
Options
Commodities
```

and:

```text
Intraday
Swing
Positional
Long Term
```

---

# 113. MODEL PERFORMANCE BY MARKET REGIME

Track:

```text
Bull Market
Bear Market
Sideways Market
High Volatility
Low Volatility
Crisis
```

This is mandatory for understanding whether recommendations actually work.

---

# 114. MODEL PERFORMANCE BY FACTOR

Track whether recommendations perform better when:

```text
Smart Money confirms
FII confirms
DII confirms
Technical confirms
Fundamental confirms
```

---

# 115. RECOMMENDATION FEEDBACK LOOP

The system should learn from historical outcomes.

```text
Recommendation
      ↓
Trade Outcome
      ↓
Performance Analysis
      ↓
Model Evaluation
      ↓
Parameter Adjustment
      ↓
Backtest
      ↓
Validation
      ↓
Production
```

No automatic model change should be deployed without validation.

---

# 116. WALK-FORWARD VALIDATION

Any model/parameter update should be tested using:

```text
Training Period
Validation Period
Out-of-Sample Period
```

---

# 117. OVERFITTING PROTECTION

The system must avoid optimizing parameters solely for maximum historical return.

Evaluate:

```text
Return
Drawdown
Consistency
Profit Factor
Sharpe
Sortino
Trade Count
Out-of-Sample Performance
```

---

# 118. RECOMMENDATION STABILITY

The engine should avoid excessive flipping:

```text
BUY
SELL
BUY
SELL
```

without meaningful changes in underlying data.

---

# 119. HYSTERESIS

Use configurable thresholds to prevent insignificant score changes from changing recommendations.

Example:

```text
BUY threshold:
80

Downgrade BUY:
below 75
```

instead of switching at exactly 80.

---

# 120. SIGNAL DECAY

Signals should have a time-decay factor.

A signal generated yesterday may not have the same strength today.

---

# 121. SIGNAL AGE

Store:

```text
signal_created_at
signal_updated_at
signal_age
```

---

# 122. RECOMMENDATION AGE

Store:

```text
recommendation_created_at
recommendation_updated_at
recommendation_age
```

---

# 123. RECOMMENDATION INVALIDATION

Automatically invalidate if:

```text
Stop hit
Target achieved
Signal reversed
Market regime changes materially
Critical thesis invalidated
Recommendation expires
Data becomes unreliable
```

---

# 124. MULTIPLE RECOMMENDATIONS

An instrument may have multiple independent views:

```text
Intraday:
BUY

Swing:
BUY

Positional:
HOLD

Long Term:
ACCUMULATE
```

This is valid.

---

# 125. USER VIEW

Default screen should show the user's chosen horizon.

Example:

```text
Selected:
Swing Trading
```

Then show swing recommendations.

---

# 126. RESEARCH VIEW

Advanced users can see:

```text
All Horizons
```

simultaneously.

---

# 127. FINAL DECISION OBJECT

The Recommendation Engine should return:

```text
Recommendation {

    recommendation_id

    instrument
    asset_class

    timestamp

    horizon

    direction
    recommendation

    score
    confidence

    market_regime
    sector_regime

    entry_zone

    trigger_condition

    stop_loss

    target_1
    target_2
    target_3

    risk_reward

    expected_return
    expected_value

    position_size
    capital_required
    maximum_loss

    risk_score
    risk_level

    technical_score
    fundamental_score
    quant_score
    smart_money_score
    macro_score
    sentiment_score
    geopolitical_score

    fii_score
    dii_score

    factor_agreement

    positive_factors[]
    negative_factors[]
    risks[]
    warnings[]

    invalidation_condition

    valid_until

    data_timestamp

    model_version
    signal_engine_version
    risk_engine_version
    recommendation_engine_version
}
```

---

# 128. API

Implement:

```text
generateRecommendation(
    instrument,
    marketState,
    signalState,
    riskState,
    portfolioState
)
```

---

# 129. ADDITIONAL APIs

```text
rankOpportunities()

generateMarketSummary()

generateDailyReport()

generateTradePlan()

evaluateRecommendation()

invalidateRecommendation()

updateRecommendation()

getRecommendationHistory()

getRecommendationPerformance()
```

---

# 130. TESTING REQUIREMENTS

Test:

```text
Strong Buy + Low Risk
Strong Buy + High Risk
Strong Buy + Extreme Risk
Buy + Poor Liquidity
Buy + Major Event
Buy + Smart Money Distribution
Buy + Bear Market
Sell + Bull Market
Conflicting Factors
Missing Data
Stale Data
Portfolio Concentration
Options High IV
Options Low Liquidity
Commodity Geopolitical Shock
```

---

# 131. EDGE CASE

If:

```text
Signal Score:
95
```

but:

```text
Risk Score:
90
```

expected output should be:

```text
NO_TRADE
```

---

# 132. EDGE CASE

If:

```text
Signal:
75

Risk:
20

Confidence:
90
```

output may be:

```text
BUY
```

if minimum requirements are satisfied.

---

# 133. EDGE CASE

If:

```text
Signal:
82

Risk:
45

Confidence:
61
```

output:

```text
BUY_SMALL
```

or:

```text
WAIT
```

depending on configured thresholds.

---

# 134. EDGE CASE

If:

```text
Technical:
90

Fundamental:
85

Smart Money:
20

Macro:
25
```

the engine must detect:

```text
STRONG_FACTOR_CONFLICT
```

and reduce confidence.

---

# 135. EDGE CASE

If market data is stale:

```text
Recommendation:
NO_TRADE
```

unless the recommendation is explicitly classified as long-term research and stale data is acceptable for that use case.

---

# 136. RESEARCH VS TRADING MODE

The application must support two distinct modes.

## RESEARCH MODE

Focus:

```text
Long-term thesis
Fundamentals
Valuation
Institutional ownership
Industry
Macro
```

## TRADING MODE

Focus:

```text
Technical
Momentum
Volume
Volatility
Liquidity
Entry
Stop
Target
Risk/Reward
```

---

# 137. INVESTMENT VS TRADING RECOMMENDATION

Never mix:

```text
"Good company"
```

with:

```text
"Good trade today"
```

A stock can be:

```text
Excellent investment
```

but:

```text
Poor short-term trade
```

---

# 138. FINAL RECOMMENDATION PRINCIPLE

The Recommendation Engine must answer four questions:

```text
1. WHAT should I do?
2. AT WHAT PRICE?
3. HOW MUCH should I allocate?
4. WHERE am I wrong?
```

---

# 139. FINAL OUTPUT

Every actionable recommendation must contain:

```text
ACTION
ENTRY
STOP
TARGET
POSITION SIZE
MAXIMUM LOSS
RISK/REWARD
CONFIDENCE
TIME HORIZON
REASONS
RISKS
INVALIDATION
VALIDITY
```

---

# 140. CAPITAL PROTECTION

The Recommendation Engine must never force a trade.

The valid final output can always be:

```text
NO_TRADE
```

---

# 141. SYSTEM PHILOSOPHY

The system is NOT trying to predict every market movement.

It is trying to identify situations where:

```text
Probability of favorable outcome
+
Expected return
+
Risk control
+
Good execution
```

create a favorable risk-adjusted opportunity.

---

# 142. FINAL DECISION HIERARCHY

```text
DATA QUALITY
     ↓
MARKET REGIME
     ↓
SIGNAL QUALITY
     ↓
FACTOR AGREEMENT
     ↓
EXPECTED VALUE
     ↓
RISK
     ↓
PORTFOLIO FIT
     ↓
POSITION SIZE
     ↓
FINAL RECOMMENDATION
```

---

# 143. DEFINITION OF DONE

The Recommendation Engine is complete only when it can:

```text
✓ Generate BUY/SELL/WAIT/NO_TRADE
✓ Support Equity
✓ Support Futures
✓ Support Options
✓ Support Commodities
✓ Support Intraday
✓ Support Swing
✓ Support Positional
✓ Support Long-Term
✓ Calculate confidence
✓ Explain recommendation
✓ Include FII/DII
✓ Include Smart Money
✓ Include institutional activity
✓ Include global markets
✓ Include geopolitical risk
✓ Include news
✓ Include technical analysis
✓ Include fundamentals
✓ Include portfolio context
✓ Include risk
✓ Include position sizing
✓ Include entry
✓ Include stop
✓ Include targets
✓ Include risk/reward
✓ Include invalidation
✓ Include recommendation expiry
✓ Track recommendation history
✓ Track recommendation performance
✓ Detect recommendation changes
✓ Support automatic re-analysis
✓ Work offline with stale-data protection
✓ Work online with fresh data
✓ Support alerts
✓ Support backtesting
✓ Support paper trading
✓ Maintain complete audit trail
✓ Version every recommendation
✓ Never guarantee returns
✓ Allow NO_TRADE
```

---

# 144. FINAL ARCHITECTURE

```text
                    INTERNET
                       │
                       ▼
                 DATA SOURCES
                       │
                       ▼
                DATA VALIDATION
                       │
                       ▼
               FEATURE ENGINE
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
    TECHNICAL      FUNDAMENTAL    SMART MONEY
        │              │              │
        └──────────────┼──────────────┘
                       ▼
                   QUANT MODEL
                       │
                       ▼
                 SIGNAL ENGINE
                       │
                       ▼
                  RISK ENGINE
                       │
                       ▼
            RECOMMENDATION ENGINE
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
        ACTION       WAIT       NO TRADE
          │
          ▼
      TRADE PLAN
          │
          ▼
       ALERTS
          │
          ▼
     OUTCOME TRACKING
          │
          ▼
      BACKTESTING
          │
          ▼
     MODEL IMPROVEMENT
```

---

# 145. CORE PRINCIPLE

The final application should behave like a disciplined research and risk-management system, not a prediction machine.

Its job is:

```text
FIND
→ FILTER
→ SCORE
→ VALIDATE
→ SIZE
→ RECOMMEND
→ MONITOR
→ LEARN
```

The strongest possible recommendation is sometimes:

```text
NO TRADE.
```

That is a successful decision when the expected risk-adjusted opportunity is poor.
