export default function Header({ title, action }) {
  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold text-slate-700">{title}</h1>
      {action && (
        <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow">
          {action}
        </button>
      )}
    </header>
  );
}
