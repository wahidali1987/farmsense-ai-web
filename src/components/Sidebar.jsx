import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Layers,
  Bell,
  IndianRupee,
  Settings,
  LogOut,
} from "lucide-react";
import AuthService from "../services/AuthService";

export default function Sidebar({ alertCount = 0 }) { // ✅ badge prop
  const location = useLocation();
  const navigate = useNavigate();
  const authService = new AuthService();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Batches", path: "/batches", icon: Layers },
    {
      name: "Health Alerts",
      path: "/health-alerts",
      icon: Bell,
      badge: alertCount, // ✅ dynamic
    },
    { name: "Profit & Costs", path: "/profit", icon: IndianRupee },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path ||
    location.pathname.startsWith(path + "/");

  return (
    <aside
      className="fixed left-0 top-0 w-64 h-screen text-white flex flex-col z-40 bg-cover bg-center"
      style={{ backgroundImage: "url(/sidebar-bg.png)" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="p-6 text-2xl font-bold">🌱 FarmSense AI</div>

        <nav className="flex-1 px-4 space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link to={item.path} key={item.name}>
                <div
                  className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer transition
                    ${
                      active
                        ? "bg-green-800/80"
                        : "hover:bg-green-800/60"
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon size={18} />
                    <span className="text-sm">{item.name}</span>
                  </div>

                  {/* ✅ Badge */}
                  {item.badge > 0 && (
                    <span className="bg-red-500 text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div
          onClick={handleLogout}
          className="mx-4 mb-6 flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer hover:bg-green-800/60"
        >
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </div>
      </div>
    </aside>
  );
}
