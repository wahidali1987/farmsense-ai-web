import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import ProfitService from "../../services/ProfitService";

export default function ProfitCosts() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const profitService = new ProfitService();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await profitService.fetchProfitOverview();
        setData(res);
      } catch (err) {
        console.error(err);
      }
    };
    loadData();
  }, []);

  if (!data) {
    return (
      <div className="flex">
        <Sidebar />
        <main className="ml-64 p-6">Loading profit data...</main>
      </div>
    );
  }

  const { summary, batches } = data;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <main className="ml-64 flex-1 p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Profit & Costs</h1>
            <p className="text-sm text-gray-500">
              Track profitability across all batches
            </p>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <SummaryCard
            label="Total Cost Till Date"
            value={`₹${summary.totalCostTillDate.toLocaleString()}`}
          />
          <SummaryCard
            label="Expected Revenue"
            value={`₹${summary.expectedRevenue.toLocaleString()}`}
          />
          <SummaryCard
            label="Expected Profit"
            value={`₹${summary.expectedProfit.toLocaleString()}`}
            highlight
          />
          <SummaryCard
            label="Avg Cost / Bird"
            value={`₹${summary.avgCostPerBird}`}
          />
        </div>

        {/* BATCH PROFIT CARDS */}
        <h2 className="font-semibold mb-4">Batch-wise Profit</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {batches.map((batch) => (
            <BatchProfitCard
              key={batch.batchId}
              batch={batch}
              onView={() =>
                navigate(`/profit/batch/${batch.batchId}`)
              }
            />
          ))}
        </div>
      </main>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

const SummaryCard = ({ label, value, highlight }) => (
  <div className="bg-white rounded-xl shadow p-5">
    <div className="text-sm text-gray-500">{label}</div>
    <div
      className={`text-2xl font-bold ${
        highlight ? "text-green-700" : ""
      }`}
    >
      {value}
    </div>
  </div>
);

const BatchProfitCard = ({ batch, onView }) => {
  const statusColors = {
    ON_TRACK: "bg-green-100 text-green-700",
    FAST: "bg-orange-100 text-orange-700",
    SLOW: "bg-yellow-100 text-yellow-700",
    HIGH: "bg-red-100 text-red-700",
    LOW: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">{batch.batchCode}</h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              statusColors[batch.profitStatus]
            }`}
          >
            {batch.profitStatus.replace("_", " ")}
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-3">
          Age: {batch.ageInDays} days
        </p>

        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Expected Cost</span>
            <span className="font-semibold">
              ₹{batch.expectedCost.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Expected Revenue</span>
            <span className="font-semibold">
              ₹{batch.expectedRevenue.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Expected Profit</span>
            <span className="font-semibold text-green-700">
              ₹{batch.expectedProfit.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={onView}
        className="mt-4 bg-green-700 hover:bg-green-800
          text-white py-2 rounded-lg text-sm"
      >
        View Breakdown
      </button>
    </div>
  );
};