import axios from "axios";
import { API_BASE_URL } from "../config/config";

class ProfitService {
  /* ---------------- OVERVIEW ---------------- */
  async fetchProfitOverview(params = {}) {
    // ✅ MOCK DATA (frontend ready)
    const mockData = {
      summary: {
        totalCostTillDate: 450000,
        expectedRevenue: 680000,
        expectedProfit: 230000,
        avgCostPerBird: 61.8,
      },
      batches: [
        {
          batchId: "uuid-batch-001",
          batchCode: "SONALI-2025-001",
          birdType: "SONALI",
          ageInDays: 21,
          birdsAlive: 2985,
          expectedCost: 120000,
          expectedRevenue: 200000,
          expectedProfit: 80000,
          profitStatus: "ON_TRACK",
        },
        {
          batchId: "uuid-batch-002",
          batchCode: "BROILER-2025-002",
          birdType: "BROILER",
          ageInDays: 15,
          birdsAlive: 3100,
          expectedCost: 95000,
          expectedRevenue: 165000,
          expectedProfit: 70000,
          profitStatus: "FAST",
        },
      ],
    };

    return mockData;

    /*
    // 🔌 REAL API (enable when backend is ready)
    try {
      const query = new URLSearchParams(params).toString();
      const res = await axios.get(
        `${API_BASE_URL}/api/profit/overview?${query}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.error("Profit overview API error", err);
      throw err;
    }
    */
  }

  /* ---------------- BATCH PROFIT DETAIL ---------------- */
  async fetchBatchProfit(batchId) {
    // ✅ MOCK DATA
    const mockData = {
      batchInfo: {
        batchId,
        batchCode: "SONALI-2025-001",
        birdType: "SONALI",
        ageInDays: 32,
        birdsAlive: 2985,
      },
      costBreakdown: {
        chicks: 90000,
        feed: 65000,
        medicine: 12000,
        vaccination: 6000,
        electricity: 7000,
        labour: 5000,
        miscellaneous: 0,
        totalCost: 185000,
      },
      revenueProjection: {
        expectedWeightKg: 1.2,
        pricePerKg: 190,
        expectedRevenue: 255000,
        expectedProfit: 70000,
      },
      profitTrend: [
        { day: 7, profit: -20000 },
        { day: 14, profit: 15000 },
        { day: 21, profit: 42000 },
        { day: 28, profit: 61000 },
        { day: 32, profit: 70000 },
      ],
      "efficiencyTrend": [
        { "day": 7, "profit": -20000, "feedEfficiency": 0.82 },
        { "day": 14, "profit": 15000, "feedEfficiency": 0.88 },
        { "day": 21, "profit": 42000, "feedEfficiency": 0.93 }
      ]
    };

    return mockData;

    /*
    // 🔌 REAL API
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/profit/batch/${batchId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.error("Batch profit API error", err);
      throw err;
    }
    */
  }
}

export default ProfitService;
