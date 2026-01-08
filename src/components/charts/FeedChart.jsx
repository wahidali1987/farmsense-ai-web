import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function FeedChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="recommended" fill="#bbf7d0" name="Recommended" />
        <Bar dataKey="actual" fill="#15803d" name="Actual" />
      </BarChart>
    </ResponsiveContainer>
  );
}
