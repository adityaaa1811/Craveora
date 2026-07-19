import React, { useEffect, useState } from "react";
import api from "../../services/api";
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Clock
} from "lucide-react";

const AdminDashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/v1/admin/dashboard");
        setData(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard metrics");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  const { stats, topProducts, recentOrders, chartData } = data || {};

  // Simple SVG Line graph calculations for last 7 days sales
  const maxRevenue = chartData && chartData.length > 0 ? Math.max(...chartData.map(d => d.revenue), 100) : 100;
  const graphPoints = chartData
    ? chartData
        .map((d, index) => {
          const x = (index / (chartData.length - 1 || 1)) * 500;
          const y = 200 - (d.revenue / maxRevenue) * 150;
          return `${x},${y}`;
        })
        .join(" ")
    : "";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-serif text-slate-100">Welcome to Craveora Admin</h1>
        <p className="text-slate-400 text-sm mt-1">Real-time statistics & gourmet sales performance overview</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Today's Revenue</div>
            <div className="text-2xl font-bold text-slate-100 mt-1">₹{stats?.todayRevenue || 0}</div>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-lg"><DollarSign size={24} /></div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Monthly Revenue</div>
            <div className="text-2xl font-bold text-slate-100 mt-1">₹{stats?.monthlyRevenue || 0}</div>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-lg"><TrendingUp size={24} /></div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Orders Today</div>
            <div className="text-2xl font-bold text-slate-100 mt-1">{stats?.ordersToday || 0}</div>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg"><ShoppingBag size={24} /></div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Pending Orders</div>
            <div className="text-2xl font-bold text-slate-100 mt-1">{stats?.pendingOrders || 0}</div>
          </div>
          <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-lg"><Clock size={24} /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts & Revenue Trends */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-200">Revenue Growth (7-Day Trend)</h2>
            <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded">Daily</span>
          </div>

          <div className="relative h-60 w-full flex items-center justify-center">
            {chartData && chartData.length > 0 ? (
              <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
                {/* Horizontal lines */}
                <line x1="0" y1="50" x2="500" y2="50" stroke="#1e293b" strokeWidth="1" strokeDasharray="4" />
                <line x1="0" y1="125" x2="500" y2="125" stroke="#1e293b" strokeWidth="1" strokeDasharray="4" />
                <line x1="0" y1="200" x2="500" y2="200" stroke="#334155" strokeWidth="1.5" />

                {/* SVG Trend Line */}
                <polyline fill="none" stroke="#f59e0b" strokeWidth="3" points={graphPoints} />

                {/* Grid text */}
                <text x="5" y="40" fill="#64748b" className="text-[10px]">₹{maxRevenue}</text>
                <text x="5" y="115" fill="#64748b" className="text-[10px]">₹{Math.round(maxRevenue / 2)}</text>

                {/* Day Dots & Tooltips */}
                {chartData.map((d, idx) => {
                  const x = (idx / (chartData.length - 1 || 1)) * 500;
                  const y = 200 - (d.revenue / maxRevenue) * 150;
                  return (
                    <g key={d._id}>
                      <circle cx={x} cy={y} r="5" fill="#f59e0b" className="hover:scale-125 cursor-pointer transition-transform" />
                      <text x={x - 10} y={y - 12} fill="#94a3b8" className="text-[9px] font-semibold">₹{d.revenue}</text>
                      <text x={x - 12} y="215" fill="#64748b" className="text-[8px]">{d._id.slice(5)}</text>
                    </g>
                  );
                })}
              </svg>
            ) : (
              <span className="text-slate-500 text-sm">No sales data recorded in the last 7 days</span>
            )}
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
          <h2 className="text-lg font-bold text-slate-200">Top Selling Products</h2>
          <div className="space-y-4">
            {topProducts && topProducts.length > 0 ? (
              topProducts.map((p, idx) => (
                <div key={p._id} className="flex items-center justify-between border-b border-slate-900 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-500 font-bold">#{idx + 1}</span>
                    <div>
                      <div className="text-sm font-semibold text-slate-200">{p.title || "Gourmet Dish"}</div>
                      <div className="text-xs text-slate-500">{p.totalQty} sold</div>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-amber-500">₹{p.revenue}</div>
                </div>
              ))
            ) : (
              <div className="text-slate-500 text-sm py-4 text-center">No product sales yet</div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Orders Grid */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-200">Recent Gourmet Orders</h2>
          <span className="text-xs text-slate-500">Latest 5 placements</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-medium">
                <th className="py-3 px-4">Order Number</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders && recentOrders.length > 0 ? (
                recentOrders.map((o) => (
                  <tr key={o._id} className="border-b border-slate-900 hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-4 font-semibold text-amber-500">{o.orderNumber}</td>
                    <td className="py-4 px-4">
                      <div className="text-slate-200">{o.user?.name || "Guest"}</div>
                      <div className="text-xs text-slate-500">{o.user?.email || "N/A"}</div>
                    </td>
                    <td className="py-4 px-4 capitalize">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        o.paymentStatus === "Paid" ? "bg-emerald-500/10 text-emerald-500" : "bg-yellow-500/10 text-yellow-500"
                      }`}>{o.paymentStatus}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        o.orderStatus === "Delivered" ? "bg-emerald-500/10 text-emerald-500" :
                        o.orderStatus === "Cancelled" ? "bg-red-500/10 text-red-500" : "bg-amber-500/10 text-amber-500"
                      }`}>{o.orderStatus}</span>
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-slate-200">₹{o.grandTotal}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-500">No orders registered</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
