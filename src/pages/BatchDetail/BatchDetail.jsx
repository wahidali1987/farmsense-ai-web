import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Plus,
  AlertTriangle,
  Leaf,
  Droplets,
  Scale,
} from "lucide-react";

import GrowthChart from "../../components/charts/GrowthChart";
import FeedChart from "../../components/charts/FeedChart";
import BatchService from "../../services/BatchService";
import Sidebar from "../../components/Sidebar"; // ✅ SIDEBAR

export default function BatchDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const batchService = new BatchService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await batchService.fetchBatchDetails(id);
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  if (!data) return <div className="p-6">Loading...</div>;

  const {
    batchInfo,
    birds,
    summary,
    kpis,
    charts,
    todayPlan,
    healthAlerts,
    profit,
    lastUpdatedAt,
  } = data;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#f6f7f6] via-[#f1f3f2] to-[#ecefed]">
      
      {/* ✅ SIDEBAR */}
      <Sidebar />

      {/* ✅ MAIN CONTENT */}
      <div className="flex-1 ml-64 overflow-y-auto p-6 bg-gray-50">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-gray-500">
              Batch &gt; <b>{batchInfo.batchCode}</b>
            </p>
            <h1 className="text-2xl font-semibold">
              {batchInfo.batchCode}
            </h1>
          </div>

          <button className="flex items-center gap-2
            bg-green-700 hover:bg-green-800
            text-white px-4 py-2 rounded-xl shadow">
            <Plus size={16} /> Add Today's Data
          </button>
        </div>

        {/* SUMMARY STRIP */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <Summary label="Age" value={`${batchInfo.ageInDays} days`} />
          <Summary label="Birds Alive" value={birds.alive} />
          <Summary label="Health Risk" value={summary.healthRisk} warning />
          <Summary
            label="Expected Profit"
            value={`₹${summary.expectedProfit.toLocaleString()}`}
            money
          />
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Kpi
            title="Avg Body Weight"
            value={`${kpis.avgWeightG.value} g`}
            sub={`Expected: ${kpis.avgWeightG.expected} g`}
            variant="green"
            icon={<Scale />}
          />
          <Kpi
            title="Feed Intake"
            value={`${kpis.feedPerBirdG.value} g / bird`}
            sub={`Recommended: ${kpis.feedPerBirdG.expected} g`}
            variant="emerald"
            icon={<Leaf />}
          />
          <Kpi
            title="Mortality"
            value={`${kpis.mortalityPercent.value}%`}
            sub="Safe"
            variant="yellow"
          />
          <Kpi
            title="FCR"
            value={kpis.fcr.value}
            sub={kpis.fcr.status}
            variant="red"
          />
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <GlassCard title="Growth: Actual vs Expected">
            <GrowthChart data={charts.growthTrend} />
          </GlassCard>

          <GlassCard title="Feed Intake Trend">
            <FeedChart data={charts.feedTrend} />
          </GlassCard>
        </div>

        {/* TODAY PLAN */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <Plan
            title="Feed"
            recommended={`${todayPlan.recommended.feedPerBirdG} g`}
            actual={`${todayPlan.actual.feedPerBirdG} g`}
            deviation={`${todayPlan.deviation.feedDeviationPercent}%`}
          />
          <Plan
            title="Water"
            recommended={`${todayPlan.recommended.waterPerBirdMl} ml`}
            actual={`${todayPlan.actual.waterPerBirdMl} ml`}
            deviation={`${todayPlan.deviation.waterDeviationPercent}%`}
          />
          <Plan
            title="Support"
            success={todayPlan.actual.supportCategory !== "NONE"}
          />
        </div>

        {/* PROFIT + ALERTS */}
        <div className="grid grid-cols-2 gap-6">
          <GlassCard title="Profit Snapshot">
            <Row label="Total Cost" value={`₹${profit.totalCostTillDate}`} />
            <Row label="Expected Revenue" value={`₹${profit.expectedRevenue}`} />
            <Row
              label="Expected Profit"
              value={`₹${profit.expectedProfit}`}
              highlight
            />
            <Row label="Cost Per Bird" value={`₹${profit.costPerBird}`} />
          </GlassCard>

          <GlassCard title="Health Alerts">
            {healthAlerts.length === 0 ? (
              <p className="text-sm text-gray-500">No alerts</p>
            ) : (
              healthAlerts.map((a) => (
                <div
                  key={a.alertId}
                  className="flex items-center gap-2 text-yellow-700 mb-3"
                >
                  <AlertTriangle size={18} />
                  {a.message}
                </div>
              ))
            )}
            <button className="w-full mt-3
              bg-green-700 text-white py-2 rounded-xl shadow">
              View All Alerts
            </button>
          </GlassCard>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          Last updated: {new Date(lastUpdatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

/* ---------- UI COMPONENTS (SAME AS BEFORE) ---------- */

const Summary = ({ label, value, warning, money }) => (
  <div className="bg-white/70 backdrop-blur rounded-2xl px-6 py-4
    border border-white/60 shadow-md text-center">
    <div className="text-xs text-gray-500">{label}</div>
    <div className={`text-xl font-semibold mt-1
      ${warning ? "text-yellow-600" : money ? "text-green-700" : "text-gray-800"}
    `}>
      {value}
    </div>
  </div>
);

const Kpi = ({ title, value, sub, icon, variant }) => {
  const colors = {
    green: "from-green-50",
    emerald: "from-emerald-50",
    yellow: "from-yellow-50",
    red: "from-red-50",
  };

  return (
    <div className={`bg-gradient-to-br ${colors[variant]} to-white
      rounded-2xl p-5 border border-white/70 shadow-md`}>
      <div className="flex items-center gap-2 mb-2 text-gray-600">
        {icon}
        {title}
      </div>
      <div className="text-2xl font-bold text-green-800">{value}</div>
      <div className="text-sm text-gray-500">{sub}</div>
    </div>
  );
};

const GlassCard = ({ title, children }) => (
  <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5
    border border-white/60 shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
    <h3 className="font-semibold mb-3">{title}</h3>
    {children}
  </div>
);

const Plan = ({ title, recommended, actual, deviation, success }) => (
  <div className="bg-white/80 backdrop-blur rounded-2xl p-5
    border border-white/60 shadow-md">
    <h4 className="font-medium mb-2">{title}</h4>
    {success ? (
      <div className="text-green-700 font-semibold">✔ Given</div>
    ) : (
      <>
        <div className="text-sm">Recommended: {recommended}</div>
        <div className="text-sm">Actual: {actual}</div>
        <div className="mt-2 px-3 py-1 bg-red-100 text-red-700
          rounded-lg text-sm font-semibold">
          {deviation}
        </div>
      </>
    )}
  </div>
);

const Row = ({ label, value, highlight }) => (
  <div className="flex justify-between py-2 border-b last:border-none">
    <span className="text-gray-500">{label}</span>
    <span className={`font-semibold ${highlight ? "text-green-700" : ""}`}>
      {value}
    </span>
  </div>
);
