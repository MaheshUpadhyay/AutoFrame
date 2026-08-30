# AI MARKET INTELLIGENCE

# SIGNAL ENGINE SPECIFICATION

**Document Version:** 1.0
**Status:** Core Decision Specification
**Market:** Indian Markets
**Markets Covered:** Equity, Futures, Options, Commodities

---

# 1. PURPOSE

The Signal Engine is the final decision layer of the AI Market Intelligence platform.

Its responsibility is to convert validated quantitative evidence into an actionable market view:

```text
STRONG BUY
BUY
HOLD
SELL
STRONG SELL
NO TRADE
```

The Signal Engine must NOT independently invent analysis.

It consumes outputs from:

```text
Market Data
Technical Analysis
Fundamental Analysis
Momentum
Valuation
Options Analysis
Smart Money
FII/DII
Sector Analysis
Global Markets
Macro Economics
Geopolitical Analysis
News/Sentiment
Market Regime
Risk Engine
Data Quality Engine
```

The Signal Engine must produce a transparent and auditable decision.

---

# 2. CORE PRINCIPLE

The system must optimize for:

```text
QUALITY OF DECISION
```

not:

```text
NUMBER OF SIGNALS
```

A `NO TRADE` decision is considered a successful outcome when evidence is insufficient, contradictory or risk is excessive.

---

# 3. SIGNAL OUTPUTS

The engine supports:

```text
STRONG BUY
BUY
HOLD
SELL
STRONG SELL
NO TRADE
```

These signals must have clearly defined meanings.

---

# 4. SIGNAL DEFINITIONS

## 4.1 STRONG BUY

A Strong Buy requires:

```text
Very strong quantitative evidence
+
Strong factor agreement
+
Acceptable risk
+
Good data quality
+
No major conflicting event
```

Suggested score:

```text
85–100
```

Subject to risk and quality gates.

---

# 5. BUY

A Buy requires:

```text
Positive expected direction
+
Reasonable factor agreement
+
Acceptable risk
```

Suggested score:

```text
70–84
```

---

# 6. HOLD

Hold means:

```text
No strong directional advantage
```

Typical score:

```text
45–69
```

HOLD may also occur when:

```text
Bullish and bearish factors are balanced
```

---

# 7. SELL

Sell means:

```text
Negative expected direction
+
Sufficient evidence
+
Acceptable risk
```

Suggested score:

```text
30–44
```

---

# 8. STRONG SELL

Strong Sell requires:

```text
Very strong bearish evidence
+
Strong factor agreement
+
No major data-quality problem
+
Risk conditions acceptable for the strategy
```

Suggested score:

```text
0–29
```

---

# 9. NO TRADE

NO TRADE overrides score-based signals when the system determines that acting would be unsafe or unreliable.

Examples:

```text
Insufficient data
Stale data
Major provider failure
Extreme volatility
Very poor liquidity
Major unresolved event
Conflicting factors
Extreme gap risk
Options spread too wide
Market closed
Signal confidence too low
Risk/reward inadequate
```

---

# 10. IMPORTANT OVERRIDE RULE

A high quantitative score does NOT guarantee a BUY.

Example:

```text
Composite Score = 91
Risk = Extreme
Data Quality = Poor

Final Signal = NO TRADE
```

Risk and data quality can override the raw score.

---

# 11. INPUT CONTRACT

The Signal Engine receives a standardized object.

Example:

```text
SignalInput {

    instrument_id

    instrument_type

    timestamp

    horizon

    market_regime

    technical_score

    momentum_score

    fundamental_score

    valuation_score

    options_score

    smart_money_score

    institutional_score

    sector_score

    global_score

    macro_score

    geopolitical_score

    sentiment_score

    liquidity_score

    volatility_score

    data_quality_score

    factor_agreement_score

    risk_score

    expected_return

    expected_volatility

    support_level

    resistance_level

    atr

    current_price

}
```

---

# 12. SCORE NORMALIZATION

All factor scores must be normalized to:

```text
0–100
```

Interpretation:

```text
0   = extremely bearish
50  = neutral
100 = extremely bullish
```

The exact factor calculations are defined in:

```text
QUANT_MODEL.md
```

---

# 13. BASE COMPOSITE SCORE

The Signal Engine receives the composite score from the Quant Model.

It must NOT independently recreate the entire Quant Model.

Architecture:

```text
Feature Engine
      ↓
Factor Engine
      ↓
Quant Model
      ↓
Composite Score
      ↓
Signal Engine
```

---

# 14. SIGNAL ENGINE ADJUSTMENTS

The Signal Engine can apply controlled adjustments for:

```text
Risk
Data quality
Factor agreement
Market regime
Liquidity
Event risk
```

It must not arbitrarily modify scores.

Every adjustment must be deterministic and documented.

---

# 15. FACTOR AGREEMENT

Factor agreement measures whether major factors support the same direction.

Example:

```text
Technical       BUY
Momentum        BUY
Smart Money     BUY
Sector          BUY
Fundamental     BUY
Global          NEUTRAL
Macro           BUY
```

This represents high agreement.

---

# 16. FACTOR CONFLICT

Example:

```text
Technical       BUY
Momentum        BUY
Smart Money     SELL
Fundamental     SELL
Macro           SELL
```

This is a conflict.

The system must reduce confidence.

If conflict exceeds the configured threshold:

```text
FINAL SIGNAL = NO TRADE
```

or:

```text
FINAL SIGNAL = HOLD
```

depending on severity.

---

# 17. MARKET REGIME FILTER

The current market regime must influence signals.

Example:

```text
STRONG_BULL
```

allows more bullish signals.

But:

```text
STRONG_BEAR
```

should make the system more conservative with BUY signals.

---

# 18. REGIME COMPATIBILITY

Each signal has a regime compatibility score.

Example:

```text
BUY in STRONG_BULL
→ high compatibility

BUY in STRONG_BEAR
→ low compatibility
```

The system must not automatically reject counter-trend opportunities, but should require stronger evidence.

---

# 19. DATA QUALITY GATE

Every signal must pass data-quality validation.

Data quality considers:

```text
Freshness
Completeness
Provider reliability
Cross-provider consistency
Timestamp validity
Missing values
Market status
```

---

# 20. DATA QUALITY THRESHOLDS

Suggested:

```text
90–100 = Excellent
75–89  = Good
60–74  = Acceptable
40–59  = Poor
0–39   = Unusable
```

Rules:

```text
Data Quality < 40
→ NO TRADE

Data Quality 40–59
→ Strong signals blocked

Data Quality 60–74
→ Confidence capped

Data Quality ≥ 75
→ Normal operation
```

These thresholds must be configurable.

---

# 21. DATA FRESHNESS

The system must know how old the data is.

Example:

```text
LIVE
RECENT
STALE
VERY_STALE
```

The allowed age depends on the instrument and analysis horizon.

For intraday signals:

```text
Fresh data is mandatory.
```

For long-term analysis:

```text
Older fundamental data may be acceptable.
```

---

# 22. LIQUIDITY GATE

Liquidity must be evaluated before generating actionable signals.

Consider:

```text
Average volume
Current volume
Bid/ask spread
Market depth
Open interest
Trading frequency
```

If liquidity is insufficient:

```text
NO TRADE
```

---

# 23. VOLATILITY GATE

Volatility must be evaluated using:

```text
ATR
Historical volatility
Implied volatility
India VIX
Recent price gaps
Intraday range
```

Extreme volatility can:

```text
Reduce confidence
Reduce position size
Block new trades
```

---

# 24. EVENT RISK GATE

The system must detect upcoming events.

Examples:

```text
RBI policy
Fed decision
Budget
Major election
Company earnings
Major court decision
Major geopolitical event
Commodity inventory
OPEC event
```

If an event creates excessive uncertainty:

```text
NO TRADE
```

may be triggered.

---

# 25. GEOPOLITICAL RISK

The system must account for geopolitical conditions.

Examples:

```text
War
Escalation
Sanctions
Trade restrictions
Shipping disruption
Oil supply disruption
Military conflict
Political instability
```

The engine must determine:

```text
Direct impact
Indirect impact
Sector impact
Commodity impact
Currency impact
Market-wide impact
```

---

# 26. SMART MONEY FILTER

Smart money is a major component.

Consider:

```text
FII activity
DII activity
Mutual fund activity
Institutional ownership
Promoter activity
Bulk deals
Block deals
Insider transactions
Unusual institutional activity
```

Smart money must be evaluated together with price and volume.

Example:

```text
Institutional Buying
+
Price Strength
+
Volume Confirmation
=
Strong accumulation evidence
```

Institutional buying without price confirmation should receive lower confidence.

---

# 27. SMART MONEY CONFLICT

Example:

```text
Price ↑
Technical BUY
But
FII Selling strongly
Promoter Selling
Sector Weak
```

The system should reduce:

```text
Confidence
```

and potentially:

```text
Signal → HOLD
```

depending on severity.

---

# 28. NEWS IMPACT

News should influence signals according to:

```text
Importance
Reliability
Recency
Market impact
Company impact
Sector impact
Duration
```

Do not allow large numbers of articles about the same event to artificially increase the signal.

---

# 29. NEWS DEDUPLICATION

Multiple articles reporting the same event must be clustered.

Example:

```text
20 websites report same RBI decision
```

must be treated as approximately:

```text
1 underlying event
```

rather than:

```text
20 independent signals
```

---

# 30. GLOBAL MARKET FILTER

Consider:

```text
S&P 500
NASDAQ
Dow Jones
Nikkei
Hang Seng
Shanghai
FTSE
DAX
US Futures
VIX
DXY
US 10Y
USDINR
```

Global conditions should influence the signal according to the stock's sensitivity.

Example:

```text
IT stock
+
NASDAQ strongly weak
=
negative global factor
```

---

# 31. COMMODITY-SPECIFIC GLOBAL FACTORS

For commodities:

```text
Gold
→ USD
→ US yields
→ geopolitical risk
→ central-bank demand
→ global risk sentiment

Crude
→ OPEC
→ inventories
→ geopolitical risk
→ global demand
→ USD

Copper
→ China
→ global manufacturing
→ infrastructure demand
→ USD
```

The commodity engine must use relevant drivers rather than treating all commodities identically.

---

# 32. SECTOR FILTER

Every equity signal must consider sector conditions.

Example:

```text
Stock Score = 82
Sector Score = 35
```

The system should reduce confidence.

Conversely:

```text
Stock Score = 78
Sector Score = 90
```

provides stronger confirmation.

---

# 33. EXPECTED RETURN

The engine should estimate expected return where sufficient data exists.

For a BUY:

```text
Expected Return =
(Expected Target - Entry Price) / Entry Price
```

For a SELL:

```text
Expected Return =
(Entry Price - Expected Target) / Entry Price
```

---

# 34. RISK/REWARD

Calculate:

```text
Risk = |Entry - Stop Loss|

Reward = |Target - Entry|

Risk Reward Ratio = Reward / Risk
```

A trade should generally require:

```text
Risk/Reward >= configured minimum
```

Default:

```text
1.5 : 1
```

Preferred:

```text
2 : 1 or better
```

The threshold must be configurable and strategy-dependent.

---

# 35. ENTRY ZONE

The engine should not always return one exact entry price.

Prefer:

```text
ENTRY ZONE
```

Example:

```text
₹1,240 – ₹1,255
```

This is more realistic than pretending the user can always enter at an exact price.

---

# 36. STOP LOSS

Stop loss should be based on market structure and volatility.

Possible methods:

```text
ATR-based
Support-based
Resistance-based
Swing low/high
Percentage-based
```

The selected method must be stored.

---

# 37. TARGET

Targets can be derived from:

```text
Resistance
Support
ATR
Risk/reward
Historical volatility
Price structure
```

Multiple targets may be supported:

```text
Target 1
Target 2
Target 3
```

---

# 38. TRAILING STOP

For suitable strategies, support:

```text
ATR trailing stop
Swing trailing stop
Percentage trailing stop
```

The strategy configuration determines whether trailing stops are enabled.

---

# 39. POSITION SIZE

Position size must be calculated using risk.

Example:

```text
Capital = ₹500,000
Maximum trade risk = 1%

Maximum risk = ₹5,000
```

If:

```text
Entry = ₹1,000
Stop = ₹950
Risk/share = ₹50
```

then:

```text
Maximum quantity = ₹5,000 / ₹50
                 = 100 shares
```

Position sizing must respect:

```text
Liquidity
Maximum allocation
Portfolio exposure
Sector exposure
Correlation
```

---

# 40. PORTFOLIO RISK

If portfolio integration is available, evaluate:

```text
Existing exposure
Sector exposure
Correlation
Concentration
Drawdown
Available capital
```

Example:

```text
Already heavily invested in Banking
+
New Banking BUY
=
Reduced position size
```

---

# 41. OPTIONS SIGNAL ENGINE

Options require a separate decision process.

The engine must evaluate:

```text
Underlying signal
Options liquidity
OI
Change in OI
IV
IV Rank
Greeks
Expiry
Theta
Expected move
Spread
Risk/reward
Event risk
```

---

# 42. OPTION BUY FILTER

An option BUY should require:

```text
Strong underlying directional signal
+
Sufficient expected move
+
Acceptable IV
+
Acceptable liquidity
+
Acceptable theta risk
+
Acceptable risk/reward
```

Otherwise:

```text
NO TRADE
```

---

# 43. OPTION SELL FILTER

Option selling requires:

```text
Adequate margin
+
Acceptable volatility
+
Defined risk where possible
+
Liquidity
+
Risk controls
+
Event risk assessment
```

Never recommend option selling merely because:

```text
IV is high
```

---

# 44. OPTIONS EXPIRY FILTER

Near-expiry options have different risk characteristics.

The engine must account for:

```text
Days to expiry
Gamma
Theta
IV
Expected move
Liquidity
```

The same strategy may produce different signals depending on expiry.

---

# 45. COMMODITY SIGNAL ENGINE

Commodity signals must combine:

```text
Technical
Momentum
Open Interest
Volume
Global commodity price
USDINR
Macro
Geopolitical
Supply/demand
```

Commodity signals must be contract-specific.

---

# 46. SIGNAL CONFIDENCE

Confidence is a separate metric.

Range:

```text
0–100%
```

Confidence should depend on:

```text
Model strength
Factor agreement
Data quality
Market regime compatibility
Risk
Liquidity
Event risk
Historical model performance
```

---

# 47. CONFIDENCE LEVELS

```text
90–100% → Very High
80–89%  → High
70–79%  → Moderate-High
60–69%  → Moderate
50–59%  → Low
<50%    → Very Low
```

These are confidence classifications, NOT probability of guaranteed profit.

The UI must not display:

```text
90% chance of profit
```

unless the model has actually been statistically calibrated to support such a statement.

Prefer:

```text
Model Confidence: 90/100
```

---

# 48. CONFIDENCE CAP

Confidence must be capped when:

```text
Data Quality is poor
```

or:

```text
Factor conflict is high
```

or:

```text
Major event risk exists
```

Example:

```text
Raw Confidence = 91
Data Quality = 62

Final Confidence <= configured cap
```

---

# 49. HISTORICAL MODEL PERFORMANCE

Confidence may incorporate historical performance.

Example:

```text
Model historically performs well
during current market regime
```

This can increase confidence.

But historical performance must not override current evidence.

---

# 50. SIGNAL SCORE VS CONFIDENCE

These are different.

Example:

```text
Score = 85
Confidence = 58%
```

Possible reason:

```text
Strong technical evidence
but
major geopolitical uncertainty
```

The user must see both.

---

# 51. FINAL DECISION ALGORITHM

Conceptual flow:

```text
Composite Score
      ↓
Data Quality Gate
      ↓
Liquidity Gate
      ↓
Risk Gate
      ↓
Event Risk Gate
      ↓
Factor Agreement
      ↓
Market Regime
      ↓
Expected Return
      ↓
Risk/Reward
      ↓
Confidence
      ↓
Final Signal
```

---

# 52. DECISION MATRIX

Initial default thresholds:

| Composite Score | Base Signal |
| --------------: | ----------- |
|          85–100 | STRONG BUY  |
|           70–84 | BUY         |
|           45–69 | HOLD        |
|           30–44 | SELL        |
|            0–29 | STRONG SELL |

These are starting values only.

They must be validated using historical backtesting.

---

# 53. NO TRADE OVERRIDES

Regardless of score:

```text
If Data Quality < minimum
→ NO TRADE

If Liquidity < minimum
→ NO TRADE

If Risk > maximum
→ NO TRADE

If Confidence < minimum
→ NO TRADE

If Risk/Reward < minimum
→ NO TRADE

If critical event risk
→ NO TRADE
```

Thresholds must be configurable.

---

# 54. SIGNAL STRENGTH

Signal strength should consider:

```text
Composite Score
+
Distance from threshold
+
Factor agreement
+
Market regime
```

Example:

```text
Score 71
```

is technically BUY but weaker than:

```text
Score 83
```

---

# 55. SIGNAL PERSISTENCE

Avoid generating noisy signal changes.

Example:

```text
BUY
HOLD
BUY
HOLD
BUY
```

within minutes should be treated carefully.

Use:

```text
Hysteresis
Confirmation
Minimum persistence
```

where appropriate.

---

# 56. SIGNAL CHANGE

A signal should change when:

```text
Underlying evidence changes materially
```

Examples:

```text
Score crosses threshold
Risk changes
Market regime changes
Major news
Technical invalidation
Institutional flow changes
Options positioning changes
```

---

# 57. SIGNAL INVALIDATION

Every actionable signal must contain:

```text
Invalidation Price
```

and/or:

```text
Invalidation Condition
```

Example:

```text
BUY RELIANCE

Invalidation:
Daily close below ₹1,180
OR
Fundamental thesis materially changes
```

---

# 58. SIGNAL EXPIRATION

Every signal should have an expected validity period.

Examples:

```text
Intraday:
Minutes/hours

Swing:
Days/weeks

Medium-term:
Weeks/months

Long-term:
Months/years
```

A signal must not remain active forever.

---

# 59. SIGNAL VERSIONING

Every signal must store:

```text
signal_id
model_version
signal_engine_version
timestamp
```

This is mandatory.

---

# 60. SIGNAL HISTORY

Never overwrite old signals.

Example:

```text
Signal #1001
10:00 BUY
10:45 STRONG BUY
12:30 BUY
14:20 HOLD
```

All changes must remain available.

---

# 61. SIGNAL AUDIT

For every signal store:

```text
Input factor scores
Composite score
Risk score
Data quality
Confidence
Market regime
Entry
Stop
Target
Reason
Invalidation
Model version
Timestamp
```

---

# 62. SIGNAL EXPLANATION

Every actionable signal must answer:

```text
WHY?
```

Example:

```text
RELIANCE
BUY

Score: 81/100
Confidence: 78/100

Why:
• Technical trend is positive
• Momentum is improving
• Sector is strong
• Institutional activity is supportive
• Valuation remains acceptable

Risks:
• Crude volatility
• Global market weakness

Entry:
₹X–₹Y

Stop:
₹Z

Target:
₹A–₹B

Risk/Reward:
2.1

Invalidation:
Below ₹Z
```

---

# 63. BEARISH EXPLANATION

For SELL:

```text
Why:
• Momentum deteriorating
• Price below major trend levels
• Sector weakening
• Institutional selling
• Negative global environment
```

---

# 64. NO TRADE EXPLANATION

NO TRADE must explain the reason.

Example:

```text
NO TRADE

Reason:
High volatility + conflicting institutional flows + major event risk tomorrow.

The model does not have sufficient risk-adjusted confidence.
```

---

# 65. SIGNAL RANKING

When multiple BUY opportunities exist, rank them.

Ranking should consider:

```text
Composite Score
Confidence
Risk/reward
Liquidity
Expected return
Risk
```

Example:

```text
#1 Stock A
Score: 88
Confidence: 84
R/R: 2.8

#2 Stock B
Score: 86
Confidence: 81
R/R: 2.4
```

---

# 66. OPPORTUNITY SCORE

Create:

```text
Opportunity Score
```

This should help rank trades rather than simply ranking by raw composite score.

Possible inputs:

```text
Signal strength
Confidence
Expected return
Risk/reward
Liquidity
Volatility
```

Exact formula must be validated through backtesting.

---

# 67. MARKET-WIDE SIGNAL LIMIT

The system must avoid recommending too many highly correlated trades.

Example:

```text
BUY 10 banking stocks
```

does not represent:

```text
10 independent opportunities
```

They may represent one common banking-sector exposure.

---

# 68. CORRELATION FILTER

Where portfolio data is available:

```text
Correlation Matrix
```

should be used to identify overlapping exposure.

Example:

```text
RELIANCE
ONGC
BPCL
```

may have related energy exposure.

---

# 69. SECTOR CONCENTRATION

Limit the number of simultaneous high-conviction signals from the same sector.

Thresholds must be configurable.

---

# 70. MARKET-WIDE RISK OVERRIDE

During extreme market conditions:

```text
CRISIS
```

the system should become defensive.

Possible behavior:

```text
Reduce BUY signals
Increase NO TRADE
Reduce position sizes
Increase confidence requirements
```

---

# 71. GAP RISK

The engine must consider overnight gap risk.

Especially for:

```text
Stocks with major events
Options
Commodities
Geopolitical-sensitive stocks
```

---

# 72. LIQUIDITY-ADJUSTED SIGNAL

A stock with:

```text
Score = 90
```

but:

```text
Very poor liquidity
```

must not be treated equally to:

```text
Score = 90
High liquidity
```

---

# 73. SIGNAL QUALITY SCORE

Create a separate:

```text
Signal Quality Score
```

based on:

```text
Data quality
Factor agreement
Liquidity
Risk
Historical model reliability
```

---

# 74. SIGNAL OUTPUT CONTRACT

The final object should resemble:

```text
SignalOutput {

    signal_id

    instrument_id

    instrument_type

    timestamp

    horizon

    signal

    composite_score

    confidence_score

    signal_quality_score

    opportunity_score

    market_regime

    risk_level

    entry_low

    entry_high

    stop_loss

    target_1

    target_2

    risk_reward

    expected_return

    holding_period

    invalidation_condition

    primary_reasons[]

    supporting_factors[]

    negative_factors[]

    risk_factors[]

    data_quality_score

    model_version

    signal_engine_version

}
```

---

# 75. EQUITY SIGNAL EXAMPLE

Example:

```text
Instrument:
HDFCBANK

Signal:
BUY

Composite Score:
82

Confidence:
79

Signal Quality:
86

Opportunity Score:
81

Market Regime:
BULL

Risk:
MEDIUM

Entry:
₹1,720–₹1,740

Stop:
₹1,680

Target 1:
₹1,820

Target 2:
₹1,870

Risk/Reward:
2.2

Holding:
Swing

Primary Reasons:
1. Strong momentum
2. Positive institutional flow
3. Banking sector strength
4. Technical breakout

Risks:
1. Market-wide volatility
2. Global financial weakness

Invalidation:
Daily close below ₹1,680
```

This is an illustrative structure only. Never use fabricated values in production.

---

# 76. OPTIONS SIGNAL EXAMPLE

```text
Underlying:
NIFTY

Strategy:
CALL BUY

Signal:
BUY

Underlying Score:
84

Options Score:
78

IV:
Acceptable

Liquidity:
High

Expiry:
Configured

Risk:
HIGH

Confidence:
73

Entry:
₹X–₹Y

Stop:
₹Z

Target:
₹A

Invalidation:
Underlying below defined support
```

---

# 77. COMMODITY SIGNAL EXAMPLE

```text
Instrument:
GOLD MINI

Signal:
BUY

Composite Score:
80

Confidence:
77

Supporting Factors:
• Global gold strength
• Geopolitical risk
• USD weakness
• Positive momentum

Risk:
MEDIUM

Entry:
Configured zone

Stop:
Configured

Target:
Configured
```

Illustrative only.

---

# 78. MODEL CALIBRATION

Signal thresholds must not be considered permanently correct.

They must be validated through:

```text
Backtesting
Walk-forward testing
Out-of-sample testing
Paper trading
```

---

# 79. PERFORMANCE METRICS

Measure:

```text
Win Rate
Average Return
Median Return
Profit Factor
Expectancy
Maximum Drawdown
Sharpe Ratio
Sortino Ratio
Average Holding Period
Maximum Adverse Excursion
Maximum Favorable Excursion
```

---

# 80. SIGNAL PERFORMANCE BY REGIME

Track performance separately for:

```text
Bull
Bear
Neutral
High Volatility
Low Volatility
Crisis
```

Example:

```text
BUY signals in Bull:
68% profitable

BUY signals in Bear:
42% profitable
```

This information can be used to calibrate confidence.

---

# 81. SIGNAL PERFORMANCE BY HORIZON

Track:

```text
Intraday
Swing
Short-term
Medium-term
Long-term
```

separately.

---

# 82. SIGNAL PERFORMANCE BY ASSET CLASS

Track separately:

```text
Equity
Options
Futures
Commodities
```

Never assume that a model performing well for equities will perform equally well for options.

---

# 83. NO LOOK-AHEAD BIAS

Backtests must not use information that was unavailable at signal generation time.

Example:

If a company announces results at:

```text
16:00
```

a signal generated at:

```text
14:00
```

must not use those results.

---

# 84. SURVIVORSHIP BIAS

Historical backtests must account for stocks that:

```text
Delisted
Merged
Bankrupt
Removed from indices
```

where possible.

Do not only test today's successful companies.

---

# 85. TRANSACTION COSTS

Backtests must include configurable:

```text
Brokerage
Exchange charges
Taxes
Slippage
Bid/ask spread
```

The system must not report unrealistic theoretical returns.

---

# 86. SLIPPAGE

Slippage should depend on:

```text
Liquidity
Volatility
Order size
Market conditions
```

---

# 87. PAPER TRADING VALIDATION

Before using real-money decisions:

```text
Backtest
      ↓
Walk-forward
      ↓
Paper trading
      ↓
Performance review
      ↓
Model validation
```

---

# 88. MODEL CHANGE CONTROL

Do NOT automatically modify:

```text
Weights
Thresholds
Risk limits
Signal rules
```

based solely on recent performance.

Any model change must:

```text
Create new version
Run historical tests
Run validation
Document change
```

---

# 89. MACHINE LEARNING FUTURE SUPPORT

The architecture may later support ML models.

Possible:

```text
Gradient Boosting
Random Forest
Neural Networks
Time-series models
Ensemble models
```

But ML models must be treated as additional evidence.

They must not replace deterministic risk controls.

---

# 90. ENSEMBLE MODEL

Future architecture may combine:

```text
Rule-based model
+
Statistical model
+
Machine-learning model
+
Market regime model
```

into an ensemble.

The ensemble must be validated out-of-sample.

---

# 91. AI ROLE

AI may explain:

```text
Why signal changed
Why confidence changed
What events affected it
What risks exist
```

AI must not modify:

```text
Composite Score
Risk Score
Signal Threshold
Stop Loss
Target
```

unless explicitly requested as a separate research scenario and clearly marked as such.

---

# 92. AI EXPLANATION RULE

AI must always distinguish:

```text
FACT
MODEL OUTPUT
INTERPRETATION
UNCERTAINTY
```

Example:

```text
FACT:
FII net selling increased.

MODEL:
Smart Money Score decreased from 72 to 58.

INTERPRETATION:
This weakens the bullish thesis.

UNCERTAINTY:
Institutional flow can reverse quickly.
```

---

# 93. USER INTERFACE DISPLAY

Each signal should visually display:

```text
SIGNAL
SCORE
CONFIDENCE
RISK
ENTRY
STOP
TARGET
RISK/REWARD
HOLDING PERIOD
WHY
RISKS
INVALIDATION
DATA FRESHNESS
```

---

# 94. SIGNAL COLORING

UI colors may represent:

```text
BUY → positive
SELL → negative
HOLD → neutral
NO TRADE → warning
```

But the underlying signal must always be represented as text.

---

# 95. SIGNAL DISCLAIMER

The application must clearly state that signals are:

```text
Quantitative research outputs
```

and not guaranteed returns.

Avoid wording such as:

```text
Guaranteed profit
Sure-shot call
100% accurate
Guaranteed target
```

---

# 96. SIGNAL ENGINE API

Expose a service:

```text
generateSignal(instrumentId, horizon)
```

Return:

```text
SignalOutput
```

Also support:

```text
generateSignals(instrumentIds, horizon)
```

and:

```text
getLatestSignal(instrumentId)
```

---

# 97. SIGNAL RE-EVALUATION

Signals should be re-evaluated when significant data changes.

Triggers:

```text
Price change
Volume anomaly
OI change
News event
FII/DII update
Market regime change
Sector change
Global market change
Macro event
Geopolitical event
```

---

# 98. SIGNAL THROTTLING

Avoid recalculating unnecessarily.

Use:

```text
Minimum meaningful change
```

before publishing a new signal.

---

# 99. SIGNAL ALERT RULE

Alert the user when:

```text
Signal changes materially
```

Example:

```text
BUY → HOLD
BUY → SELL
HOLD → BUY
SELL → STRONG SELL
```

Minor score changes should not necessarily trigger alerts.

---

# 100. FINAL SIGNAL ENGINE PRINCIPLE

The Signal Engine must answer five questions:

```text
1. SHOULD I ACT?
2. IN WHICH DIRECTION?
3. AT WHAT PRICE RANGE?
4. WHAT IS THE RISK?
5. WHAT WOULD INVALIDATE THE DECISION?
```

If the system cannot answer these reliably:

```text
NO TRADE
```

must be preferred.

---

# 101. FINAL DECISION FLOW

```text
                    MARKET DATA
                         │
                         ▼
                  FEATURE ENGINE
                         │
                         ▼
                   FACTOR ENGINE
                         │
                         ▼
                    QUANT MODEL
                         │
                         ▼
                 COMPOSITE SCORE
                         │
                         ▼
                 DATA QUALITY GATE
                         │
                         ▼
                   LIQUIDITY GATE
                         │
                         ▼
                     RISK GATE
                         │
                         ▼
                  EVENT RISK GATE
                         │
                         ▼
                FACTOR AGREEMENT
                         │
                         ▼
                  MARKET REGIME
                         │
                         ▼
                 EXPECTED RETURN
                         │
                         ▼
                   RISK/REWARD
                         │
                         ▼
                    CONFIDENCE
                         │
                         ▼
                  SIGNAL DECISION
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
           ACTION      HOLD      NO TRADE
              │
              ▼
      ENTRY / STOP / TARGET
              │
              ▼
          USER ALERT
              │
              ▼
        SIGNAL TRACKING
              │
              ▼
       PERFORMANCE ENGINE
              │
              ▼
        MODEL VALIDATION
```

---

# 102. IMPLEMENTATION REQUIREMENT

Claude Code must implement this specification only after reading:

```text
PRODUCT_REQUIREMENT.md
MASTER_SPEC.md
QUANT_MODEL.md
DATABASE_SPEC.md
DATA_SOURCES.md
SYSTEM_ARCHITECTURE.md
SIGNAL_ENGINE.md
```

If any document contains contradictory rules:

```text
STOP IMPLEMENTATION
REPORT THE CONFLICT
DO NOT GUESS
```

The Signal Engine must remain deterministic, testable, versioned and auditable.

---

# 103. FIRST IMPLEMENTATION VERSION

Version 1 should prioritize:

```text
Deterministic scoring
Risk gates
Data quality gates
BUY/SELL/HOLD/NO TRADE
Entry zone
Stop loss
Target
Risk/reward
Confidence
Signal history
Signal explanation
Backtesting
Paper trading
```

Advanced ML/AI optimization should come later.

---

# 104. SUCCESS CRITERIA

The Signal Engine is considered successful only if it can demonstrate through historical and paper-trading validation that:

```text
Signals are reproducible
Signals are explainable
Signals are timestamp-correct
Risk is controlled
Data quality is enforced
No-look-ahead bias is avoided
Transaction costs are considered
Performance can be measured
Signal history can be audited
```

The objective is NOT to maximize the number of BUY/SELL calls.

The objective is to generate:

```text
HIGH-QUALITY
RISK-AWARE
DATA-BACKED
AUDITABLE
ACTIONABLE
MARKET DECISIONS
```

with `NO TRADE` whenever the evidence does not justify taking risk.
