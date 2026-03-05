import React from "react";
import { useAuth } from "../context/AuthContext";
import AttendanceMarker from "../components/AttendanceMarker";
import { LayoutDashboard, Users, FileText, Settings, LogOut, Bell, User } from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useAuth();

  const stats = [
    { label: "Total Employees", value: "12", color: "bg-blue-500" },
    { label: "Present Today", value: "10", color: "bg-primary" },
    { label: "On Leave", value: "2", color: "bg-amber-500" },
    { label: "Late Arrivals", value: "1", color: "bg-red-500" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-2xl font-bold text-primary">Attendora</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem icon={<LayoutDashboard />} label="Dashboard" active />
          <SidebarItem icon={<Users />} label="Employees" />
          <SidebarItem icon={<FileText />} label="Reports" />
          <SidebarItem icon={<Settings />} label="Settings" />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-800">Dashboard</h2>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-slate-400 hover:text-primary transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">
                3
              </span>
            </button>
            
            <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800">{user?.name || "User"}</p>
                <p className="text-xs text-slate-400 capitalize">{user?.role.replace("_", " ")}</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <User className="w-6 h-6" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 space-y-8 overflow-y-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-sm font-medium text-slate-400 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Attendance Marker Section */}
            <div className="lg:col-span-1">
              <AttendanceMarker />
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-800">Recent Attendance</h3>
                <button className="text-sm text-primary font-bold hover:underline">View All</button>
              </div>
              <div className="divide-y divide-slate-50">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-full overflow-hidden">
                        <img src={`https://picsum.photos/seed/${i}/40/40`} alt="User" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Employee {i + 1}</p>
                        <p className="text-xs text-slate-400">Check-in at 09:1{i} AM</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase">
                      On Time
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all font-semibold ${
        active ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-500 hover:bg-slate-50 hover:text-primary"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
