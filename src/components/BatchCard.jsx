import Badge from "./Badge";

const BatchCard = ({ data, onView }) => {
    console.log("BatchCard data:", data);
  const { batchCode, ageInDays, growth, feed, health, profit } = data;

  return (
    <div className="bg-white rounded-2xl shadow-md p-5">
      <h3 className="font-semibold text-lg">{batchCode}</h3>
      <p className="text-sm text-gray-500 mb-3">
        Age: {ageInDays} days
      </p>

      {/* STATUS BADGES */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <Badge text={growth.growthStatus} />
        <Badge text={feed.status} />
        <Badge text={health.riskLevel} />
      </div>

      {/* COST / PROFIT */}
      <div className="flex justify-between text-sm mb-4">
        <div>
          <p className="text-gray-500">Expected Cost</p>
          <p className="font-semibold">
            ₹{profit.totalCost.toLocaleString()}
          </p>
        </div>

        <div className="text-right">
          <p className="text-gray-500">Expected Profit</p>
          <p className={`font-semibold ${
            profit.expectedProfit >= 0
              ? "text-green-600"
              : "text-red-600"
          }`}>
            ₹{profit.expectedProfit.toLocaleString()}
          </p>
        </div>
      </div>

      <button
        onClick={onView}
        className="w-full bg-green-700 hover:bg-green-800
        text-white py-2 rounded-lg text-sm"
      >
        View Details
      </button>
    </div>
  );
};
export default BatchCard;

