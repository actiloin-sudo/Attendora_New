import React from "react";
import { useAuth } from "../context/AuthContext";
import { Shield, Users, Building, CreditCard, BarChart, Settings, Search } from "lucide-react";

export default function Admin() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden lg:flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <Shield className="text-primary w-8 h-8" />
          <h1 className="text-xl font-bold">Master Admin</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <AdminSidebarItem icon={<BarChart />} label="Overview" active />
          <AdminSidebarItem icon={<Building />} label="Companies" />
          <AdminSidebarItem icon={<Users />} label="Users" />
          <AdminSidebarItem icon={<CreditCard />} label="Subscriptions" />
          <AdminSidebarItem icon={<Settings />} label="System Settings" />
        </nav>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search companies, users..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-600">{user?.name}</span>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AdminStatCard label="Total Revenue" value="₹1,45,000" trend="+12%" />
            <AdminStatCard label="Active Companies" value="124" trend="+5%" />
            <AdminStatCard label="Total Users" value="2,450" trend="+18%" />
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">Recent Company Signups</h3>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                  <th className="p-4">Company Name</th>
                  <th className="p-4">Owner</th>
                  <th className="p-4">Plan</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-800">Tech Solutions Ltd</td>
                    <td className="p-4 text-slate-600">John Doe</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase">Yearly</span>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-[10px] font-bold uppercase">Active</span>
                    </td>
                    <td className="p-4 text-slate-400">Oct 12, 2023</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function AdminSidebarItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all font-medium ${
        active ? "bg-primary text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function AdminStatCard({ label, value, trend }: { label: string; value: string; trend: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <p className="text-sm font-medium text-slate-400 mb-1">{label}</p>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-slate-800">{value}</p>
        <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded">{trend}</span>
      </div>
    </div>
  );
}
