# AI MARKET INTELLIGENCE

# RISK ENGINE SPECIFICATION

**Document Version:** 1.0
**Status:** Core Risk & Position Management Specification
**Market:** Indian Markets
**Asset Classes:** Equity, Futures, Options, Commodities

---

# 1. PURPOSE

The Risk Engine is responsible for determining whether a generated trading signal should actually become an actionable trade.

The Risk Engine sits between the Signal Engine and the Execution/Recommendation layer.

```text
MARKET DATA
     ↓
FEATURE ENGINE
     ↓
QUANT MODEL
     ↓
SIGNAL ENGINE
     ↓
RISK ENGINE
     ↓
TRADE DECISION
     ↓
POSITION SIZING
     ↓
ENTRY / STOP / TARGET
```

The Risk Engine must be capable of changing:

```text
BUY
```

into:

```text
NO TRADE
```

when risk is excessive.

---

# 2. PRIMARY OBJECTIVE

The objective is NOT:

```text
Maximize number of profitable trades
```

The objective is:

```text
Maximize risk-adjusted expected return
while controlling probability and magnitude of capital loss.
```

---

# 3. GOLDEN RULE

The system must always prefer:

```text
NO TRADE
```

over:

```text
LOW-QUALITY TRADE
```

---

# 4. RISK ENGINE INPUTS

The Risk Engine receives:

```text
Signal Score
Signal Direction
Confidence
Entry Price
Stop Loss
Target
Expected Return
Expected Volatility
Risk/Reward
Market Regime
Instrument Volatility
Liquidity
Volume
Open Interest
Options Greeks
Portfolio Exposure
Sector Exposure
Correlation
Capital Available
Existing Positions
Macro Risk
Geopolitical Risk
Event Risk
FII/DII Conditions
Smart Money Conditions
Data Quality
Model Reliability
```

---

# 5. RISK DECISION OUTPUT

The Risk Engine must return:

```text
RiskDecision {

    decision
    risk_score
    risk_level

    recommended_position_size

    capital_required

    maximum_loss

    entry_zone

    stop_loss

    target_1
    target_2
    target_3

    expected_return

    risk_reward

    confidence_adjusted_return

    portfolio_risk_after_trade

    sector_exposure_after_trade

    liquidity_score

    event_risk_score

    volatility_score

    correlation_score

    data_quality_score

    reasons[]

    warnings[]

}
```

---

# 6. DECISION STATES

Supported decisions:

```text
STRONG_BUY
BUY
BUY_SMALL
HOLD
WAIT
NO_TRADE
SELL
SELL_SMALL
STRONG_SELL
EXIT
REDUCE
```

For an investment/research application, the system should distinguish between:

```text
Signal Direction
```

and:

```text
Actionable Recommendation
```

---

# 7. SIGNAL VS ACTION

Example:

```text
Signal:
STRONG BUY

Risk Engine:
HIGH RISK

Final:
NO TRADE
```

This is valid and expected behavior.

---

# 8. RISK LEVELS

```text
LOW
MODERATE
HIGH
VERY_HIGH
EXTREME
```

Example scoring:

```text
0–20:
LOW

21–40:
MODERATE

41–60:
HIGH

61–80:
VERY_HIGH

81–100:
EXTREME
```

These thresholds must remain configurable.

---

# 9. TOTAL RISK SCORE

The Risk Engine calculates:

```text
Risk Score =

25% Market Risk
15% Volatility Risk
15% Liquidity Risk
10% Event Risk
10% Portfolio Risk
10% Correlation Risk
5% Execution Risk
5% Data Quality Risk
5% Model Reliability Risk
```

The weights must be configurable.

Do not hard-code these weights permanently.

---

# 10. MARKET RISK

Market Risk should consider:

```text
Index Trend
Market Breadth
Market Volatility
Global Markets
FII Flow
DII Flow
Interest Rates
Currency
Macro Events
Geopolitical Conditions
```

---

# 11. MARKET REGIME

Classify the market as:

```text
STRONG_BULL
BULL
NEUTRAL
SIDEWAYS
BEAR
STRONG_BEAR
CRISIS
```

---

# 12. MARKET REGIME RISK

Example:

```text
STRONG_BULL:
Low risk for long strategies

BULL:
Moderate-low risk

SIDEWAYS:
Moderate-high risk

BEAR:
High risk for long strategies

CRISIS:
Extreme risk
```

The actual score must depend on the instrument and strategy.

---

# 13. DIRECTIONAL RISK

The system must compare:

```text
Signal Direction
```

against:

```text
Market Direction
```

Example:

```text
Market:
STRONG_BEAR

Stock:
BUY
```

This should increase risk.

---

# 14. SECTOR RISK

Evaluate:

```text
Sector Trend
Sector Momentum
Sector Relative Strength
Sector Volatility
Sector News
Sector FII/DII Exposure
```

---

# 15. STOCK-SPECIFIC RISK

Evaluate:

```text
Price Volatility
ATR
Beta
Liquidity
Volume
Gap Frequency
Historical Drawdown
Earnings Risk
Corporate Events
Debt Risk
Fundamental Deterioration
```

---

# 16. VOLATILITY RISK

Use:

```text
ATR
Historical Volatility
Realized Volatility
Implied Volatility
VIX
Volatility Regime
```

where applicable.

---

# 17. ATR

For an instrument:

```text
ATR Percentage =
ATR / Current Price × 100
```

Use configurable lookback periods.

Default:

```text
14 periods
```

---

# 18. VOLATILITY REGIME

Classify:

```text
VERY_LOW
LOW
NORMAL
HIGH
EXTREME
```

---

# 19. HIGH VOLATILITY RULE

High volatility does NOT automatically mean:

```text
SELL
```

Instead:

```text
High volatility
→ Reduce position size
→ Widen stop appropriately
→ Recalculate risk
```

If risk becomes unacceptable:

```text
NO_TRADE
```

---

# 20. LIQUIDITY RISK

Evaluate:

```text
Average Daily Volume
Average Traded Value
Bid/Ask Spread
Order Size
Open Interest
Market Depth
```

where available.

---

# 21. LIQUIDITY SCORE

Example:

```text
90–100:
Excellent

70–89:
Good

50–69:
Moderate

30–49:
Poor

0–29:
Very Poor
```

---

# 22. LIQUIDITY LIMIT

The position size must not exceed a configurable percentage of:

```text
Average Daily Volume
```

Default:

```text
5%
```

For large portfolios, this threshold should be lower.

---

# 23. EXECUTION RISK

Execution risk includes:

```text
Spread
Slippage
Liquidity
Gap Risk
Market Depth
Order Size
Volatility
```

---

# 24. GAP RISK

Calculate historical gap frequency.

Large overnight gaps must increase risk for:

```text
Equity
Futures
Options
```

especially around major events.

---

# 25. EVENT RISK

Check upcoming:

```text
Earnings
RBI Policy
Fed Meeting
Inflation Data
GDP
Budget
Election
Major Corporate Announcement
Index Rebalancing
Expiry
Major Geopolitical Event
```

---

# 26. EVENT RISK WINDOWS

Events should have configurable risk windows.

Example:

```text
Major Earnings:
24–48 hours

RBI Policy:
24 hours

Union Budget:
1–3 days

Major geopolitical event:
Dynamic
```

---

# 27. EVENT-BASED POSITION REDUCTION

If event risk is high:

```text
Normal position
→ Reduce position

or

No new position
```

depending on strategy.

---

# 28. EARNINGS RISK

For stocks reporting earnings:

```text
Pre-Earnings:
Higher risk

During Earnings:
Very High Risk

Post-Earnings:
Risk depends on volatility
```

---

# 29. OPTIONS EVENT RISK

For options, the Risk Engine must consider:

```text
IV expansion
IV crush
Theta decay
Gap risk
Gamma exposure
Expiry proximity
```

---

# 30. OPTIONS POSITION RISK

For every option trade calculate, where data permits:

```text
Delta Exposure
Gamma Exposure
Theta Exposure
Vega Exposure
IV Rank
Days to Expiry
```

---

# 31. OPTION BUYING RULE

Option buying should be penalized when:

```text
Theta is high
IV is extremely high
Days to expiry are low
Expected move is insufficient
Spread is wide
Liquidity is poor
```

---

# 32. OPTION SELLING RULE

Option selling should be penalized when:

```text
Gap risk is extreme
Gamma risk is extreme
Margin utilization is high
Tail risk is high
Volatility expansion is likely
Liquidity is poor
```

---

# 33. EXPIRY RISK

Options near expiry must receive special treatment.

Risk increases when:

```text
Days to expiry → 0
```

unless the strategy specifically targets expiry behavior.

---

# 34. COMMODITY RISK

Commodity risk should consider:

```text
Global benchmark
USD
Inventory
Supply/Demand
Geopolitical risk
Weather
OPEC decisions
Interest rates
Currency
Volatility
Contract expiry
```

depending on commodity.

---

# 35. GEOPOLITICAL RISK

Create a dedicated geopolitical risk factor.

Inputs may include:

```text
War
Military conflict
Sanctions
Trade restrictions
Oil supply disruption
Shipping disruption
Political instability
Major diplomatic events
```

---

# 36. GEOPOLITICAL RISK LEVEL

```text
NORMAL
ELEVATED
HIGH
SEVERE
CRISIS
```

---

# 37. GEOPOLITICAL IMPACT

The system must estimate impact by asset class.

Example:

```text
Oil:
High sensitivity

Gold:
Potential positive sensitivity

Airlines:
Potential negative sensitivity

Banks:
Variable sensitivity
```

The model must not assume the same effect across all assets.

---

# 38. GLOBAL MARKET RISK

Evaluate:

```text
S&P 500
NASDAQ
Dow Jones
European indices
Asian indices
Nikkei
Hang Seng
Shanghai
US Treasury yields
DXY
VIX
```

where relevant.

---

# 39. FII RISK

Evaluate:

```text
FII Net Buying
FII Net Selling
FII Futures Position
FII Options Position
FII Sector Allocation
```

where reliable data is available.

---

# 40. DII RISK

Evaluate:

```text
DII Net Buying
DII Net Selling
Mutual Fund Flows
Insurance Flows
Institutional Allocation
```

---

# 41. SMART MONEY RISK

The system must include institutional activity.

Consider:

```text
Bulk Deals
Block Deals
Promoter Buying
Promoter Selling
Insider Transactions
Mutual Fund Holdings
FII Holdings
DII Holdings
Institutional Ownership Changes
```

---

# 42. BIG INVESTOR DIRECTION

Create a Smart Money Direction:

```text
STRONG_ACCUMULATION
ACCUMULATION
NEUTRAL
DISTRIBUTION
STRONG_DISTRIBUTION
```

---

# 43. SMART MONEY CONFLICT

Example:

```text
Technical:
BUY

Fundamental:
BUY

Smart Money:
STRONG DISTRIBUTION
```

Risk should increase.

The system may produce:

```text
BUY_SMALL
```

or:

```text
NO_TRADE
```

depending on severity.

---

# 44. PORTFOLIO RISK

The Risk Engine must examine existing positions before allowing a new trade.

Consider:

```text
Total Exposure
Sector Exposure
Instrument Exposure
Directional Exposure
Correlation
Margin
Maximum Loss
Portfolio Volatility
```

---

# 45. MAXIMUM PORTFOLIO RISK

Default:

```text
Maximum capital at risk per trade:
1%
```

Configurable:

```text
0.25%
0.50%
1.00%
1.50%
2.00%
```

---

# 46. MAXIMUM DAILY LOSS

Default:

```text
2%
```

If portfolio loss exceeds this:

```text
STOP_NEW_TRADES
```

for the configured period.

---

# 47. MAXIMUM WEEKLY LOSS

Support:

```text
Maximum Weekly Loss
```

---

# 48. MAXIMUM MONTHLY LOSS

Support:

```text
Maximum Monthly Loss
```

---

# 49. MAXIMUM DRAWDOWN

Example:

```text
0–5%:
Normal

5–10%:
Reduce risk

10–15%:
Defensive

>15%:
Stop new high-risk trades
```

All thresholds configurable.

---

# 50. POSITION RISK

For every trade:

```text
Position Risk =
Entry Price - Stop Loss
× Quantity
```

For short trades:

```text
Stop Loss - Entry Price
× Quantity
```

---

# 51. PORTFOLIO RISK

After adding a trade:

```text
Portfolio Risk After Trade
```

must be recalculated.

---

# 52. POSITION SIZE FORMULA

Default:

```text
Risk Capital =
Portfolio Value × Risk %
```

Then:

```text
Position Size =
Risk Capital / Risk Per Unit
```

Example:

```text
Portfolio:
₹10,00,000

Risk:
1%

Risk Capital:
₹10,000

Entry:
₹500

Stop:
₹450

Risk/share:
₹50

Quantity:
200
```

---

# 53. POSITION SIZE ADJUSTMENT

Final position size must be adjusted for:

```text
Volatility
Liquidity
Portfolio Exposure
Correlation
Event Risk
Model Confidence
Market Regime
```

---

# 54. CONFIDENCE ADJUSTMENT

High confidence may allow normal position size.

Lower confidence should reduce position size.

Example:

```text
Confidence ≥ 85:
100%

70–84:
75%

60–69:
50%

<60:
0%
```

These values must be configurable.

---

# 55. RISK-REWARD FILTER

Default minimum:

```text
Risk/Reward >= 1.5
```

Preferred:

```text
Risk/Reward >= 2.0
```

If below configured minimum:

```text
NO_TRADE
```

unless explicitly allowed by strategy.

---

# 56. EXPECTED VALUE FILTER

A trade should only be actionable if expected value is positive after estimated costs.

Example:

```text
Expected Profit
-
Expected Loss
-
Transaction Costs
>
0
```

---

# 57. EXPECTED RETURN

Estimate:

```text
Expected Return =
Probability of Positive Outcome × Expected Gain
-
Probability of Negative Outcome × Expected Loss
```

Probabilities must be model-derived and calibrated.

Do NOT simply use:

```text
Confidence = Probability
```

unless validated.

---

# 58. TRANSACTION COST FILTER

If expected edge is smaller than:

```text
Transaction Costs + Slippage
```

then:

```text
NO_TRADE
```

---

# 59. CORRELATION RISK

Before adding a position:

```text
Calculate correlation with existing positions.
```

---

# 60. HIGH CORRELATION RULE

If the new position is highly correlated with existing positions:

```text
Reduce position size
```

or:

```text
Reject trade
```

depending on portfolio limits.

---

# 61. SECTOR CONCENTRATION

Default example:

```text
Maximum sector exposure:
30%
```

Configurable.

---

# 62. SINGLE STOCK CONCENTRATION

Default example:

```text
Maximum single-stock allocation:
10%
```

Configurable.

---

# 63. ASSET CLASS ALLOCATION

Portfolio-level limits should support:

```text
Equity
Futures
Options
Commodities
Cash
```

---

# 64. DERIVATIVE EXPOSURE

Derivatives must be evaluated using:

```text
Notional Exposure
Margin Exposure
Maximum Loss
Potential Loss Under Stress
```

not merely premium paid.

---

# 65. STRESS LOSS

For every derivative position calculate stress scenarios.

Examples:

```text
Underlying:
-2%
-5%
-10%

Volatility:
+10%
+20%

Gap:
-5%
```

The exact scenarios must be configurable.

---

# 66. TAIL RISK

The system must identify trades where:

```text
Normal-case risk appears low
but extreme-case loss is very high.
```

Such trades should receive a tail-risk penalty.

---

# 67. BLACK SWAN PROTECTION

The system cannot predict black swan events.

Instead it must test:

```text
What happens if the market suddenly moves against the position?
```

---

# 68. MAXIMUM LOSS

Every actionable trade must have:

```text
Estimated Maximum Planned Loss
```

For strategies with theoretically unlimited loss, the Risk Engine must explicitly state:

```text
UNLIMITED / EXTREME TAIL RISK
```

unless hedged.

---

# 69. HEDGED STRATEGIES

For spreads and multi-leg options:

Calculate:

```text
Maximum Loss
Maximum Profit
Breakeven
Net Greeks
Margin
```

---

# 70. OPTION STRATEGY RISK

Examples:

```text
Bull Call Spread
Bear Put Spread
Covered Call
Protective Put
Iron Condor
Straddle
Strangle
```

Each strategy must have its own risk profile.

---

# 71. HEDGING

The Risk Engine may recommend:

```text
HEDGE
REDUCE
EXIT
```

when portfolio risk becomes excessive.

---

# 72. STOP LOSS

Every short-term actionable trade should have a risk-defined exit unless the strategy explicitly defines another mechanism.

---

# 73. STOP LOSS METHODS

Support:

```text
Fixed Percentage
ATR Based
Support/Resistance
Volatility Based
Structure Based
Option Premium Based
Time Based
```

---

# 74. ATR STOP

Example:

```text
Long Entry:
₹500

ATR:
₹20

ATR multiplier:
2

Stop:
₹460
```

---

# 75. STOP LOSS VALIDATION

The stop must not be so tight that normal market noise is likely to trigger it immediately.

---

# 76. TARGET CALCULATION

Targets may use:

```text
Resistance
Support
ATR
Risk/Reward
Momentum
Volatility
Historical Price Distribution
```

---

# 77. MULTIPLE TARGETS

Support:

```text
Target 1
Target 2
Target 3
```

---

# 78. PARTIAL PROFIT

Configurable example:

```text
Target 1:
Exit 30%

Target 2:
Exit 30%

Target 3:
Exit 40%
```

---

# 79. TRAILING STOP

After Target 1:

```text
Move stop to breakeven
```

or:

```text
Use trailing ATR
```

depending on strategy.

---

# 80. TIME STOP

If the expected move does not occur within a configured period:

```text
EXIT
```

or:

```text
REDUCE
```

---

# 81. SIGNAL INVALIDATION

If the underlying conditions that generated the signal disappear:

```text
EXIT
```

or:

```text
REDUCE
```

---

# 82. SIGNAL REVERSAL

Example:

```text
BUY
```

later becomes:

```text
STRONG SELL
```

The Risk Engine must evaluate whether to:

```text
EXIT
REVERSE
REDUCE
```

---

# 83. MARKET HALT

If trading is halted:

```text
No new simulated/live order
```

---

# 84. CIRCUIT LIMIT

The system must account for:

```text
Upper Circuit
Lower Circuit
Price Bands
```

where applicable.

---

# 85. GAP THROUGH STOP

If price gaps beyond stop:

```text
Actual execution
```

must reflect realistic execution rather than assuming the stop price.

---

# 86. RISK SCORE COMPONENTS

Store every component separately:

```text
market_risk
volatility_risk
liquidity_risk
event_risk
portfolio_risk
correlation_risk
execution_risk
data_quality_risk
model_risk
```

---

# 87. RISK EXPLANATION

Every recommendation must explain WHY.

Example:

```text
BUY_SMALL

Reasons:

• Strong momentum
• Positive institutional accumulation
• Sector trend positive
• Market trend positive

Risk adjustments:

• Volatility elevated
• Earnings in 2 days
• Existing portfolio already has banking exposure

Position size reduced by 40%.
```

---

# 88. NO TRADE EXPLANATION

Example:

```text
NO_TRADE

Reasons:

• Signal score = 78
• Risk/Reward = 1.2
• Implied volatility extremely high
• Major event within 24 hours
• Portfolio sector exposure already exceeds limit
```

---

# 89. RISK SCORE SHOULD NEVER BE A BLACK BOX

The UI must expose the major components.

Example:

```text
Overall Risk: 63/100

Market:
42

Volatility:
78

Liquidity:
21

Event:
80

Portfolio:
55
```

---

# 90. RISK ADJUSTED SIGNAL

Final decision should combine:

```text
Signal Quality
+
Expected Return
+
Risk
+
Portfolio Context
```

---

# 91. FINAL DECISION LOGIC

Conceptually:

```text
IF
Signal Quality < Minimum
THEN
NO_TRADE

ELSE IF
Risk > Maximum
THEN
NO_TRADE

ELSE IF
Expected Value <= 0
THEN
NO_TRADE

ELSE IF
Risk/Reward < Minimum
THEN
NO_TRADE

ELSE
Calculate Position Size
```

---

# 92. POSITION SIZE REDUCTION

Position size should be reduced when:

```text
Volatility ↑
Event Risk ↑
Correlation ↑
Portfolio Exposure ↑
Liquidity ↓
Confidence ↓
Market Regime Risk ↑
```

---

# 93. POSITION SIZE MULTIPLIERS

Example framework:

```text
Base Size:
100%

High Volatility:
75%

Very High Volatility:
50%

High Event Risk:
50%

Low Liquidity:
50%

High Correlation:
50%

Multiple Risk Factors:
25%
```

Multipliers may be combined but must have a minimum floor.

---

# 94. POSITION SIZE FLOOR

If calculated position size becomes too small to be economically meaningful:

```text
NO_TRADE
```

---

# 95. PORTFOLIO RISK BUDGET

The system should maintain:

```text
Total Portfolio Risk Budget
```

Example:

```text
Portfolio:
₹10,00,000

Maximum total risk:
5%

Risk budget:
₹50,000
```

---

# 96. RISK BUDGET ALLOCATION

Example:

```text
Trade A:
₹10,000

Trade B:
₹8,000

Trade C:
₹5,000

Remaining:
₹27,000
```

New trades cannot exceed the remaining budget.

---

# 97. CORRELATED RISK BUDGET

Correlated trades should share a risk budget.

Example:

```text
Bank Nifty
HDFC Bank
ICICI Bank
Axis Bank
```

should not be treated as four completely independent risks.

---

# 98. PORTFOLIO HEAT

Calculate:

```text
Portfolio Heat =
Sum of Maximum Loss Across Open Positions
/
Portfolio Value
```

---

# 99. PORTFOLIO HEAT LIMIT

Default:

```text
5%
```

Configurable.

---

# 100. LEVERAGE

The Risk Engine must track:

```text
Gross Exposure
Net Exposure
Leverage
Margin Utilization
```

---

# 101. MARGIN UTILIZATION

Example:

```text
Margin Used:
₹3,00,000

Available Capital:
₹10,00,000
```

Calculate:

```text
Margin Utilization = 30%
```

---

# 102. MAXIMUM MARGIN UTILIZATION

Default:

```text
70%
```

If exceeded:

```text
No additional high-risk positions
```

---

# 103. LIQUIDATION RISK

For leveraged positions, estimate:

```text
Distance to Margin Call
```

and:

```text
Distance to Forced Liquidation
```

where applicable.

---

# 104. CAPITAL PRESERVATION MODE

If portfolio drawdown exceeds configured threshold:

```text
NORMAL
→ DEFENSIVE
→ CAPITAL_PRESERVATION
```

---

# 105. CAPITAL PRESERVATION MODE

In this mode:

```text
Reduce position sizes
Reject speculative trades
Prefer high-liquidity instruments
Require stronger signals
```

---

# 106. CRISIS MODE

If market risk reaches extreme levels:

```text
CRISIS_MODE
```

Actions may include:

```text
No new trades
Reduce exposure
Increase cash
Hedge portfolio
```

---

# 107. MODEL DISAGREEMENT

If:

```text
Technical = BUY
Fundamental = SELL
Smart Money = SELL
Macro = NEUTRAL
```

then:

```text
Confidence should decrease.
```

---

# 108. FACTOR CONFLICT

The system must calculate:

```text
Factor Agreement Score
```

Example:

```text
Technical:
+80

Fundamental:
+70

Smart Money:
-65

Macro:
+20
```

This represents conflicting evidence.

---

# 109. FACTOR AGREEMENT

Possible values:

```text
STRONG_ALIGNMENT
ALIGNMENT
MIXED
CONFLICT
STRONG_CONFLICT
```

---

# 110. RISK PENALTY FOR CONFLICT

Strong factor conflict should:

```text
Increase Risk
Reduce Position Size
```

or:

```text
NO_TRADE
```

---

# 111. DATA QUALITY RISK

If critical data is missing:

```text
Risk ↑
```

If data becomes stale:

```text
Risk ↑
```

If critical data is unavailable:

```text
NO_TRADE
```

---

# 112. MODEL RELIABILITY

Use the historical reliability of the relevant strategy/model.

Example:

```text
Model Reliability:
HIGH
```

allows normal sizing.

```text
LOW
```

reduces sizing or prevents action.

---

# 113. STRATEGY-SPECIFIC RISK

Each strategy must define its own:

```text
Maximum Risk
Minimum Risk/Reward
Maximum Holding Period
Maximum Position Size
Stop Method
Target Method
Liquidity Requirement
```

---

# 114. EQUITY RISK PROFILE

Equity risk model should emphasize:

```text
Volatility
Liquidity
Fundamentals
Earnings
Market Regime
Sector
Smart Money
```

---

# 115. FUTURES RISK PROFILE

Futures risk model should emphasize:

```text
Leverage
Margin
Volatility
Gap Risk
Expiry
Liquidity
Basis Risk
```

---

# 116. OPTIONS RISK PROFILE

Options risk model should emphasize:

```text
IV
Greeks
Theta
Gamma
Expiry
Liquidity
Spread
Underlying Volatility
Gap Risk
```

---

# 117. COMMODITY RISK PROFILE

Commodity risk model should emphasize:

```text
Global Price
USD
Supply/Demand
Inventory
Geopolitical Risk
Weather
Volatility
Expiry
```

---

# 118. RISK LIMIT CONFIGURATION

All limits must be configurable.

Store in:

```text
risk_configuration
```

Do not hard-code limits throughout application code.

---

# 119. DEFAULT CONFIGURATION

Initial defaults:

```text
Risk per trade:
1%

Maximum portfolio heat:
5%

Maximum single stock allocation:
10%

Maximum sector allocation:
30%

Maximum margin utilization:
70%

Minimum risk/reward:
1.5

Preferred risk/reward:
2.0

Maximum daily loss:
2%

Maximum weekly loss:
5%

Maximum monthly loss:
8%
```

These are default research parameters, not universal investment rules.

---

# 120. RISK CONFIGURATION VERSIONING

Every recommendation and backtest must store:

```text
risk_model_version
risk_configuration_version
```

---

# 121. RISK DECISION AUDIT

Every decision must be logged.

Example:

```text
Timestamp:
2026-08-30 10:30

Instrument:
XYZ

Signal:
BUY

Signal Score:
82

Risk Score:
67

Decision:
BUY_SMALL

Reason:
High volatility + elevated event risk
```

---

# 122. RISK DECISION REPRODUCIBILITY

Given the same:

```text
Data
Signal
Portfolio
Risk Configuration
Model Version
```

the Risk Engine should produce the same result.

---

# 123. BACKTEST INTEGRATION

The Risk Engine must be used inside the Backtesting Engine.

Do NOT create a simplified risk model for historical testing.

---

# 124. LIVE INTEGRATION

The same Risk Engine should be used for:

```text
Backtesting
Paper Trading
Live Research
```

---

# 125. RECOMMENDATION LAYER

The Risk Engine output should feed the Recommendation Engine.

Example:

```text
Signal:
STRONG BUY

Risk:
LOW

Final:
STRONG BUY
```

Another:

```text
Signal:
STRONG BUY

Risk:
VERY HIGH

Final:
NO TRADE
```

---

# 126. RECOMMENDATION QUALITY

The final recommendation must show:

```text
Direction
Entry Zone
Stop Loss
Target
Risk/Reward
Position Size
Maximum Planned Loss
Holding Period
Risk Level
Confidence
Reasons
Warnings
```

---

# 127. NO GUARANTEES

The Risk Engine must NEVER output:

```text
Guaranteed Profit
Guaranteed Return
Sure Shot
100% Safe
Certain Winner
```

---

# 128. UNCERTAINTY

Every recommendation should communicate uncertainty.

Example:

```text
Confidence:
78/100

Risk:
Moderate

Historical Model Reliability:
Good

Recommendation:
BUY_SMALL
```

---

# 129. RISK ENGINE API

Provide:

```text
calculateRisk(signal, portfolio, marketState)
```

```text
calculatePositionSize(signal, riskState, portfolio)
```

```text
calculateStopLoss(signal, marketState)
```

```text
calculateTargets(signal, marketState)
```

```text
validateTrade(signal, riskState)
```

```text
calculatePortfolioRisk(portfolio)
```

```text
calculateStressRisk(position, scenarios)
```

---

# 130. EXAMPLE OUTPUT

```text
Instrument:
ABC

Signal:
BUY

Signal Score:
84

Risk Score:
38

Risk Level:
MODERATE

Decision:
BUY

Entry:
₹1,020–₹1,035

Stop:
₹985

Target 1:
₹1,090

Target 2:
₹1,140

Risk/Reward:
1 : 2.1

Portfolio Risk:
0.82%

Position Size:
180 shares

Maximum Planned Loss:
₹6,300

Warnings:
• Earnings in 5 days

Positive Factors:
• Strong momentum
• Positive institutional accumulation
• Sector strength
• Market regime supportive
```

---

# 131. EXAMPLE NO-TRADE

```text
Instrument:
XYZ

Signal:
STRONG BUY

Signal Score:
91

Risk Score:
82

Risk Level:
EXTREME

Decision:
NO_TRADE

Reasons:

• Earnings announcement imminent
• Extreme implied volatility
• Poor liquidity
• Portfolio already highly exposed to sector
• Risk/reward below minimum
```

---

# 132. RISK ENGINE DASHBOARD

The desktop UI should display:

```text
Portfolio Risk
Portfolio Heat
Margin Utilization
Open Positions
Sector Exposure
Asset Class Exposure
Largest Risk
Largest Position
Drawdown
Daily P&L
Risk Regime
Market Regime
```

---

# 133. TRADE CARD

Every actionable opportunity should display:

```text
┌─────────────────────────────┐
│ ABC                         │
│ BUY                         │
│ Score: 84                   │
│ Risk: MODERATE              │
│                             │
│ Entry: ₹1020–₹1035          │
│ Stop: ₹985                  │
│ Target: ₹1090               │
│ R:R: 1:2.1                  │
│                             │
│ Position: 180 shares        │
│ Max Loss: ₹6,300            │
│                             │
│ Confidence: 82              │
└─────────────────────────────┘
```

---

# 134. RISK ALERTS

Generate alerts for:

```text
High Portfolio Risk
High Drawdown
High Margin
Extreme Volatility
Liquidity Deterioration
Major Event
Geopolitical Shock
Model Failure
Data Failure
Signal Conflict
```

---

# 135. AUTOMATIC INTERNET RESEARCH

When internet connectivity is available, the system should update:

```text
Market Data
News
FII/DII
Institutional Activity
Global Markets
Macro Events
Geopolitical Events
Corporate Events
Options Data
Commodity Data
```

The Risk Engine must use the latest valid information.

---

# 136. DATA FRESHNESS

Every risk input should have:

```text
timestamp
source
freshness
```

---

# 137. STALE DATA RULE

If critical data exceeds its configured freshness threshold:

```text
Risk ↑
```

If the data is essential:

```text
NO_TRADE
```

---

# 138. SYSTEM FAILURE

If:

```text
Market Data unavailable
```

or:

```text
Critical data source unavailable
```

the system must not generate a confident actionable recommendation.

Return:

```text
NO_TRADE
DATA_UNAVAILABLE
```

---

# 139. FAIL-SAFE DESIGN

Default behavior on uncertainty:

```text
REDUCE RISK
```

not:

```text
INCREASE RISK
```

---

# 140. FINAL DECISION MATRIX

Conceptual framework:

```text
Signal       Risk       Decision

Strong Buy   Low        STRONG_BUY
Strong Buy   Moderate   BUY
Strong Buy   High       BUY_SMALL
Strong Buy   Extreme    NO_TRADE

Buy          Low        BUY
Buy          Moderate   BUY_SMALL
Buy          High       WAIT
Buy          Extreme    NO_TRADE

Hold         Any        HOLD

Sell         Low        SELL
Sell         High       SELL_SMALL / WAIT
```

The final mapping must be configurable.

---

# 141. RISK ENGINE PRIORITY

When components disagree:

```text
Capital Protection
        >
Risk Limits
        >
Data Quality
        >
Execution Feasibility
        >
Signal Strength
```

A strong signal must never override a hard risk limit.

---

# 142. HARD RISK LIMITS

These conditions must override the signal:

```text
Maximum portfolio heat exceeded
Maximum margin exceeded
Critical data unavailable
Extreme liquidity problem
Undefined maximum loss for risky strategy
Trading halted
Instrument unavailable
Risk/reward below hard minimum
```

---

# 143. SOFT RISK FACTORS

These may reduce position size:

```text
Moderate volatility
Moderate event risk
Factor disagreement
Moderate correlation
Lower confidence
Market uncertainty
```

---

# 144. RISK ENGINE PRINCIPLE

The Risk Engine should answer:

```text
"Even if our market prediction is correct,
can we afford to be wrong?"
```

---

# 145. DEFINITION OF DONE

The Risk Engine is complete only when it can:

```text
✓ Calculate trade risk
✓ Calculate portfolio risk
✓ Calculate position size
✓ Calculate stop loss
✓ Calculate targets
✓ Calculate risk/reward
✓ Consider volatility
✓ Consider liquidity
✓ Consider market regime
✓ Consider sector exposure
✓ Consider correlation
✓ Consider FII/DII
✓ Consider Smart Money
✓ Consider global markets
✓ Consider geopolitical risk
✓ Consider event risk
✓ Consider options Greeks
✓ Consider commodity-specific risk
✓ Consider margin
✓ Consider leverage
✓ Calculate stress loss
✓ Enforce portfolio limits
✓ Enforce daily loss limits
✓ Enforce drawdown controls
✓ Detect data quality problems
✓ Detect stale data
✓ Produce explainable decisions
✓ Produce NO_TRADE decisions
✓ Work with backtesting
✓ Work with paper trading
✓ Work with live research
✓ Version every risk decision
✓ Maintain an audit trail
```

---

# 146. FINAL ARCHITECTURE

The final decision pipeline must be:

```text
                    MARKET DATA
                         │
                         ▼
                 FEATURE ENGINE
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
    TECHNICAL       FUNDAMENTAL       SMART MONEY
        │                │                │
        └────────────────┼────────────────┘
                         ▼
                    QUANT MODEL
                         │
                         ▼
                   SIGNAL ENGINE
                         │
                         ▼
                    RISK ENGINE
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
      POSITION        STOP/TARGET    PORTFOLIO
       SIZE                           RISK
          │              │              │
          └──────────────┼──────────────┘
                         ▼
                FINAL RECOMMENDATION
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
          BUY/SELL    WAIT      NO TRADE
```

---

# 147. FINAL PRINCIPLE

The application is not designed to predict the market with certainty.

It is designed to:

```text
FIND OPPORTUNITIES
        +
MEASURE PROBABILITY
        +
MEASURE RISK
        +
CONTROL POSITION SIZE
        +
PROTECT CAPITAL
        +
LEARN FROM HISTORICAL RESULTS
```

The system must always be capable of saying:

```text
"I have a bullish signal,
but the risk is too high,
therefore NO TRADE."
```

That behavior is a core feature—not a failure.
