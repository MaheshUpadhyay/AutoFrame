# AI MARKET INTELLIGENCE

## QUANTITATIVE MODEL SPECIFICATION

**Document Version:** 1.0
**Model Status:** V1 — Baseline Explainable Quantitative Model
**Market:** Indian Financial Markets
**Primary Exchanges:** NSE, BSE, MCX

---

# 1. PURPOSE

This document defines the mathematical framework used by AI Market Intelligence to transform market data into:

* Factor scores
* Composite scores
* Risk scores
* Evidence quality
* Confidence
* Expected value
* BUY/SELL/NO TRADE signals

This document is the quantitative source of truth for the application's decision engine.

Claude Code must NOT modify the mathematical methodology without explicit approval.

---

# 2. CORE PRINCIPLE

The model must never attempt to predict the future price directly.

Instead, it evaluates:

```text
CURRENT MARKET CONDITIONS
        ↓
FACTOR SCORES
        ↓
FACTOR AGREEMENT
        ↓
MARKET REGIME
        ↓
RISK
        ↓
HISTORICAL EVIDENCE
        ↓
EXPECTED VALUE
        ↓
SIGNAL
```

The model asks:

> "Given the information currently available, is the probability-adjusted opportunity attractive relative to its risk?"

---

# 3. SCORE SCALE

All major factor scores must eventually be normalized to:

```text
0–100
```

Interpretation:

|  Score | Interpretation    |
| -----: | ----------------- |
|   0–19 | Extremely Bearish |
|  20–34 | Strongly Bearish  |
|  35–44 | Bearish           |
|  45–54 | Neutral           |
|  55–64 | Mildly Bullish    |
|  65–74 | Bullish           |
|  75–84 | Strong Bullish    |
| 85–100 | Extremely Bullish |

A score of 50 represents neutral conditions.

---

# 4. DIRECTIONAL SCORE

For calculations where a raw value can be positive or negative, use a normalized directional score.

Conceptually:

```text
Directional Score = 50 + scaled_signal
```

The final value must be clipped:

```text
minimum = 0
maximum = 100
```

The scaling method must be chosen based on the statistical distribution of each feature.

Do NOT arbitrarily map every indicator using the same formula.

---

# 5. FACTOR ENGINES

V1 contains the following factors:

```text
1. Technical
2. Fundamental
3. Momentum
4. FII/DII
5. Smart Money
6. Sector
7. Options
8. News
9. Global
10. Macro
11. Geopolitical
12. Valuation
13. Market Breadth
```

Each factor produces:

```text
Factor Score
Data Quality
Confidence
Supporting Evidence
```

---

# 6. IMPORTANT MODEL RULE

Not every factor applies equally to every asset.

For example:

### Equity

Fundamental analysis is highly relevant.

### Index

Individual-company fundamentals are less relevant.

### Options

Implied volatility, Greeks, OI and underlying trend become more important.

### Gold

USD, real yields, central-bank activity and geopolitical risk become more important.

### Crude Oil

OPEC, inventories, geopolitics, USD and global demand become important.

Therefore:

```text
ASSET TYPE
+
TIME HORIZON
+
MARKET REGIME
```

must determine the appropriate factor weights.

---

# 7. TIME HORIZONS

The model must support:

```text
INTRADAY
SHORT_TERM
SWING
POSITIONAL
INVESTMENT
LONG_TERM
```

V1 should initially prioritize:

```text
SWING
POSITIONAL
INVESTMENT
```

Intraday and options-specific models can be added after the baseline model is validated.

---

# 8. TECHNICAL SCORE

## 8.1 Technical Components

The Technical Engine should initially consider:

* Trend
* Moving averages
* RSI
* MACD
* ADX
* ATR
* Bollinger Bands
* Support/resistance
* Breakout/breakdown
* Volume
* Relative volume

---

# 9. TREND SCORE

Trend should consider multiple timeframes.

Suggested timeframes:

```text
20 DMA
50 DMA
100 DMA
200 DMA
```

Example features:

```text
Price > 20 DMA
Price > 50 DMA
Price > 100 DMA
Price > 200 DMA
20 DMA > 50 DMA
50 DMA > 200 DMA
```

The model should not treat each condition as an independent trade signal.

They should be combined into a trend feature.

---

# 10. RSI

RSI must not use simplistic rules such as:

```text
RSI < 30 = BUY
RSI > 70 = SELL
```

Instead, RSI must be interpreted according to trend and regime.

Example:

In a strong bullish trend:

```text
RSI 65–75
```

may indicate strong momentum rather than overbought conditions.

In a weak market:

```text
RSI 65–75
```

may indicate exhaustion.

Therefore RSI must be combined with:

* Trend
* Momentum
* Market regime
* Volume

---

# 11. MACD

MACD analysis should consider:

* MACD line
* Signal line
* Histogram
* Histogram momentum
* Crossovers
* Zero-line position

The model should distinguish:

```text
Bullish crossover below zero
Bullish crossover above zero
Bearish crossover above zero
Bearish crossover below zero
```

These conditions should not have identical weights.

---

# 12. ADX

ADX measures trend strength rather than direction.

Therefore:

```text
ADX alone must NOT be interpreted as bullish or bearish.
```

Direction should be obtained from price/trend indicators.

---

# 13. VOLUME

Volume confirmation should be used for:

* Breakouts
* Breakdowns
* Trend continuation
* Accumulation
* Distribution

Relative volume should preferably be measured against a historical baseline.

Example:

```text
Relative Volume =
Current Volume / Average Volume
```

The lookback period must be configurable.

---

# 14. TECHNICAL SCORE STRUCTURE

Initial conceptual weighting:

```text
Trend              30%
Momentum           20%
Price Structure    15%
Volume             15%
RSI                10%
MACD               10%
```

These are BASELINE weights.

They must be backtested before being considered production optimized.

---

# 15. FUNDAMENTAL SCORE

The Fundamental Engine evaluates:

```text
Growth
Profitability
Balance Sheet
Cash Flow
Earnings Quality
Management/Governance
```

---

# 16. GROWTH SCORE

Consider:

* Revenue growth
* EBITDA growth
* PAT growth
* EPS growth
* Growth consistency
* Growth acceleration

Growth should be evaluated relative to:

* Company history
* Sector
* Market

---

# 17. PROFITABILITY SCORE

Consider:

* ROE
* ROCE
* EBITDA margin
* Net margin
* Margin stability

High profitability alone should not automatically create a BUY signal.

Trend and valuation must also be considered.

---

# 18. BALANCE SHEET SCORE

Consider:

* Debt/equity
* Net debt
* Interest coverage
* Cash
* Free cash flow
* Liquidity

Financial companies require sector-specific treatment.

The same debt rules must NOT be applied blindly to banks and non-financial companies.

---

# 19. CASH FLOW SCORE

Consider:

```text
Operating Cash Flow
Free Cash Flow
Cash Conversion
```

Potential warning:

```text
Profit rising
but
Operating Cash Flow deteriorating
```

This should reduce the earnings-quality score.

---

# 20. GOVERNANCE SCORE

Potential inputs:

* Promoter holding
* Promoter pledge
* Promoter buying/selling
* Auditor qualifications
* Regulatory issues
* Related-party transactions
* Governance warnings

Governance risk should have a strong negative influence.

---

# 21. FUNDAMENTAL SCORE STRUCTURE

Initial baseline:

```text
Growth              25%
Profitability       20%
Balance Sheet       20%
Cash Flow           15%
Earnings Quality    10%
Governance          10%
```

These are baseline weights.

---

# 22. MOMENTUM SCORE

Momentum should evaluate:

* 1-month return
* 3-month return
* 6-month return
* 12-month return
* Relative strength vs NIFTY
* Relative strength vs sector
* Momentum acceleration

The model must avoid double-counting momentum already captured by Technical Score.

Correlation between factors must be measured during validation.

---

# 23. FII/DII SCORE

FII/DII should be evaluated using multiple horizons.

```text
1 day
5 days
20 days
60 days
```

The system should calculate:

```text
FII trend
DII trend
Net institutional flow
Flow acceleration
```

A single day's activity should have relatively low influence.

Longer-term persistent flows should receive greater importance.

---

# 24. SMART MONEY SCORE

This is one of the most important factors in the system.

The objective is to identify:

> "Where are sophisticated/institutional investors increasing or reducing exposure?"

The model must focus on changes rather than absolute ownership.

---

# 25. SMART MONEY DATA

Where reliable data is legally available, consider:

* FII/FPI holdings
* DII holdings
* Mutual funds
* Insurance companies
* Institutional investors
* Promoter transactions
* Bulk deals
* Block deals
* Significant shareholder changes

---

# 26. INSTITUTIONAL ACCUMULATION

For each institution:

```text
Ownership Change =
Current Holding % - Previous Holding %
```

Example:

```text
Previous = 1.20%
Current = 2.10%

Change = +0.90%
```

This represents accumulation.

---

# 27. SMART MONEY COMPONENTS

The Smart Money Score should eventually combine:

```text
Ownership Change
Accumulation Magnitude
Accumulation Persistence
Number of Institutions
Institution Quality
Transaction Size
Concentration
Recent Acceleration
```

---

# 28. SMART MONEY ACCUMULATION SCORE

Conceptual components:

```text
Ownership Change             25%
Accumulation Persistence     20%
Institution Breadth          15%
Transaction Magnitude        15%
Recent Acceleration          10%
Institution Quality          10%
Concentration                5%
```

These are baseline weights.

---

# 29. SMART MONEY PERSISTENCE

Persistence is important.

Example:

```text
Quarter 1: +0.10%
Quarter 2: +0.30%
Quarter 3: +0.70%
```

This is stronger evidence than:

```text
Quarter 1: +1.10%
Quarter 2: -0.90%
Quarter 3: +0.10%
```

The model should reward persistent accumulation.

---

# 30. INSTITUTION BREADTH

Broad accumulation should be stronger than accumulation by a single investor.

Example:

```text
10 institutions increasing holdings
```

should generally be considered stronger confirmation than:

```text
1 institution increasing holdings
```

However, institution size and transaction magnitude must also be considered.

---

# 31. BIG INVESTOR CONVICTION SCORE

The system should create a dedicated metric:

```text
BIG_INVESTOR_CONVICTION
```

This measures:

```text
Who is buying?
How much are they buying?
How consistently are they buying?
How many investors are buying?
Are they increasing their position?
Are other institutions confirming the move?
```

This becomes a major component of the Smart Money Engine.

---

# 32. BULK/BLOCK DEAL SCORE

Large disclosed transactions should be classified.

The system should identify:

```text
BUY
SELL
UNKNOWN
```

and distinguish:

* Promoter
* Institutional investor
* Mutual fund
* Strategic investor
* Other significant investor

A large transaction must not automatically be treated as bullish.

The reason and counterparty should be considered where available.

---

# 33. SECTOR SCORE

Sector analysis should consider:

```text
Sector Momentum
Relative Strength
Sector Breadth
Institutional Flow
Earnings Trend
Valuation
Sector News
Macro Sensitivity
```

Initial baseline:

```text
Momentum            25%
Relative Strength   20%
Breadth              15%
Institutional Flow   15%
Earnings             10%
Valuation              5%
News                  10%
```

---

# 34. OPTIONS SCORE

Options analysis should eventually consider:

* Put OI
* Call OI
* Change in OI
* Volume
* IV
* IV percentile
* PCR
* Strike concentration
* Greeks
* Futures basis
* Expiry
* Unusual activity

---

# 35. OPTIONS INTERPRETATION

The model must NOT use simplistic rules.

Example:

```text
High Call OI = SELL
```

is invalid.

The model must consider:

```text
Price
+
OI change
+
Volume
+
IV
+
Expiry
+
Underlying trend
```

---

# 36. OPTIONS SUPPORT/RESISTANCE

Option positioning may be used to estimate:

* Support zones
* Resistance zones
* Maximum concentration
* Potential expiry zones

However, option-derived levels must be treated as probabilistic rather than guaranteed support/resistance.

---

# 37. NEWS SCORE

News should be classified by:

```text
Source Reliability
Importance
Sentiment
Market Impact
Time Decay
Confirmation
```

---

# 38. NEWS SOURCE WEIGHT

Conceptual priority:

```text
Regulatory/Official disclosure
        ↓
Company announcement
        ↓
Highly reliable financial publication
        ↓
Major news organization
        ↓
Secondary publication
        ↓
Unverified social media
```

Unverified information must have minimal influence.

---

# 39. NEWS TIME DECAY

News impact should decrease with time.

Conceptually:

```text
Impact(t) = Initial Impact × e^(-λt)
```

where:

```text
t = time since publication
λ = event-specific decay parameter
```

Different event types may require different decay speeds.

---

# 40. GLOBAL SCORE

Global factors may include:

```text
S&P 500
NASDAQ
Dow Jones
Asian Markets
European Markets
US Futures
VIX
USD
USD/INR
US Treasury Yields
Gold
Crude Oil
```

The effect must depend on the asset.

---

# 41. MACRO SCORE

Macro inputs:

* RBI policy
* Fed policy
* Inflation
* GDP
* PMI
* Interest rates
* Liquidity
* Bond yields
* Currency

Macro score must be asset-specific.

---

# 42. GEOPOLITICAL SCORE

Geopolitical analysis should estimate:

```text
Event Severity
Probability of Escalation
Economic Exposure
Supply Chain Exposure
Commodity Impact
Currency Impact
Market Risk
Sector Impact
```

A geopolitical event must not automatically create a market-wide SELL signal.

---

# 43. GEOPOLITICAL TRANSMISSION

Example:

```text
Event
 ↓
Oil supply risk
 ↓
Crude price
 ↓
Input costs
 ↓
Company margin
 ↓
Earnings impact
 ↓
Stock impact
```

The system should model the transmission chain.

---

# 44. VALUATION SCORE

Potential metrics:

* P/E
* Forward P/E where reliable
* P/B
* EV/EBITDA
* PEG
* Free cash flow yield
* Dividend yield

Valuation must be compared against:

```text
Company history
Sector
Market
Growth
Profitability
```

A high P/E is not automatically bearish if growth justifies the valuation.

---

# 45. MARKET BREADTH SCORE

Market breadth may consider:

```text
Advance/Decline
% stocks above 20 DMA
% stocks above 50 DMA
% stocks above 200 DMA
New highs
New lows
Sector breadth
```

Breadth is primarily a market-regime factor.

---

# 46. MARKET REGIME SCORE

The model should classify:

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

The regime should be calculated independently from individual-stock signals.

---

# 47. BASELINE COMPOSITE WEIGHTS

For the initial EQUITY SWING model:

```text
Technical          18%
Fundamental        15%
Momentum           10%
FII/DII             8%
Smart Money        15%
Sector              8%
Options             6%
News                5%
Global              4%
Macro               3%
Geopolitical        3%
Valuation            3%
Market Breadth       2%
--------------------------------
TOTAL              100%
```

IMPORTANT:

These are initial research weights.

They are NOT assumed to be optimal.

They must be backtested and evaluated.

---

# 48. WHY SMART MONEY HAS HIGH WEIGHT

Smart Money receives a relatively high initial weight because institutional capital movement can provide information not visible through price alone.

However:

```text
Smart Money ≠ Guaranteed Future Performance
```

Institutional investors can be wrong.

Institutions may also have reasons unrelated to short-term price expectations.

Therefore Smart Money must be combined with:

* Fundamentals
* Technicals
* Valuation
* Sector
* Market regime
* Risk

---

# 49. COMPOSITE SCORE

For each factor:

```text
Fi = normalized factor score
Wi = factor weight
```

Calculate:

```text
Weighted Factor =
Wi × Fi
```

where weights sum to:

```text
1.0
```

Composite score:

```text
Composite =
Σ(Wi × Fi)
```

Result:

```text
0–100
```

---

# 50. MISSING DATA

Missing data must NOT automatically receive:

```text
50
```

because that can falsely imply neutral evidence.

Instead, the system should calculate:

```text
Available Weight
```

and normalize using available factors where appropriate.

However, if critical factors are missing:

```text
NO TRADE
```

may be required.

---

# 51. DATA QUALITY ADJUSTMENT

Each factor receives:

```text
Factor Score
+
Data Quality
```

Example:

```text
Technical = 85
Data Quality = 98
```

is strong evidence.

But:

```text
Technical = 85
Data Quality = 45
```

should have significantly lower influence.

---

# 52. EVIDENCE QUALITY SCORE

Evidence Quality should consider:

```text
Data Completeness
Data Freshness
Source Reliability
Cross-source Confirmation
Historical Availability
Provider Health
```

Output:

```text
0–100
```

---

# 53. FACTOR AGREEMENT SCORE

Measure the dispersion of factor scores.

One possible methodology:

```text
Factor Dispersion =
Standard Deviation of factor scores
```

Lower dispersion means greater agreement.

Higher dispersion means greater disagreement.

The system should transform dispersion into:

```text
Agreement Score: 0–100
```

---

# 54. SIGNAL STABILITY

Measure how much the composite score changes over time.

Example:

```text
Score at t0 = 82
Score at t1 = 84
Score at t2 = 83
Score at t3 = 85
```

Stable.

But:

```text
82 → 61 → 85 → 48
```

is unstable.

Large unexplained oscillations should reduce confidence.

---

# 55. RISK SCORE

Risk is independent of bullish/bearish direction.

Potential components:

```text
Volatility
Liquidity
Drawdown
Event Risk
Earnings Risk
Market Regime
Gap Risk
Options IV
Geopolitical Exposure
```

Output:

```text
0–100
```

where:

```text
0 = Very Low Risk
100 = Extremely High Risk
```

---

# 56. REWARD/RISK

For a trade setup:

```text
Risk =
Entry - Stop Loss
```

for a long position.

```text
Reward =
Target - Entry
```

Risk/reward:

```text
Reward / Risk
```

The model should generally prefer setups with attractive expected reward relative to risk.

---

# 57. EXPECTED VALUE

For a long setup:

```text
EV =
P(Target) × Reward
-
P(Stop) × Risk
-
Transaction Costs
-
Expected Slippage
```

A trade should only be considered attractive when expected value exceeds the minimum threshold defined by the model.

---

# 58. HISTORICAL PROBABILITY

The system may estimate:

```text
P(Target before Stop)
```

from historical comparable setups.

Example:

```text
Comparable setups = 250
Target first = 162
Stop first = 88
```

Historical probability:

```text
162 / (162 + 88)
= 64.8%
```

This is historical evidence, NOT a guarantee.

---

# 59. SAMPLE SIZE REQUIREMENT

The model must not rely heavily on historical probability when sample size is small.

Example:

```text
3 trades
3 winners
100% win rate
```

must NOT be considered strong statistical evidence.

Minimum sample thresholds must be defined in the backtesting specification.

---

# 60. CONFIDENCE SCORE

Confidence should combine:

```text
Composite Score
Risk
Evidence Quality
Factor Agreement
Signal Stability
Historical Evidence
Sample Size
```

Confidence:

```text
0–100
```

High composite score alone must not guarantee high confidence.

---

# 61. SIGNAL DECISION MATRIX

Initial V1 thresholds:

### STRONG BUY

Requirements:

```text
Composite >= 85
Confidence >= 75
Evidence Quality >= 75
Risk <= 45
```

and no critical negative event.

---

### BUY

```text
Composite >= 75
Confidence >= 65
Evidence Quality >= 65
Risk <= 55
```

---

### ACCUMULATE

```text
Composite >= 68
Confidence >= 55
```

Suitable primarily for investment/long-term models.

---

### HOLD

```text
Composite 45–67
```

---

### REDUCE

```text
Composite 35–44
```

---

### SELL

```text
Composite <= 34
Confidence >= 65
Evidence Quality >= 65
```

---

### STRONG SELL

```text
Composite <= 19
Confidence >= 75
Evidence Quality >= 75
```

---

### NO TRADE

Any of:

```text
Insufficient data
Low evidence quality
Extreme signal instability
Excessive risk
Critical event uncertainty
Poor liquidity
Poor reward/risk
Insufficient historical evidence
Conflicting factors
```

---

# 62. HARD RISK FILTERS

Certain conditions can override the normal signal.

Examples:

```text
Extreme liquidity risk
Severe data quality problem
Trading halt
Major unresolved event
Extreme volatility
Insufficient price history
```

Result:

```text
NO TRADE
```

The AI must explain the reason.

---

# 63. SIGNAL PRIORITY

The decision hierarchy is:

```text
DATA VALIDITY
        ↓
RISK FILTER
        ↓
MARKET REGIME
        ↓
COMPOSITE SCORE
        ↓
CONFIDENCE
        ↓
HISTORICAL EVIDENCE
        ↓
SIGNAL
```

---

# 64. LONG-TERM INVESTMENT MODEL

The long-term model should give greater weight to:

* Fundamentals
* Smart Money
* Earnings
* Balance sheet
* Cash flow
* Valuation
* Sector
* Macro

Technical analysis should still be considered, but should not dominate.

---

# 65. SWING MODEL

The swing model should give greater weight to:

* Technical
* Momentum
* Smart Money
* Sector
* FII/DII
* Options
* Market regime

Fundamentals remain important as a risk/quality filter.

---

# 66. OPTIONS MODEL

Options require a separate model.

The model should consider:

```text
Underlying trend
Options positioning
IV
OI
OI change
Volume
Greeks
Expiry
Liquidity
Volatility regime
Risk/reward
```

Options signals should never be generated solely from PCR or OI.

---

# 67. COMMODITY MODEL

Commodity-specific models should eventually be developed.

### Gold

Potential factors:

```text
USD
US real yields
Fed
Central banks
Geopolitics
Inflation
Risk sentiment
```

### Crude Oil

Potential factors:

```text
OPEC+
Inventory
Global demand
USD
Geopolitics
Supply disruptions
Economic growth
```

Each commodity must have its own factor configuration.

---

# 68. POSITION SIZING

The system should eventually recommend position size based on:

```text
Account Risk
Trade Risk
Stop Distance
Volatility
Signal Confidence
Liquidity
```

A basic risk-based formula:

```text
Position Size =
Maximum Account Risk / Risk Per Unit
```

Example:

```text
Account = ₹10,00,000
Maximum risk = 1%

Maximum loss = ₹10,000
```

If stop-loss risk per share is:

```text
₹50
```

then:

```text
Position Size = 10,000 / 50
               = 200 shares
```

This is a risk-management calculation, not an investment recommendation.

---

# 69. MAXIMUM PORTFOLIO RISK

The system should eventually track:

```text
Total Open Risk
Sector Risk
Market Risk
Correlation Risk
Event Risk
```

It should prevent excessive concentration.

---

# 70. CORRELATION

Portfolio-level risk must account for correlation.

Example:

Holding:

```text
Bank A
Bank B
Bank C
```

is not three completely independent risks.

They may have strong correlation.

The portfolio engine should eventually calculate:

```text
Correlation Matrix
```

and:

```text
Portfolio Concentration
```

---

# 71. TRANSACTION COSTS

Backtesting must account for realistic costs.

Potential components:

* Brokerage
* STT
* Exchange transaction charges
* GST
* SEBI charges
* Stamp duty
* Slippage

The exact rates must be configurable and sourced from current official/provider information.

The model must never hard-code outdated rates.

---

# 72. SLIPPAGE

Backtesting must not assume perfect execution.

Slippage should be configurable based on:

* Liquidity
* Volatility
* Asset type
* Order size

Higher liquidity:

```text
Lower expected slippage
```

Lower liquidity:

```text
Higher expected slippage
```

---

# 73. OVERFITTING PROTECTION

The model must avoid excessive optimization.

Do NOT continuously adjust weights to maximize historical returns.

Every optimization must be validated using:

```text
Training Data
Validation Data
Out-of-Sample Test
Walk-Forward Test
```

---

# 74. MODEL ROBUSTNESS

A strategy should not be considered reliable merely because it works with one exact parameter.

Example:

If RSI period 14 works extremely well but:

```text
RSI 13 = terrible
RSI 15 = terrible
```

this may indicate overfitting.

Robust models should work reasonably well across nearby parameter values.

---

# 75. REGIME VALIDATION

Every model must be tested across different market conditions:

```text
Bull Market
Bear Market
Sideways Market
High Volatility
Low Volatility
Crisis
Recovery
```

A model that works only in one regime must be labeled accordingly.

---

# 76. FACTOR EFFECTIVENESS

The system should track whether each factor actually adds value.

For every factor, calculate:

```text
Predictive contribution
Win-rate contribution
Expected-value contribution
Correlation with other factors
Performance by regime
```

If a factor consistently adds no value, it should be reviewed.

---

# 77. FACTOR CORRELATION

The system must detect duplicate information.

Example:

```text
20 DMA trend
50 DMA trend
MACD
Momentum
```

may be highly correlated.

If multiple factors represent the same underlying phenomenon, blindly giving each high weight can double-count evidence.

The validation process must measure factor correlation.

---

# 78. MODEL CALIBRATION

If the model produces:

```text
Confidence = 80%
```

then historically similar 80% confidence situations should have approximately 80% favorable outcomes over a sufficiently large sample.

Confidence must eventually be calibrated.

---

# 79. PERFORMANCE REPORTING

The system must report:

```text
Signal Accuracy
Win Rate
Expected Value
Profit Factor
Maximum Drawdown
CAGR
Sharpe
Sortino
```

and break these down by:

```text
Asset
Sector
Model
Market Regime
Time Horizon
Confidence Level
```

---

# 80. SIGNAL JOURNAL

Every signal must store:

```text
Instrument
Timestamp
Model
Model Version
Signal
Composite Score
Confidence
Risk
Evidence Quality
Factor Scores
Entry
Stop
Target
Expected Value
Market Regime
Data Snapshot
```

This allows later evaluation.

---

# 81. SIGNAL OUTCOME

After a signal expires, record:

```text
Target Hit
Stop Hit
Expired
Invalidated
Manual Exit
```

and:

```text
Maximum Favorable Excursion
Maximum Adverse Excursion
Actual Return
Holding Period
```

---

# 82. MODEL FEEDBACK LOOP

The system should learn from historical outcomes through measurement.

Pipeline:

```text
Signal
 ↓
Outcome
 ↓
Performance Analysis
 ↓
Factor Analysis
 ↓
Model Review
 ↓
Potential New Model Version
 ↓
Backtest
 ↓
Validation
 ↓
Production Approval
```

No automatic uncontrolled self-modification.

---

# 83. AI RESTRICTION

The AI must NOT change:

* Factor weights
* Signal thresholds
* Risk limits
* Model parameters

automatically.

AI may recommend:

```text
"Factor X appears to have lost predictive power."
```

But a human-approved model update is required.

---

# 84. MODEL VERSIONING

Every quantitative configuration must have:

```text
Model Name
Model Version
Parameter Version
Factor Weights
Thresholds
Training Period
Validation Period
Test Period
Approval Status
```

---

# 85. V1 IMPLEMENTATION PRIORITY

The first quantitative implementation should focus on:

```text
1. Technical
2. Fundamental
3. Momentum
4. FII/DII
5. Smart Money
6. Sector
7. Market Breadth
8. Risk
9. Composite Score
10. Signal Engine
```

Then:

```text
Options
Global
Macro
News
Geopolitical
```

should be integrated progressively.

---

# 86. V1 MODEL PHILOSOPHY

The first production candidate must prioritize:

```text
EXPLAINABILITY
+
REPRODUCIBILITY
+
DATA QUALITY
+
BACKTESTABILITY
+
ROBUSTNESS
```

over:

```text
COMPLEXITY
+
AI
+
NUMBER OF INDICATORS
```

More indicators do not automatically produce a better model.

---

# 87. FINAL MODEL PIPELINE

The complete V1 pipeline is:

```text
                    MARKET DATA
                         │
                         ▼
                 DATA VALIDATION
                         │
                         ▼
               FEATURE ENGINEERING
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
    TECHNICAL       FUNDAMENTAL      SMART MONEY
        │                │                │
        ├───────┬────────┴───────┬────────┤
        ▼       ▼                ▼        ▼
     MOMENTUM FII/DII          SECTOR   OPTIONS
        │       │                │        │
        └───────┴────────┬───────┴────────┘
                         ▼
                GLOBAL / MACRO
                         │
                         ▼
              NEWS / GEOPOLITICAL
                         │
                         ▼
                  MARKET REGIME
                         │
                         ▼
                 COMPOSITE SCORE
                         │
                         ▼
                    RISK ENGINE
                         │
                         ▼
                EVIDENCE QUALITY
                         │
                         ▼
                 FACTOR AGREEMENT
                         │
                         ▼
                  SIGNAL STABILITY
                         │
                         ▼
              HISTORICAL EVIDENCE
                         │
                         ▼
                  EXPECTED VALUE
                         │
                         ▼
                 SIGNAL ENGINE
                         │
             ┌───────────┴───────────┐
             ▼                       ▼
          SIGNAL                    NO TRADE
             │
             ▼
       ENTRY / STOP / TARGET
             │
             ▼
       AI EXPLANATION
```

---

# 88. NON-NEGOTIABLE RULES

Claude Code MUST NOT:

1. Invent market data.
2. Invent institutional activity.
3. Invent news.
4. Use future information in historical calculations.
5. Modify model weights without approval.
6. Modify signal thresholds without approval.
7. Allow an LLM to directly create BUY/SELL signals.
8. Treat historical win rate as future certainty.
9. Ignore transaction costs in backtests.
10. Ignore slippage.
11. Ignore liquidity.
12. Hide missing data.
13. Treat missing data as neutral without justification.
14. Optimize exclusively for historical returns.
15. Overfit model parameters.
16. Automatically retrain and deploy models.
17. Guarantee profits.
18. Automatically execute real trades.

---

# 89. REQUIRED MODEL OUTPUT

For every security analyzed, the quantitative engine should ultimately produce a structure conceptually similar to:

```text
Instrument:
RELIANCE

Timestamp:
2026-08-30 10:30

Model:
SWING_V1.0

Technical:
82

Fundamental:
76

Momentum:
85

FII/DII:
71

Smart Money:
91

Sector:
84

Options:
78

News:
69

Global:
64

Macro:
67

Geopolitical:
72

Valuation:
61

Market Breadth:
74

--------------------------------

Composite Score:
78.4

Risk Score:
34

Evidence Quality:
91

Factor Agreement:
82

Signal Stability:
88

Historical Evidence:
73

Expected Value:
Positive

--------------------------------

SIGNAL:
BUY

CONFIDENCE:
79

ENTRY:
[Calculated by engine]

STOP:
[Calculated by engine]

TARGET 1:
[Calculated by engine]

TARGET 2:
[Calculated by engine]

REWARD/RISK:
[Calculated by engine]
```

---

# 90. IMPORTANT: PLACEHOLDER VALUES

The values and weights in this document are **baseline research parameters**.

They must NOT be presented as statistically proven until validated.

The application must clearly identify:

```text
BASELINE
BACKTESTED
VALIDATED
PRODUCTION
```

as different model statuses.

---

# 91. MODEL VALIDATION REQUIREMENT

Before a model is labeled:

```text
PRODUCTION
```

it must pass:

### Data validation

No major data integrity issues.

### Backtesting

Acceptable historical performance.

### Out-of-sample testing

Performance remains acceptable on unseen data.

### Walk-forward validation

Model remains reasonably stable.

### Regime testing

Model does not fail catastrophically under expected market regimes.

### Cost testing

Results remain reasonable after costs and slippage.

### Robustness testing

Small parameter changes do not destroy performance.

### Bias testing

No look-ahead or survivorship bias.

---

# 92. PRODUCTION APPROVAL

A model can only become production-ready after:

```text
Quantitative validation
+
Backtesting
+
Out-of-sample testing
+
Risk review
+
Human approval
```

Claude Code must not mark a model as production-ready based solely on successful code execution.

---

# 93. FUTURE MACHINE LEARNING

Machine learning is intentionally excluded from the V1 decision engine.

Future ML models may estimate:

```text
P(Target before Stop)
```

or:

```text
Expected Return
```

using the engineered factors.

ML models must be compared against the V1 baseline.

The ML model must NOT automatically replace the baseline simply because its historical score is higher.

---

# 94. FUTURE ENSEMBLE MODEL

Future versions may combine:

```text
Rule-Based Model
+
Statistical Model
+
Machine Learning Model
+
Regime Model
```

into an ensemble.

Example:

```text
Rule Model        40%
Statistical       20%
ML Model          25%
Regime Model      15%
```

These weights must be empirically validated.

---

# 95. FINAL PRINCIPLE

The objective is not:

> "Create a model that predicts every winning stock."

The objective is:

> "Create a disciplined research system that identifies statistically favorable opportunities, controls risk, explains its reasoning, and continuously measures whether its methodology actually works."

The system must prefer:

```text
NO TRADE
```

over:

```text
LOW QUALITY TRADE
```

when evidence is insufficient.

The most important output is not:

```text
BUY
```

It is:

```text
BUY
+
WHY
+
EVIDENCE
+
RISK
+
EXPECTED VALUE
+
HISTORICAL CONTEXT
+
WHAT WOULD INVALIDATE THE VIEW
```

---

# 96. NEXT SPECIFICATIONS

After this document, the next required specifications are:

```text
DATABASE_SPEC.md
DATA_SOURCES.md
SIGNAL_ENGINE.md
BACKTESTING_SPEC.md
AI_ENGINE.md
UI_SPEC.md
SECURITY_COMPLIANCE.md
```

The next immediate document should be:

```text
DATABASE_SPEC.md
```

because the quantitative model now tells us what information the application must store.
