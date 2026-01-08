import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import DashboardService from "../../services/DashboardService";
import AuthService from "../../services/AuthService";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const dashboardService = new DashboardService();
  const navigate = useNavigate();
  const authService = new AuthService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dashboardService.fetchDashboard();
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (!data) return <div className="p-10">Loading dashboard...</div>;

  const { summary, batches } = data;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <main className="flex-1 ml-64 p-8">
        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>

          <div className="flex items-center gap-4">
            {/* SEARCH */}
            <div className="relative">
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
              <input
                className="pl-10 pr-4 py-2 rounded-lg border text-sm"
                placeholder="Search"
              />
            </div>

            <img src="/avatar.png" className="w-9 h-9 rounded-full" />
          </div>
        </div>

        {/* SUMMARY */}
        <h2 className="text-xl font-semibold mb-1">
          Welcome back, Wahid Ali!
        </h2>
        <p className="text-gray-500 mb-6">
          Here's a quick overview of your farm's performance.
        </p>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <SummaryCard title="Active Batches" value={summary.activeBatches} />
          <SummaryCard
            title="Total Alive Birds"
            value={summary.totalAliveBirds}
          />
          <SummaryCard
            title="Overall Health Risk"
            value={summary.overallRisk}
            warning
          />
          <SummaryCard
            title="Expected Profit"
            value={`₹${summary.todayEstimatedProfit.toLocaleString()}`}
            money
          />
        </div>

        {/* ACTIVE BATCHES HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Active Batches Overview</h3>
        </div>

        {/* BATCH CARDS */}
        <div className="grid grid-cols-3 gap-6">
          {batches.map((b) => (
            <div key={b.batchId} className="bg-white rounded-xl shadow p-5">
              <div className="font-semibold">{b.batchCode}</div>
              <div className="text-sm text-gray-500 mb-3">
                Age: {b.ageInDays} days
              </div>

              <div className="flex gap-2 mb-4 flex-wrap">
                <Badge text={b.growth.growthStatus} />
                <Badge text={b.feed.status} />
                <Badge text={b.health.riskLevel} />
              </div>

              <div className="flex justify-between text-sm mb-4">
                <div>
                  <div className="text-gray-500">Expected Cost</div>
                  <div className="font-semibold">
                    ₹{b.profit.totalCost.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-gray-500">Expected Profit</div>
                  <div
                    className={`font-semibold ${
                      b.profit.expectedProfit >= 0
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    ₹{b.profit.expectedProfit.toLocaleString()}
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate(`/batches/${b.batchId}`)}
                className="w-full bg-green-700 hover:bg-green-800
                  text-white py-2 rounded-lg text-sm"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

/* ---------- COMPONENTS ---------- */

const SummaryCard = ({ title, value, warning, money }) => (
  <div className="bg-white rounded-xl shadow p-5">
    <div className="text-sm text-gray-500">{title}</div>
    <div
      className={`text-2xl font-bold ${
        warning
          ? "text-yellow-600"
          : money
          ? "text-green-700"
          : ""
      }`}
    >
      {value}
    </div>
  </div>
);

const Badge = ({ text }) => {
  const colors = {
    ON_TRACK: "bg-green-100 text-green-700",
    FAST: "bg-yellow-100 text-yellow-700",
    SLOW: "bg-red-100 text-red-700",
    LOW: "bg-green-100 text-green-700",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    HIGH: "bg-red-100 text-red-700",
    OK: "bg-gray-100 text-gray-700",
    LOW_INTAKE: "bg-orange-100 text-orange-700",
    EARLY_STAGE: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        colors[text] || "bg-gray-100 text-gray-700"
      }`}
    >
      {text.replace("_", " ")}
    </span>
  );
};

export default Dashboard;
