import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, ChevronDown, Search } from "lucide-react";

import Sidebar from "../../components/Sidebar";
import BatchCard from "../../components/BatchCard";
import BatchService from "../../services/BatchService";

export default function Batches() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("ACTIVE"); // ✅ FILTER STATE
  const navigate = useNavigate();
  const batchService = new BatchService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await batchService.fetchBatches({ status });
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [status]);

  if (!data) {
    return (
      <div className="flex">
        <Sidebar />
        <main className="ml-64 p-6">Loading...</main>
      </div>
    );
  }

  const { batches } = data;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <main className="ml-64 flex-1 p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold">Batches</h1>
            <p className="text-sm text-gray-500">
              Manage and monitor all batches
            </p>
          </div>

          <button
            onClick={() => navigate("/batches/new")}
            className="flex items-center gap-2
              bg-green-700 hover:bg-green-800
              text-white px-4 py-2 rounded-xl shadow"
          >
            <Plus size={16} />
            Add New Batch
          </button>
        </div>

        {/* FILTER BAR (Mock‑style) */}
        <div className="flex justify-start gap-4 mb-6">
          <div className="relative">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="appearance-none
                bg-white border rounded-lg
                px-4 py-2 pr-10 text-sm
                shadow-sm hover:bg-gray-50
                focus:outline-none"
            >
              <option value="ACTIVE">Active Batches</option>
              <option value="CLOSED">Closed Batches</option>
              <option value="ALL">All Batches</option>
            </select>

            <ChevronDown
              size={16}
              className="absolute right-3 top-2.5 text-gray-400 pointer-events-none"
            />
          </div>

          {/* SEARCH */}
          <div className="relative">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              className="pl-10 pr-4 py-2 rounded-lg border text-sm"
              placeholder="Search batches"
            />
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {batches.map((batch) => (
            <BatchCard
              key={batch.batchId}
              data={batch}
              onView={() => navigate(`/batches/${batch.batchId}`)}
            />
          ))}
        </div>

        {/* EMPTY STATE */}
        {batches.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            No batches found for this filter.
          </div>
        )}
      </main>
    </div>
  );
}
