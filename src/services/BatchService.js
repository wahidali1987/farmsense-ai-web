import axios from "axios";
import { API_BASE_URL } from '../config/config';

class BatchService {
  async fetchBatchDetails(batchId) {
    // Mock response for testing
    const mockData = {
      "batchInfo": {
        "batchId": "uuid-batch-001",
        "batchCode": "SONALI-2025-001",
        "birdType": "SONALI",
        "status": "ACTIVE",
        "startDate": "2025-12-02",
        "ageInDays": 32
      },
      "birds": {
        "initial": 3000,
        "alive": 2985,
        "mortalityCount": 15,
        "mortalityPercent": 0.5
      },
      "summary": {
        "healthRisk": "MEDIUM",
        "riskConfidence": 0.68,
        "growthStatus": "ON_TRACK",
        "feedStatus": "LOW_INTAKE",
        "expectedProfit": 70000
      },
      "kpis": {
        "avgWeightG": {
          "value": 620,
          "expected": 650,
          "status": "BELOW_EXPECTATION"
        },
        "feedPerBirdG": {
          "value": 62,
          "expected": 70,
          "status": "LOW"
        },
        "fcr": {
          "value": 1.92,
          "status": "OK"
        },
        "mortalityPercent": {
          "value": 0.5,
          "threshold": 1.0,
          "status": "SAFE"
        }
      },
      "charts": {
        "growthTrend": [
          { "day": 1, "actualWeight": 38, "expectedWeight": 40 },
          { "day": 7, "actualWeight": 95, "expectedWeight": 100 },
          { "day": 14, "actualWeight": 240, "expectedWeight": 255 },
          { "day": 21, "actualWeight": 410, "expectedWeight": 430 },
          { "day": 28, "actualWeight": 560, "expectedWeight": 585 },
          { "day": 32, "actualWeight": 620, "expectedWeight": 650 }
        ],
        "feedTrend": [
          { "day": 28, "recommended": 65, "actual": 60 },
          { "day": 29, "recommended": 68, "actual": 62 },
          { "day": 30, "recommended": 70, "actual": 63 },
          { "day": 31, "recommended": 70, "actual": 61 },
          { "day": 32, "recommended": 70, "actual": 62 }
        ],
        "mortalityTrend": [
          { "day": 25, "count": 1 },
          { "day": 26, "count": 0 },
          { "day": 27, "count": 2 },
          { "day": 28, "count": 0 },
          { "day": 29, "count": 1 }
        ]
      },
      "todayPlan": {
        "day": 32,
        "recommended": {
          "feedPerBirdG": 70,
          "waterPerBirdMl": 150,
          "supportCategory": "GUT_SUPPORT"
        },
        "actual": {
          "feedPerBirdG": 62,
          "waterPerBirdMl": 135,
          "supportCategory": "NONE"
        },
        "deviation": {
          "feedDeviationPercent": -11.4,
          "waterDeviationPercent": -10,
          "status": "ATTENTION_REQUIRED"
        }
      },
      "healthAlerts": [
        {
          "alertId": "alert-001",
          "date": "2026-01-02",
          "riskLevel": "MEDIUM",
          "message": "Possible gut health imbalance detected",
          "confidence": 0.68,
          "source": "AI_IMAGE_ANALYSIS",
          "actionable": false
        }
      ],
      "profit": {
        "totalCostTillDate": 185000,
        "expectedRevenue": 255000,
        "expectedProfit": 70000,
        "costPerBird": 61.5
      },
      "lastUpdatedAt": "2026-01-03T19:05:30"
    };
    return mockData;

    // Uncomment below for real API call when backend is ready
    /*
    try {
      const res = await axios.get(`${API_BASE_URL}/api/batches/${batchId}/dashboard`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    } catch (err) {
      console.error("Batch details API error", err);
      throw err;
    }
    */
  }

  async createBatch(batchData) {
    // Mock response for testing
    const mockResponse = {
      "batchId": "uuid-batch-006",
      "status": "ACTIVE",
      "currentDay": 1
    };
    return mockResponse;

    // Uncomment below for real API call when backend is ready
    /*
    try {
      const res = await axios.post(`${API_BASE_URL}/api/batches`, batchData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    } catch (err) {
      console.error("Create batch API error", err);
      throw err;
    }
    */
  }

  async fetchBatches(params = {}) {
    // Mock response for testing
    const mockData = {
      "success": true,
      "batches": [
        {
          "batchId": "c1a1-uuid-001",
          "batchCode": "SONALI-2025-001",
          "birdType": "SONALI",
          "ageInDays": 32,
          "status": "ACTIVE",
          "growth": {
            "growthStatus": "ON_TRACK"
          },
          "feed": {
            "status": "LOW_INTAKE"
          },
          "health": {
            "riskLevel": "MEDIUM"
          },
          "profit": {
            "totalCost": 30800,
            "expectedProfit": 26262
          }
        },
        {
          "batchId": "c1a1-uuid-002",
          "batchCode": "BROILER-2025-002",
          "birdType": "BROILER",
          "ageInDays": 18,
          "status": "ACTIVE",
          "growth": {
            "growthStatus": "FAST"
          },
          "feed": {
            "status": "OK"
          },
          "health": {
            "riskLevel": "LOW"
          },
          "profit": {
            "totalCost": 15600,
            "expectedProfit": 42000
          }
        }
      ]
    };
    return mockData;

    // Uncomment below for real API call when backend is ready
    /*
    try {
      const query = new URLSearchParams(params).toString();
      const res = await axios.get(`${API_BASE_URL}/api/batches?${query}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    } catch (err) {
      console.error("Fetch batches API error", err);
      throw err;
    }
    */
  }
}

export default BatchService;
