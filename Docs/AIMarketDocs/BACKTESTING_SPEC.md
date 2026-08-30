# AI MARKET INTELLIGENCE

# BACKTESTING SPECIFICATION

**Document Version:** 1.0
**Status:** Core Validation Specification
**Market:** Indian Markets
**Asset Classes:** Equity, Futures, Options, Commodities

---

# 1. PURPOSE

The Backtesting Engine validates whether the trading and research models would have produced useful results using historical information.

The Backtesting Engine must answer:

```text
If the system had generated these signals in the past,
and a realistic trader had followed them,
what would the result have been?
```

The engine must calculate:

```text
Returns
Profit/Loss
Win Rate
Loss Rate
Profit Factor
Expectancy
Maximum Drawdown
Sharpe Ratio
Sortino Ratio
Risk/Reward
Average Holding Period
Transaction Costs
Slippage
Capital Utilization
Signal Accuracy
```

The engine must NOT be designed to make historical performance look better than reality.

---

# 2. CORE PRINCIPLE

The most important rule:

```text
NO LOOK-AHEAD BIAS
```

At any historical timestamp, the model may use ONLY information that would genuinely have been available at that timestamp.

Example:

```text
Signal generated:
10 August 2025 at 10:00 AM
```

The model cannot use:

```text
10 August 2025 4:00 PM news
11 August 2025 price
Future earnings
Future FII data
Future corporate announcements
```

---

# 3. SECOND CORE PRINCIPLE

Backtesting must simulate realistic execution.

The system must NOT assume:

```text
Perfect entry
Perfect exit
Zero slippage
Zero brokerage
Infinite liquidity
No taxes
No spread
```

---

# 4. THIRD CORE PRINCIPLE

Historical data must preserve point-in-time information.

If a fundamental value was published after the signal timestamp, it must not be used before publication.

Example:

```text
FY2025 results published:
20 May 2025
```

The model cannot use FY2025 results for:

```text
15 May 2025
```

---

# 5. BACKTESTING WORKFLOW

```text
Historical Data
      ↓
Point-in-Time Data Validation
      ↓
Feature Generation
      ↓
Historical Market State
      ↓
Quant Model
      ↓
Signal Engine
      ↓
Risk Engine
      ↓
Execution Simulator
      ↓
Portfolio Simulator
      ↓
Performance Metrics
      ↓
Validation Report
```

---

# 6. BACKTEST TYPES

The system must support:

```text
Historical Backtest
Walk-Forward Backtest
Out-of-Sample Backtest
Rolling Backtest
Monte Carlo Analysis
Parameter Sensitivity Test
Stress Test
Paper Trading Validation
```

---

# 7. HISTORICAL BACKTEST

The simplest mode.

Example:

```text
Start:
1 January 2018

End:
31 December 2025
```

The system evaluates every eligible trading day.

---

# 8. WALK-FORWARD BACKTEST

Walk-forward testing is mandatory for model validation.

Example:

```text
Train:
2018–2021

Validation:
2022

Train:
2018–2022

Validation:
2023

Train:
2018–2023

Validation:
2024
```

The process continues through the available dataset.

---

# 9. OUT-OF-SAMPLE TEST

A separate period must be reserved that is not used for model development.

Example:

```text
Development:
2018–2023

Validation:
2024

Final Out-of-Sample:
2025–2026
```

The exact periods must be configurable.

---

# 10. ROLLING BACKTEST

Support rolling windows.

Example:

```text
Training Window:
3 years

Testing Window:
3 months
```

Then move forward:

```text
Training:
2019–2021
Test:
Q1 2022

Training:
Q2 2019–Q1 2022
Test:
Q2 2022
```

---

# 11. BACKTEST CONFIGURATION

Every backtest must have a configuration.

Example:

```text
BacktestConfig {

    start_date
    end_date

    initial_capital

    asset_class

    instruments

    timeframe

    strategy

    model_version

    signal_engine_version

    commission_model

    slippage_model

    tax_model

    position_sizing_model

    max_positions

    max_sector_exposure

    max_portfolio_risk

    rebalance_frequency

}
```

---

# 12. INITIAL CAPITAL

Default example:

```text
₹10,00,000
```

But the user must be able to configure:

```text
₹1,00,000
₹5,00,000
₹10,00,000
₹25,00,000
₹50,00,000
₹1,00,00,000
```

---

# 13. CAPITAL ACCOUNTING

The portfolio simulator must maintain:

```text
Cash
Invested Capital
Unrealized P&L
Realized P&L
Margin Used
Available Margin
Portfolio Value
```

---

# 14. EQUITY EXECUTION

For equities, the simulator must account for:

```text
Entry price
Exit price
Quantity
Market hours
Liquidity
Spread
Slippage
Brokerage
Exchange charges
Taxes
```

---

# 15. FUTURES EXECUTION

For futures, include:

```text
Contract
Lot size
Entry
Exit
Expiry
Margin
Mark-to-market
Transaction costs
Slippage
Rollovers
```

---

# 16. OPTIONS EXECUTION

Options require special handling.

Include:

```text
Strike
Call/Put
Expiry
Premium
Underlying price
IV
Delta
Gamma
Theta
Vega
Open Interest
Bid/Ask
Lot size
Margin where applicable
```

---

# 17. OPTION BUY BACKTEST

For option buying:

```text
Entry Premium
+
Quantity
+
Transaction Cost
+
Slippage
```

P&L:

```text
Exit Value - Entry Cost - Costs
```

The simulator must correctly handle:

```text
Expiry
Intrinsic Value
Time Value
Premium decay
Gap moves
```

---

# 18. OPTION SELLING BACKTEST

For option selling:

The simulator must model:

```text
Premium received
Margin
MTM
Buyback cost
Transaction costs
Slippage
Expiry settlement
Assignment/exercise rules where applicable
```

Risk must not be represented as unlimited capital availability.

---

# 19. COMMODITY BACKTEST

Commodity backtesting must account for:

```text
Contract specification
Lot size
Tick size
Expiry
Trading hours
Margin
Settlement
Rollovers
Slippage
Transaction costs
```

---

# 20. DATA TIMEFRAME

Support:

```text
Tick
1 minute
5 minute
15 minute
30 minute
1 hour
Daily
Weekly
Monthly
```

Not every strategy requires tick data.

The backtest must use the minimum timeframe necessary to reproduce the strategy accurately.

---

# 21. BAR-BASED EXECUTION

When using OHLC bars, avoid assuming that the engine knows the order in which:

```text
Open
High
Low
Close
```

occurred inside the bar.

Example:

```text
High = ₹110
Low = ₹90
Stop = ₹95
Target = ₹108
```

If both stop and target could have occurred within the same bar, the simulator must not arbitrarily choose the favorable outcome.

Possible solutions:

```text
Use lower timeframe data
OR
Apply conservative execution rules
```

---

# 22. MARKET ORDER

Market orders must include configurable slippage.

---

# 23. LIMIT ORDER

Limit orders must only execute if historical price conditions actually allow execution.

Do not assume every limit order gets filled.

---

# 24. STOP LOSS

Stop loss execution must account for:

```text
Gap risk
Slippage
Liquidity
```

Example:

```text
Stop:
₹1,000

Next market open:
₹960
```

The simulator must not assume execution at exactly:

```text
₹1,000
```

---

# 25. GAP HANDLING

If price gaps through stop loss:

```text
Actual simulated execution price
```

must reflect the gap according to the configured execution model.

---

# 26. TARGET EXECUTION

Targets must follow the same realistic execution rules.

---

# 27. TRAILING STOP

Backtesting must simulate trailing stops sequentially.

The future maximum price cannot be used to determine a previous trailing stop.

---

# 28. POSITION SIZING

Position sizing must be based on information available at entry.

Example:

```text
Portfolio:
₹10,00,000

Risk per trade:
1%

Maximum risk:
₹10,000
```

If:

```text
Entry:
₹500

Stop:
₹450

Risk:
₹50/share
```

Quantity:

```text
₹10,000 / ₹50
=
200 shares
```

---

# 29. POSITION SIZE LIMITS

Position size must respect:

```text
Maximum capital allocation
Maximum portfolio risk
Liquidity
Sector concentration
Instrument concentration
Margin
```

---

# 30. LIQUIDITY CONSTRAINT

A backtest must not assume that the portfolio can buy unlimited quantities.

Example:

```text
Average daily volume:
10,000 shares

Simulated order:
100,000 shares
```

The engine must either:

```text
Reject the trade
OR
Apply realistic market impact/slippage
```

---

# 31. MARKET IMPACT

Future version may model:

```text
Order Size / Average Volume
```

and estimate market impact.

At minimum, large orders must have increased slippage.

---

# 32. TRANSACTION COST MODEL

The backtest must support configurable cost models.

Costs may include:

```text
Brokerage
STT
Exchange transaction charges
GST
SEBI charges
Stamp duty
Slippage
Bid/ask spread
```

The exact applicable rates must be stored by:

```text
Date
Exchange
Asset Class
Instrument
```

Do not hard-code one lifetime cost.

---

# 33. COST MODEL VERSIONING

Every backtest must record:

```text
cost_model_version
```

so historical reports remain reproducible.

---

# 34. CORPORATE ACTIONS

Equity backtests must correctly handle:

```text
Stock Split
Bonus
Dividend
Rights Issue
Merger
Demerger
Delisting
Corporate Restructuring
```

---

# 35. SPLIT ADJUSTMENT

Price and volume data must be adjusted consistently.

The system must not accidentally create artificial returns because of stock splits.

---

# 36. DIVIDENDS

Dividend treatment must be configurable:

```text
Price Return
Total Return
```

For long-term equity strategies, support:

```text
Total Return Backtest
```

where appropriate.

---

# 37. SURVIVORSHIP BIAS

The universe must include historical constituents.

Do not only backtest today's NIFTY 50 stocks.

Example:

```text
A company was part of the index in 2019
but removed in 2023
```

It must still appear in the historical 2019 universe.

---

# 38. INDEX CONSTITUENT HISTORY

Store:

```text
Index
Constituent
Effective Date
Removal Date
```

---

# 39. DELISTED STOCKS

Where historical data is available, include delisted securities.

Otherwise document the limitation.

---

# 40. POINT-IN-TIME FUNDAMENTALS

Fundamental data must include:

```text
Publication Date
Period End Date
Availability Timestamp
```

The backtester must use:

```text
Availability Timestamp
```

not merely:

```text
Period End Date
```

---

# 41. POINT-IN-TIME NEWS

News must store:

```text
Published Time
Source
Event Time
Ingestion Time
```

The backtest must only use news available before the signal timestamp.

---

# 42. POINT-IN-TIME FII/DII DATA

Institutional flow data must respect actual publication timing.

Do not use end-of-day data in an intraday signal unless it was actually available at that time.

---

# 43. POINT-IN-TIME OPTIONS DATA

Options backtesting requires historical:

```text
Price
OI
Volume
IV where available
Strike
Expiry
Underlying
Bid/Ask where available
```

---

# 44. DATA QUALITY

Every backtest must report:

```text
Data completeness
Missing data
Stale data
Provider gaps
Corporate action gaps
```

---

# 45. MISSING DATA

Never silently fill critical missing values.

Possible actions:

```text
Skip signal
Skip instrument
Use configured interpolation
Mark result as lower quality
```

The behavior must be configurable.

---

# 46. SIGNAL GENERATION

Historical signals must be generated exactly as the production Signal Engine would have generated them.

Do not create a separate simplified signal formula for backtesting.

Architecture:

```text
Production Signal Engine
          ↑
          │
Historical Data
          │
Backtest Engine
```

---

# 47. SAME MODEL VERSION

The backtest must record:

```text
Quant Model Version
Signal Engine Version
Risk Model Version
Data Source Version
Cost Model Version
```

---

# 48. SIGNAL RECORD

Every simulated trade must retain the original signal.

Example:

```text
SignalRecord {

    signal_id

    instrument

    timestamp

    direction

    score

    confidence

    entry_zone

    stop_loss

    target

    risk_reward

    model_version
}
```

---

# 49. TRADE RECORD

Each simulated trade must contain:

```text
TradeRecord {

    trade_id

    signal_id

    instrument

    asset_class

    direction

    strategy

    entry_timestamp

    entry_price

    exit_timestamp

    exit_price

    quantity

    gross_pnl

    brokerage

    taxes

    slippage

    total_cost

    net_pnl

    return_percent

    maximum_adverse_excursion

    maximum_favorable_excursion

    exit_reason
}
```

---

# 50. EXIT REASONS

Supported:

```text
TARGET
STOP_LOSS
TRAILING_STOP
SIGNAL_REVERSAL
TIME_EXIT
EXPIRY
MANUAL
RISK_LIMIT
MARKET_CLOSE
DATA_FAILURE
```

---

# 51. PROFIT/LOSS

Calculate:

```text
Gross P&L
Net P&L
```

Net P&L:

```text
Gross P&L - All Transaction Costs
```

---

# 52. RETURN

Trade return:

```text
Net P&L / Capital Deployed
```

Portfolio return:

```text
Ending Portfolio Value
/
Beginning Portfolio Value
- 1
```

---

# 53. WIN RATE

```text
Win Rate =
Winning Trades / Total Closed Trades × 100
```

Do not rely on win rate alone.

---

# 54. LOSS RATE

```text
Loss Rate =
Losing Trades / Total Closed Trades × 100
```

---

# 55. PROFIT FACTOR

```text
Profit Factor =
Gross Profit / Gross Loss
```

where:

```text
Gross Loss
```

is the absolute value of total losing trades.

---

# 56. EXPECTANCY

Trade expectancy:

```text
Expectancy =
(Win Rate × Average Win)
-
(Loss Rate × Average Loss)
```

Report both:

```text
Per Trade
Per Rupee Risked
```

---

# 57. AVERAGE WIN

Calculate:

```text
Average Winning Trade
```

---

# 58. AVERAGE LOSS

Calculate:

```text
Average Losing Trade
```

---

# 59. RISK/REWARD REALIZED

Compare:

```text
Planned Risk/Reward
```

with:

```text
Realized Risk/Reward
```

This helps identify unrealistic targets.

---

# 60. MAXIMUM DRAWDOWN

Calculate peak-to-trough portfolio decline.

Example:

```text
Portfolio Peak:
₹12,00,000

Trough:
₹10,00,000

Maximum Drawdown:
16.67%
```

---

# 61. DRAWDOWN DURATION

Track:

```text
Peak Date
Trough Date
Recovery Date
Recovery Duration
```

---

# 62. SHARPE RATIO

Use configurable risk-free rate.

Formula:

```text
Sharpe =
(Return - Risk Free Rate) / Volatility
```

The periodicity must be clearly defined.

---

# 63. SORTINO RATIO

Sortino should penalize downside volatility rather than total volatility.

---

# 64. CALMAR RATIO

Support:

```text
CAGR / Maximum Drawdown
```

---

# 65. CAGR

For long-term strategies:

```text
CAGR =
(Ending Value / Beginning Value)^(1/Years) - 1
```

---

# 66. MONTHLY RETURNS

Generate:

```text
January
February
March
...
```

for every year.

---

# 67. YEARLY RETURNS

Generate annual performance.

Example:

```text
2021: +18%
2022: -7%
2023: +25%
2024: +14%
```

---

# 68. BENCHMARK COMPARISON

Every equity backtest should support benchmark comparison.

Possible benchmarks:

```text
NIFTY 50
NIFTY 500
SENSEX
Relevant Sector Index
```

For commodity strategies use an appropriate benchmark.

---

# 69. BENCHMARK METRICS

Report:

```text
Strategy Return
Benchmark Return
Alpha
Beta
Excess Return
Maximum Drawdown Comparison
```

---

# 70. RISK-ADJUSTED COMPARISON

Do not judge strategies only by absolute return.

Example:

```text
Strategy A:
Return = 40%
Drawdown = 35%

Strategy B:
Return = 30%
Drawdown = 10%
```

Strategy B may be preferable on a risk-adjusted basis.

---

# 71. SIGNAL ACCURACY

Measure signal direction accuracy.

For example:

```text
BUY
```

followed by positive return over configured horizon.

Measure separately:

```text
1 Day
5 Days
10 Days
20 Days
60 Days
```

---

# 72. SIGNAL CALIBRATION

If the model reports:

```text
Confidence = 80
```

the system should eventually determine whether historical outcomes support that confidence level.

Confidence must not automatically be interpreted as:

```text
80% probability of profit
```

unless statistically calibrated.

---

# 73. CONFIDENCE BUCKET ANALYSIS

Report:

```text
Confidence 50–59
Confidence 60–69
Confidence 70–79
Confidence 80–89
Confidence 90–100
```

and calculate historical performance for each bucket.

---

# 74. SCORE BUCKET ANALYSIS

Report performance for:

```text
0–29
30–44
45–69
70–84
85–100
```

This determines whether stronger scores actually correspond to better outcomes.

---

# 75. FACTOR ATTRIBUTION

Backtesting must determine which factors contributed to performance.

Example:

```text
Technical:
+12%

Momentum:
+8%

Smart Money:
+10%

Macro:
-3%

Geopolitical:
+4%
```

The exact attribution methodology must be statistically valid.

Do not claim causal attribution from simple correlation.

---

# 76. ABLATION TESTING

Test the model with individual factors removed.

Example:

```text
Full Model
Full Model - Smart Money
Full Model - Global
Full Model - Sentiment
Full Model - Technical
```

Compare performance.

This helps determine which factors actually add value.

---

# 77. FEATURE IMPORTANCE

If ML models are used, calculate feature importance using appropriate methods.

Possible methods:

```text
Permutation Importance
SHAP
Model-specific importance
```

Feature importance must not automatically be interpreted as causality.

---

# 78. PARAMETER SENSITIVITY

Test strategy parameters across ranges.

Example:

```text
RSI:
60
65
70

ATR Stop:
1.5
2.0
2.5

Risk:
0.5%
1.0%
1.5%
```

The system should identify whether performance is robust.

---

# 79. OVERFITTING DETECTION

Warning signs:

```text
Extremely high historical return
Very low drawdown
Performance collapses out-of-sample
Tiny parameter changes cause huge performance changes
```

The system must flag possible overfitting.

---

# 80. PARAMETER ROBUSTNESS

A robust strategy should work reasonably well across a range of parameters.

Avoid selecting:

```text
One perfect historical parameter
```

without validation.

---

# 81. MONTE CARLO ANALYSIS

Support Monte Carlo simulation using historical trade outcomes.

Generate:

```text
1,000+
```

randomized trade sequences where computationally appropriate.

Analyze:

```text
Possible drawdowns
Return distribution
Loss streaks
Risk of ruin
Probability of capital decline
```

---

# 82. TRADE SEQUENCE RANDOMIZATION

The Monte Carlo engine may randomize trade order while preserving trade outcome distribution.

---

# 83. RISK OF RUIN

Estimate the probability of severe capital loss based on:

```text
Win rate
Average win
Average loss
Position size
Trade frequency
Correlation
```

---

# 84. STRESS TESTING

The system must test extreme historical conditions.

Examples:

```text
COVID crash
Global financial crisis
Major geopolitical shocks
Sharp INR moves
Oil shocks
Major index crashes
Extreme volatility periods
```

Use available historical data.

---

# 85. REGIME PERFORMANCE

Break results into:

```text
Bull Market
Bear Market
Sideways Market
High Volatility
Low Volatility
Crisis
```

---

# 86. ASSET CLASS PERFORMANCE

Report separately:

```text
Equity
Futures
Options
Commodities
```

---

# 87. SECTOR PERFORMANCE

For equities:

```text
Banking
IT
Pharma
Auto
Energy
FMCG
Metals
Real Estate
Telecom
etc.
```

Performance must be available by sector.

---

# 88. LONG/SHORT PERFORMANCE

Separate:

```text
Long trades
Short trades
```

---

# 89. HOLDING PERIOD ANALYSIS

Measure performance by:

```text
<1 day
1–3 days
4–10 days
11–30 days
31–90 days
90+ days
```

---

# 90. TIME-OF-DAY ANALYSIS

For intraday strategies:

```text
09:15–10:00
10:00–11:00
11:00–12:00
12:00–13:00
13:00–14:00
14:00–15:30
```

Measure:

```text
Win Rate
Average Return
Risk
Liquidity
```

---

# 91. DAY-OF-WEEK ANALYSIS

Where meaningful:

```text
Monday
Tuesday
Wednesday
Thursday
Friday
```

---

# 92. EXPIRY ANALYSIS

For derivatives:

```text
Days to Expiry
```

must be evaluated.

---

# 93. OPTIONS GREEK ANALYSIS

Options performance should be analyzed against:

```text
Delta
Gamma
Theta
Vega
IV
```

where historical data supports it.

---

# 94. IMPLIED VS REALIZED VOLATILITY

For options:

```text
IV
vs
Realized Volatility
```

must be analyzed.

---

# 95. OPEN INTEREST ANALYSIS

Options strategies should evaluate:

```text
OI
Change in OI
Price
Volume
```

and determine whether the signal behaves differently under different OI conditions.

---

# 96. COMMODITY REGIME ANALYSIS

For commodities analyze:

```text
Trend
Inventory
Supply/Demand
USD
Geopolitical risk
Global benchmark price
```

where data is available.

---

# 97. TRANSACTION COST SENSITIVITY

Run:

```text
Low Cost
Base Cost
High Cost
```

scenarios.

A strategy that becomes unprofitable under slightly higher costs should be flagged.

---

# 98. SLIPPAGE SENSITIVITY

Test:

```text
0.00%
0.05%
0.10%
0.20%
0.50%
```

or asset-appropriate values.

---

# 99. CAPITAL SENSITIVITY

Test different capital levels:

```text
₹1 lakh
₹5 lakh
₹10 lakh
₹25 lakh
₹50 lakh
₹1 crore
```

This helps determine scalability.

---

# 100. LIQUIDITY SCALABILITY

A strategy must not claim that:

```text
₹1 crore
```

can be traded with the same execution quality as:

```text
₹1 lakh
```

if liquidity does not support it.

---

# 101. PORTFOLIO BACKTEST

Support simultaneous positions.

Example:

```text
Stock A
Stock B
Stock C
Option Strategy D
Commodity E
```

Portfolio-level risk must be calculated.

---

# 102. CORRELATION

Portfolio backtests must consider correlation between positions.

---

# 103. PORTFOLIO RISK LIMIT

Example:

```text
Maximum portfolio risk:
5%
```

If adding a new position would exceed the limit:

```text
Reduce position
OR
Reject trade
```

---

# 104. SECTOR EXPOSURE

Example:

```text
Maximum Banking Exposure:
30%
```

must be configurable.

---

# 105. DAILY LOSS LIMIT

Support:

```text
Maximum Daily Loss
```

Example:

```text
2%
```

If breached:

```text
Stop generating new actionable trades
```

for the configured period.

---

# 106. DRAWDOWN PROTECTION

Support configurable rules.

Example:

```text
Drawdown < 5%
→ Normal

5–10%
→ Reduce risk

10–15%
→ Defensive

>15%
→ Stop new trades / review model
```

Exact thresholds must be configurable.

---

# 107. TRADE LIMITS

Support:

```text
Maximum Trades Per Day
Maximum Open Positions
Maximum Trades Per Instrument
Maximum Sector Positions
```

---

# 108. SIGNAL DUPLICATION

Do not count repeated signals as separate trades unless an actual new position is opened.

---

# 109. RE-ENTRY

Re-entry rules must be explicit.

Example:

```text
BUY
→ STOP
→ BUY again
```

must be treated as two separate trades only if the strategy explicitly permits re-entry.

---

# 110. SHORT SELLING

Equity short-selling rules must respect actual market mechanics.

The simulator must not assume unrestricted overnight equity short positions where the market rules do not allow them.

For longer-duration bearish strategies, use appropriate instruments such as:

```text
Futures
Options
```

where applicable.

---

# 111. F&O EXPIRY

Historical expiry dates must be obtained from reliable point-in-time data.

Never assume expiry rules have always remained identical.

---

# 112. ROLLOVER

Futures strategies must support:

```text
Expiry rollover
```

with explicit rules.

---

# 113. MARKET HOLIDAYS

Use historical exchange calendars.

Do not assume:

```text
Monday–Friday
```

is always a trading day.

---

# 114. CORPORATE EVENT FILTER

Backtests should identify:

```text
Results
Corporate actions
Major announcements
Mergers
Demerger
Dividend
```

where relevant.

---

# 115. EARNINGS STRATEGIES

If the strategy trades around earnings, historical publication timestamps must be available.

---

# 116. NEWS STRATEGIES

News-driven strategies must use historical news exactly as it was available at the time.

---

# 117. GEOPOLITICAL BACKTESTING

Geopolitical factors must use historical event timestamps.

The model cannot label an event as known before it actually occurred.

---

# 118. FII/DII BACKTESTING

Use only institutional flow data available at the signal timestamp.

---

# 119. BIG INVESTOR BACKTESTING

The Smart Money component must be testable independently.

Possible signals:

```text
Institutional accumulation
Bulk deals
Block deals
Promoter transactions
Insider buying
Mutual fund ownership changes
FII holdings
DII holdings
```

The backtester should determine whether these features add predictive value.

---

# 120. GLOBAL MARKET BACKTESTING

Historical global inputs must use their actual timestamps.

Examples:

```text
NASDAQ
S&P 500
DXY
US 10Y
VIX
USDINR
Asian markets
European markets
```

---

# 121. MACRO DATA

Macroeconomic data must use:

```text
Announcement Date
Announcement Time
Actual
Previous
Forecast
```

where available.

Do not use revised data before the revision occurred.

---

# 122. DATA REVISION BIAS

Macroeconomic datasets may be revised.

Where possible, backtesting should use:

```text
Original Published Value
```

rather than today's revised value.

---

# 123. BENCHMARK STRATEGIES

The engine should compare the strategy against:

```text
Buy and Hold
Index
Equal-weight portfolio
Relevant benchmark
```

---

# 124. BUY AND HOLD BASELINE

For equity:

```text
Initial Capital
→ Buy benchmark
→ Hold
→ Compare
```

---

# 125. PERFORMANCE REPORT

Every completed backtest must produce a report.

Minimum:

```text
Backtest Period
Initial Capital
Final Capital
Net Profit
Return %
CAGR
Maximum Drawdown
Sharpe
Sortino
Profit Factor
Win Rate
Average Win
Average Loss
Expectancy
Number of Trades
Average Holding Period
Transaction Costs
```

---

# 126. TRADE DISTRIBUTION

Report:

```text
Best Trade
Worst Trade
Median Trade
Top 10 Trades
Bottom 10 Trades
```

---

# 127. PROFIT DISTRIBUTION

Display:

```text
Profit histogram
Loss histogram
Return distribution
```

---

# 128. EQUITY CURVE

Generate:

```text
Portfolio Value vs Time
```

---

# 129. DRAWDOWN CURVE

Generate:

```text
Drawdown % vs Time
```

---

# 130. MONTHLY HEATMAP

Generate:

```text
Year × Month
```

showing monthly returns.

---

# 131. SIGNAL DISTRIBUTION

Show:

```text
STRONG BUY
BUY
HOLD
SELL
STRONG SELL
NO TRADE
```

counts.

---

# 132. SIGNAL PERFORMANCE

For each signal type:

```text
Count
Win Rate
Average Return
Median Return
Profit Factor
```

---

# 133. NO TRADE ANALYSIS

Track how often the model says:

```text
NO TRADE
```

and whether avoiding those periods improved portfolio performance.

---

# 134. FALSE POSITIVE ANALYSIS

For BUY signals:

```text
Signal generated
but expected move failed
```

record:

```text
Reason
Market regime
Factor conditions
Risk condition
```

where measurable.

---

# 135. FALSE NEGATIVE ANALYSIS

Identify major moves where the system did not generate an actionable signal.

This helps improve future versions.

---

# 136. MISSED OPPORTUNITY ANALYSIS

Example:

```text
Stock moved +15%
System:
HOLD
```

Record the event for research.

Do not automatically modify the model because of one missed opportunity.

---

# 137. REGIME FAILURE ANALYSIS

Identify periods where:

```text
Model performance deteriorated significantly.
```

---

# 138. MODEL VERSION COMPARISON

Support:

```text
Model v1.0
Model v1.1
Model v2.0
```

comparison.

---

# 139. A/B MODEL TESTING

Allow two models to run against identical historical data.

Example:

```text
Model A:
Technical + Fundamental

Model B:
Technical + Fundamental + Smart Money
```

Compare objectively.

---

# 140. STATISTICAL SIGNIFICANCE

Performance should not be considered reliable solely because:

```text
Return > 0
```

The system should evaluate whether results are statistically meaningful.

Where appropriate report:

```text
Confidence Interval
Bootstrap Distribution
Statistical Significance
```

---

# 141. BOOTSTRAP ANALYSIS

Use bootstrap resampling to estimate uncertainty around:

```text
Average Return
Win Rate
Expectancy
Sharpe
```

---

# 142. MULTIPLE TESTING WARNING

If hundreds or thousands of strategies are tested, the system must warn about:

```text
Multiple testing
Data mining
Selection bias
```

---

# 143. STRATEGY SELECTION BIAS

Do not report only the best-performing strategy.

The report should preserve:

```text
All tested strategies
```

and explain selection criteria.

---

# 144. OVERFITTING SCORE

Create a configurable diagnostic:

```text
Overfitting Risk:
LOW
MEDIUM
HIGH
```

based on:

```text
In-sample vs out-of-sample difference
Parameter sensitivity
Trade count
Performance stability
```

---

# 145. DATA QUALITY SCORE

Every backtest must have:

```text
Data Quality Score
```

Example:

```text
95 = Excellent
80 = Good
65 = Moderate
<50 = Poor
```

---

# 146. BACKTEST RELIABILITY SCORE

Create:

```text
Backtest Reliability Score
```

based on:

```text
Data quality
Historical coverage
Trade count
Out-of-sample quality
Execution realism
Cost realism
```

This is separate from strategy performance.

---

# 147. MINIMUM TRADE COUNT

A strategy with:

```text
5 trades
100% win rate
```

must NOT be treated as highly reliable.

The report must show:

```text
Sample Size
```

prominently.

---

# 148. SAMPLE SIZE WARNING

Example:

```text
Only 12 trades
→ Low statistical confidence
```

---

# 149. PERFORMANCE WARNING

If results are based primarily on:

```text
Few trades
```

show:

```text
LOW SAMPLE SIZE
```

---

# 150. REALISTIC PERFORMANCE

The system must never advertise:

```text
Guaranteed returns
Guaranteed profit
Sure-shot strategy
100% accuracy
```

---

# 151. PERFORMANCE PRESENTATION

Use language such as:

```text
Historical simulation
Backtested performance
Model-generated result
Past simulated outcome
```

not:

```text
Future guaranteed return
```

---

# 152. BACKTEST DATABASE

Store every backtest.

Suggested entities:

```text
backtest_runs
backtest_configurations
backtest_trades
backtest_equity_curve
backtest_metrics
backtest_monthly_returns
backtest_signal_results
backtest_factor_results
backtest_warnings
```

---

# 153. BACKTEST RUN ID

Every run must receive:

```text
backtest_run_id
```

Example:

```text
BT-2026-000001
```

---

# 154. REPRODUCIBILITY

A backtest must be reproducible.

Store:

```text
Data Version
Model Version
Signal Engine Version
Risk Engine Version
Cost Model Version
Configuration
Random Seed
```

where applicable.

---

# 155. RANDOM SEED

Monte Carlo and stochastic simulations must store a seed.

This allows reproduction.

---

# 156. BACKTEST STATUS

Possible:

```text
QUEUED
RUNNING
COMPLETED
FAILED
CANCELLED
```

---

# 157. ERROR HANDLING

If historical data is missing or corrupted:

```text
DO NOT silently continue
```

The engine must log:

```text
Error
Instrument
Timestamp
Dataset
Provider
```

---

# 158. PARTIAL BACKTEST

If a run completes partially:

```text
Status = PARTIAL
```

and clearly show:

```text
Coverage %
```

Do not report it as a complete historical test.

---

# 159. PERFORMANCE CACHE

Completed backtests may be cached using:

```text
Configuration Hash
Model Version
Data Version
```

If nothing changed, the system can reuse results.

---

# 160. BACKTEST API

Provide:

```text
runBacktest(config)
```

```text
getBacktest(runId)
```

```text
getBacktestTrades(runId)
```

```text
getBacktestMetrics(runId)
```

```text
compareBacktests(runIds[])
```

---

# 161. BACKTEST ENGINE ARCHITECTURE

```text
              HISTORICAL DATA
                     │
                     ▼
          POINT-IN-TIME VALIDATOR
                     │
                     ▼
             FEATURE ENGINE
                     │
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
           EXECUTION SIMULATOR
                     │
                     ▼
           PORTFOLIO SIMULATOR
                     │
                     ▼
            PERFORMANCE ENGINE
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
      METRICS    ANALYTICS   REPORT
          │          │          │
          └──────────┼──────────┘
                     ▼
              BACKTEST DATABASE
```

---

# 162. BACKTESTING MODES

Support:

```text
MODE 1:
Fast Research Backtest

MODE 2:
High Accuracy Backtest

MODE 3:
Intraday Backtest

MODE 4:
Options Backtest

MODE 5:
Portfolio Backtest

MODE 6:
Walk-Forward Validation

MODE 7:
Stress Test
```

---

# 163. FAST RESEARCH MODE

Used for rapid experimentation.

May use:

```text
Daily data
Simplified execution
```

But must clearly label:

```text
RESEARCH APPROXIMATION
```

---

# 164. HIGH ACCURACY MODE

Uses:

```text
Higher-frequency data
Detailed transaction costs
Realistic execution
Point-in-time datasets
```

---

# 165. INTRADAY MODE

Must use appropriate intraday data.

No future bar information may be used.

---

# 166. OPTIONS MODE

Must use historical option-chain data where available.

---

# 167. PAPER TRADING MODE

The same engine architecture should support live paper trading.

Difference:

```text
Historical Data
```

becomes:

```text
Live Data
```

while the execution simulator remains active.

---

# 168. LIVE VS BACKTEST CONSISTENCY

The same:

```text
Quant Model
Signal Engine
Risk Engine
```

should be used in:

```text
Backtest
Paper Trading
Live Research
```

Only the data/execution layer changes.

---

# 169. PAPER TRADING RECORD

Store:

```text
Paper Trade
Signal
Timestamp
Expected Entry
Actual Simulated Entry
Stop
Target
Exit
P&L
```

---

# 170. LIVE MODEL VALIDATION

The system should compare:

```text
Backtest expectation
vs
Paper trading result
```

---

# 171. MODEL DRIFT

Monitor whether model performance changes over time.

Example:

```text
Historical Sharpe:
1.4

Recent 6 months:
0.4
```

Flag:

```text
MODEL PERFORMANCE DRIFT
```

---

# 172. REGIME DRIFT

Detect when current market behavior differs materially from historical training conditions.

---

# 173. DATA DRIFT

Monitor changes in:

```text
Feature distributions
Volume
Volatility
Correlation
Institutional flows
```

---

# 174. BACKTEST REPORT SUMMARY

The report must begin with:

```text
Strategy:
Model Version:
Period:
Asset Class:
Initial Capital:
Final Capital:

Total Return:
CAGR:
Maximum Drawdown:
Sharpe:
Sortino:
Profit Factor:
Win Rate:
Expectancy:
Number of Trades:

Transaction Costs:
Slippage:

Out-of-Sample Performance:
Backtest Reliability:
Overfitting Risk:
```

---

# 175. STRATEGY VERDICT

The system may classify:

```text
PROMISING
ACCEPTABLE
WEAK
UNRELIABLE
REJECT
```

based on configurable validation rules.

This verdict must never be based solely on return.

---

# 176. EXAMPLE

Example only:

```text
Strategy:
Smart Money + Momentum

Period:
2019–2025

Initial Capital:
₹10,00,000

Final Capital:
₹18,40,000

CAGR:
10.7%

Maximum Drawdown:
11.2%

Sharpe:
1.05

Win Rate:
58%

Profit Factor:
1.62

Trades:
426

Transaction Costs:
₹84,000

Out-of-Sample:
Positive

Overfitting Risk:
LOW

Backtest Reliability:
HIGH

Verdict:
PROMISING
```

All numbers in examples are illustrative and must never be presented as actual historical performance.

---

# 177. IMPORTANT VALIDATION RULE

The system must never optimize parameters directly on the final out-of-sample dataset.

Once the final out-of-sample period is selected:

```text
LOCK IT
```

Use it only for final evaluation.

---

# 178. MODEL DEVELOPMENT LOOP

Correct:

```text
Research
↓
Training
↓
Validation
↓
Parameter selection
↓
Model freeze
↓
Out-of-sample test
↓
Paper trading
↓
Production
```

Incorrect:

```text
Backtest
↓
See result
↓
Change parameters
↓
Backtest same period
↓
Repeat until profitable
```

The second approach must be flagged as:

```text
OVERFITTING RISK
```

---

# 179. BACKTEST SAFETY RULE

The system must prefer:

```text
NO TRADE
```

over:

```text
Poor-quality simulated trade
```

---

# 180. FINAL OBJECTIVE

The Backtesting Engine exists to answer:

```text
Does the strategy have evidence of historical usefulness?
```

It does NOT answer:

```text
Will this strategy definitely make money in the future?
```

The final system must treat all historical results as evidence, not certainty.

---

# 181. IMPLEMENTATION REQUIREMENT

Claude Code must read:

```text
PRODUCT_REQUIREMENT.md
MASTER_SPEC.md
QUANT_MODEL.md
DATABASE_SPEC.md
DATA_SOURCES.md
SYSTEM_ARCHITECTURE.md
SIGNAL_ENGINE.md
BACKTESTING_SPEC.md
```

before implementing the Backtesting Engine.

If contradictions exist:

```text
STOP
REPORT THE CONFLICT
DO NOT GUESS
```

---

# 182. DEFINITION OF DONE

The Backtesting Engine is considered complete only when it can:

```text
✓ Run historical backtests
✓ Prevent look-ahead bias
✓ Prevent survivorship bias where data permits
✓ Use point-in-time information
✓ Simulate realistic execution
✓ Include transaction costs
✓ Include slippage
✓ Handle corporate actions
✓ Handle F&O expiry
✓ Handle options
✓ Handle commodities
✓ Calculate portfolio risk
✓ Calculate performance metrics
✓ Generate equity curve
✓ Generate drawdown curve
✓ Compare benchmarks
✓ Run walk-forward tests
✓ Run out-of-sample tests
✓ Run Monte Carlo analysis
✓ Perform parameter sensitivity
✓ Detect overfitting risk
✓ Track model versions
✓ Reproduce previous runs
✓ Store complete trade history
✓ Generate an audit-ready report
```

The ultimate objective is:

```text
BACKTEST
     ↓
VALIDATE
     ↓
PAPER TRADE
     ↓
OBSERVE
     ↓
VALIDATE AGAIN
     ↓
ONLY THEN CONSIDER LIVE USE
```

The system must never confuse a good backtest with a guarantee of future profit.
