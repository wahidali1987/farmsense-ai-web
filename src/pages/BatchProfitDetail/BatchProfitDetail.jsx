import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import ProfitService from "../../services/ProfitService";

// 📊 Recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// 📄 PDF Export
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function BatchProfitDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const profitService = new ProfitService();
  const reportRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await profitService.fetchBatchProfit(id);
        setData(res);
      } catch (err) {
        console.error(err);
      }
    };
    loadData();
  }, [id]);

  if (!data) {
    return (
      <div className="flex">
        <Sidebar />
        <main className="ml-64 p-6">Loading batch profit...</main>
      </div>
    );
  }

  const {
    batchInfo,
    costBreakdown,
    revenueProjection,
    profitTrend,
    efficiencyTrend,
  } = data;

  /* ---------------- PDF EXPORT ---------------- */
  const exportPDF = async () => {
    const canvas = await html2canvas(reportRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${batchInfo.batchCode}-profit-report.pdf`);
  };

  /* ---------------- PIE DATA ---------------- */
  const COST_COLORS = [
    "#15803d",
    "#22c55e",
    "#86efac",
    "#fde047",
    "#38bdf8",
    "#f97316",
  ];

  const pieData = [
    { name: "Chicks", value: costBreakdown.chicks },
    { name: "Feed", value: costBreakdown.feed },
    { name: "Medicine", value: costBreakdown.medicine },
    { name: "Vaccination", value: costBreakdown.vaccination },
    { name: "Electricity", value: costBreakdown.electricity },
    { name: "Labour", value: costBreakdown.labour },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <main ref={reportRef} className="ml-64 flex-1 p-8 space-y-12">
        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold">
              {batchInfo.batchCode} – Profit Details
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {batchInfo.birdType} · Age {batchInfo.ageInDays} days · Birds Alive{" "}
              {batchInfo.birdsAlive}
            </p>
          </div>

          <button
            onClick={exportPDF}
            className="bg-green-700 hover:bg-green-800
              text-white px-4 py-2 rounded-lg shadow"
          >
            Export PDF
          </button>
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard
            label="Total Cost"
            value={`₹${costBreakdown.totalCost.toLocaleString()}`}
          />
          <SummaryCard
            label="Expected Revenue"
            value={`₹${revenueProjection.expectedRevenue.toLocaleString()}`}
          />
          <SummaryCard
            label="Expected Profit"
            value={`₹${revenueProjection.expectedProfit.toLocaleString()}`}
            highlight
          />
        </div>

        {/* COST + REVENUE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* COST BREAKDOWN */}
          <Card title="Cost Breakdown">
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    outerRadius={90}
                    label
                  >
                    {pieData.map((_, i) => (
                      <Cell
                        key={i}
                        fill={COST_COLORS[i % COST_COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {pieData.map((c) => (
              <Row key={c.name} label={c.name} value={c.value} />
            ))}

            <TotalRow value={costBreakdown.totalCost} />
          </Card>

          {/* REVENUE */}
          <Card title="Revenue Projection">
            <InfoRow
              label="Expected Weight"
              value={`${revenueProjection.expectedWeightKg} kg`}
            />
            <InfoRow
              label="Price / Kg"
              value={`₹${revenueProjection.pricePerKg}`}
            />
            <InfoRow
              label="Expected Revenue"
              value={`₹${revenueProjection.expectedRevenue.toLocaleString()}`}
            />

            <div className="flex justify-between pt-4 mt-4 border-t">
              <span className="font-semibold">Expected Profit</span>
              <span className="font-bold text-green-700 text-lg">
                ₹{revenueProjection.expectedProfit.toLocaleString()}
              </span>
            </div>
          </Card>
        </div>

        {/* PROFIT TREND */}
        <Card title="Profit Trend">
          <ChartWrapper>
            <LineChart data={profitTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tickFormatter={(v) => `Day ${v}`} />
              <YAxis tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip />
              <Line
                dataKey="profit"
                stroke="#15803d"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ChartWrapper>
        </Card>

        {/* PROFIT VS FEED EFFICIENCY */}
        <Card title="Profit vs Feed Efficiency">
          <ChartWrapper>
            <LineChart data={efficiencyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tickFormatter={(v) => `Day ${v}`} />

              <YAxis
                yAxisId="left"
                tickFormatter={(v) => `₹${v / 1000}k`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0.7, 1]}
                tickFormatter={(v) => v.toFixed(2)}
              />

              <Tooltip />
              <Legend />

              <Line
                yAxisId="left"
                dataKey="profit"
                name="Profit"
                stroke="#15803d"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
              <Line
                yAxisId="right"
                dataKey="feedEfficiency"
                name="Feed Efficiency"
                stroke="#f97316"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ChartWrapper>
        </Card>
      </main>
    </div>
  );
}

/* ---------------- UI COMPONENTS ---------------- */

const SummaryCard = ({ label, value, highlight }) => (
  <div className="bg-white rounded-xl shadow p-6">
    <div className="text-sm text-gray-500">{label}</div>
    <div
      className={`text-2xl font-bold mt-1 ${
        highlight ? "text-green-700" : ""
      }`}
    >
      {value}
    </div>
  </div>
);

const Card = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow p-6">
    <h3 className="font-semibold mb-5">{title}</h3>
    {children}
  </div>
);

const ChartWrapper = ({ children }) => (
  <div className="h-80">
    <ResponsiveContainer width="100%" height="100%">
      {children}
    </ResponsiveContainer>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between py-2">
    <span className="text-gray-500">{label}</span>
    <span className="font-semibold">{value}</span>
  </div>
);

const Row = ({ label, value }) => (
  <div className="flex justify-between py-2 border-b last:border-none">
    <span className="text-gray-500">{label}</span>
    <span className="font-semibold">₹{value.toLocaleString()}</span>
  </div>
);

const TotalRow = ({ value }) => (
  <div className="flex justify-between pt-4 mt-4 border-t">
    <span className="font-semibold">Total Cost</span>
    <span className="font-bold">₹{value.toLocaleString()}</span>
  </div>
);
