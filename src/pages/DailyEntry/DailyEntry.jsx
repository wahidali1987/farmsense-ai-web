import Sidebar from "../../components/Sidebar";

export default function DailyEntry() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="p-6 flex-1">
        <h1 className="text-2xl font-bold mb-6 text-slate-700">Daily Data Entry</h1>
        <div className="bg-white p-6 rounded-xl shadow max-w-xl">
          <input className="w-full border rounded p-2 mb-3" placeholder="Mortality Count" />
          <input className="w-full border rounded p-2 mb-3" placeholder="Feed (kg)" />
          <input className="w-full border rounded p-2 mb-3" placeholder="Water (litre)" />
          <textarea className="w-full border rounded p-2 mb-4" placeholder="Notes"></textarea>
          <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg">
            Save Today's Data
          </button>
        </div>
      </main>
    </div>
  );
}
