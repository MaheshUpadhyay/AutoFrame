# AI MARKET INTELLIGENCE

# UI / UX SPECIFICATION

**Document Version:** 1.0
**Status:** Core System Specification
**Application Type:** Desktop Market Intelligence & Research Application
**Primary Market:** India
**Asset Classes:** Equity, Futures, Options, Commodities
**Primary User:** Individual investor/trader/research user

---

# 1. PURPOSE

The UI must provide a professional market-research experience that allows the user to:

* Understand the current Indian market
* Understand why the market is moving
* Identify potential BUY opportunities
* Identify potential SELL opportunities
* Identify NO-TRADE situations
* Monitor equity
* Monitor options
* Monitor futures
* Monitor commodities
* Monitor FII/DII activity
* Monitor big-investor activity
* Monitor global markets
* Monitor geopolitical events
* Monitor macroeconomic events
* Monitor portfolio risk
* Understand AI-generated research
* Review historical signals
* Review performance of the recommendation engine

The UI must prioritize:

```text
CLARITY
ACTIONABILITY
TRANSPARENCY
RISK AWARENESS
EVIDENCE
```

over visual complexity.

---

# 2. DESIGN PHILOSOPHY

The application should feel like:

```text
Professional Research Terminal
+
AI Research Assistant
+
Portfolio Risk Monitor
+
Trading Signal Dashboard
```

It must NOT look like:

```text
Casino
Gambling App
Social Media App
Crypto Trading App
```

Avoid excessive animations, flashing prices, unnecessary gradients, and distracting visual effects.

---

# 3. PRIMARY USER FLOW

When the application starts:

```text
APPLICATION START
       ↓
CHECK INTERNET
       ↓
CHECK DATA SOURCES
       ↓
LOAD LAST MARKET STATE
       ↓
SYNC DATA
       ↓
CHECK MARKET SESSION
       ↓
RUN MARKET ANALYSIS
       ↓
GENERATE SIGNALS
       ↓
RUN RISK ENGINE
       ↓
RUN RECOMMENDATION ENGINE
       ↓
GENERATE ALERTS
       ↓
DISPLAY MARKET DASHBOARD
```

---

# 4. MAIN APPLICATION LAYOUT

The desktop application should use:

```text
┌─────────────────────────────────────────────────────────────┐
│ TOP BAR                                                     │
│ Logo | Market Status | Search | Notifications | Settings   │
├───────────────┬─────────────────────────────────────────────┤
│               │                                             │
│ LEFT          │                                             │
│ NAVIGATION    │             MAIN CONTENT                    │
│               │                                             │
│ Dashboard     │                                             │
│ Markets       │                                             │
│ Stocks        │                                             │
│ Options       │                                             │
│ Commodities   │                                             │
│ Investors     │                                             │
│ News          │                                             │
│ Portfolio     │                                             │
│ Alerts        │                                             │
│ Research      │                                             │
│ Backtesting   │                                             │
│ Models        │                                             │
│               │                                             │
├───────────────┴─────────────────────────────────────────────┤
│ STATUS BAR                                                   │
│ Data Status | Last Update | System Health | Version         │
└─────────────────────────────────────────────────────────────┘
```

---

# 5. LEFT NAVIGATION

Navigation items:

```text
Dashboard
Markets
Stocks
Options
Futures
Commodities
Big Investors
FII / DII
News & Events
Portfolio
Alerts
Research
Backtesting
Model Health
System Health
Settings
```

---

# 6. TOP BAR

Top bar must display:

```text
Application Logo
Market Session
Internet Status
Data Status
Global Market Status
Search
Alert Counter
Portfolio Status
Settings
```

Example:

```text
AI Market Intelligence

🟢 MARKET OPEN
🟢 DATA CONNECTED
🟢 INTERNET CONNECTED

Search: [ Search stock, index, commodity... ]

🔔 4
```

---

# 7. MARKET SESSION STATUS

Display:

```text
PRE-MARKET
MARKET OPEN
CLOSING
POST-MARKET
MARKET CLOSED
WEEKEND
HOLIDAY
```

The status must be based on Indian market time.

Timezone:

```text
Asia/Kolkata
```

---

# 8. INTERNET STATUS

Display:

```text
🟢 ONLINE
🟡 LIMITED
🔴 OFFLINE
```

When offline:

```text
OFFLINE — Showing last available data
```

Never make stale data look live.

---

# 9. DATA STATUS

Show:

```text
Market Data
News
FII/DII
Options
Global Markets
Commodities
```

with status:

```text
LIVE
RECENT
DELAYED
STALE
FAILED
```

---

# 10. DASHBOARD

The Dashboard is the primary screen.

It must answer:

> "What is happening in the market right now?"

within a few seconds.

---

# 11. DASHBOARD SECTIONS

Dashboard order:

```text
1. Market Overview
2. AI Market View
3. Top Opportunities
4. Top Risks
5. Major Alerts
6. FII/DII
7. Big Investors
8. Sector Rotation
9. Options Market
10. Commodities
11. Global Markets
12. News & Events
13. Portfolio
```

---

# 12. MARKET OVERVIEW

Display:

```text
NIFTY 50
SENSEX
BANK NIFTY
NIFTY MIDCAP
NIFTY SMALLCAP
INDIA VIX
```

Each card:

```text
Index
Current Value
Change
Change %
Trend
AI Signal
```

Example:

```text
NIFTY 50

25,432
+182 (+0.72%)

Trend:
Bullish

AI View:
BUY ON CONFIRMATION

Confidence:
78%
```

---

# 13. MARKET BREADTH

Display:

```text
Advancing
Declining
Unchanged
52-Week High
52-Week Low
Above 50 DMA
Above 200 DMA
```

Example:

```text
Market Breadth

Advancing     1,284
Declining       932
Unchanged       114

Breadth:
Positive
```

---

# 14. AI MARKET VIEW

Prominent dashboard component:

```text
AI MARKET VIEW
```

Example:

```text
Overall Market:
NEUTRAL → BULLISH

Score:
72 / 100

Confidence:
81%

Market Regime:
Bullish / Moderate Volatility

Key Drivers:
• FII selling reduced
• Domestic institutional buying strong
• Global markets positive
• Banking sector improving
• Crude stable

Major Risks:
• US macro event tomorrow
• Elevated valuation
```

---

# 15. MARKET SCORE

Display:

```text
Market Score:
0–100
```

Components:

```text
Technical
Fundamental
FII/DII
Global
Macro
Sentiment
Options
Breadth
Risk
```

Allow the user to expand and see component scores.

---

# 16. TOP OPPORTUNITIES

Display:

```text
TOP OPPORTUNITIES
```

Example:

```text
1. RELIANCE
BUY ON CONFIRMATION
Score 87
Confidence 81%

2. HDFC BANK
BUY
Score 82
Confidence 79%

3. TATA MOTORS
WATCH
Score 74
Confidence 72%
```

---

# 17. OPPORTUNITY CARD

Every opportunity card should show:

```text
Asset
Action
Signal Score
Confidence
Risk
Time Horizon
Entry
Stop Loss
Target
Expected Return
Risk/Reward
```

---

# 18. TOP RISKS

Display:

```text
TOP MARKET RISKS
```

Examples:

```text
🔴 Crude Oil Supply Risk
🔴 FII Selling
🟠 India VIX Rising
🟠 Global Market Weakness
```

---

# 19. MAJOR ALERTS

Display latest important alerts.

Example:

```text
🔴 HIGH

NIFTY Breakdown Risk

Score:
88

Reason:
Support broken + volume expansion + weak breadth

Action:
Review risk / avoid aggressive longs
```

---

# 20. STOCKS SCREEN

Stocks page should provide:

```text
Search
Watchlist
Filters
Market Scanner
Sector
Market Cap
Signal
Risk
Momentum
Fundamentals
Institutional Activity
```

---

# 21. STOCK TABLE

Columns:

```text
Symbol
Price
Change %
Volume
Trend
Signal
Score
Confidence
Risk
FII/DII
Big Investor
Valuation
```

Example:

```text
RELIANCE | ₹1,420 | +1.8% | High | Bullish | BUY | 86 | 82% | Medium
```

---

# 22. STOCK DETAIL PAGE

Clicking a stock opens:

```text
Overview
Price Chart
Technical
Fundamentals
Institutional
Big Investors
Options
News
AI Research
Signals
Risk
Backtest
```

---

# 23. STOCK HEADER

Example:

```text
RELIANCE INDUSTRIES

₹1,420
+₹25 (+1.8%)

AI SIGNAL:
BUY

Score:
86/100

Confidence:
82%

Risk:
MEDIUM

Time Horizon:
1–3 Months
```

---

# 24. STOCK PRICE CHART

Support:

```text
1D
1W
1M
3M
6M
1Y
3Y
5Y
10Y
MAX
```

Allow indicators:

```text
50 DMA
100 DMA
200 DMA
VWAP
Bollinger Bands
Volume
```

---

# 25. TECHNICAL ANALYSIS PANEL

Display:

```text
Trend
Momentum
RSI
MACD
ADX
Moving Averages
Support
Resistance
Volume
Volatility
```

Example:

```text
Trend:
Bullish

Momentum:
Strong

RSI:
62

ADX:
28

200 DMA:
₹1,280

Support:
₹1,350

Resistance:
₹1,460
```

---

# 26. FUNDAMENTAL PANEL

Display:

```text
Revenue
Revenue Growth
EBITDA
EBITDA Margin
PAT
EPS
EPS Growth
ROE
ROCE
Debt
Cash Flow
PE
PB
PEG
Dividend
```

Also display trend over multiple years.

---

# 27. FUNDAMENTAL SCORE

Display:

```text
Fundamental Score:
78/100
```

Breakdown:

```text
Growth
Profitability
Balance Sheet
Cash Flow
Valuation
Management
```

---

# 28. INSTITUTIONAL ACTIVITY

Display:

```text
FII Holding
DII Holding
Mutual Funds
Insurance
Foreign Investors
Promoters
Holding Changes
```

Chart:

```text
Institutional Ownership Trend
```

---

# 29. BIG INVESTOR SCREEN

Dedicated page:

```text
BIG INVESTORS
```

Sections:

```text
Recent Bulk Deals
Recent Block Deals
Institutional Buying
Institutional Selling
Mutual Fund Activity
Insurance Activity
Promoter Activity
Large Shareholding Changes
```

---

# 30. BIG INVESTOR CARD

Example:

```text
BIG INVESTOR ACTIVITY

XYZ COMPANY

Investor:
Institutional Investor

Action:
ACCUMULATION

Estimated Position:
Significant

Price Range:
₹1,220–₹1,250

Market Reaction:
Positive

AI Interpretation:
Moderately Bullish

Confidence:
74%
```

---

# 31. IMPORTANT PRINCIPLE

The UI must clearly distinguish:

```text
Investor Activity
```

from:

```text
AI Recommendation
```

Buying by a large investor does NOT automatically mean BUY.

---

# 32. FII / DII SCREEN

Display:

```text
Today's FII
Today's DII
5-Day Trend
20-Day Trend
Monthly Trend
Equity
Futures
Options
```

Charts:

```text
Daily Flow
Cumulative Flow
```

---

# 33. OPTIONS SCREEN

The Options screen must support:

```text
NIFTY
BANK NIFTY
FINNIFTY
Stocks
```

Display:

```text
Expiry
Spot
Futures
PCR
OI
OI Change
IV
IV Change
Volume
Max Pain
Support
Resistance
```

---

# 34. OPTION CHAIN

Display:

```text
CALLS                 PUTS

OI
OI Change
Volume
IV
LTP
Change
Bid
Ask
Delta
Gamma
Theta
Vega
```

Highlight:

```text
Highest OI
Highest OI Change
Unusual Volume
Unusual IV
Potential Support
Potential Resistance
```

---

# 35. OPTIONS AI VIEW

Example:

```text
OPTIONS MARKET VIEW

Bias:
Mildly Bullish

PCR:
1.18

Major Put Support:
25,000

Major Call Resistance:
25,300

IV:
Moderate

Strategy Environment:
Directional / Moderate Volatility

Risk:
MEDIUM
```

---

# 36. OPTIONS STRATEGY SCREEN

The system may display potential strategies:

```text
Long Call
Long Put
Bull Call Spread
Bear Put Spread
Covered Call
Protective Put
Iron Condor
Other validated strategies
```

Every strategy must display:

```text
Maximum Profit
Maximum Loss
Breakeven
Probability
Margin
Risk
IV Sensitivity
Expiry Risk
```

No strategy should be shown unless validated by the Risk Engine.

---

# 37. FUTURES SCREEN

Display:

```text
Contract
Expiry
Price
Basis
OI
OI Change
Volume
Premium/Discount
Trend
Signal
```

---

# 38. COMMODITY SCREEN

Supported commodities should include:

```text
Gold
Silver
Crude Oil
Natural Gas
Copper
Aluminium
Other supported MCX contracts
```

---

# 39. COMMODITY DETAIL

Display:

```text
MCX Price
Global Price
USD
Dollar Index
Inventory
Supply/Demand
Geopolitical Risk
Correlation
AI Signal
```

---

# 40. GLOBAL MARKETS SCREEN

Display:

```text
US
Europe
Asia
Currencies
Bonds
Commodities
Volatility
```

Major indices:

```text
S&P 500
NASDAQ
Dow Jones
DAX
FTSE
Nikkei
Hang Seng
Shanghai
```

---

# 41. GLOBAL MARKET HEATMAP

Provide visual sector/index heatmap.

Example:

```text
US
Technology     +1.8%
Financials     +0.9%
Energy         -0.7%

ASIA
Japan          +1.2%
Hong Kong      -0.4%
China          +0.3%
```

---

# 42. CROSS-ASSET DASHBOARD

Display:

```text
Equity
USDINR
Crude
Gold
Silver
US 10Y
India 10Y
India VIX
```

Purpose:

> Quickly identify relationships that may affect Indian markets.

---

# 43. NEWS & EVENTS SCREEN

Sections:

```text
Market News
Company News
Sector News
Macro News
Global News
Geopolitical
Corporate Actions
Earnings
Upcoming Events
```

---

# 44. NEWS CARD

Example:

```text
HIGH IMPACT

Crude supply disruption reported

Published:
14:21 IST

Potential Impact:
Energy ↑
Transport ↓
Chemicals ↓

Market Risk:
HIGH

Source:
[Source Name]

AI Interpretation:
Potentially negative for oil-importing sectors.
```

---

# 45. NEWS SOURCE

Every news item must show:

```text
Source
Published Time
Retrieved Time
```

Never hide the source.

---

# 46. GEOPOLITICAL MAP

Future enhancement:

Provide a world map showing major events.

Examples:

```text
War
Sanctions
Shipping Disruption
Oil Supply Risk
Trade Conflict
```

Clicking an event displays affected:

```text
Countries
Commodities
Sectors
Indian Companies
```

---

# 47. PORTFOLIO SCREEN

Portfolio page must show:

```text
Total Investment
Current Value
P&L
P&L %
Today's P&L
Exposure
Sector Exposure
Risk
Drawdown
```

---

# 48. PORTFOLIO ALLOCATION

Display:

```text
Equity
Futures
Options
Commodities
Cash
```

and sector allocation.

---

# 49. PORTFOLIO RISK

Display:

```text
Portfolio Risk Score
Concentration Risk
Sector Risk
Market Risk
Volatility Risk
Correlation Risk
Event Risk
Liquidity Risk
```

---

# 50. POSITION CARD

Example:

```text
RELIANCE

Quantity:
100

Average:
₹1,280

Current:
₹1,420

P&L:
+₹14,000

AI View:
HOLD

Risk:
MEDIUM

Trend:
Bullish

Suggested Review:
₹1,500
```

---

# 51. PORTFOLIO AI VIEW

Example:

```text
PORTFOLIO HEALTH

Score:
78/100

Risk:
MODERATE

Strength:
Diversification good

Concern:
Technology exposure high

AI Recommendation:
Consider reducing concentration.
```

---

# 52. ALERT SCREEN

Display:

```text
All
Critical
High
Medium
Low
Unread
Portfolio
Stocks
Options
Commodities
Macro
Geopolitical
```

---

# 53. ALERT CARD

Example:

```text
🔴 HIGH PRIORITY

NIFTY — BREAKDOWN RISK

Score:
88

Confidence:
84%

Risk:
HIGH

Why:
• Support broken
• Volume expansion
• FII selling
• Weak market breadth

Action:
REVIEW / REDUCE AGGRESSIVE LONGS

Created:
10:32 IST
```

---

# 54. ALERT FILTERS

Support:

```text
Asset
Alert Type
Priority
Score
Confidence
Date
Status
```

---

# 55. ALERT DETAILS

Clicking an alert should show:

```text
Alert
Evidence
Charts
Signals
News
FII/DII
Big Investors
Risk
Model
Historical Similar Events
Outcome
```

---

# 56. RESEARCH SCREEN

Dedicated research workspace:

```text
Research Dashboard
Company Research
Sector Research
Market Research
Macro Research
Thematic Research
AI Research
```

---

# 57. AI COMPANY RESEARCH

User can search:

```text
RELIANCE
```

and receive:

```text
Business Summary
Financial Health
Growth
Valuation
Technical
Institutional Activity
Big Investors
News
Risk
Catalysts
Bear Case
Bull Case
AI Conclusion
```

---

# 58. AI CONCLUSION

The AI conclusion must use structured output:

```text
Current View:
BUY / HOLD / SELL / WAIT

Confidence:
XX%

Time Horizon:
X months

Bull Case:
...

Bear Case:
...

Key Catalyst:
...

Key Risk:
...

Invalidation:
...

Why:
...
```

---

# 59. RESEARCH EVIDENCE

Every important conclusion should have supporting evidence.

Example:

```text
Reason:
FII accumulation

Evidence:
5-day FII flow increased
```

---

# 60. BULL / BEAR CASE

Every company research report should show both:

```text
BULL CASE
```

and:

```text
BEAR CASE
```

This prevents confirmation bias.

---

# 61. BACKTESTING SCREEN

Display:

```text
Strategy
Asset
Period
Entry Rules
Exit Rules
Win Rate
Profit Factor
CAGR
Sharpe
Sortino
Max Drawdown
Trades
```

---

# 62. MODEL HEALTH SCREEN

Display:

```text
Model
Version
Accuracy
Precision
Recall
Hit Rate
Profit Factor
Sharpe
Drift
Current Status
```

Status:

```text
HEALTHY
WARNING
DEGRADED
DISABLED
```

---

# 63. SYSTEM HEALTH SCREEN

Display:

```text
Internet
Database
Market Data
News Feed
Options Feed
Commodity Feed
Global Market Feed
Scheduler
Signal Engine
Risk Engine
Recommendation Engine
Alert Engine
```

---

# 64. CONNECTION STATUS

Example:

```text
SYSTEM HEALTH

Internet          🟢
Market Data       🟢
News              🟢
Options           🟢
Commodities       🟢
Global Markets    🟡
Database          🟢
AI Engine         🟢
```

---

# 65. OFFLINE MODE

When internet disconnects:

Top bar:

```text
🔴 OFFLINE
```

Dashboard:

```text
MARKET DATA NOT LIVE

Showing last synchronized information.

Last Update:
15:29:42 IST
```

Disable:

```text
Current BUY/SELL signals
Current price alerts
Current options alerts
```

unless the underlying data is explicitly marked current.

---

# 66. INTERNET RECOVERY UI

When internet returns:

```text
🟢 CONNECTION RESTORED

Synchronizing market data...

✓ Market Data
✓ News
✓ FII/DII
✓ Global Markets
✓ Options
✓ Commodities

Running AI analysis...
```

Then:

```text
ANALYSIS COMPLETE

7 important events detected
3 actionable signals
2 risk alerts
```

---

# 67. SEARCH

Global search should support:

```text
Stock
Index
ETF
Option
Future
Commodity
Investor
Sector
News
Alert
Research
```

Example:

```text
Search:
[ reliance ]
```

Results:

```text
RELIANCE INDUSTRIES
RELIANCE OPTION
RELIANCE NEWS
RELIANCE RESEARCH
RELIANCE ALERTS
```

---

# 68. WATCHLIST

Users can create multiple watchlists:

```text
My Stocks
Long Term
Swing
Options
Commodities
High Conviction
Research
```

---

# 69. WATCHLIST ROW

Display:

```text
Symbol
Price
Change
Signal
Score
Confidence
Risk
```

---

# 70. CUSTOM DASHBOARD

Future feature:

Allow user to configure dashboard widgets.

Widgets:

```text
Market
Stocks
Options
FII/DII
Big Investors
News
Portfolio
Commodities
Global Markets
Alerts
```

---

# 71. COLOR SEMANTICS

Use consistent visual semantics.

```text
Positive:
Green

Negative:
Red

Warning:
Amber/Yellow

Neutral:
Gray

Information:
Blue
```

Do not rely only on color.

Use:

```text
BUY
SELL
WAIT
RISK
```

text labels as well.

---

# 72. ACCESSIBILITY

The application should support:

```text
Readable Font Sizes
Keyboard Navigation
Tooltips
Clear Contrast
Non-color Indicators
Resizable Panels
```

---

# 73. DARK MODE

Default:

```text
Dark Professional Theme
```

Provide:

```text
Dark
Light
System
```

---

# 74. DENSITY

The user should be able to select:

```text
Compact
Comfortable
Spacious
```

Professional users may prefer Compact.

---

# 75. CHART INTERACTION

Charts must support:

```text
Zoom
Pan
Crosshair
Tooltip
Time Range
Indicators
Compare
Export
```

---

# 76. TABLE INTERACTION

Tables should support:

```text
Sort
Filter
Search
Column Selection
Column Reordering
Export
Pagination
```

---

# 77. DATA TIMESTAMP

Every market-data display must show:

```text
Updated:
HH:MM:SS IST
```

If delayed:

```text
Delayed
```

If stale:

```text
STALE
```

---

# 78. AI EXPLANATION UX

Never show only:

```text
BUY
```

Instead:

```text
BUY

Why?

1. Technical trend positive
2. Institutional accumulation
3. Sector relative strength
4. FII selling declining

Risks:

1. Valuation elevated
2. Macro event tomorrow
```

---

# 79. EXPLAINABILITY LEVELS

User can select:

```text
Simple
Detailed
Expert
```

Simple:

```text
BUY — positive trend and institutional buying.
```

Detailed:

```text
Technical + fundamental + institutional explanation.
```

Expert:

```text
Full factor scores, historical evidence, model statistics and risk.
```

---

# 80. AI CONFIDENCE DISPLAY

Use:

```text
Confidence: 82%
```

but also show:

```text
Why confidence is 82%
```

Example:

```text
High-quality data
Multiple confirming signals
Validated model
Strong historical similarity
```

---

# 81. CONFIDENCE WARNING

If confidence <60%:

```text
LOW CONFIDENCE
```

If 60–75:

```text
MODERATE CONFIDENCE
```

If 75–90:

```text
HIGH CONFIDENCE
```

If >90:

```text
VERY HIGH CONFIDENCE
```

These thresholds are configurable.

---

# 82. RISK DISPLAY

Always display risk alongside opportunity.

Example:

```text
BUY
Score: 86

Expected Return:
+12%

Risk:
HIGH

Risk/Reward:
1.8
```

Never hide risk.

---

# 83. RECOMMENDATION CARD

Standard UI:

```text
┌─────────────────────────────────────────┐
│ 🟢 BUY                                  │
│                                         │
│ RELIANCE INDUSTRIES                    │
│                                         │
│ Score       86/100                     │
│ Confidence  82%                        │
│ Risk        MEDIUM                     │
│                                         │
│ Entry       ₹1,400–1,425               │
│ Stop        ₹1,340                     │
│ Target      ₹1,550                     │
│                                         │
│ Horizon     1–3 Months                 │
│                                         │
│ WHY?                                    │
│ ✓ Technical trend                      │
│ ✓ Institutional activity               │
│ ✓ Sector strength                      │
│                                         │
│ RISKS                                   │
│ ⚠ Valuation                            │
│ ⚠ Global event                         │
│                                         │
│ [VIEW FULL RESEARCH]                   │
└─────────────────────────────────────────┘
```

---

# 84. NO-TRADE CARD

```text
┌─────────────────────────────────────────┐
│ 🟡 NO TRADE                             │
│                                         │
│ NIFTY                                   │
│                                         │
│ Signal: Conflicting                     │
│ Confidence: 51%                         │
│                                         │
│ Technical: Bullish                      │
│ FII: Bearish                            │
│ Options: Neutral                        │
│ Global: Weak                            │
│                                         │
│ Conclusion:                             │
│ Insufficient evidence.                  │
│                                         │
│ WAIT FOR CONFIRMATION                   │
└─────────────────────────────────────────┘
```

---

# 85. MARKET REGIME WIDGET

Display:

```text
CURRENT REGIME

Trend:
Bullish

Volatility:
Moderate

Liquidity:
Healthy

Breadth:
Positive

Global:
Supportive

Regime Confidence:
78%
```

---

# 86. BIG INVESTOR WIDGET

Dashboard widget:

```text
BIG INVESTOR ACTIVITY

Top Accumulation
Top Distribution
Recent Block Deals
Recent Bulk Deals
```

---

# 87. FII/DII WIDGET

```text
FII:
₹ -1,240 Cr

DII:
₹ +1,850 Cr

5-Day FII:
₹ -4,200 Cr

5-Day DII:
₹ +5,800 Cr
```

---

# 88. GLOBAL MARKET WIDGET

```text
S&P 500     +0.8%
NASDAQ      +1.1%
NIKKEI      +0.5%
HANG SENG   -0.3%
DAX         +0.4%
```

---

# 89. COMMODITY WIDGET

```text
GOLD       +0.6%
SILVER     +1.2%
CRUDE      +2.4%
NAT GAS    -0.8%
```

---

# 90. NEWS WIDGET

Show only the most relevant market-moving events.

Example:

```text
🔴 HIGH IMPACT
RBI policy announcement tomorrow

🟠 MEDIUM
Crude rises on supply concerns

🟢 POSITIVE
XYZ reports strong earnings
```

---

# 91. USER ACTIONS

User should be able to:

```text
Add to Watchlist
Remove from Watchlist
View Research
View Chart
View Options
View News
View Institutional Activity
Set Alert
Mute Alert
Compare
Add to Portfolio
```

---

# 92. COMPARE SCREEN

Allow comparison of multiple stocks.

Example:

```text
RELIANCE
HDFC BANK
ICICI BANK
TCS
INFOSYS
```

Compare:

```text
Growth
Profitability
Valuation
Technical
Institutional
Risk
AI Score
```

---

# 93. ALERT CONFIGURATION SCREEN

Allow user to configure:

```text
Minimum Signal Score
Minimum Confidence
Risk Threshold
Alert Categories
Quiet Hours
Notification Sound
Watchlists
Portfolio Alerts
```

---

# 94. SETTINGS

Settings categories:

```text
General
Market
Data Sources
Notifications
Risk
Alerts
Portfolio
AI
Appearance
Performance
Security
```

---

# 95. DATA SOURCE SETTINGS

Display:

```text
Source
Status
Last Update
Latency
Reliability
```

---

# 96. AI SETTINGS

Allow:

```text
Explanation Level
Risk Preference
Time Horizon
Preferred Assets
Preferred Strategies
```

These preferences must NOT bypass risk controls.

---

# 97. RISK PROFILE

Allow user to select:

```text
Conservative
Moderate
Aggressive
```

This affects:

```text
Opportunity Ranking
Position Suggestions
Alert Thresholds
Risk Warnings
```

It must NOT alter factual market data or manipulate model results.

---

# 98. TIME HORIZON

User can select:

```text
Intraday
Swing
Short Term
Medium Term
Long Term
```

The system must use appropriate models.

---

# 99. MULTI-TIMEFRAME VIEW

Signals should support:

```text
Intraday
Daily
Weekly
Monthly
```

Example:

```text
Intraday:
Bearish

Daily:
Bullish

Weekly:
Bullish

Overall:
Bullish but short-term weakness
```

---

# 100. SIGNAL CONFLICT UI

When timeframes disagree:

```text
MULTI-TIMEFRAME CONFLICT

Intraday:
SELL

Daily:
BUY

Weekly:
BUY

Interpretation:
Short-term correction within longer-term uptrend.
```

---

# 101. MARKET CLOCK

Display:

```text
Market Opens:
09:15

Market Closes:
15:30

Current:
10:42:18
```

---

# 102. PRE-MARKET SCREEN

Before market open:

```text
GLOBAL MARKETS
GIFT NIFTY / current relevant indicator
FII/DII
NEWS
MACRO EVENTS
GEOPOLITICAL
OPTIONS
TOP STOCKS
TOP RISKS
```

---

# 103. POST-MARKET SCREEN

After market close:

```text
Market Summary
Institutional Activity
Top Movers
Sector Rotation
Options
Commodities
Global Setup
Tomorrow's Events
Portfolio
AI Outlook
```

---

# 104. AUTOMATIC ANALYSIS INDICATOR

When analysis is running:

```text
AI MARKET ANALYSIS

✓ Market Data
✓ Global Markets
✓ FII/DII
✓ Big Investors
✓ Options
✓ Commodities
✓ News
✓ Geopolitics
✓ Technical Models
✓ Risk Engine

Analyzing...
```

---

# 105. ANALYSIS PROGRESS

Display stages:

```text
Collecting
Validating
Analyzing
Scoring
Risk Checking
Generating Recommendations
```

Do not show fake percentage progress.

Use actual pipeline state.

---

# 106. LAST ANALYSIS

Display:

```text
Last Analysis:
22:31:14 IST

Next Scheduled Analysis:
22:45:00 IST
```

if scheduled.

---

# 107. AUTOMATIC REFRESH

Data refresh frequency must depend on source and market session.

Do not aggressively poll sources unnecessarily.

---

# 108. MARKET CLOSED BEHAVIOR

When market is closed:

Show:

```text
Last Close
After-Market News
Global Markets
Upcoming Events
Portfolio
Research
Future Opportunities
```

Do not pretend intraday data is changing.

---

# 109. WEEKEND UI

Show:

```text
Weekend Research Mode

Global Markets
Geopolitical Events
Upcoming Macro Events
Company News
Research
Portfolio Review
Backtesting
Model Health
```

---

# 110. ERROR HANDLING

User-friendly errors:

Bad:

```text
HTTP 500
```

Good:

```text
Market data temporarily unavailable.

Last successful update:
15:29:42 IST

Retrying automatically.
```

---

# 111. DATA SOURCE FAILURE UI

Example:

```text
⚠ OPTIONS DATA UNAVAILABLE

Options analysis temporarily disabled.

Other market analysis remains available.
```

---

# 112. SECURITY

Do not display:

```text
API Keys
Passwords
Tokens
Broker Credentials
```

in the UI.

---

# 113. BROKER INTEGRATION

Initial application:

```text
READ-ONLY
```

Broker integration should NOT automatically place orders.

Future execution must be a separate module.

---

# 114. DISCLAIMER

Display appropriate research disclaimer:

```text
AI-generated market analysis is for research and informational purposes.
It is not a guarantee of returns or a substitute for independent financial judgment.
Markets involve risk, including loss of capital.
```

The disclaimer must not obscure the actual research.

---

# 115. PERFORMANCE

Dashboard initial load target:

```text
<3 seconds
```

for locally cached data.

Live synchronization should occur asynchronously.

The UI must remain responsive while analysis is running.

---

# 116. BACKGROUND PROCESSING

Heavy operations must run outside the UI thread:

```text
Data ingestion
Backtesting
Model inference
Historical analysis
Large database queries
```

---

# 117. UI STATE

The application must distinguish:

```text
LOADING
READY
UPDATING
DEGRADED
OFFLINE
ERROR
```

---

# 118. EMPTY STATES

Example:

```text
No watchlist stocks yet.

Add stocks to receive personalized market intelligence.
```

---

# 119. NOTIFICATION CENTER

Top-right notification icon opens:

```text
Critical
High
Medium
Low
Read
Unread
```

---

# 120. NOTIFICATION ACTIONS

Each notification may support:

```text
Open
Acknowledge
Mute
Dismiss
View Research
```

---

# 121. KEYBOARD SHORTCUTS

Recommended:

```text
Ctrl + K
Global Search

Ctrl + D
Dashboard

Ctrl + A
Alerts

Ctrl + P
Portfolio

Ctrl + R
Research

Ctrl + O
Options

Ctrl + M
Markets
```

Shortcuts must be configurable.

---

# 122. RESPONSIVE WINDOW

Desktop application should support:

```text
1280×720
1920×1080
2560×1440
```

and larger monitors.

---

# 123. MULTI-MONITOR

Future enhancement:

Allow windows such as:

```text
Market Dashboard
Options
Portfolio
Research
```

to be separated across monitors.

---

# 124. EXPORT

Support export of:

```text
Research Report
Alerts
Portfolio
Backtest
Market Summary
```

formats:

```text
CSV
Excel
PDF
```

---

# 125. SCREENSHOT / REPORT MODE

Future enhancement:

Allow user to generate a clean report without trading UI elements.

---

# 126. AI RESEARCH REPORT

Report structure:

```text
Executive Summary

Market Context

Company/Asset Overview

Technical Analysis

Fundamental Analysis

Institutional Activity

Big Investor Activity

Options

Macro

Global

News

Bull Case

Bear Case

Risks

Valuation

AI Signal

Confidence

Time Horizon

Conclusion
```

---

# 127. TRUST INDICATORS

Every recommendation should show:

```text
Data Quality
Model Validation
Confidence
Risk
```

Example:

```text
Data Quality:
92%

Model Validation:
87%

Confidence:
81%

Risk:
MEDIUM
```

---

# 128. SOURCE TRANSPARENCY

Allow user to click:

```text
View Sources
```

and see:

```text
Source
Timestamp
Data Type
```

---

# 129. AI REASONING TRANSPARENCY

Do NOT expose hidden chain-of-thought.

Instead show concise evidence:

```text
Evidence:
FII buying increased
Volume expanded
Price crossed 200 DMA
Sector relative strength improved
```

---

# 130. NO FAKE PRECISION

Do not display:

```text
Probability:
83.7421%
```

Prefer:

```text
Confidence:
84%
```

unless the underlying model genuinely supports that precision.

---

# 131. NO GUARANTEE LANGUAGE

UI must never display:

```text
Guaranteed Profit
Sure Shot
100% Accurate
Fixed Return
No Loss
```

---

# 132. BUY/SELL VISUAL PRIORITY

The UI should visually prioritize:

```text
Strong Buy
Buy
Watch
Hold
Reduce
Sell
Strong Sell
No Trade
```

but never make BUY visually dominant purely to encourage trading.

---

# 133. NO-TRADE MUST BE FIRST-CLASS

The application must treat:

```text
NO TRADE
```

as a valid and important outcome.

It should never pressure the user to trade.

---

# 134. DAILY USER EXPERIENCE

Ideal workflow:

```text
08:30
Open application

08:31
Review Pre-Market Analysis

08:35
Review Global Markets

08:40
Review FII/DII

08:45
Review Big Investor Activity

09:00
Review Top Opportunities

09:15+
Monitor Alerts

15:30
Review Closing Analysis

Evening
Review Research / Portfolio
```

---

# 135. MAIN DASHBOARD GOLDEN RULE

The Dashboard should answer these 10 questions:

```text
1. What is the market doing?

2. Why is it moving?

3. Is the overall environment bullish or bearish?

4. Where is institutional money flowing?

5. What are big investors doing?

6. Which sectors are strong?

7. Which stocks have strong evidence?

8. What are the biggest risks?

9. What should I watch?

10. Is there a high-quality opportunity right now?
```

---

# 136. FINAL UI PRINCIPLE

The application must behave like:

```text
RESEARCH FIRST
RISK SECOND
OPPORTUNITY THIRD
EXECUTION LAST
```

The system exists to improve decision quality, not to maximize the number of trades.

---

# 137. DEFINITION OF DONE

The UI/UX specification is complete when the application provides:

```text
✓ Professional desktop layout
✓ Market dashboard
✓ NIFTY/SENSEX/BANK NIFTY
✓ Market breadth
✓ Market regime
✓ AI market view
✓ Stock scanner
✓ Stock research
✓ Technical analysis
✓ Fundamental analysis
✓ FII/DII
✓ Big investor activity
✓ Options chain
✓ Options analysis
✓ Futures
✓ Commodities
✓ Global markets
✓ Geopolitical events
✓ News
✓ Macro events
✓ Portfolio
✓ Portfolio risk
✓ Alerts
✓ AI research
✓ Backtesting
✓ Model health
✓ System health
✓ Offline mode
✓ Internet recovery
✓ Watchlists
✓ Search
✓ Notifications
✓ Data timestamps
✓ Data quality indicators
✓ Model confidence
✓ Risk indicators
✓ Evidence/source transparency
✓ Export
✓ Dark mode
✓ Accessibility
✓ Multi-timeframe analysis
✓ NO-TRADE state
```

---

# 138. GOLDEN UX RULE

At any moment, the user should be able to answer:

```text
WHAT IS HAPPENING?
WHY IS IT HAPPENING?
WHAT DOES THE DATA SAY?
WHAT DOES THE MODEL SAY?
WHAT IS THE RISK?
WHAT SHOULD I WATCH?
```

The application must never simply show:

```text
BUY
```

without explaining the evidence, confidence, risk, time horizon, and invalidation conditions.
