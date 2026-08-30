# AI MARKET INTELLIGENCE

# API CONTRACTS SPECIFICATION

**Document Version:** 1.0
**Status:** Core Architecture Specification
**Market:** Indian Markets
**Timezone:** Asia/Kolkata (IST)

---

# 1. PURPOSE

This document defines the communication contracts between all major components of the AI Market Intelligence platform.

The objective is to ensure that:

* Every module has clearly defined inputs and outputs.
* Modules remain loosely coupled.
* Claude Code must not invent incompatible interfaces.
* Database structures and APIs remain consistent.
* Quantitative calculations remain deterministic.
* AI/LLM output remains separated from trading logic.
* Future broker integrations can be added without redesigning the entire system.

---

# 2. CORE ARCHITECTURE

The application consists of:

```text
DATA SOURCES
     ↓
MARKET DATA PIPELINE
     ↓
FEATURE ENGINE
     ↓
QUANT MODEL
     ↓
SIGNAL ENGINE
     ↓
RISK ENGINE
     ↓
RECOMMENDATION ENGINE
     ↓
AI / LLM ENGINE
     ↓
ALERT ENGINE
     ↓
UI / DESKTOP APPLICATION
```

Supporting systems:

```text
DATABASE
BACKTESTING
MODEL VALIDATION
PORTFOLIO ENGINE
NEWS ENGINE
MACRO ENGINE
GEOPOLITICAL ENGINE
INSTITUTIONAL INVESTOR ENGINE
```

---

# 3. API DESIGN PRINCIPLES

All APIs must follow:

```text
REST
JSON
Versioned endpoints
ISO 8601 timestamps
IST-aware timestamps
UUID identifiers
Explicit schemas
Strict validation
Idempotency where required
Structured error responses
```

---

# 4. API VERSION

Initial API version:

```text
/api/v1
```

Future breaking changes:

```text
/api/v2
```

Do not introduce breaking changes into `/api/v1`.

---

# 5. BASE URL

Development:

```text
http://localhost:8000/api/v1
```

Production:

```text
Configured through environment variables.
```

Never hard-code production URLs.

---

# 6. GENERAL RESPONSE FORMAT

Successful response:

```json
{
  "success": true,
  "data": {},
  "meta": {
    "timestamp": "2026-08-30T10:30:00+05:30",
    "request_id": "uuid"
  }
}
```

---

# 7. ERROR RESPONSE

All APIs must use:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {}
  },
  "meta": {
    "timestamp": "2026-08-30T10:30:00+05:30",
    "request_id": "uuid"
  }
}
```

---

# 8. STANDARD ERROR CODES

Use:

```text
VALIDATION_ERROR
AUTHENTICATION_ERROR
AUTHORIZATION_ERROR
NOT_FOUND
RATE_LIMITED
DATA_UNAVAILABLE
STALE_DATA
EXTERNAL_API_ERROR
DATABASE_ERROR
MODEL_ERROR
LLM_ERROR
INVALID_MODEL_OUTPUT
INTERNAL_ERROR
SERVICE_UNAVAILABLE
```

---

# 9. COMMON IDENTIFIERS

Every major entity should use:

```text
id: UUID
```

Market instruments additionally require:

```text
symbol
exchange
asset_type
```

---

# 10. INSTRUMENT TYPES

Supported:

```text
EQUITY
INDEX
FUTURE
OPTION
COMMODITY
CURRENCY
ETF
```

Initial production priority:

```text
EQUITY
INDEX
FUTURE
OPTION
COMMODITY
```

---

# 11. EXCHANGE VALUES

Support at minimum:

```text
NSE
BSE
MCX
```

Architecture must allow:

```text
NCDEX
```

and other exchanges later.

---

# 12. INSTRUMENT CONTRACT

```json
{
  "instrument_id": "uuid",
  "symbol": "RELIANCE",
  "exchange": "NSE",
  "asset_type": "EQUITY",
  "name": "Reliance Industries Limited",
  "isin": "INE002A01018",
  "sector": "ENERGY",
  "industry": "OIL_GAS",
  "currency": "INR",
  "lot_size": null,
  "tick_size": 0.05,
  "expiry": null,
  "strike": null,
  "option_type": null,
  "active": true
}
```

---

# 13. MARKET QUOTE API

Endpoint:

```text
GET /market/quote/{instrument_id}
```

Response:

```json
{
  "instrument_id": "uuid",
  "symbol": "RELIANCE",
  "exchange": "NSE",
  "timestamp": "2026-08-30T15:29:59+05:30",
  "price": 1450.25,
  "open": 1432.00,
  "high": 1465.00,
  "low": 1428.50,
  "previous_close": 1435.00,
  "volume": 12345678,
  "change": 15.25,
  "change_percent": 1.06,
  "source": "market_data_provider",
  "data_status": "LIVE"
}
```

---

# 14. DATA STATUS

Allowed values:

```text
LIVE
DELAYED
STALE
CACHED
UNAVAILABLE
```

---

# 15. OHLCV API

Endpoint:

```text
GET /market/ohlcv/{instrument_id}
```

Parameters:

```text
interval
start
end
limit
```

Intervals:

```text
1m
5m
15m
30m
1h
1d
1w
1mo
```

---

# 16. OHLCV RESPONSE

```json
{
  "instrument_id": "uuid",
  "interval": "1d",
  "candles": [
    {
      "timestamp": "2026-08-28T15:30:00+05:30",
      "open": 1420.00,
      "high": 1450.00,
      "low": 1412.00,
      "close": 1435.00,
      "volume": 12000000
    }
  ]
}
```

---

# 17. MARKET BREADTH API

Endpoint:

```text
GET /market/breadth
```

Response:

```json
{
  "timestamp": "2026-08-30T15:30:00+05:30",
  "advancing": 1124,
  "declining": 932,
  "unchanged": 144,
  "advance_decline_ratio": 1.21,
  "new_highs": 85,
  "new_lows": 42
}
```

---

# 18. INDIA VIX API

Endpoint:

```text
GET /market/volatility/vix
```

Response:

```json
{
  "timestamp": "2026-08-30T15:30:00+05:30",
  "value": 14.82,
  "change_percent": 3.2,
  "regime": "NORMAL"
}
```

---

# 19. FEATURE ENGINE API

Endpoint:

```text
POST /features/calculate
```

Input:

```json
{
  "instrument_id": "uuid",
  "timestamp": "2026-08-30T15:30:00+05:30",
  "feature_set": "STANDARD"
}
```

Output:

```json
{
  "instrument_id": "uuid",
  "timestamp": "2026-08-30T15:30:00+05:30",
  "features": {
    "sma_20": 1410.25,
    "sma_50": 1378.20,
    "sma_200": 1298.10,
    "ema_20": 1418.40,
    "rsi_14": 64.2,
    "macd": 18.4,
    "atr_14": 32.8,
    "adx_14": 28.4,
    "relative_strength": 1.12,
    "volume_ratio": 1.42
  },
  "data_quality": 96
}
```

---

# 20. TECHNICAL SIGNAL API

Endpoint:

```text
POST /signals/technical
```

Input:

```json
{
  "instrument_id": "uuid",
  "timestamp": "2026-08-30T15:30:00+05:30",
  "features": {}
}
```

Output:

```json
{
  "instrument_id": "uuid",
  "signal": "BULLISH",
  "score": 84,
  "components": {
    "trend": 88,
    "momentum": 82,
    "volume": 79,
    "relative_strength": 87
  },
  "reasons": [
    "Price above 50 DMA",
    "Positive momentum",
    "Volume above average"
  ],
  "invalidators": [
    "Close below 50 DMA"
  ]
}
```

---

# 21. FUNDAMENTAL SIGNAL API

Endpoint:

```text
POST /signals/fundamental
```

Output:

```json
{
  "instrument_id": "uuid",
  "signal": "BULLISH",
  "score": 78,
  "components": {
    "earnings_growth": 82,
    "profitability": 85,
    "cash_flow": 76,
    "balance_sheet": 72,
    "valuation": 65
  },
  "reasons": [],
  "risks": []
}
```

---

# 22. INSTITUTIONAL INVESTOR API

Endpoint:

```text
GET /institutional/{instrument_id}
```

Response:

```json
{
  "instrument_id": "uuid",
  "timestamp": "2026-08-30T15:30:00+05:30",
  "institutional_score": 88,
  "classification": "ACCUMULATION",
  "data": {
    "fii": {
      "trend": "BUYING",
      "ownership_change": 0.42
    },
    "dii": {
      "trend": "BUYING",
      "ownership_change": 0.28
    },
    "mutual_funds": {
      "trend": "ACCUMULATION"
    },
    "insurance": {
      "trend": "ACCUMULATION"
    }
  },
  "bulk_deals": [],
  "block_deals": []
}
```

---

# 23. BIG INVESTOR API

Endpoint:

```text
GET /institutional/big-investors/{instrument_id}
```

Response:

```json
{
  "instrument_id": "uuid",
  "score": 91,
  "activity": "STRONG_ACCUMULATION",
  "investors": [
    {
      "investor_type": "MUTUAL_FUND",
      "investor_name": "Example Fund",
      "activity": "INCREASED",
      "change_percent": 1.2,
      "period": "QUARTER"
    }
  ],
  "confidence": 87
}
```

---

# 24. FII/DII MARKET FLOW API

Endpoint:

```text
GET /institutional/market-flow
```

Response:

```json
{
  "date": "2026-08-30",
  "fii": {
    "cash": {
      "buy": 12500,
      "sell": 11000,
      "net": 1500
    }
  },
  "dii": {
    "cash": {
      "buy": 9800,
      "sell": 8500,
      "net": 1300
    }
  }
}
```

All monetary values:

```text
INR crore
```

unless otherwise specified.

---

# 25. OPTIONS CHAIN API

Endpoint:

```text
GET /options/chain/{underlying}
```

Parameters:

```text
expiry
```

Response:

```json
{
  "underlying": "NIFTY",
  "timestamp": "2026-08-30T15:30:00+05:30",
  "expiry": "2026-09-03",
  "spot": 24500.25,
  "contracts": [
    {
      "strike": 24500,
      "call": {
        "ltp": 125.5,
        "volume": 125000,
        "oi": 4500000,
        "oi_change": 320000,
        "iv": 14.2
      },
      "put": {
        "ltp": 118.2,
        "volume": 130000,
        "oi": 3900000,
        "oi_change": 250000,
        "iv": 14.8
      }
    }
  ]
}
```

---

# 26. OPTIONS SIGNAL API

Endpoint:

```text
POST /signals/options
```

Output:

```json
{
  "underlying": "NIFTY",
  "signal": "BULLISH",
  "score": 79,
  "components": {
    "oi_structure": 82,
    "volume": 76,
    "iv": 71,
    "pcr": 81,
    "support_resistance": 84
  },
  "interpretation": [
    "Put OI concentration near support",
    "Positive OI structure"
  ]
}
```

---

# 27. COMMODITY API

Endpoint:

```text
GET /commodities/{instrument_id}
```

Response:

```json
{
  "instrument_id": "uuid",
  "symbol": "GOLD",
  "exchange": "MCX",
  "timestamp": "2026-08-30T18:00:00+05:30",
  "price": 72000,
  "international_price": 2500,
  "usd_inr": 87.20,
  "volume": 25000
}
```

---

# 28. MACRO API

Endpoint:

```text
GET /macro/context
```

Response:

```json
{
  "timestamp": "2026-08-30T18:00:00+05:30",
  "india": {
    "inflation": 4.2,
    "gdp_growth": 6.8,
    "policy_rate": 6.0
  },
  "us": {
    "policy_rate": 4.5,
    "inflation": 2.8,
    "us10y": 4.1
  },
  "currency": {
    "usd_inr": 87.20
  }
}
```

---

# 29. GLOBAL MARKET API

Endpoint:

```text
GET /global/market-context
```

Response:

```json
{
  "timestamp": "2026-08-30T18:00:00+05:30",
  "markets": {
    "sp500": {},
    "nasdaq": {},
    "dow": {},
    "ftse": {},
    "dax": {},
    "nikkei": {},
    "hang_seng": {}
  },
  "futures": {},
  "commodities": {},
  "currencies": {},
  "bond_yields": {}
}
```

---

# 30. NEWS API

Endpoint:

```text
GET /news
```

Parameters:

```text
instrument
sector
country
start
end
severity
limit
```

Response:

```json
{
  "articles": [
    {
      "id": "uuid",
      "title": "Example headline",
      "source": "Example Source",
      "published_at": "2026-08-30T12:30:00+05:30",
      "url": "https://example.com/article",
      "instrument_ids": [],
      "sector_ids": [],
      "sentiment": "BULLISH",
      "impact": "HIGH",
      "novelty": "NEW"
    }
  ]
}
```

---

# 31. NEWS ANALYSIS API

Endpoint:

```text
POST /news/analyze
```

Input:

```json
{
  "article_id": "uuid"
}
```

Output:

```json
{
  "article_id": "uuid",
  "sentiment": "BULLISH",
  "impact": "HIGH",
  "affected_instruments": [],
  "affected_sectors": [],
  "transmission_channels": [],
  "risks": [],
  "summary": "..."
}
```

---

# 32. GEOPOLITICAL EVENT API

Endpoint:

```text
GET /geopolitics/events
```

Response:

```json
{
  "events": [
    {
      "id": "uuid",
      "title": "Example geopolitical event",
      "country": "Example",
      "region": "Example",
      "severity": "HIGH",
      "start_time": "2026-08-30T10:00:00+05:30",
      "status": "ONGOING",
      "affected_assets": [
        "CRUDE",
        "GOLD"
      ]
    }
  ]
}
```

---

# 33. GEOPOLITICAL ANALYSIS API

Endpoint:

```text
POST /geopolitics/analyze
```

Output:

```json
{
  "event_id": "uuid",
  "severity": 82,
  "market_impact": "HIGH",
  "affected_assets": [],
  "transmission_channels": [
    {
      "from": "GEOPOLITICAL_EVENT",
      "to": "CRUDE",
      "impact": "POSITIVE"
    },
    {
      "from": "CRUDE",
      "to": "INFLATION",
      "impact": "POSITIVE"
    }
  ],
  "uncertainty": "HIGH"
}
```

---

# 34. MARKET REGIME API

Endpoint:

```text
GET /market/regime
```

Response:

```json
{
  "timestamp": "2026-08-30T15:30:00+05:30",
  "regime": "BULL",
  "confidence": 82,
  "components": {
    "trend": 85,
    "breadth": 72,
    "volatility": 65,
    "momentum": 88
  }
}
```

---

# 35. QUANT MODEL API

Endpoint:

```text
POST /quant/evaluate
```

Input:

```json
{
  "instrument_id": "uuid",
  "timestamp": "2026-08-30T15:30:00+05:30",
  "model_version": "quant-v1.0"
}
```

Output:

```json
{
  "instrument_id": "uuid",
  "model_version": "quant-v1.0",
  "direction": "BULLISH",
  "score": 82,
  "factors": {
    "technical": 86,
    "fundamental": 78,
    "institutional": 89,
    "macro": 72,
    "global": 75,
    "news": 84,
    "options": 81
  },
  "data_quality": 95
}
```

---

# 36. SIGNAL ENGINE API

Endpoint:

```text
POST /signals/evaluate
```

Input:

```json
{
  "instrument_id": "uuid",
  "timestamp": "2026-08-30T15:30:00+05:30"
}
```

Output:

```json
{
  "instrument_id": "uuid",
  "direction": "BUY",
  "score": 82,
  "signal_strength": "STRONG",
  "time_horizon": "SWING",
  "components": {},
  "supporting_factors": [],
  "contradicting_factors": [],
  "invalidators": []
}
```

---

# 37. SIGNAL STATES

Allowed:

```text
STRONG_BUY
BUY
WEAK_BUY
HOLD
WEAK_SELL
SELL
STRONG_SELL
NO_TRADE
```

---

# 38. RISK ENGINE API

Endpoint:

```text
POST /risk/evaluate
```

Input:

```json
{
  "instrument_id": "uuid",
  "direction": "BUY",
  "entry_price": 1450,
  "target_price": 1550,
  "stop_loss": 1400,
  "portfolio_context": {}
}
```

Output:

```json
{
  "risk_level": "MODERATE",
  "risk_score": 38,
  "approved": true,
  "risk_reward_ratio": 2.0,
  "max_position_size": 100,
  "warnings": [],
  "rejection_reasons": []
}
```

---

# 39. RISK STATES

```text
LOW
MODERATE
HIGH
VERY_HIGH
EXTREME
```

---

# 40. RISK ENGINE AUTHORITY

Risk Engine has higher authority than:

```text
AI
Signal Engine
UI
User Interface Automation
```

The AI cannot override Risk Engine rejection.

---

# 41. RECOMMENDATION ENGINE API

Endpoint:

```text
POST /recommendation/evaluate
```

Input:

```json
{
  "instrument_id": "uuid",
  "signal": {},
  "risk": {},
  "market_regime": {}
}
```

Output:

```json
{
  "instrument_id": "uuid",
  "recommendation": "BUY",
  "score": 82,
  "risk_level": "MODERATE",
  "time_horizon": "SWING",
  "entry": {
    "type": "MARKET",
    "price": 1450
  },
  "target": {
    "price": 1550
  },
  "stop_loss": {
    "price": 1400
  },
  "risk_reward_ratio": 2.0,
  "invalidation_conditions": [],
  "confidence": 84
}
```

---

# 42. RECOMMENDATION STATES

```text
BUY
SELL
HOLD
NO_TRADE
```

---

# 43. AI CONTEXT API

Endpoint:

```text
POST /ai/context
```

The backend must build the context packet before calling the LLM.

Input:

```json
{
  "instrument_id": "uuid",
  "analysis_mode": "STANDARD",
  "time_horizon": "SWING"
}
```

Output:

```json
{
  "context_id": "uuid",
  "instrument": {},
  "market": {},
  "quant": {},
  "signal": {},
  "risk": {},
  "recommendation": {},
  "institutional": {},
  "options": {},
  "macro": {},
  "global": {},
  "news": [],
  "geopolitics": [],
  "data_quality": {}
}
```

---

# 44. AI ANALYSIS API

Endpoint:

```text
POST /ai/analyze
```

Input:

```json
{
  "context_id": "uuid",
  "analysis_mode": "STANDARD"
}
```

Output:

```json
{
  "analysis_id": "uuid",
  "instrument_id": "uuid",
  "market_view": "BULLISH",
  "ai_confidence": 82,
  "summary": "...",
  "supporting_factors": [],
  "contradicting_factors": [],
  "risks": [],
  "catalysts": [],
  "scenarios": [],
  "what_to_watch": [],
  "source_references": [],
  "data_quality": 95
}
```

---

# 45. AI CONFIDENCE RULE

AI confidence:

```text
0–100
```

does NOT represent probability of profit.

It represents confidence in the AI's interpretation of the supplied evidence.

---

# 46. AI / QUANT AGREEMENT API

Endpoint:

```text
POST /ai/agreement
```

Input:

```json
{
  "quant_direction": "BULLISH",
  "ai_direction": "BULLISH",
  "quant_score": 82,
  "ai_confidence": 84
}
```

Output:

```json
{
  "agreement_score": 91,
  "status": "HIGH_AGREEMENT",
  "conflicts": []
}
```

---

# 47. PORTFOLIO API

Endpoint:

```text
GET /portfolio
```

Response:

```json
{
  "portfolio_value": 2500000,
  "cash": 500000,
  "invested": 2000000,
  "positions": [],
  "exposure": {},
  "risk": {},
  "performance": {}
}
```

---

# 48. PORTFOLIO ANALYSIS API

Endpoint:

```text
POST /portfolio/analyze
```

Output:

```json
{
  "portfolio_risk": "MODERATE",
  "concentration_score": 72,
  "diversification_score": 78,
  "sector_exposure": {},
  "correlations": [],
  "warnings": [],
  "ai_summary": "..."
}
```

---

# 49. WATCHLIST API

Endpoint:

```text
GET /watchlist
```

Create:

```text
POST /watchlist
```

Delete:

```text
DELETE /watchlist/{instrument_id}
```

---

# 50. WATCHLIST ANALYSIS

Endpoint:

```text
POST /watchlist/analyze
```

Response:

```json
{
  "timestamp": "2026-08-30T18:00:00+05:30",
  "opportunities": [],
  "risks": [],
  "no_trade": []
}
```

---

# 51. ALERT API

Endpoint:

```text
GET /alerts
```

Create:

```text
POST /alerts
```

Acknowledge:

```text
POST /alerts/{alert_id}/acknowledge
```

---

# 52. ALERT CONTRACT

```json
{
  "alert_id": "uuid",
  "type": "SIGNAL_CHANGE",
  "severity": "HIGH",
  "instrument_id": "uuid",
  "timestamp": "2026-08-30T18:00:00+05:30",
  "title": "Signal changed",
  "message": "...",
  "source": "SIGNAL_ENGINE",
  "requires_action": false
}
```

---

# 53. DAILY MARKET REPORT API

Endpoint:

```text
GET /reports/daily
```

Response:

```json
{
  "report_id": "uuid",
  "date": "2026-08-30",
  "market_summary": {},
  "fii_dii": {},
  "global": {},
  "commodities": {},
  "sectors": {},
  "top_opportunities": [],
  "major_risks": [],
  "ai_summary": "..."
}
```

---

# 54. PRE-MARKET REPORT API

Endpoint:

```text
GET /reports/pre-market
```

Include:

```text
Global markets
Overnight events
FII/DII
GIFT NIFTY
USDINR
Crude
Gold
US yields
India VIX
Major news
Geopolitics
Sector setup
Options setup
Potential opportunities
Potential risks
```

---

# 55. POST-MARKET REPORT API

Endpoint:

```text
GET /reports/post-market
```

Include:

```text
NIFTY
BANK NIFTY
Breadth
Sector performance
FII/DII
Institutional activity
Major movers
News
Options
Commodities
Global setup
Important events
Next-day watchlist
```

---

# 56. BACKTESTING API

Endpoint:

```text
POST /backtest/run
```

Input:

```json
{
  "strategy_id": "uuid",
  "instrument_ids": [],
  "start_date": "2020-01-01",
  "end_date": "2026-01-01",
  "initial_capital": 1000000
}
```

Output:

```json
{
  "backtest_id": "uuid",
  "total_return": 0.32,
  "cagr": 0.05,
  "max_drawdown": 0.18,
  "sharpe": 1.2,
  "sortino": 1.6,
  "win_rate": 0.58,
  "profit_factor": 1.7,
  "trades": 124
}
```

---

# 57. MODEL VALIDATION API

Endpoint:

```text
POST /models/validate
```

Input:

```json
{
  "model_id": "uuid",
  "dataset_id": "uuid",
  "validation_type": "WALK_FORWARD"
}
```

Output:

```json
{
  "validation_id": "uuid",
  "status": "PASSED",
  "metrics": {},
  "warnings": [],
  "recommendation": "APPROVED_FOR_PAPER_TRADING"
}
```

---

# 58. MODEL STATUS

Allowed:

```text
EXPERIMENTAL
BACKTESTED
VALIDATED
PAPER_TRADING
PRODUCTION
RETIRED
```

---

# 59. AI HYPOTHESIS API

Endpoint:

```text
POST /ai/hypothesis
```

Output:

```json
{
  "hypothesis_id": "uuid",
  "hypothesis": "...",
  "supporting_evidence": [],
  "required_features": [],
  "suggested_test": {},
  "status": "PROPOSED"
}
```

---

# 60. AI MUST NOT ACTIVATE HYPOTHESES

AI-generated hypotheses must go through:

```text
BACKTEST
↓
VALIDATION
↓
PAPER TRADING
↓
HUMAN APPROVAL
```

before production.

---

# 61. DATA FRESHNESS CONTRACT

Every market-data response must contain:

```text
timestamp
source
data_status
```

The system must calculate:

```text
data_age_seconds
```

---

# 62. STALE DATA CONTRACT

Example:

```json
{
  "data_status": "STALE",
  "data_age_seconds": 3600
}
```

Consumers must not treat stale data as live data.

---

# 63. DATA QUALITY CONTRACT

Every major analysis response should include:

```json
{
  "data_quality": {
    "score": 94,
    "missing_fields": [],
    "stale_fields": [],
    "source_quality": 96
  }
}
```

---

# 64. SOURCE CONTRACT

Every external data point should maintain:

```json
{
  "source_id": "uuid",
  "provider": "provider_name",
  "source_type": "EXCHANGE",
  "retrieved_at": "2026-08-30T18:00:00+05:30",
  "published_at": null,
  "url": null
}
```

---

# 65. TIME CONTRACT

All backend timestamps must use:

```text
ISO 8601
```

Example:

```text
2026-08-30T18:30:00+05:30
```

Database storage should use UTC where practical.

UI should display:

```text
Asia/Kolkata
```

---

# 66. MONETARY CONTRACT

Default currency:

```text
INR
```

Store monetary values numerically.

Do not store:

```text
₹10 lakh
```

as a numeric database value.

Instead:

```json
{
  "amount": 1000000,
  "currency": "INR"
}
```

---

# 67. PERCENTAGE CONTRACT

Percentages must be explicitly named.

Example:

```json
{
  "change_percent": 2.4
}
```

means:

```text
2.4%
```

Do not mix:

```text
0.024
```

and:

```text
2.4
```

without explicit documentation.

---

# 68. SCORE CONTRACT

All scores:

```text
0–100
```

unless explicitly documented otherwise.

---

# 69. SCORE INTERPRETATION

```text
0–20   Very Weak
21–40  Weak
41–60  Neutral
61–80  Strong
81–100 Very Strong
```

The Recommendation Engine may define different thresholds.

---

# 70. DIRECTION CONTRACT

Allowed:

```text
VERY_BULLISH
BULLISH
NEUTRAL
BEARISH
VERY_BEARISH
```

---

# 71. MARKET SIGNAL CONTRACT

Signals must include:

```text
direction
score
timestamp
model_version
data_quality
supporting_factors
contradicting_factors
```

---

# 72. RECOMMENDATION TRACEABILITY

Every recommendation must be traceable to:

```text
Market Data
Feature Version
Quant Model Version
Signal Model Version
Risk Model Version
Recommendation Model Version
AI Model Version
Prompt Version
```

---

# 73. RECOMMENDATION AUDIT OBJECT

```json
{
  "recommendation_id": "uuid",
  "instrument_id": "uuid",
  "timestamp": "2026-08-30T18:00:00+05:30",
  "recommendation": "BUY",
  "quant_model_version": "1.0",
  "signal_model_version": "1.0",
  "risk_model_version": "1.0",
  "recommendation_model_version": "1.0",
  "ai_model": "configured-model",
  "ai_prompt_version": "1.0"
}
```

---

# 74. AI AUDIT CONTRACT

Store:

```json
{
  "analysis_id": "uuid",
  "context_id": "uuid",
  "model": "configured-model",
  "prompt_version": "1.0",
  "timestamp": "2026-08-30T18:00:00+05:30",
  "input_hash": "hash",
  "output_hash": "hash",
  "validation_status": "PASSED"
}
```

Do not store API keys.

---

# 75. EVENT-DRIVEN ANALYSIS

The system should support event triggers.

Examples:

```text
PRICE_BREAKOUT
PRICE_BREAKDOWN
VOLUME_SPIKE
OI_CHANGE
FII_CHANGE
DII_CHANGE
NEWS_EVENT
GEOPOLITICAL_EVENT
EARNINGS_EVENT
VOLATILITY_SPIKE
MARKET_REGIME_CHANGE
```

---

# 76. EVENT CONTRACT

```json
{
  "event_id": "uuid",
  "event_type": "NEWS_EVENT",
  "severity": "HIGH",
  "timestamp": "2026-08-30T18:00:00+05:30",
  "instrument_ids": [],
  "payload": {},
  "source": "NEWS_ENGINE"
}
```

---

# 77. EVENT PROCESSING

Architecture:

```text
EVENT
 ↓
EVENT BUS
 ↓
RELEVANT ENGINES
 ↓
RECALCULATION
 ↓
RISK CHECK
 ↓
RECOMMENDATION
 ↓
AI EXPLANATION
 ↓
ALERT
```

---

# 78. EVENT PRIORITY

```text
CRITICAL
HIGH
MEDIUM
LOW
INFO
```

---

# 79. EVENT DEDUPLICATION

The system must prevent duplicate processing.

Use:

```text
event_id
source_event_id
content_hash
```

where appropriate.

---

# 80. IDEMPOTENCY

Operations that may be retried must support idempotency.

Example:

```text
Idempotency-Key
```

for:

```text
POST /backtest/run
POST /ai/analyze
POST /reports/generate
```

when appropriate.

---

# 81. RATE LIMITING

External APIs must be protected by:

```text
Rate Limiter
Retry
Exponential Backoff
Circuit Breaker
```

---

# 82. EXTERNAL API FAILURE

If an external provider fails:

```text
Provider
 ↓
Retry
 ↓
Fallback Provider
 ↓
Cached Data
 ↓
Mark Data Unavailable
```

Never silently substitute unreliable data.

---

# 83. SERVICE HEALTH API

Endpoint:

```text
GET /health
```

Response:

```json
{
  "status": "HEALTHY",
  "services": {
    "database": "UP",
    "market_data": "UP",
    "news": "UP",
    "llm": "UP",
    "event_bus": "UP"
  }
}
```

---

# 84. READINESS API

Endpoint:

```text
GET /ready
```

Used to determine whether the application can process requests.

---

# 85. DESKTOP APPLICATION API

The desktop UI should communicate only with the backend application API.

Architecture:

```text
DESKTOP UI
   ↓
LOCAL API
   ↓
APPLICATION SERVICES
   ↓
DATABASE / EXTERNAL SERVICES
```

The UI must not directly access external market APIs unless explicitly designed for a read-only optimization.

---

# 86. UI MARKET DATA API

Endpoint:

```text
GET /dashboard/market
```

Returns an aggregated dashboard payload.

---

# 87. DASHBOARD RESPONSE

```json
{
  "timestamp": "2026-08-30T18:00:00+05:30",
  "market_regime": {},
  "indices": {},
  "breadth": {},
  "fii_dii": {},
  "sectors": [],
  "commodities": {},
  "top_opportunities": [],
  "top_risks": [],
  "alerts": []
}
```

---

# 88. STOCK DETAIL API

Endpoint:

```text
GET /dashboard/instrument/{instrument_id}
```

Should return:

```text
Quote
Technical
Fundamental
Institutional
Options
News
Macro
Global
Risk
Recommendation
AI Analysis
```

---

# 89. AI CHAT API

Endpoint:

```text
POST /ai/chat
```

Input:

```json
{
  "conversation_id": "uuid",
  "message": "Why is RELIANCE bullish?",
  "context": {
    "instrument_id": "uuid"
  }
}
```

Output:

```json
{
  "message_id": "uuid",
  "answer": "...",
  "citations": [],
  "data_timestamp": "2026-08-30T18:00:00+05:30"
}
```

---

# 90. AI CHAT RULE

AI chat must use current structured market context where relevant.

It must not rely purely on the LLM's internal knowledge for live market questions.

---

# 91. AI CHAT EXAMPLE

User:

```text
Why is NIFTY falling?
```

System workflow:

```text
Current Market Data
+
Global Market
+
FII/DII
+
News
+
Macro
+
Options
+
Geopolitical
+
Market Regime
↓
AI
↓
Explanation
```

---

# 92. AI CHAT DATA FRESHNESS

The answer should display:

```text
Analysis based on data as of:
HH:MM IST
```

when discussing live market conditions.

---

# 93. RESEARCH REQUEST API

Endpoint:

```text
POST /research
```

Input:

```json
{
  "instrument_id": "uuid",
  "research_mode": "DEEP",
  "time_horizon": "LONG_TERM"
}
```

Output:

```json
{
  "research_id": "uuid",
  "status": "COMPLETED",
  "recommendation": {},
  "quant_analysis": {},
  "ai_analysis": {},
  "sources": []
}
```

---

# 94. RESEARCH MODES

```text
QUICK
STANDARD
DEEP
```

---

# 95. LONG-RUN AUTOMATIC ANALYSIS

The application must support scheduled/background analysis.

Example:

```text
Internet Available
 ↓
Data Synchronization
 ↓
Data Validation
 ↓
Market Analysis
 ↓
Signal Recalculation
 ↓
Risk Evaluation
 ↓
Recommendation Evaluation
 ↓
AI Research
 ↓
Alert Generation
 ↓
Dashboard Update
```

---

# 96. INTERNET CONNECTIVITY API

The application should detect:

```text
ONLINE
OFFLINE
DEGRADED
```

---

# 97. OFFLINE MODE

When offline:

```text
Use cached data
Display data age
Disable live recommendations
Queue non-critical tasks
```

---

# 98. ONLINE RECOVERY

When internet returns:

```text
Connectivity detected
↓
Synchronize data
↓
Validate timestamps
↓
Process missed events where possible
↓
Recalculate affected models
↓
Generate updated analysis
```

---

# 99. RECOMMENDATION INVALIDATION

A recommendation should become stale when:

```text
Material price change
Major news event
Market regime change
Risk threshold change
New fundamental event
Institutional data update
Options structure change
```

---

# 100. RECOMMENDATION STATUS

```text
ACTIVE
STALE
INVALIDATED
EXPIRED
COMPLETED
```

---

# 101. RECOMMENDATION LIFECYCLE

```text
GENERATED
 ↓
VALIDATED
 ↓
ACTIVE
 ↓
UPDATED
 ↓
EXPIRED / INVALIDATED / COMPLETED
```

---

# 102. API SECURITY

All sensitive endpoints must require authentication.

Use:

```text
JWT or secure session authentication
```

depending on desktop architecture.

---

# 103. SECRET MANAGEMENT

API keys must come from:

```text
Environment Variables
Secure OS Credential Store
Secret Manager
```

Never hard-code:

```text
API keys
LLM keys
Database passwords
Broker credentials
```

---

# 104. BROKER API BOUNDARY

Version 1 must NOT implement automatic trading.

If broker integration is added:

```text
Recommendation
 ↓
Risk Engine
 ↓
User Confirmation
 ↓
Broker Adapter
```

---

# 105. BROKER ADAPTER

Future interface:

```text
BrokerAdapter
```

Methods:

```text
get_account()
get_positions()
get_orders()
get_quote()
place_order()
cancel_order()
```

The implementation must be broker-specific.

---

# 106. NO DIRECT LLM BROKER ACCESS

The LLM must never directly invoke:

```text
place_order()
cancel_order()
modify_order()
```

---

# 107. DATABASE BOUNDARY

Engines should access data through repository/service layers.

Do NOT allow:

```text
UI → Direct SQL
AI → Direct SQL
```

Preferred:

```text
UI
 ↓
API
 ↓
SERVICE
 ↓
REPOSITORY
 ↓
DATABASE
```

---

# 108. SERVICE BOUNDARY

Major services:

```text
MarketDataService
FeatureService
QuantService
SignalService
RiskService
RecommendationService
PortfolioService
NewsService
MacroService
GeopoliticalService
InstitutionalService
AIService
AlertService
BacktestService
ValidationService
```

---

# 109. EVENT BUS

Use an internal event bus abstraction.

Initial implementation may use:

```text
In-process event bus
```

Future implementation may use:

```text
Redis
RabbitMQ
Kafka
```

Do not hard-code the application to one event-bus provider.

---

# 110. ASYNC PROCESSING

Long-running tasks must be asynchronous.

Examples:

```text
Deep Research
Backtesting
Historical Data Download
Large Watchlist Analysis
LLM Batch Analysis
Report Generation
```

---

# 111. JOB API

Endpoint:

```text
GET /jobs/{job_id}
```

Response:

```json
{
  "job_id": "uuid",
  "status": "RUNNING",
  "progress": 65,
  "started_at": "2026-08-30T18:00:00+05:30",
  "estimated_completion": null
}
```

---

# 112. JOB STATES

```text
QUEUED
RUNNING
COMPLETED
FAILED
CANCELLED
```

---

# 113. LOGGING CONTRACT

Every service should generate structured logs containing:

```text
timestamp
service
level
request_id
event
message
error_code
```

Do not log secrets.

---

# 114. CORRELATION ID

Every request must have:

```text
request_id
```

and downstream calls should propagate it.

---

# 115. VERSION COMPATIBILITY

Every major model output should include:

```text
schema_version
model_version
```

Example:

```json
{
  "schema_version": "1.0",
  "model_version": "quant-v1.0"
}
```

---

# 116. SCHEMA VALIDATION

All incoming and outgoing API objects must be validated using a schema system.

Recommended:

```text
Pydantic
```

for Python backend.

Equivalent schema validation is acceptable for another backend language.

---

# 117. API DOCUMENTATION

Generate:

```text
OpenAPI / Swagger
```

from the API definitions.

The implementation must keep API documentation synchronized with the actual schemas.

---

# 118. CONTRACT TESTING

Every major API must have automated contract tests.

At minimum:

```text
Market Quote
OHLCV
Features
Quant
Signals
Risk
Recommendation
AI Context
AI Analysis
Portfolio
Alerts
Reports
```

---

# 119. API TEST REQUIREMENTS

Tests should cover:

```text
Valid input
Missing input
Invalid input
Stale data
Missing data
External API failure
Database failure
Malformed AI output
Timeout
Duplicate request
```

---

# 120. CRITICAL DATA FLOW

The canonical production flow is:

```text
1. Market data arrives

2. Data is validated

3. Features are calculated

4. Quant model evaluates factors

5. Signal engine evaluates setup

6. Risk engine evaluates risk

7. Recommendation engine produces recommendation

8. AI context packet is created

9. AI interprets the evidence

10. AI output is validated

11. Recommendation + AI explanation are stored

12. Alert engine evaluates whether notification is required

13. UI receives updated state
```

---

# 121. AUTHORITY HIERARCHY

The following authority hierarchy must be enforced:

```text
1. Risk Engine
2. Recommendation Rules
3. Signal Engine
4. Quant Model
5. AI Interpretation
6. UI
```

The AI cannot override a higher-authority system.

---

# 122. DATA AUTHORITY

For factual market information:

```text
Official / verified market data
>
Derived quantitative data
>
AI interpretation
```

AI interpretation is never the source of truth for raw market data.

---

# 123. FINAL DECISION OBJECT

The UI should receive one consolidated object:

```json
{
  "instrument_id": "uuid",
  "timestamp": "2026-08-30T18:00:00+05:30",

  "recommendation": {
    "action": "BUY",
    "score": 82,
    "risk": "MODERATE",
    "time_horizon": "SWING"
  },

  "price": {
    "current": 1450,
    "entry": 1450,
    "target": 1550,
    "stop_loss": 1400
  },

  "quant": {
    "score": 82,
    "direction": "BULLISH"
  },

  "ai": {
    "view": "BULLISH",
    "confidence": 84,
    "agreement": 91,
    "summary": "..."
  },

  "data_quality": 95,

  "risks": [],

  "catalysts": [],

  "invalidators": [],

  "sources": []
}
```

---

# 124. UI DISPLAY PRIORITY

The UI should show:

```text
ACTION
↓
SCORE
↓
RISK
↓
CURRENT PRICE
↓
TARGET
↓
STOP LOSS
↓
WHY
↓
RISKS
↓
CONTRADICTIONS
↓
AI ANALYSIS
↓
SOURCES
```

---

# 125. NO-TRADE RESPONSE

When there is insufficient evidence:

```json
{
  "recommendation": {
    "action": "NO_TRADE",
    "score": 48,
    "risk": "HIGH"
  },
  "reason": "Conflicting signals and elevated risk."
}
```

---

# 126. API DESIGN GOLDEN RULE

Never create an API merely because the UI needs a value.

First determine:

```text
Which service owns the value?
```

Then expose that value through the owning service.

---

# 127. API DESIGN ANTI-PATTERNS

Do NOT implement:

```text
AI calculating RSI
UI calculating recommendation
AI modifying risk score
UI modifying signal score
Multiple services writing the same database table without coordination
Hard-coded API keys
Hard-coded provider URLs
LLM directly accessing broker APIs
```

---

# 128. CLAUDE CODE IMPLEMENTATION RULE

Claude Code must treat this document as the authoritative API contract.

Before implementing any service:

```text
1. Read API_CONTRACTS.md
2. Read SYSTEM_ARCHITECTURE.md
3. Read DATABASE_SPEC.md
4. Read the relevant engine specification
5. Check model/schema compatibility
6. Implement
7. Write tests
8. Update OpenAPI
```

---

# 129. CHANGE MANAGEMENT

If Claude Code identifies a required API change:

It must NOT silently modify the contract.

It must:

```text
1. Identify conflict
2. Explain why change is required
3. Propose new contract
4. Update version if breaking
5. Update dependent services
6. Update tests
```

---

# 130. PRODUCTION SAFETY

No API should automatically place a real trade in Version 1.

The system is:

```text
RESEARCH
+
ANALYSIS
+
DECISION SUPPORT
```

not an autonomous trading bot.

---

# 131. DEFINITION OF DONE

API architecture is complete when:

```text
✓ All major services have contracts
✓ All request/response objects are schema validated
✓ All APIs are versioned
✓ Errors are standardized
✓ Data freshness is tracked
✓ Data quality is tracked
✓ Model versions are tracked
✓ AI versions are tracked
✓ Recommendations are traceable
✓ Events are traceable
✓ Jobs are trackable
✓ API documentation is generated
✓ Contract tests exist
✓ External API failures are handled
✓ Offline mode is supported
✓ AI cannot override Risk Engine
✓ AI cannot directly trade
✓ UI does not directly access database
✓ Secrets are protected
```

---

# 132. FINAL SYSTEM CONTRACT

The complete system must follow:

```text
                 ┌──────────────────┐
                 │ EXTERNAL SOURCES │
                 └────────┬─────────┘
                          ↓
                 ┌──────────────────┐
                 │ MARKET DATA      │
                 │ PIPELINE          │
                 └────────┬─────────┘
                          ↓
                 ┌──────────────────┐
                 │ FEATURE ENGINE   │
                 └────────┬─────────┘
                          ↓
                 ┌──────────────────┐
                 │ QUANT MODEL      │
                 └────────┬─────────┘
                          ↓
                 ┌──────────────────┐
                 │ SIGNAL ENGINE    │
                 └────────┬─────────┘
                          ↓
                 ┌──────────────────┐
                 │ RISK ENGINE      │
                 └────────┬─────────┘
                          ↓
                 ┌──────────────────┐
                 │ RECOMMENDATION   │
                 │ ENGINE           │
                 └────────┬─────────┘
                          ↓
                 ┌──────────────────┐
                 │ AI / LLM ENGINE  │
                 └────────┬─────────┘
                          ↓
                 ┌──────────────────┐
                 │ ALERT ENGINE     │
                 └────────┬─────────┘
                          ↓
                 ┌──────────────────┐
                 │ DESKTOP UI       │
                 └──────────────────┘
```

The key architectural principle is:

```text
DATA → MODELS → SIGNAL → RISK → RECOMMENDATION → AI EXPLANATION → USER
```

not:

```text
DATA → LLM → BUY/SELL
```

The first architecture is the required production architecture.
