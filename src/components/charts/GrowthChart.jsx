import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function GrowthChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="expectedWeight"
          stroke="#94a3b8"
          strokeDasharray="5 5"
          name="Expected"
        />
        <Line
          type="monotone"
          dataKey="actualWeight"
          stroke="#15803d"
          strokeWidth={3}
          name="Actual"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
