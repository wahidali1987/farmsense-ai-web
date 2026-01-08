import axios from "axios";
import { API_BASE_URL } from '../config/config';

class DashboardService {
  async fetchDashboard() {
    // Mock response for testing
    const mockData = {
      "summary": {
        "totalBatches": 4,
        "activeBatches": 3,
        "totalAliveBirds": 8450,
        "overallRisk": "MEDIUM",
        "todayEstimatedProfit": 185000
      },
      "batches": [
        {
          "batchId": "c1a1-uuid-001",
          "batchCode": "SONALI-2025-001",
          "birdType": "SONALI",
          "ageInDays": 32,
          "status": "ACTIVE",
          "birds": {
            "initial": 3000,
            "alive": 2985,
            "mortalityPercent": 0.5
          },
          "growth": {
            "avgWeightG": 620,
            "expectedWeightG": 650,
            "growthStatus": "ON_TRACK",
            "deviationPercent": -4.6
          },
          "feed": {
            "recommendedPerBirdG": 70,
            "actualPerBirdG": 62,
            "deviationPercent": -11.4,
            "status": "LOW_INTAKE"
          },
          "health": {
            "riskLevel": "MEDIUM",
            "activeAlerts": 1,
            "lastAlertMessage": "Possible gut health imbalance",
            "confidence": 0.68
          },
          "profit": {
            "totalCost": 185000,
            "expectedRevenue": 255000,
            "expectedProfit": 70000,
            "costPerBird": 61.5
          },
          "actions": {
            "viewDetails": true,
            "priority": "ATTENTION"
          }
        },
        {
          "batchId": "c1a1-uuid-002",
          "batchCode": "BROILER-2025-002",
          "birdType": "BROILER",
          "ageInDays": 18,
          "status": "ACTIVE",
          "birds": {
            "initial": 2500,
            "alive": 2460,
            "mortalityPercent": 0.8
          },
          "growth": {
            "avgWeightG": 980,
            "expectedWeightG": 950,
            "growthStatus": "FAST",
            "deviationPercent": 3.1
          },
          "feed": {
            "recommendedPerBirdG": 85,
            "actualPerBirdG": 82,
            "deviationPercent": -3.2,
            "status": "OK"
          },
          "health": {
            "riskLevel": "LOW",
            "activeAlerts": 0,
            "lastAlertMessage": null,
            "confidence": 0.32
          },
          "profit": {
            "totalCost": 136000,
            "expectedRevenue": 178000,
            "expectedProfit": 42000,
            "costPerBird": 55.2
          },
          "actions": {
            "viewDetails": true,
            "priority": "NORMAL"
          }
        },
        {
          "batchId": "c1a1-uuid-003",
          "batchCode": "SONALI-2025-003",
          "birdType": "SONALI",
          "ageInDays": 7,
          "status": "ACTIVE",
          "birds": {
            "initial": 2000,
            "alive": 1995,
            "mortalityPercent": 0.25
          },
          "growth": {
            "avgWeightG": 95,
            "expectedWeightG": 100,
            "growthStatus": "EARLY_STAGE",
            "deviationPercent": -5
          },
          "feed": {
            "recommendedPerBirdG": 18,
            "actualPerBirdG": 17,
            "deviationPercent": -5.5,
            "status": "OK"
          },
          "health": {
            "riskLevel": "LOW",
            "activeAlerts": 0,
            "lastAlertMessage": null,
            "confidence": 0.21
          },
          "profit": {
            "totalCost": 42000,
            "expectedRevenue": 0,
            "expectedProfit": -42000,
            "costPerBird": 21
          },
          "actions": {
            "viewDetails": true,
            "priority": "NORMAL"
          }
        }
      ],
      "lastUpdatedAt": "2026-01-03T18:40:12"
    };
    return mockData;

    // Uncomment below for real API call when backend is ready
    /*
    try {
      const res = await axios.get(`${API_BASE_URL}/api/dashboard/batches`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    } catch (err) {
      console.error("Dashboard API error", err);
      throw err;
    }
    */
  }
}

export default DashboardService;
