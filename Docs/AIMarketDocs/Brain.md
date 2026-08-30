I recommend we freeze a Version 1 quantitative specification first. It should be deterministic, explainable, backtestable, and only later allow ML to optimize the weights.

One important principle: the model score and the probability/confidence must be different things. A score of 82/100 does not automatically mean an 82% chance of profit. We should calibrate probabilities from historical out-of-sample results.

Also, because the application may eventually provide research recommendations, we should maintain an audit trail of the data and reasoning behind every signal. SEBI's current RA framework specifically addresses AI use and requires responsibility for AI-derived research services and disclosure of AI use in applicable client-facing contexts.

1. Our core model

I suggest this architecture:

Raw Data → Normalized Data → Features → Factor Scores → Market Regime → Composite Score → Risk Filter → Signal → Historical Probability → AI Explanation

Not:

Raw Data → AI → Buy

2. We need 3 separate models

Don't create one giant score.

We should have:

Model A — Investment model

For approximately 1–12 months

Best for:

quality stocks
fundamentals
institutional accumulation
valuation
earnings
Model B — Swing model

For approximately 2–30 trading days

Best for:

technical momentum
institutional flow
sector rotation
options
news
Model C — Trading model

For approximately intraday–5 trading days

Best for:

price action
volume
VWAP
OI
volatility
global cues
market regime

The same stock can therefore have:

Investment: 🟢 BUY
Swing: 🟢 BUY
Trading: 🟡 NO TRADE

That is much more realistic.

3. Master Stock Score

For the Swing Model, I propose this initial weighting:

Factor	Weight
Technical	15%
Fundamental	12%
Momentum	8%
FII/DII	10%
Smart Money / Institutional	12%
Sector Strength	8%
Options	10%
News/Sentiment	6%
Global Market	5%
Macro	4%
Geopolitical	4%
Valuation	3%
Total	100%

This is our starting hypothesis, not something we assume is optimal.

After collecting sufficient historical signals, the backtester should determine whether these weights actually work.

4. Technical Score — 0 to 100

I'd divide it like this:

Trend — 30 points
Price > 20 EMA → 5
Price > 50 EMA → 5
Price > 200 DMA → 5
20 EMA > 50 EMA → 5
50 DMA > 200 DMA → 5
ADX confirms trend → 5
Momentum — 25
RSI healthy bullish zone → 5
MACD bullish → 5
ROC positive → 5
momentum vs NIFTY → 5
momentum vs sector → 5
Price structure — 25
higher highs → 5
higher lows → 5
breakout → 10
resistance/support structure → 5
Volume — 20
relative volume → 5
breakout volume → 5
accumulation/distribution → 5
delivery/volume confirmation → 5

Technical Score = 0–100

But don't blindly add indicator points. Correlated indicators can otherwise double-count the same information.

We'll therefore add a correlation-control layer later.

5. Fundamental Score — 100
Growth — 20

Revenue:

acceleration
3Y CAGR
consistency

Profit:

PAT growth
EPS growth
Profitability — 20
ROE
ROCE
EBITDA margin
net margin
Balance Sheet — 20
debt/equity
interest coverage
cash flow
free cash flow
Earnings Quality — 20
operating cash flow vs PAT
earnings consistency
receivables
working capital
margin stability
Governance/Ownership — 20
promoter holding
promoter pledge
institutional ownership
related-party concerns
auditor qualifications
governance flags

Result:

Fundamental Score = 0–100

6. Smart Money Score — this is one of our most important engines

This is the feature we just discussed.

I'd give it 12% of the master score, initially.

Institutional ownership change — 20

Increasing institutional ownership:

score

Decreasing:

− score

Mutual Fund accumulation — 15
Insurance accumulation — 10
FII/FPI stock-level accumulation — 15
Bulk/block deals — 15
Promoter activity — 10

Promoter buying:

positive

Promoter selling:

negative

But promoter selling needs contextual interpretation.

Major investor activity — 15

Track disclosed major investors where reliable data exists.

More importantly: calculate the direction

Don't store only:

Investor X owns 2.1%

Store:

Previous quarter: 1.2%
Current quarter: 2.1%
Change: +0.9%

Then:

Institutional Accumulation Velocity

This is much more useful.

7. Smart Money example

Suppose:

ABC:

MF ownership +1.2%
FII +0.7%
Insurance +0.3%
3 institutional bulk purchases
promoter unchanged
major investors accumulating

Then:

Smart Money Score = 91/100

But if:

FII −1.5%
MF −0.8%
institutional exits
block-sale activity

then:

Smart Money Score = 28/100

8. FII/DII Score

This should be different from Smart Money.

FII
cash
futures
options
sector exposure
DII
cash
mutual funds
insurance
domestic institutions

Score:

FII/DII = -100 to +100

Then normalize to:

0–100

For example:

+80 = strongly bullish

+20 = mildly bullish

0 = neutral

−50 = bearish

−90 = strongly bearish

This is important because FII/DII data can be market-wide while Smart Money is more security/ownership oriented.

9. Sector Score

This should be relative, not absolute.

For each sector:

30 points — relative strength

Sector vs NIFTY

20 — momentum
20 — institutional flow
15 — earnings momentum
10 — valuation
5 — news

Result:

Sector Score 0–100

Then each stock inherits part of its sector score.

This prevents the model from recommending a technically good stock in a collapsing sector without recognizing the risk.

10. Options Score

This should be 10%, but only for F&O stocks/indexes.

For non-F&O stocks:

Options weight = 0

and the remaining weights are redistributed.

Don't treat missing options data as zero.

That's a very important database/model rule.

Options factors
OI structure — 20
OI change — 20
Put/Call positioning — 10
IV — 15
IV percentile — 10
Greeks — 10
Futures basis — 10
unusual activity — 5

NSE's option chain provides OI, change in OI, volume, IV, bid/ask and related fields, so our normalized options model should preserve those raw fields rather than storing only derived indicators.

11. News Score

I would not let news dominate the model.

Maximum initial weight:

6%

Because otherwise one sensational headline can destroy a quantitative model.

Each event gets:

Sentiment

−100 → +100

Importance

0 → 100

Source reliability

0 → 100

Confirmation

0 → 100

Time decay

Fresh news gets more weight.

For example:

Breaking verified regulatory announcement:

Impact = 95

Three-day-old generic article:

Impact = 15

Unverified social-media rumor:

Impact = 5

12. Geopolitical Score

This deserves its own engine.

Don't score:

"War = bearish"

Instead:

Event → transmission channels → affected assets

Example:

Middle East escalation

↓

Crude +++

Gold ++

Shipping risk ++

Inflation risk +

↓

Indian sectors:

Oil producers ↑

Airlines ↓

Paints ↓

Chemicals ↓

Logistics ↓

Gold-related assets ↑

Then calculate stock-specific exposure.

This is much more powerful.

13. Global Market Score

For an Indian equity:

S&P/Nasdaq — 15%
Asian markets — 15%
US futures — 15%
VIX — 15%
USD/INR — 10%
US 10Y — 10%
Crude — 10%
Global risk regime — 10%

Result:

Global Score = 0–100

14. Macro Score

Monitor:

RBI
Fed
inflation
rates
bond yields
GDP
PMI
liquidity
currency

But the macro score must be sector-sensitive.

For example:

Higher crude:

Oil producers → positive

Airlines → negative

Paints → negative

Tyres → negative

Oil marketing → potentially negative

So:

Macro Impact ≠ same score for every stock.

15. Valuation Score

For investment decisions, this becomes more important.

Compare:

Company vs own history

P/E vs 5Y median

Company vs sector

P/E vs sector median

Growth-adjusted valuation

PEG

Cash-flow valuation

FCF yield

Enterprise valuation

EV/EBITDA

Then:

Valuation Score 0–100

But:

Cheap ≠ Buy

A cheap stock with deteriorating fundamentals should remain unattractive.

16. Composite score

Now we calculate:

Composite Score =
    Technical × Weight
  + Fundamental × Weight
  + Momentum × Weight
  + FII/DII × Weight
  + Smart Money × Weight
  + Sector × Weight
  + Options × Weight
  + News × Weight
  + Global × Weight
  + Macro × Weight
  + Geopolitical × Weight
  + Valuation × Weight

But I want one additional component:

17. Evidence Quality Score

This is extremely important.

Suppose the model says:

BUY = 86

but half the data is stale.

That's not really an 86-quality opportunity.

So calculate:

Evidence Quality = 0–100

Factors:

price freshness
fundamental freshness
options freshness
institutional data freshness
news freshness
global data freshness
data completeness
source reliability
18. Signal score ≠ final decision

Let's say:

Composite = 86

but:

Evidence Quality = 52

Final:

NO TRADE / INSUFFICIENT DATA

This is exactly the sort of protection I want built into the system.

19. Risk Score

Create a separate:

Risk Score = 0–100

Higher = riskier.

Inputs:

volatility
ATR
beta
liquidity
spread
gap risk
event risk
geopolitical exposure
earnings proximity
options IV
drawdown
correlation

Then:

Opportunity Score

should consider both:

Expected Return + Risk

20. Risk-adjusted opportunity

For example:

Stock A

Score: 91

Risk: 85

Stock B

Score: 82

Risk: 35

The app should potentially prefer Stock B.

This is crucial.

21. Expected return

Don't let AI invent a target.

Calculate target using multiple methods:

Technical
resistance
ATR
Fibonacci where appropriate
Statistical

Historical move distribution.

Volatility

Expected move based on ATR/IV.

Risk/reward

Require minimum:

1 : 1.5

Prefer:

1 : 2+

Then calculate:

Expected Return

and:

Expected Value

22. Confidence model

This should be separate from the score.

Initially:

Confidence is based on:

historical performance of similar setups
factor agreement
data quality
market regime similarity
signal stability
model calibration

For example:

Composite = 84

Historical similar setups:

72% profitable

Evidence Quality = 94

Factors strongly aligned

↓

Model Confidence = 78/100

But we should eventually calibrate this statistically.

23. Final signal algorithm

I'd make it:

Step 1

Calculate factor scores.

Step 2

Calculate composite score.

Step 3

Calculate evidence quality.

Step 4

Calculate risk.

Step 5

Calculate expected reward/risk.

Step 6

Check market regime.

Step 7

Check liquidity.

Step 8

Check event risk.

Step 9

Check historical performance.

Step 10

Generate signal.

Example:

Composite       84
Evidence        94
Risk             38
R:R             2.4
Confidence       79

→ BUY

But:

Composite       87
Evidence        91
Risk             91
R:R             1.1
Confidence       52

→ NO TRADE

This is much better than simply:

Score > 80 = Buy.

24. Signal categories

I'd use:

Final Score	Signal
85–100	STRONG BUY
75–84	BUY
65–74	ACCUMULATE
45–64	HOLD
35–44	REDUCE
20–34	SELL
0–19	STRONG SELL

BUT risk/evidence filters can override these.

25. Database model

Now the database.

I recommend PostgreSQL + TimescaleDB for the time-series portion.

Core tables
instruments
exchanges
sectors
industry_groups
trading_calendars
Market data
price_ticks
ohlcv
market_depth
volume_data
corporate_actions
Fundamentals
company_profiles
financial_statements
fundamental_metrics
earnings
earnings_estimates
promoter_holdings
Institutional
fii_activity
dii_activity
institutional_holdings
bulk_deals
block_deals
major_investors
investor_transactions
Derivatives
futures_contracts
futures_ohlcv
options_contracts
options_chain_snapshots
options_greeks
options_features
Global
global_indices
global_macro
currencies
bond_yields
commodities_global
News
news_articles
news_entities
news_events
news_sentiment
geopolitical_events
event_asset_impacts
Quant
technical_features
momentum_features
sector_features
valuation_features
institutional_features
options_features
macro_features
global_features
Decision system
market_regimes
factor_scores
composite_scores
risk_scores
signals
signal_factors
signal_targets
signal_invalidations
Validation
historical_predictions
prediction_outcomes
backtest_runs
backtest_trades
model_versions
model_parameters
model_experiments
AI
ai_analysis
ai_sources
ai_prompts
ai_model_runs
Application
watchlists
alerts
user_settings
system_events
data_provider_status
26. Most important table: signals

Every generated signal should have something like:

signal_id
instrument_id
timestamp
model_type
model_version

signal
composite_score
confidence_score
risk_score
evidence_score

entry_price
stop_loss
target_1
target_2

risk_reward
expected_return
expected_holding_period

market_regime
sector_regime

technical_score
fundamental_score
momentum_score
fii_dii_score
smart_money_score
sector_score
options_score
news_score
global_score
macro_score
geopolitical_score
valuation_score

data_quality_score

reason_summary
invalidation_reason

created_at

This table becomes the historical brain of the system.

27. signal_factors

Don't store only the final number.

For every factor:

signal_id
factor_name
raw_value
normalized_value
weight
weighted_contribution
direction
confidence
data_timestamp
source_id

Then the application can literally explain:

Technical contributed +12.7 points.

Smart Money contributed +10.8.

Options contributed −3.1.

Geopolitical contributed −1.4.

That is explainable AI.

28. Model versioning

Every signal must say:

model_version = SWING_V1.0

If we later change the weights:

SWING_V1.1

Never overwrite V1.0.

This allows us to answer:

Did V1.1 actually improve performance?

29. Backtesting database

A backtest record should contain:

backtest_id
model_version
instrument
start_date
end_date

entry_rule
exit_rule

initial_capital
transaction_cost
slippage

total_trades
winning_trades
losing_trades
win_rate

gross_profit
gross_loss
net_profit

profit_factor
expectancy

max_drawdown
sharpe
sortino

cagr
average_holding_period

market_regime

And individual trades:

trade_id
backtest_id
signal_id
entry_time
entry_price
exit_time
exit_price
stop_price
target_price

gross_pnl
costs
net_pnl

max_favorable_excursion
max_adverse_excursion

exit_reason
30. Very important: don't train on future information

Suppose we backtest a stock in 2021.

The model must only know information that existed on that date.

It must NOT use:

today's fundamentals
revised historical data
future corporate actions
today's index constituents
future institutional holdings

Otherwise we'll get a fantastic-looking but completely fake model.

This is one of the biggest dangers in quantitative backtesting.

31. Model training architecture

I would initially use:

V1

Pure rules + statistics.

V2

Statistical optimization.

V3

Machine learning.

Potential ML models:

Logistic Regression
Random Forest
XGBoost
LightGBM

Don't start with neural networks.

Our first question should be:

Can simple, explainable factors produce statistically significant predictive power?

If yes, then ML can improve it.

32. ML target

Eventually the ML model should predict something like:

Classification

Probability that:

+3% return occurs before −2% stop within 20 trading days

For example:

P(target before stop) = 0.71

This is far more useful than:

"Will Reliance go up?"

We define the exact prediction problem.

33. Separate prediction horizons

Create targets:

Short-term

5 trading days

Swing

20 trading days

Medium-term

60 trading days

Investment

252 trading days

Then the model can say:

5D: 58% bullish
20D: 74% bullish
60D: 81% bullish

This is much more informative.

34. Smart Money has one special problem

Institutional ownership information often isn't real-time.

Therefore we need:

Data Timestamp

and:

Information Availability Timestamp

The model must understand the difference.

Example:

Holding reported on September 10

The system should only use it once that information was publicly available.

This is another important protection against look-ahead bias.

35. Same thing for fundamentals

Quarterly results aren't known continuously.

If a company reports results on:

12 August

the backtest cannot use those results on:

10 August.

Our database therefore needs:

available_at

in addition to:

period_end.

This one field will save us from enormous backtesting errors.

36. Market regime should modify the weights

This is where our model becomes much more sophisticated.

Example:

Bull Market

Technical: 18%

Momentum: 12%

Smart Money: 12%

Fundamental: 12%

Options: 10%

etc.

Bear Market

Fundamental: 16%

Smart Money: 15%

FII/DII: 13%

Global: 10%

Geopolitical: 8%

Technical: 12%

etc.

Sideways

Technical: 18%

Options: 15%

Momentum: 12%

Smart Money: 10%

etc.

But again:

These weights are hypotheses.

The backtester should determine whether regime-specific weighting improves out-of-sample results.

37. One additional factor I want to add

We originally had:

Technical
Fundamental
FII/DII
Smart Money
Options
Sector
Global
Macro
News
Geopolitical
Valuation

I want to add:

MARKET BREADTH

This is important.

Track:

Advance/Decline
stocks above 20 DMA
stocks above 50 DMA
stocks above 200 DMA
new highs
new lows
sector breadth

A NIFTY rise where only 5 stocks are driving the index is different from a broad-based rally.

So:

Breadth Score = 0–100

I'd initially give it 5%.

We can reduce other weights proportionally.

38. Revised Swing Model

I now prefer:

Factor	Weight
Technical	14%
Fundamental	11%
Momentum	8%
FII/DII	9%
Smart Money	11%
Sector	8%
Options	9%
News	5%
Global	5%
Macro	4%
Geopolitical	4%
Valuation	2%
Market Breadth	5%
Total	100%

This is the starting model.

39. But don't allow weights to hide bad data

Here's an important implementation rule for Claude.

If Options data isn't available:

Don't do:

Options score = 0

Instead:

available factors = 91%

Then normalize the available weights:

effective_score =
sum(available weighted factors)
/
sum(available weights)

But impose:

minimum evidence threshold = 75%

Below that:

NO TRADE / INSUFFICIENT DATA

40. Signal stability

Another feature I want.

If:

9:30 AM → BUY 81

10:00 → BUY 80

10:30 → HOLD 62

11:00 → BUY 83

the model is unstable.

We should calculate:

Signal Stability Score

If the signal keeps flipping:

→ lower confidence.

This will reduce noisy intraday signals significantly.

41. Conflict score

Another very useful feature.

Suppose:

Technical = 90

Fundamental = 30

Smart Money = 85

Options = 25

That's a high-conflict setup.

Calculate:

Factor Dispersion

If factor scores are tightly aligned:

Low conflict → higher confidence.

If they are widely dispersed:

High conflict → lower confidence.

42. Final confidence formula

Initially:

Confidence =
30% Historical Similar-Setup Probability
20% Factor Agreement
15% Evidence Quality
15% Signal Stability
10% Market Regime Alignment
10% Liquidity/Execution Quality

Then normalize:

0–100

This is much better than simply converting composite score into confidence.

43. Final decision example

Suppose:

Technical       91
Fundamental     78
Momentum        88
FII/DII         76
Smart Money     93
Sector          86
Options         82
News            71
Global          68
Macro           72
Geopolitical    65
Valuation       60
Breadth         81

Composite:

82.4

Risk:

32

Evidence:

94

Factor agreement:

High

Historical similar setups:

71% target-before-stop

Final:

🟢 BUY

Confidence: 78/100

Not:

"78% guaranteed profit."

Instead:

"Historical probability for comparable model setups: 71%."

That's a very important distinction.

44. Now the most powerful part: model feedback

After every signal:

Signal generated
       ↓
Entry
       ↓
Target / Stop
       ↓
Outcome
       ↓
Compare expected vs actual
       ↓
Store result
       ↓
Analyze factor contribution

Eventually we'll know things like:

Smart Money Score >85 + Technical >80 + Sector >75 has historically produced strong swing outcomes.

And perhaps:

Options Score >85 is actually unreliable during high-volatility regimes.

That knowledge should come from our own database, not from assumptions.

45. The AI comes last

Once all this structured information exists, Claude/LLM gets something like:

Stock: XYZ

Composite: 82
Confidence: 78
Risk: 32

Technical: 91
Fundamental: 78
Smart Money: 93
Options: 82
Sector: 86
Global: 68

Historical similar setups:
127

Target-before-stop:
71%

Bull factors:
...

Bear factors:
...

Risks:
...

Then AI generates:

"XYZ qualifies as a BUY primarily because..."

That makes hallucination much less likely.

46. One thing I would NOT put into V1

Don't let the model automatically learn weights every day.

That's dangerous.

Instead:

V1

Fixed weights.

V1.1

Backtest alternative weights.

V1.2

Walk-forward optimization.

V2

ML model.

V3

Ensemble:

Rules + Statistical Model + ML + Regime Model

Then compare all four.

47. Our actual V1 "brain"

So the architecture I would freeze now is:

                    RAW MARKET DATA
                           ↓
                 DATA QUALITY ENGINE
                           ↓
                  FEATURE ENGINEERING
                           ↓
       ┌─────────── FACTOR ENGINES ───────────┐
       │                                       │
 Technical      Fundamental       Momentum     │
 FII/DII        Smart Money       Sector       │
 Options        News              Global       │
 Macro          Geopolitical      Valuation    │
 Breadth                                       │
       └────────────────┬──────────────────────┘
                        ↓
                 MARKET REGIME
                        ↓
                WEIGHT SELECTION
                        ↓
                 COMPOSITE SCORE
                        ↓
                   RISK ENGINE
                        ↓
               EVIDENCE QUALITY
                        ↓
                 SIGNAL STABILITY
                        ↓
                  CONFLICT SCORE
                        ↓
               HISTORICAL MODEL
                 PERFORMANCE
                        ↓
                  FINAL SIGNAL
                        ↓
               AI EXPLANATION
                        ↓
              PREDICTION DATABASE
                        ↓
                   BACKTEST
                        ↓
                 MODEL REVIEW