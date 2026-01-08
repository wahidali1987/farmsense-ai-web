import { useState } from "react";
import Sidebar from "../../components/Sidebar";

const TABS = [
  { key: "farm", label: "Farm Profile" },
  { key: "batch", label: "Batch Defaults" },
  { key: "plans", label: "Feed & Health Plans" },
  { key: "alerts", label: "Alerts & Thresholds" },
  { key: "reports", label: "Reports & Export" },
  { key: "account", label: "Account & Security" },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("farm");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <main className="ml-64 flex-1 p-8">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-sm text-gray-500">
            Manage farm configuration & system preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* LEFT MENU */}
          <div className="bg-white rounded-xl shadow p-4">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full text-left px-4 py-2 rounded-lg mb-1 text-sm
                  ${
                    activeTab === tab.key
                      ? "bg-green-700 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* RIGHT CONTENT */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow p-6">
            {activeTab === "farm" && <FarmProfile />}
            {activeTab === "batch" && <BatchDefaults />}
            {activeTab === "plans" && <FeedHealthPlans />}
            {activeTab === "alerts" && <AlertThresholds />}
            {activeTab === "reports" && <ReportsSettings />}
            {activeTab === "account" && <AccountSettings />}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------------- SECTIONS ---------------- */

const FarmProfile = () => (
  <Section title="Farm Profile">
    <Input label="Farm Name" placeholder="Green Valley Poultry Farm" />
    <Input label="Owner Name" placeholder="Wahid Ali" />
    <Input label="Location" placeholder="Village, District, State" />
    <Select
      label="Farm Type"
      options={["Broiler", "Layer", "Sonali", "Mixed"]}
    />
    <Button />
  </Section>
);

const BatchDefaults = () => (
  <Section title="Batch Defaults">
    <Select label="Default Bird Type" options={["Sonali", "Broiler"]} />
    <Input label="Default Batch Size" placeholder="3000" />
    <Input label="Cycle Days" placeholder="32" />
    <Input label="Default Price / Kg (₹)" placeholder="190" />
    <Input label="Mortality Threshold (%)" placeholder="5" />
    <Button />
  </Section>
);

const FeedHealthPlans = () => (
  <Section title="Feed & Health Plans">
    <p className="text-sm text-gray-500 mb-4">
      Day‑wise plans are managed from master data
    </p>
    <Button text="Manage Feed Plan" />
    <Button text="Manage Health Plan" secondary />
  </Section>
);

const AlertThresholds = () => (
  <Section title="Alerts & Thresholds">
    <Input label="Feed Deviation Alert (%)" placeholder="10" />
    <Input label="Weight Deviation Alert (%)" placeholder="7" />
    <Input label="FCR Alert Threshold" placeholder="2.0" />
    <Input label="Minimum Alert Confidence (%)" placeholder="60" />
    <Button />
  </Section>
);

const ReportsSettings = () => (
  <Section title="Reports & Export">
    <Select label="Default Report Format" options={["PDF", "Excel"]} />
    <Select label="Language" options={["English", "Hindi"]} />
    <Button />
  </Section>
);

const AccountSettings = () => (
  <Section title="Account & Security">
    <Input label="Change Password" placeholder="********" />
    <Button text="Update Password" />
    <button className="mt-4 text-red-600 text-sm">
      Logout from all devices
    </button>
  </Section>
);

/* ---------------- UI HELPERS ---------------- */

const Section = ({ title, children }) => (
  <div>
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
    <div className="space-y-4">{children}</div>
  </div>
);

const Input = ({ label, placeholder }) => (
  <div>
    <label className="block text-sm text-gray-600 mb-1">{label}</label>
    <input
      className="w-full border rounded-lg px-3 py-2 text-sm"
      placeholder={placeholder}
    />
  </div>
);

const Select = ({ label, options }) => (
  <div>
    <label className="block text-sm text-gray-600 mb-1">{label}</label>
    <select className="w-full border rounded-lg px-3 py-2 text-sm">
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  </div>
);

const Button = ({ text = "Save Changes", secondary }) => (
  <button
    className={`px-4 py-2 rounded-lg text-sm mt-2 ${
      secondary
        ? "border hover:bg-gray-50"
        : "bg-green-700 hover:bg-green-800 text-white"
    }`}
  >
    {text}
  </button>
);
