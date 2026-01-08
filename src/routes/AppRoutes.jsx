import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Batches from "../pages/Batches/Batches";
import BatchDetail from "../pages/BatchDetail/BatchDetail";
import AddBatch from "../pages/AddBatch/AddBatch";
import DailyEntry from "../pages/DailyEntry/DailyEntry";
import HealthAlerts from "../pages/HealthAlerts/HealthAlerts";

// 💰 PROFIT & COSTS
import ProfitCosts from "../pages/ProfitCosts/ProfitCosts";
import BatchProfitDetail from "../pages/BatchProfitDetail/BatchProfitDetail";

// ⚙️ SETTINGS
import Settings from "../pages/Settings/Settings";
// import FarmProfile from "../pages/Settings/FarmProfile";
// import BatchDefaults from "../pages/Settings/BatchDefaults";
// import FeedHealthPlans from "../pages/Settings/FeedHealthPlans";
// import AlertThresholds from "../pages/Settings/AlertThresholds";
// import Notifications from "../pages/Settings/Notifications";
// import AccountSecurity from "../pages/Settings/AccountSecurity";

export default function AppRoutes() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />

      {/* MAIN */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* BATCHES */}
      <Route path="/batches" element={<Batches />} />
      <Route path="/batches/new" element={<AddBatch />} />
      <Route path="/batches/:id" element={<BatchDetail />} />
      <Route path="/batches/:id/add" element={<AddBatch />} />
      <Route path="/batches/:id/daily-entry" element={<DailyEntry />} />

      {/* HEALTH ALERTS */}
      <Route path="/health-alerts" element={<HealthAlerts />} />

      {/* 💰 PROFIT & COSTS */}
      <Route path="/profit" element={<ProfitCosts />} />
      <Route path="/profit/batch/:id" element={<BatchProfitDetail />} />

      {/* ⚙️ SETTINGS */}
      <Route path="/settings" element={<Settings />}>
        {/* <Route index element={<Navigate to="farm" />} />
        <Route path="farm" element={<FarmProfile />} />
        <Route path="batch-defaults" element={<BatchDefaults />} />
        <Route path="feed-health" element={<FeedHealthPlans />} />
        <Route path="alerts" element={<AlertThresholds />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="account" element={<AccountSecurity />} /> */}
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}
