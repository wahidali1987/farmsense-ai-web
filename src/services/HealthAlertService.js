import axios from "axios";
import { API_BASE_URL } from "../config/config";

class HealthAlertService {

  /* ---------------- FETCH ALERTS ---------------- */

  async fetchAlerts(params = {}) {
    // ✅ Mock response for testing (frontend ready)
    const mockData = {
      summary: {
        total: 4,
        high: 1,
        medium: 2,
        low: 1,
      },
      alerts: [
        {
          alertId: "alert-001",
          batchId: "uuid-batch-001",
          batchCode: "SONALI-2025-001",
          riskLevel: "MEDIUM",
          message: "Possible gut health imbalance detected",
          confidence: 0.68,
          source: "AI_IMAGE_ANALYSIS",
          date: "2026-01-05T10:30:00",
          actionable: true,
        },
      ],
    };

    return mockData;

    /*
    // 🔌 REAL API (enable when backend is ready)
    try {
      const query = new URLSearchParams(params).toString();
      const res = await axios.get(
        `${API_BASE_URL}/api/health-alerts?${query}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.error("Fetch health alerts API error", err);
      throw err;
    }
    */
  }

  /* ---------------- MARK REVIEWED ---------------- */

  async markReviewed(alertId) {
    // ✅ Mock success response
    console.log(`Mock: Alert ${alertId} marked as reviewed`);

    return {
      success: true,
      message: "Alert marked as reviewed",
    };

    /*
    // 🔌 REAL API (enable when backend is ready)
    try {
      const res = await axios.patch(
        `${API_BASE_URL}/api/health-alerts/${alertId}/review`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.error("Mark reviewed API error", err);
      throw err;
    }
    */
  }
}

export default HealthAlertService;
