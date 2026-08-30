# AI MARKET INTELLIGENCE

# PORTFOLIO ENGINE SPECIFICATION

**Document Version:** 1.0
**Status:** Core Portfolio Intelligence Specification
**Market:** Indian Markets
**Asset Classes:** Equity, Futures, Options, Commodities

---

# 1. PURPOSE

The Portfolio Engine manages and analyzes the user's investment and trading portfolio.

Its purpose is to answer:

> "Given what I already own, what should I buy, sell, reduce, hold, or avoid?"

The Portfolio Engine must work together with:

```text
DATA ENGINE
QUANT MODEL
SIGNAL ENGINE
RISK ENGINE
RECOMMENDATION ENGINE
BACKTESTING ENGINE
ALERT ENGINE
```

The Portfolio Engine must NOT generate recommendations independently.

It provides portfolio context to the Recommendation Engine.

---

# 2. CORE OBJECTIVES

The Portfolio Engine must:

```text
✓ Track holdings
✓ Track positions
✓ Track average price
✓ Track quantity
✓ Calculate invested capital
✓ Calculate current value
✓ Calculate realized P&L
✓ Calculate unrealized P&L
✓ Calculate total P&L
✓ Calculate portfolio return
✓ Calculate exposure
✓ Calculate sector concentration
✓ Calculate asset-class concentration
✓ Calculate single-stock concentration
✓ Calculate FII/DII/institutional exposure
✓ Calculate correlation
✓ Calculate portfolio risk
✓ Calculate portfolio volatility
✓ Detect concentration risk
✓ Detect overexposure
✓ Detect correlated positions
✓ Calculate portfolio-level drawdown
✓ Recommend portfolio actions
✓ Support equity
✓ Support futures
✓ Support options
✓ Support commodities
✓ Maintain portfolio history
```

---

# 3. PORTFOLIO PRINCIPLE

A good stock does not automatically mean a good portfolio addition.

The engine must distinguish:

```text
GOOD STOCK
```

from:

```text
GOOD PORTFOLIO ADDITION
```

Example:

```text
Stock Score:
92

Portfolio Exposure to Same Sector:
32%

Final Recommendation:
BUY_SMALL
```

instead of automatically:

```text
STRONG_BUY
```

---

# 4. PORTFOLIO DATA MODEL

Each portfolio must have:

```text
portfolio_id
portfolio_name
base_currency
created_at
updated_at
total_capital
available_cash
invested_capital
current_value
realized_pnl
unrealized_pnl
total_pnl
portfolio_return
```

---

# 5. POSITION MODEL

Each position must contain:

```text
position_id
portfolio_id
instrument_id
symbol
exchange
asset_class
quantity
average_price
current_price
invested_value
current_value
realized_pnl
unrealized_pnl
total_pnl
percentage_return
weight
sector
industry
market_cap_category
entry_date
last_updated
```

---

# 6. ASSET CLASSES

Support:

```text
EQUITY
ETF
FUTURES
OPTIONS
COMMODITY
CASH
```

Future:

```text
BONDS
MUTUAL_FUNDS
```

may be added.

---

# 7. TRANSACTION MODEL

Store every transaction.

```text
transaction_id
portfolio_id
instrument_id
transaction_type
quantity
price
gross_value
brokerage
taxes
fees
net_value
timestamp
order_reference
```

Transaction types:

```text
BUY
SELL
SHORT
COVER
EXERCISE
ASSIGNMENT
EXPIRY
DIVIDEND
BONUS
SPLIT
DEPOSIT
WITHDRAWAL
```

---

# 8. COST BASIS

Calculate:

```text
Average Cost =
Total Acquisition Cost / Total Quantity
```

Transaction charges must be included where appropriate.

---

# 9. INVESTED CAPITAL

For long positions:

```text
Invested Capital =
Quantity × Average Cost
```

For derivatives, distinguish:

```text
Contract Notional
```

from:

```text
Capital/Margin Used
```

---

# 10. CURRENT VALUE

For equity:

```text
Current Value =
Quantity × Current Price
```

For derivatives:

```text
Current Market Value =
Position Quantity × Current Contract Value
```

The system must not confuse derivative premium/margin with underlying notional value.

---

# 11. UNREALIZED P&L

For long equity:

```text
Unrealized P&L =
(Current Price - Average Price) × Quantity
```

For short positions:

```text
Unrealized P&L =
(Entry Price - Current Price) × Quantity
```

---

# 12. REALIZED P&L

When a position is partially or completely closed:

```text
Realized P&L =
Exit Value - Cost Basis
```

with applicable transaction costs included.

---

# 13. TOTAL P&L

```text
Total P&L =
Realized P&L
+
Unrealized P&L
+
Income
-
Costs
```

---

# 14. PORTFOLIO RETURN

Calculate both:

```text
Simple Return
```

and:

```text
Time-Weighted Return
```

Where cash flows make simple return misleading.

---

# 15. MONEY-WEIGHTED RETURN

Support:

```text
XIRR / Money-Weighted Return
```

for portfolios with irregular deposits and withdrawals.

---

# 16. PORTFOLIO WEIGHT

For each position:

```text
Position Weight =
Position Current Value /
Total Portfolio Current Value
```

---

# 17. CONCENTRATION

Calculate concentration at:

```text
Stock
Sector
Industry
Asset Class
Market Cap
Theme
Geography
```

where applicable.

---

# 18. SINGLE STOCK CONCENTRATION

Example:

```text
RELIANCE:
28%

HDFC BANK:
18%

INFY:
7%
```

The engine must flag unusually high concentration.

Default thresholds must be configurable.

Example:

```text
<10%:
LOW

10–20%:
MODERATE

20–30%:
HIGH

>30%:
VERY_HIGH
```

These are risk-management defaults, not universal investment rules.

---

# 19. SECTOR CONCENTRATION

Example:

```text
BANKING:
35%

IT:
20%

ENERGY:
18%

PHARMA:
10%

OTHER:
17%
```

The engine must detect:

```text
SECTOR_OVEREXPOSURE
```

---

# 20. CORRELATED EXPOSURE

Different stocks may represent the same underlying risk.

Example:

```text
HDFC BANK
ICICI BANK
AXIS BANK
KOTAK BANK
```

Although they are separate securities, the portfolio has significant banking exposure.

The engine must calculate:

```text
Pairwise Correlation
Sector Correlation
Factor Correlation
```

---

# 21. HIDDEN CONCENTRATION

Detect:

```text
Stock A:
10%

Stock B:
8%

Stock C:
7%
```

If all are strongly exposed to the same factor:

```text
Total Factor Exposure:
25%
```

Generate:

```text
HIDDEN_CONCENTRATION
```

---

# 22. FACTOR EXPOSURE

Track exposure to:

```text
Momentum
Value
Growth
Quality
Volatility
Interest Rates
USD
Oil
Gold
Banks
IT
Commodities
Global Growth
Domestic Growth
```

---

# 23. MARKET CAP EXPOSURE

Classify holdings:

```text
LARGE_CAP
MID_CAP
SMALL_CAP
MICRO_CAP
```

Calculate portfolio allocation.

---

# 24. LIQUIDITY RISK

For every holding calculate:

```text
Average Daily Volume
Position Size
Percentage of Average Daily Volume
Bid/Ask Spread
Liquidity Score
```

---

# 25. EXIT LIQUIDITY

Estimate:

```text
Days to Liquidate
```

using configurable participation assumptions.

Example:

```text
Position:
₹10 crore

Average Daily Traded Value:
₹2 crore

Expected Participation:
10%

Estimated Liquidation Time:
~50 trading days
```

This must trigger a liquidity risk warning.

---

# 26. PORTFOLIO VOLATILITY

Calculate:

```text
Daily Volatility
Weekly Volatility
Monthly Volatility
Annualized Volatility
```

---

# 27. PORTFOLIO BETA

Calculate:

```text
Portfolio Beta vs NIFTY 50
```

and optionally:

```text
Portfolio Beta vs relevant benchmark
```

---

# 28. PORTFOLIO DRAWDOWN

Calculate:

```text
Peak Portfolio Value
Current Portfolio Value
Maximum Drawdown
Current Drawdown
```

---

# 29. DRAWDOWN ALERT

Example:

```text
Portfolio Drawdown:
-12%

Risk Status:
ELEVATED
```

The Risk Engine should be notified.

---

# 30. VALUE AT RISK

Support:

```text
Historical VaR
Parametric VaR
Monte Carlo VaR
```

where sufficient data exists.

Default confidence:

```text
95%
99%
```

---

# 31. EXPECTED SHORTFALL

Support:

```text
Conditional VaR
Expected Shortfall
```

to estimate losses beyond the VaR threshold.

---

# 32. STRESS TESTING

The Portfolio Engine must support scenario analysis.

Examples:

```text
NIFTY -5%
NIFTY -10%
BANK NIFTY -10%
USD +5%
Oil +15%
Gold +10%
Interest Rates +1%
Global Market Crash
India VIX +50%
```

---

# 33. GEOPOLITICAL STRESS

Support scenarios:

```text
Major War
Oil Supply Shock
Trade Sanctions
Global Recession
Shipping Disruption
India-Pakistan Conflict
US-China Trade Escalation
Major Central Bank Shock
```

The system should estimate portfolio impact based on available factor relationships.

---

# 34. STRESS TEST OUTPUT

Example:

```text
SCENARIO:
Oil +15%

Estimated Portfolio Impact:
-3.8%

Highest Risk Holdings:
Stock A
Stock B

Potential Beneficiaries:
Stock C
Gold
```

---

# 35. FII/DII EXPOSURE

For each stock track:

```text
FII Ownership
DII Ownership
Mutual Fund Ownership
Institutional Ownership
Promoter Ownership
```

---

# 36. SMART MONEY PORTFOLIO EXPOSURE

Calculate whether the user's portfolio is aligned with institutional flows.

Example:

```text
Portfolio Banking Exposure:
30%

Institutional Banking Trend:
Accumulation

Alignment:
POSITIVE
```

---

# 37. SMART MONEY DIVERGENCE

Example:

```text
User Portfolio:
Heavy Banking Exposure

FII:
Reducing Banking Exposure

DII:
Neutral

Risk:
ELEVATED
```

---

# 38. PORTFOLIO VS MARKET

Compare portfolio against:

```text
NIFTY 50
NIFTY 500
Relevant benchmark
```

Metrics:

```text
Return
Volatility
Beta
Alpha
Drawdown
Sharpe
Sortino
```

---

# 39. ALPHA

Calculate:

```text
Portfolio Return
-
Expected Return based on benchmark/factor exposure
```

The calculation method must be documented and reproducible.

---

# 40. SHARPE RATIO

Calculate:

```text
Sharpe =
(Return - Risk Free Rate) /
Portfolio Volatility
```

The risk-free rate must come from a configured data source.

---

# 41. SORTINO RATIO

Calculate using downside deviation instead of total volatility.

---

# 42. PROFIT FACTOR

For trading portfolios:

```text
Profit Factor =
Gross Profit / Gross Loss
```

---

# 43. WIN RATE

Calculate:

```text
Winning Trades /
Total Closed Trades
```

Do not use win rate alone to evaluate performance.

---

# 44. EXPECTANCY

Calculate:

```text
Expectancy =
(Win Probability × Average Win)
-
(Loss Probability × Average Loss)
```

---

# 45. PORTFOLIO RISK SCORE

Normalize:

```text
0–100
```

Example:

```text
0–20:
VERY_LOW

21–40:
LOW

41–60:
MODERATE

61–80:
HIGH

81–100:
EXTREME
```

---

# 46. RISK SCORE INPUTS

Include:

```text
Concentration
Volatility
Beta
Drawdown
Liquidity
Leverage
Derivative Exposure
Correlation
Event Risk
Sector Risk
Geopolitical Risk
```

---

# 47. LEVERAGE

Track:

```text
Gross Exposure
Net Exposure
Margin Used
Available Margin
Leverage Ratio
```

---

# 48. GROSS EXPOSURE

```text
Gross Exposure =
Long Exposure + Absolute(Short Exposure)
```

---

# 49. NET EXPOSURE

```text
Net Exposure =
Long Exposure - Short Exposure
```

---

# 50. DERIVATIVE EXPOSURE

For futures/options calculate:

```text
Underlying Notional Exposure
Delta-Adjusted Exposure
Margin Requirement
Maximum Loss
Potential Loss
```

---

# 51. OPTIONS PORTFOLIO

Track Greeks:

```text
Delta
Gamma
Theta
Vega
Rho
```

at:

```text
Position Level
Underlying Level
Portfolio Level
```

---

# 52. PORTFOLIO DELTA

Calculate total delta-adjusted exposure.

Example:

```text
Portfolio Delta:
+₹8,50,000 equivalent NIFTY exposure
```

---

# 53. PORTFOLIO VEGA

Calculate sensitivity to implied volatility.

Example:

```text
Portfolio Vega:
+₹25,000 per 1% IV increase
```

---

# 54. PORTFOLIO THETA

Calculate daily time decay for options.

Example:

```text
Portfolio Theta:
-₹4,500/day
```

---

# 55. COMMODITY EXPOSURE

Track:

```text
Gold
Silver
Crude Oil
Natural Gas
Base Metals
Other supported commodities
```

and their portfolio contribution.

---

# 56. CROSS-ASSET EXPOSURE

Calculate relationships such as:

```text
Equity ↔ Gold
Equity ↔ Oil
Equity ↔ USD
Equity ↔ Bonds
```

where reliable historical data exists.

---

# 57. CASH MANAGEMENT

Track:

```text
Available Cash
Blocked Cash
Margin
Free Margin
Reserved Capital
```

---

# 58. CASH ALLOCATION

Example:

```text
Equity:
60%

Derivatives:
10%

Commodities:
5%

Cash:
25%
```

---

# 59. PORTFOLIO ALLOCATION

Display:

```text
Asset Allocation
Sector Allocation
Market Cap Allocation
Risk Allocation
Geographic/Theme Allocation
```

---

# 60. TARGET ALLOCATION

Allow users to configure:

```text
Target Equity:
70%

Target Cash:
20%

Target Commodities:
10%
```

The system can identify deviations.

---

# 61. REBALANCING

Calculate:

```text
Current Allocation
-
Target Allocation
```

Example:

```text
Target Banking:
15%

Current Banking:
27%

Deviation:
+12%
```

Recommendation:

```text
REDUCE_BANKING_EXPOSURE
```

---

# 62. PORTFOLIO REBALANCING SCORE

Generate:

```text
0–100
```

where higher means greater need for rebalancing.

---

# 63. PORTFOLIO ACTIONS

Supported:

```text
BUY
BUY_SMALL
ACCUMULATE
HOLD
WAIT
REDUCE
SELL
EXIT
REBALANCE
HEDGE
NO_ACTION
```

---

# 64. PORTFOLIO-AWARE RECOMMENDATION

The Recommendation Engine receives:

```text
Stock Signal:
BUY

Stock Score:
88

Risk:
Moderate

Portfolio Sector Exposure:
28%

Target Sector Exposure:
15%
```

Portfolio Engine returns:

```text
Portfolio Adjustment:
REDUCE SECTOR EXPOSURE
```

Final Recommendation Engine output:

```text
BUY_SMALL
```

or:

```text
WAIT
```

depending on configured limits.

---

# 65. NEW STOCK RECOMMENDATION

Before recommending a new position:

```text
CHECK:
1. Existing stock exposure
2. Sector exposure
3. Factor exposure
4. Correlation
5. Liquidity
6. Portfolio risk
7. Cash availability
8. Position size
```

---

# 66. POSITION SIZING

Position size must be determined by the Risk Engine.

Portfolio Engine provides:

```text
Current Portfolio Value
Current Exposure
Available Capital
Existing Risk
Concentration
```

The Risk Engine then determines allowable position size.

---

# 67. MAXIMUM POSITION LIMIT

Configurable:

```text
Maximum Single Stock Weight
Maximum Sector Weight
Maximum Derivative Exposure
Maximum Commodity Exposure
Maximum Portfolio Leverage
```

---

# 68. DEFAULT POSITION LIMITS

Initial defaults:

```text
Single Stock:
20%

Single Sector:
30%

Derivatives:
Configurable

Single Commodity:
20%

Maximum Portfolio Leverage:
1.5x
```

These are configurable safety defaults, not investment advice.

---

# 69. PORTFOLIO RISK OVERRIDE

If adding a position causes:

```text
Portfolio Risk > Maximum Allowed Risk
```

return:

```text
NO_TRADE
```

or:

```text
REDUCE_EXISTING_POSITION_FIRST
```

---

# 70. CORRELATION OVERRIDE

If a new position has very high correlation with existing holdings:

```text
Recommendation:
BUY_SMALL
```

or:

```text
WAIT
```

depending on concentration.

---

# 71. HEDGE RECOMMENDATION

The Portfolio Engine may identify when hedging should be considered.

Example:

```text
Portfolio:
Strongly Long

Market Risk:
Increasing

Recommended:
Consider downside hedge
```

The actual hedge strategy is determined by the Recommendation and Risk Engines.

---

# 72. PORTFOLIO HEDGE

Possible instruments:

```text
NIFTY PUT
BANK NIFTY PUT
INDEX PUT SPREAD
INDEX FUTURES
```

Only recommend instruments that pass liquidity and risk checks.

---

# 73. HEDGE EFFECTIVENESS

Calculate:

```text
Portfolio Beta Before Hedge
Portfolio Beta After Hedge
Expected Loss Before Hedge
Expected Loss After Hedge
Hedge Cost
```

---

# 74. PORTFOLIO SCENARIO ENGINE

Allow users to ask:

```text
"What happens if NIFTY falls 10%?"
```

or:

```text
"What happens if oil rises 20%?"
```

The system calculates estimated portfolio impact.

---

# 75. WHAT-IF ANALYSIS

Support:

```text
BUY ₹1,00,000 OF STOCK A
SELL ₹50,000 OF STOCK B
ADD GOLD 10%
REMOVE BANKING EXPOSURE
ADD NIFTY PUT
```

and calculate estimated portfolio changes.

---

# 76. PORTFOLIO OPTIMIZATION

Future module may support:

```text
Minimum Volatility
Maximum Sharpe
Risk Parity
Target Volatility
Maximum Diversification
```

Do NOT enable automatic optimization without user confirmation.

---

# 77. GOAL-BASED PORTFOLIO

Allow user to configure:

```text
Investment Goal
Target Amount
Current Capital
Monthly Contribution
Investment Horizon
Maximum Acceptable Risk
```

---

# 78. LONG-TERM INVESTMENT MODE

For long-term portfolios emphasize:

```text
Fundamentals
Valuation
Quality
Growth
Cash Flow
Debt
Management
Institutional Ownership
Sector Outlook
```

Short-term noise should receive lower weight.

---

# 79. TRADING PORTFOLIO MODE

For trading portfolios emphasize:

```text
Momentum
Technical Structure
Volatility
Liquidity
Entry
Stop
Target
Risk/Reward
Market Regime
```

---

# 80. PORTFOLIO MODES

Support:

```text
INVESTMENT
SWING_TRADING
INTRADAY
DERIVATIVES
COMMODITY
MIXED
```

---

# 81. PORTFOLIO HEALTH SCORE

Generate:

```text
Portfolio Health Score:
0–100
```

Components:

```text
Diversification
Risk
Liquidity
Performance
Drawdown
Concentration
Leverage
Factor Exposure
```

---

# 82. PORTFOLIO HEALTH OUTPUT

Example:

```text
PORTFOLIO HEALTH

Score:
78/100

Status:
HEALTHY

Strengths:
✓ Good diversification
✓ Low leverage
✓ Strong liquidity

Concerns:
⚠ Banking concentration
⚠ High momentum exposure
```

---

# 83. DAILY PORTFOLIO REPORT

Generate:

```text
Portfolio Value
Today's P&L
Total P&L
Top Gainers
Top Losers
Risk Score
Sector Changes
FII/DII Impact
Market Impact
New Recommendations
Positions Requiring Attention
```

---

# 84. POSITION ALERTS

Generate:

```text
POSITION_PROFIT_TARGET
POSITION_STOP_RISK
LARGE_PNL_MOVE
CONCENTRATION_WARNING
SECTOR_WARNING
LIQUIDITY_WARNING
DRAWDOWN_WARNING
RISK_WARNING
```

---

# 85. PORTFOLIO ALERT EXAMPLE

```text
⚠ PORTFOLIO RISK ALERT

Banking exposure increased to 31%.

Recommended maximum:
30%

Action:
Avoid adding new banking positions.
```

---

# 86. PORTFOLIO OPPORTUNITY

The engine should identify:

```text
Underweight sectors
Strong sectors
Strong stocks
Diversification opportunities
```

Example:

```text
Healthcare:
Portfolio exposure 3%

Sector outlook:
Bullish

Potential diversification opportunity:
HIGH
```

---

# 87. PORTFOLIO DIVERSIFICATION SCORE

Calculate:

```text
0–100
```

Consider:

```text
Number of independent exposures
Correlation
Sector concentration
Asset-class concentration
Factor concentration
```

---

# 88. NOTIONAL VS ECONOMIC EXPOSURE

The system must distinguish:

```text
Capital Invested
```

from:

```text
Economic Exposure
```

especially for futures and options.

---

# 89. MARGIN RISK

Track:

```text
Used Margin
Available Margin
Margin Utilization %
Maintenance Margin
Margin Cushion
```

---

# 90. MARGIN ALERT

Example:

```text
Margin Utilization:
82%

Risk:
HIGH

Action:
Reduce leveraged exposure.
```

---

# 91. PORTFOLIO LIQUIDATION RISK

Calculate:

```text
Liquidity Score
```

based on:

```text
Position Size
Average Traded Value
Bid/Ask Spread
Market Depth
Volatility
```

---

# 92. EVENT EXPOSURE

Identify portfolio exposure to upcoming:

```text
Earnings
RBI Policy
Budget
Election
Corporate Actions
Global Central Bank Decisions
Major Economic Data
```

---

# 93. EVENT RISK SUMMARY

Example:

```text
UPCOMING PORTFOLIO EVENTS

HDFC BANK:
Earnings in 2 days

RBI:
Policy in 3 days

Portfolio Event Risk:
MODERATE
```

---

# 94. CORPORATE ACTIONS

Track:

```text
Dividend
Bonus
Stock Split
Rights Issue
Buyback
Merger
Demerger
Delisting
```

---

# 95. DIVIDEND TRACKING

Calculate:

```text
Dividend Received
Dividend Yield
Expected Dividend
Dividend Income
```

---

# 96. TAX / CHARGES

Portfolio Engine should store transaction-level:

```text
Brokerage
STT
GST
Exchange Charges
SEBI Charges
Stamp Duty
Other Applicable Charges
```

The tax calculation engine should remain separate and configurable.

---

# 97. BROKER IMPORT

Future support:

```text
CSV
Excel
Broker API
Contract Note
```

---

# 98. MANUAL ENTRY

Users must be able to manually add:

```text
Stock
Quantity
Average Price
Date
```

---

# 99. PORTFOLIO SNAPSHOT

At every analysis cycle store:

```text
timestamp
portfolio_value
cash
invested_value
pnl
risk_score
drawdown
exposure
```

---

# 100. PORTFOLIO HISTORY

Allow historical charts:

```text
Portfolio Value
Daily P&L
Cumulative Return
Drawdown
Risk
Sector Allocation
Asset Allocation
```

---

# 101. PERFORMANCE ATTRIBUTION

Determine what contributed to returns.

Example:

```text
Portfolio Return:
+12%

Contribution:

Banking:
+4.2%

IT:
+2.8%

Pharma:
+1.4%

Commodities:
+0.8%

Other:
+2.8%
```

---

# 102. RISK ATTRIBUTION

Determine what contributes to portfolio risk.

Example:

```text
Banking:
42% of portfolio risk

IT:
21%

Energy:
17%

Other:
20%
```

---

# 103. ACTIVE VS PASSIVE

Calculate:

```text
Active Weight =
Portfolio Weight - Benchmark Weight
```

---

# 104. ACTIVE BETS

Show:

```text
Largest Overweights
Largest Underweights
```

---

# 105. BENCHMARK TRACKING

Support:

```text
NIFTY 50
NIFTY 500
SENSEX
Custom Benchmark
```

---

# 106. PORTFOLIO DRIFT

Calculate:

```text
Current Allocation
-
Target Allocation
```

and rank the largest deviations.

---

# 107. REBALANCING PRIORITY

Classify:

```text
LOW
MEDIUM
HIGH
CRITICAL
```

---

# 108. PORTFOLIO DECISION HIERARCHY

```text
MARKET CONDITIONS
       ↓
PORTFOLIO RISK
       ↓
EXISTING EXPOSURE
       ↓
NEW SIGNAL
       ↓
CORRELATION
       ↓
CONCENTRATION
       ↓
LIQUIDITY
       ↓
POSITION SIZE
       ↓
FINAL ACTION
```

---

# 109. RECOMMENDATION ENGINE INTERFACE

The Portfolio Engine must expose:

```text
getPortfolioState()

getPositionState(instrument)

getExposure()

getSectorExposure()

getFactorExposure()

getRiskState()

getConcentration()

getCorrelation()

getLiquidityRisk()

getPortfolioHealth()

getPortfolioPerformance()

getStressTest()

getWhatIfAnalysis()

getRebalanceRecommendations()
```

---

# 110. PORTFOLIO STATE OBJECT

Return:

```text
PortfolioState {

    portfolio_id

    total_value
    invested_capital
    available_cash

    realized_pnl
    unrealized_pnl
    total_pnl

    daily_return
    total_return

    volatility
    beta
    alpha

    sharpe
    sortino

    max_drawdown
    current_drawdown

    risk_score
    health_score
    diversification_score

    gross_exposure
    net_exposure
    leverage

    margin_used
    margin_available

    sector_exposure[]
    asset_exposure[]
    factor_exposure[]

    concentration_risk

    liquidity_risk

    event_risk

    fii_alignment
    dii_alignment

    warnings[]
    recommendations[]
}
```

---

# 111. POSITION STATE OBJECT

```text
PositionState {

    position_id

    instrument
    asset_class

    quantity
    average_price
    current_price

    invested_value
    current_value

    realized_pnl
    unrealized_pnl
    total_pnl

    return_percentage
    portfolio_weight

    sector
    industry

    volatility
    beta

    liquidity_score

    concentration_score

    smart_money_score

    fii_score
    dii_score

    technical_score
    fundamental_score

    signal
    recommendation

    risk_score

    entry_price
    stop_loss
    targets

    warnings[]
}
```

---

# 112. PORTFOLIO DECISION OBJECT

```text
PortfolioDecision {

    instrument

    standalone_recommendation

    portfolio_adjusted_recommendation

    portfolio_impact

    existing_exposure

    sector_exposure

    factor_exposure

    correlation

    incremental_risk

    incremental_expected_return

    suggested_action

    suggested_position_size

    maximum_position_size

    reason[]

    warnings[]

    timestamp

    model_version
}
```

---

# 113. EXAMPLE

Standalone analysis:

```text
RELIANCE

Signal:
BUY

Score:
91

Confidence:
88

Risk:
Moderate
```

Portfolio analysis:

```text
Existing Reliance:
18%

Energy Exposure:
27%

Portfolio Risk:
Moderate
```

Final:

```text
BUY_SMALL
```

Reason:

```text
Strong standalone opportunity,
but portfolio concentration limits additional exposure.
```

---

# 114. SECOND EXAMPLE

Standalone:

```text
ICICI BANK

BUY
Score:
86
```

Portfolio:

```text
Banking exposure:
34%
```

Final:

```text
WAIT
```

Reason:

```text
Strong stock signal but excessive sector concentration.
```

---

# 115. THIRD EXAMPLE

Standalone:

```text
ABC LTD

BUY
Score:
83
```

Portfolio:

```text
Sector:
Underweight

Correlation:
Low

Liquidity:
High

Portfolio Risk:
Low
```

Final:

```text
BUY
```

The portfolio context strengthens the recommendation.

---

# 116. FOURTH EXAMPLE

Standalone:

```text
XYZ LTD

BUY
```

Portfolio:

```text
Existing position:
15%

New recommended allocation:
10%

Maximum:
20%
```

Portfolio Engine:

```text
ALLOW
```

but position size must remain within the configured limit.

---

# 117. FIFTH EXAMPLE

Portfolio:

```text
Cash:
₹5,00,000
```

Recommendation:

```text
BUY
```

Maximum risk allowed:

```text
₹10,000
```

Position size must be determined by:

```text
Risk per Trade
Stop Distance
Liquidity
Portfolio Limits
```

The Portfolio Engine must not override Risk Engine calculations.

---

# 118. PORTFOLIO PROTECTION MODE

When portfolio risk exceeds configured limits:

```text
NORMAL
```

changes to:

```text
DEFENSIVE
```

---

# 119. DEFENSIVE MODE

In defensive mode:

```text
Reduce new position sizes
Require higher confidence
Require better risk/reward
Restrict leveraged trades
Restrict highly correlated additions
Increase cash preference
```

---

# 120. CRISIS MODE

When extreme market conditions occur:

```text
CRISIS
```

the system should:

```text
Stop aggressive new recommendations
Increase confirmation requirements
Flag leveraged positions
Prioritize capital preservation
```

---

# 121. RECOVERY MODE

After crisis conditions improve:

```text
RECOVERY
```

Gradually return to normal thresholds.

Do not immediately switch from:

```text
CRISIS → NORMAL
```

without confirmation.

---

# 122. PORTFOLIO REGIME

Supported:

```text
NORMAL
DEFENSIVE
CRISIS
RECOVERY
```

---

# 123. USER CONFIGURATION

Allow users to configure:

```text
Maximum Stock Allocation
Maximum Sector Allocation
Maximum Portfolio Risk
Maximum Drawdown
Maximum Leverage
Maximum Derivative Exposure
Minimum Cash
Risk Tolerance
Investment Horizon
```

---

# 124. RISK PROFILE

Support:

```text
CONSERVATIVE
MODERATE
AGGRESSIVE
CUSTOM
```

---

# 125. RISK PROFILE EFFECT

The same opportunity can produce:

```text
Conservative:
BUY_SMALL

Moderate:
BUY

Aggressive:
STRONG_BUY
```

provided all hard risk limits are satisfied.

---

# 126. IMPORTANT SAFETY RULE

Risk profile must never override:

```text
Hard Risk Limits
Liquidity Constraints
Data Quality Rules
Maximum Loss Rules
Margin Rules
Regulatory Constraints
```

---

# 127. NO-TRADE CONDITION

Portfolio Engine must recommend:

```text
NO_TRADE
```

when:

```text
Portfolio risk too high
Concentration too high
Liquidity insufficient
Margin too high
Data stale
Event risk extreme
New position violates portfolio limits
```

---

# 128. AUTOMATIC INTERNET UPDATE

When internet becomes available:

```text
CONNECT
↓
UPDATE PRICES
↓
UPDATE POSITIONS
↓
UPDATE CORPORATE ACTIONS
↓
UPDATE FII/DII
↓
UPDATE NEWS
↓
UPDATE RISK
↓
UPDATE PORTFOLIO
↓
RE-EVALUATE RECOMMENDATIONS
```

---

# 129. OFFLINE MODE

When offline:

```text
READ_ONLY
```

Use cached portfolio data.

Clearly display:

```text
LAST UPDATED:
timestamp
```

No new trade recommendation should be generated if critical market inputs are stale.

---

# 130. AUDIT TRAIL

Every portfolio decision must store:

```text
timestamp
portfolio_state
position_state
signal_state
risk_state
decision
reason
model_version
```

---

# 131. PERFORMANCE MONITORING

Track:

```text
Portfolio Return
Benchmark Return
Alpha
Beta
Sharpe
Sortino
Maximum Drawdown
Recovery Time
Win Rate
Profit Factor
Expectancy
```

---

# 132. RECOMMENDATION PERFORMANCE

Track whether portfolio-adjusted recommendations outperform standalone recommendations.

Example:

```text
Standalone BUY:
+8.2%

Portfolio-adjusted BUY:
+10.1%
```

This helps validate whether portfolio context improves decisions.

---

# 133. BACKTESTING

Portfolio logic must be backtestable.

Backtests must include:

```text
Historical Portfolio
Historical Prices
Historical Signals
Historical Risk
Historical Recommendations
Historical Transaction Costs
```

Avoid look-ahead bias.

---

# 134. LOOK-AHEAD BIAS

The Portfolio Engine must only use information that would have been available at the decision timestamp.

Do not use future:

```text
Holdings
Prices
Corporate Actions
FII/DII data
News
Fundamental data
```

---

# 135. SURVIVORSHIP BIAS

Backtesting must account for securities that were:

```text
Delisted
Merged
Bankrupt
Suspended
Removed from Index
```

where historical data supports it.

---

# 136. DATA QUALITY

Every portfolio calculation should have:

```text
data_timestamp
calculation_timestamp
data_quality_score
```

---

# 137. DATA FAILURE

If required portfolio data is missing:

```text
Do not silently assume zero.
```

Return:

```text
DATA_INCOMPLETE
```

and reduce confidence.

---

# 138. MODEL VERSIONING

Store:

```text
portfolio_engine_version
risk_engine_version
recommendation_engine_version
```

---

# 139. UI DASHBOARD

The desktop application should have:

```text
PORTFOLIO
```

as a primary section.

Display:

```text
Portfolio Value
Today's P&L
Total P&L
Return
Risk Score
Health Score
Drawdown
Cash
Exposure
```

---

# 140. PORTFOLIO DASHBOARD

Example:

```text
┌───────────────────────────────────────┐
│ MY PORTFOLIO                          │
│                                       │
│ Value: ₹25,40,000                     │
│ Today's P&L: +₹18,400                 │
│ Total P&L: +₹3,20,000                 │
│ Return: +14.4%                        │
│                                       │
│ Health: 82/100                        │
│ Risk: 42/100                          │
│ Drawdown: -4.2%                       │
│                                       │
│ Cash: 18%                             │
│ Invested: 82%                         │
└───────────────────────────────────────┘
```

---

# 141. EXPOSURE DASHBOARD

Display:

```text
TOP STOCK EXPOSURES
TOP SECTOR EXPOSURES
TOP FACTOR EXPOSURES
TOP CORRELATED POSITIONS
```

---

# 142. PORTFOLIO WARNING PANEL

Example:

```text
⚠ 3 PORTFOLIO WARNINGS

1. Banking exposure: 32%
2. Stock concentration: 23%
3. Portfolio beta: 1.28
```

---

# 143. PORTFOLIO OPPORTUNITY PANEL

Example:

```text
POTENTIAL OPPORTUNITIES

Healthcare:
Underweight

Sector Score:
84

Institutional Flow:
Positive

Potential Action:
RESEARCH
```

---

# 144. AI PORTFOLIO SUMMARY

The application may generate:

```text
"Your portfolio remains moderately bullish.
Banking exposure is above your configured limit.
New banking purchases are therefore restricted.
Technology and healthcare provide better diversification
opportunities based on current signals."
```

The explanation must always be generated from actual structured data.

---

# 145. NO HALLUCINATION

The Portfolio Engine must never invent:

```text
Holdings
Prices
Transactions
P&L
Institutional activity
Portfolio exposure
```

If information is unavailable:

```text
UNKNOWN
```

must be returned.

---

# 146. USER CONTROL

The application must never automatically:

```text
Buy
Sell
Modify
Close
Hedge
Rebalance
```

a real brokerage position unless an explicit future automation feature is enabled by the user.

Default:

```text
ANALYSIS ONLY
```

---

# 147. PAPER TRADING

The Portfolio Engine should support:

```text
PAPER_PORTFOLIO
```

for testing recommendations without real money.

---

# 148. PAPER TRADING

Track:

```text
Virtual Capital
Virtual Orders
Virtual Positions
Virtual P&L
Virtual Charges
Virtual Slippage
```

---

# 149. LIVE VS PAPER

Clearly distinguish:

```text
LIVE PORTFOLIO
PAPER PORTFOLIO
```

in the UI.

---

# 150. FINAL PORTFOLIO DECISION

The Portfolio Engine must ultimately answer:

```text
1. What do I currently own?
2. How much risk am I taking?
3. Where am I overexposed?
4. Where am I underexposed?
5. Which holdings need attention?
6. Should I add a new position?
7. If yes, how does it affect the portfolio?
8. Should I reduce something else?
9. What happens under a market shock?
10. Is the portfolio aligned with my objective?
```

---

# 151. FINAL DECISION FLOW

```text
                    PORTFOLIO
                       │
                       ▼
                 CURRENT STATE
                       │
             ┌─────────┼─────────┐
             ▼         ▼         ▼
         EXPOSURE     RISK    PERFORMANCE
             │         │         │
             └─────────┼─────────┘
                       ▼
                  NEW SIGNAL
                       │
                       ▼
                  CORRELATION
                       │
                       ▼
                CONCENTRATION
                       │
                       ▼
                   LIQUIDITY
                       │
                       ▼
                POSITION SIZE
                       │
                       ▼
               PORTFOLIO IMPACT
                       │
                       ▼
             FINAL RECOMMENDATION
```

---

# 152. DEFINITION OF DONE

The Portfolio Engine is complete only when it can:

```text
✓ Track equity
✓ Track futures
✓ Track options
✓ Track commodities
✓ Track cash
✓ Track transactions
✓ Calculate P&L
✓ Calculate returns
✓ Calculate exposure
✓ Calculate concentration
✓ Calculate sector exposure
✓ Calculate factor exposure
✓ Calculate correlation
✓ Calculate volatility
✓ Calculate beta
✓ Calculate drawdown
✓ Calculate Sharpe
✓ Calculate Sortino
✓ Calculate VaR
✓ Stress test portfolio
✓ Track FII/DII alignment
✓ Track institutional exposure
✓ Detect hidden concentration
✓ Calculate leverage
✓ Calculate margin risk
✓ Analyze options Greeks
✓ Track commodity exposure
✓ Support target allocation
✓ Support rebalancing
✓ Support what-if analysis
✓ Support portfolio optimization framework
✓ Support paper trading
✓ Support live portfolio analysis
✓ Support offline mode
✓ Support automatic online refresh
✓ Generate portfolio alerts
✓ Provide portfolio-aware recommendations
✓ Maintain audit history
✓ Support backtesting
✓ Prevent look-ahead bias
✓ Prevent data hallucination
✓ Never automatically trade real money by default
```

---

# 153. CORE PRINCIPLE

The Portfolio Engine exists to ensure that the system does not ask only:

> "Is this stock going up?"

It must also ask:

> "Is buying this stock good for THIS portfolio?"

The final objective is:

```text
GOOD SECURITY
        +
GOOD ENTRY
        +
GOOD RISK/REWARD
        +
GOOD PORTFOLIO FIT
        =
HIGH-QUALITY DECISION
```

And if portfolio risk is already excessive:

```text
GOOD SECURITY
        +
BAD PORTFOLIO FIT
        =
WAIT / BUY_SMALL / NO_TRADE
```

---

# 154. FINAL SYSTEM PRINCIPLE

The AI Market Intelligence platform should optimize for:

```text
RISK-ADJUSTED PORTFOLIO QUALITY
```

rather than:

```text
MAXIMUM NUMBER OF TRADES
```

The system should prefer:

```text
Fewer
Higher-quality
Better-understood
Risk-controlled
Portfolio-compatible
Opportunities
```

over constant trading activity.
