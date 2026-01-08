import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import BatchService from "../../services/BatchService";

export default function AddBatch() {
  const [formData, setFormData] = useState({
    batchCode: "",
    birdType: "",
    startDate: "",
    initialBirds: "",
    farmName: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const batchService = new BatchService();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.startDate) {
      setError("Start date is required");
      return;
    }

    const startDate = new Date(formData.startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (startDate > today) {
      setError("Start date cannot be in the future");
      return;
    }

    if (!formData.initialBirds || formData.initialBirds <= 0) {
      setError("Initial birds must be greater than 0");
      return;
    }

    try {
      const result = await batchService.createBatch(formData);
      if (result.batchId) {
        navigate("/batches");
      }
    } catch (err) {
      setError("Failed to create batch");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6f7f6] via-[#f1f3f2] to-[#ecefed]">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <main className="ml-64 p-8">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg hover:bg-gray-200"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-2xl font-semibold">Add New Batch</h1>
              <p className="text-sm text-gray-500">
                Create a new poultry batch for tracking
              </p>
            </div>
          </div>
        </div>

        {/* FORM CARD */}
        <form
          onSubmit={handleSubmit}
          className="
            max-w-3xl
            bg-white/80 backdrop-blur-md
            rounded-2xl p-6
            border border-white/60
            shadow-[0_20px_40px_rgba(0,0,0,0.08)]
          "
        >
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="grid grid-cols-2 gap-6">
            {/* Batch Code */}
            <Field label="Batch Code">
              <input
                name="batchCode"
                value={formData.batchCode}
                onChange={handleChange}
                placeholder="SONALI-2025-006"
                className="input"
                required
              />
            </Field>

            {/* Bird Type */}
            <Field label="Bird Type">
              <select
                name="birdType"
                value={formData.birdType}
                onChange={handleChange}
                className="input"
              >
                <option>SONALI</option>
                <option>BROILER</option>
                <option>KADAKNATH</option>
              </select>
            </Field>

            {/* Start Date */}
            <Field label="Start Date">
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="input"
                required
              />
            </Field>

            {/* Initial Birds */}
            <Field label="Initial Birds Count">
              <input
                type="number"
                name="initialBirds"
                value={formData.initialBirds}
                onChange={handleChange}
                placeholder="3000"
                className="input"
                required
              />
            </Field>

            {/* Farm / Shed */}
            <Field label="Farm / Shed Name">
              <input
                name="farmName"
                value={formData.farmName}
                onChange={handleChange}
                placeholder="Main Farm - Shed A"
                className="input"
              />
            </Field>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-2 rounded-xl border text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2
                bg-green-700 hover:bg-green-800
                text-white px-6 py-2 rounded-xl shadow"
            >
              <Save size={16} />
              Create Batch
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

/* ---------- SMALL UI HELPERS ---------- */

const Field = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    {children}
  </div>
);
