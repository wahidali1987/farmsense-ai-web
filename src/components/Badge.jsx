const Badge = ({ text }) => {
  if (!text) return null;

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
export default Badge;