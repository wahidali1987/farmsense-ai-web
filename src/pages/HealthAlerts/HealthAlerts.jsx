import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Filter } from "lucide-react";
import toast from "react-hot-toast"; // ✅ toast

import Sidebar from "../../components/Sidebar";
import HealthAlertService from "../../services/HealthAlertService";

export default function HealthAlerts() {
  const [data, setData] = useState(null);
  const [riskFilter, setRiskFilter] = useState("ALL");
  const [reviewingId, setReviewingId] = useState(null); // ✅ disable state
  const navigate = useNavigate();
  const healthAlertService = new HealthAlertService();

  const loadAlerts = async () => {
    try {
      const res = await healthAlertService.fetchAlerts({
        riskLevel: riskFilter === "ALL" ? undefined : riskFilter,
      });
      setData(res);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load alerts");
    }
  };

  useEffect(() => {
    loadAlerts();
  }, [riskFilter]);

  const handleMarkReviewed = async (alertId) => {
    try {
      setReviewingId(alertId); // 🔒 disable button
      await healthAlertService.markReviewed(alertId);

      toast.success("Alert marked as reviewed"); // ✅ toast
      await loadAlerts(); // 🔁 refresh list
    } catch (err) {
      console.error(err);
      toast.error("Failed to mark alert");
    } finally {
      setReviewingId(null);
    }
  };

  if (!data) {
    return (
      <div className="flex">
        <Sidebar />
        <main className="ml-64 p-6">Loading health alerts...</main>
      </div>
    );
  }

  const { summary, alerts } = data;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ✅ Sidebar badge sync */}
      <Sidebar alertCount={summary.total} />

      <main className="ml-64 flex-1 p-8">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Health Alerts</h1>
          <p className="text-sm text-gray-500">
            Monitor and act on poultry health risks
          </p>
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <SummaryCard label="Active Alerts" value={summary.total} />
          <SummaryCard label="High Risk" value={summary.high} danger />
          <SummaryCard label="Medium Risk" value={summary.medium} warning />
        </div>

        {/* FILTER */}
        <div className="flex justify-end mb-4">
          <div className="relative">
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="appearance-none bg-white border rounded-lg
                px-4 py-2 pr-10 text-sm shadow-sm"
            >
              <option value="ALL">All Risks</option>
              <option value="HIGH">High Risk</option>
              <option value="MEDIUM">Medium Risk</option>
              <option value="LOW">Low Risk</option>
            </select>
            <Filter
              size={16}
              className="absolute right-3 top-2.5 text-gray-400 pointer-events-none"
            />
          </div>
        </div>

        {/* ALERT LIST */}
        <div className="space-y-4">
          {alerts.map((alert) => (
            <AlertCard
              key={alert.alertId}
              alert={alert}
              loading={reviewingId === alert.alertId}
              onViewBatch={() =>
                navigate(`/batches/${alert.batchId}`)
              }
              onMarkReviewed={() =>
                handleMarkReviewed(alert.alertId)
              }
            />
          ))}
        </div>

        {alerts.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No alerts for this filter.
          </p>
        )}
      </main>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

const SummaryCard = ({ label, value, danger, warning }) => (
  <div
    className={`bg-white rounded-xl shadow p-5 ${
      danger
        ? "border-l-4 border-red-500"
        : warning
        ? "border-l-4 border-yellow-400"
        : ""
    }`}
  >
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);

const AlertCard = ({ alert, onViewBatch, onMarkReviewed, loading }) => {
  const riskColors = {
    HIGH: "bg-red-100 text-red-700",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    LOW: "bg-green-100 text-green-700",
  };

  return (
    <div className="bg-white rounded-xl shadow p-5 flex justify-between items-start">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              riskColors[alert.riskLevel]
            }`}
          >
            {alert.riskLevel}
          </span>
          <span className="text-sm text-gray-500">
            {alert.source}
          </span>
        </div>

        <p className="font-semibold mb-1">{alert.message}</p>

        <p className="text-sm text-gray-500">
          Batch: <b>{alert.batchCode}</b>
        </p>

        <p className="text-xs text-gray-400 mt-1">
          Detected: {new Date(alert.date).toLocaleString()} · Confidence{" "}
          {(alert.confidence * 100).toFixed(0)}%
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={onViewBatch}
          className="bg-green-700 hover:bg-green-800
            text-white px-4 py-2 rounded-lg text-sm"
        >
          View Batch
        </button>

        {alert.actionable && (
          <button
            disabled={loading}
            onClick={onMarkReviewed}
            className={`flex items-center justify-center gap-2
              border px-4 py-2 rounded-lg text-sm
              ${
                loading
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:bg-gray-50"
              }`}
          >
            {loading ? (
              "Marking..."
            ) : (
              <>
                <CheckCircle size={16} />
                Mark Reviewed
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
