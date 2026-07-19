import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Plus, Edit2, Trash2, Ticket, BarChart3, RefreshCcw } from "lucide-react";

const AdminCouponsPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState(null);

  // Form Fields
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState("Percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [minimumOrderAmount, setMinimumOrderAmount] = useState(0);
  const [maximumDiscount, setMaximumDiscount] = useState("");
  const [usageLimit, setUsageLimit] = useState("");
  const [perUserLimit, setPerUserLimit] = useState(1);
  const [expiryDate, setExpiryDate] = useState("");
  const [active, setActive] = useState(true);

  // Statistics State
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsModalOpen, setStatsModalOpen] = useState(false);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const res = await api.get("/v1/coupons"); // Admin gets all coupons
      setCoupons(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const openCreateModal = () => {
    setCurrentCoupon(null);
    setCode("");
    setDescription("");
    setDiscountType("Percentage");
    setDiscountValue("");
    setMinimumOrderAmount(0);
    setMaximumDiscount("");
    setUsageLimit("");
    setPerUserLimit(1);
    setExpiryDate("");
    setActive(true);
    setModalOpen(true);
  };

  const openEditModal = (cop) => {
    setCurrentCoupon(cop);
    setCode(cop.code);
    setDescription(cop.description);
    setDiscountType(cop.discountType);
    setDiscountValue(cop.discountValue);
    setMinimumOrderAmount(cop.minimumOrderAmount || 0);
    setMaximumDiscount(cop.maximumDiscount || "");
    setUsageLimit(cop.usageLimit || "");
    setPerUserLimit(cop.perUserLimit || 1);
    // Format date string for HTML input (YYYY-MM-DD)
    const d = new Date(cop.expiryDate);
    const dateStr = d.toISOString().split("T")[0];
    setExpiryDate(dateStr);
    setActive(cop.active);
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      code,
      description,
      discountType,
      discountValue: parseFloat(discountValue),
      minimumOrderAmount: parseFloat(minimumOrderAmount),
      maximumDiscount: maximumDiscount ? parseFloat(maximumDiscount) : undefined,
      usageLimit: usageLimit ? parseInt(usageLimit, 10) : undefined,
      perUserLimit: parseInt(perUserLimit, 10),
      expiryDate: new Date(expiryDate),
      active,
    };

    try {
      if (currentCoupon) {
        await api.put(`/v1/coupons/${currentCoupon._id}`, payload);
      } else {
        await api.post("/v1/coupons", payload);
      }
      setModalOpen(false);
      fetchCoupons();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStatus = async (cop) => {
    try {
      await api.put(`/v1/coupons/${cop._id}`, { active: !cop.active });
      fetchCoupons();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) return;
    try {
      await api.delete(`/v1/coupons/${id}`);
      fetchCoupons();
    } catch (err) {
      console.error(err);
    }
  };

  const viewStats = async (cop) => {
    setCurrentCoupon(cop);
    setStatsModalOpen(true);
    setStatsLoading(true);
    try {
      // Find orders using this coupon from database
      const res = await api.get(`/v1/admin/orders?limit=100`);
      const matchedOrders = (res.data.data.results || []).filter(o => o.coupon === cop.code);
      
      const usageCount = matchedOrders.length;
      const totalDiscountGiven = matchedOrders.reduce((sum, o) => sum + (o.discount || 0), 0);
      const uniqueUsers = new Set(matchedOrders.map(o => o.user?._id)).size;

      setStats({
        usageCount,
        totalDiscountGiven,
        uniqueUsers,
        orders: matchedOrders
      });
    } catch (err) {
      console.error(err);
    } finally {
      setStatsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-serif text-slate-100">Coupon Management</h1>
          <p className="text-slate-400 text-sm mt-1">Configure discount vouchers, usage caps, and view usage statistics</p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"
        >
          <Plus size={18} />
          Create Coupon
        </button>
      </div>

      {/* Coupons Table */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-slate-500">Loading coupons...</div>
        ) : coupons.length === 0 ? (
          <div className="py-12 text-center text-slate-500">No coupons registered yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-medium">
                  <th className="py-3 px-4">Promo Code</th>
                  <th className="py-3 px-4">Discount</th>
                  <th className="py-3 px-4">Limits</th>
                  <th className="py-3 px-4">Used</th>
                  <th className="py-3 px-4">Expiry</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((cop) => (
                  <tr key={cop._id} className="border-b border-slate-900 hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Ticket size={16} className="text-amber-500" />
                        <div>
                          <div className="font-semibold text-slate-200">{cop.code}</div>
                          <div className="text-xs text-slate-500">{cop.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-200">
                      {cop.discountType === "Percentage" ? `${cop.discountValue}%` : `₹${cop.discountValue}`}
                    </td>
                    <td className="py-4 px-4 text-xs text-slate-400">
                      <div>Min Order: ₹{cop.minimumOrderAmount}</div>
                      {cop.maximumDiscount && <div>Max Cap: ₹{cop.maximumDiscount}</div>}
                    </td>
                    <td className="py-4 px-4 text-slate-300 font-medium">
                      {cop.usageCount} {cop.usageLimit ? `/ ${cop.usageLimit}` : ""} times
                    </td>
                    <td className="py-4 px-4 text-slate-400">
                      {new Date(cop.expiryDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleToggleStatus(cop)}
                        className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          cop.active ? "bg-emerald-500/10 text-emerald-500" : "bg-slate-800 text-slate-500"
                        }`}
                      >
                        {cop.active ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => viewStats(cop)} className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-slate-900 rounded" title="View Statistics">
                          <BarChart3 size={16} />
                        </button>
                        <button onClick={() => openEditModal(cop)} className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-900 rounded" title="Edit">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(cop._id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-900 rounded" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal - Create/Edit Coupon */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 w-full max-w-md shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold font-serif text-slate-100 mb-6">
              {currentCoupon ? "Edit Coupon Parameters" : "Create Promo Coupon"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Promo Code</label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500 uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Discount Type</label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Percentage">Percentage (%)</option>
                    <option value="Flat">Flat (₹)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</label>
                <input
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Value</label>
                  <input
                    type="number"
                    required
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Min Order (₹)</label>
                  <input
                    type="number"
                    required
                    value={minimumOrderAmount}
                    onChange={(e) => setMinimumOrderAmount(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Max Cap (₹)</label>
                  <input
                    type="number"
                    value={maximumDiscount}
                    onChange={(e) => setMaximumDiscount(e.target.value)}
                    placeholder="None"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Usage Limit</label>
                  <input
                    type="number"
                    value={usageLimit}
                    onChange={(e) => setUsageLimit(e.target.value)}
                    placeholder="Infinite"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Per User</label>
                  <input
                    type="number"
                    required
                    value={perUserLimit}
                    onChange={(e) => setPerUserLimit(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Active</label>
                  <select
                    value={active}
                    onChange={(e) => setActive(e.target.value === "true")}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Expiry Date</label>
                <input
                  type="date"
                  required
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                >
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats Modal */}
      {statsModalOpen && currentCoupon && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 w-full max-w-md shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <h3 className="text-xl font-bold font-serif text-slate-100 mb-2">Usage Performance</h3>
            <p className="text-slate-400 text-xs mb-6">Stats for code: <span className="font-mono text-amber-500 font-bold">{currentCoupon.code}</span></p>

            {statsLoading ? (
              <div className="py-8 text-center text-slate-500">Aggregating stats...</div>
            ) : !stats ? (
              <div className="py-8 text-center text-slate-500">Failed to aggregate statistics.</div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-900 p-4 rounded-lg border border-slate-850 text-center">
                    <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Times Used</div>
                    <div className="text-xl font-bold text-slate-100 mt-1">{stats.usageCount}</div>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-lg border border-slate-850 text-center">
                    <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Unique Users</div>
                    <div className="text-xl font-bold text-slate-100 mt-1">{stats.uniqueUsers}</div>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-lg border border-slate-850 text-center">
                    <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Discounts</div>
                    <div className="text-lg font-bold text-emerald-500 mt-1">₹{stats.totalDiscountGiven}</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Related Order List</h4>
                  {stats.orders.length === 0 ? (
                    <p className="text-slate-500 text-xs">No orders completed with this code yet.</p>
                  ) : (
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {stats.orders.map((o) => (
                        <div key={o._id} className="flex justify-between text-xs border-b border-slate-900 pb-1 last:border-0">
                          <span className="font-mono text-slate-300">{o.orderNumber}</span>
                          <span className="text-emerald-500 font-semibold">-₹{o.discount}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-end pt-6 border-t border-slate-800 mt-6">
              <button
                onClick={() => setStatsModalOpen(false)}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 px-4 py-2.5 rounded-lg text-sm font-semibold"
              >
                Close Statistics
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCouponsPage;
