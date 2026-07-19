import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Search, Filter, Eye, Truck, RefreshCw } from "lucide-react";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [driverModalOpen, setDriverModalOpen] = useState(false);

  // Driver Assignment Fields
  const [driverName, setDriverName] = useState("");
  const [driverPhone, setDriverPhone] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const statusParam = statusFilter !== "all" ? `&status=${statusFilter}` : "";
      const searchParam = search ? `&search=${search}` : "";
      const res = await api.get(`/v1/admin/orders?page=${page}&limit=10${statusParam}${searchParam}`);
      setOrders(res.data.data.results || []);
      setTotalPages(res.data.data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, statusFilter, search]);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await api.patch(`/v1/admin/orders/${id}/status`, { status: newStatus });
      fetchOrders();
      if (selectedOrder && selectedOrder._id === id) {
        setSelectedOrder(prev => ({ ...prev, orderStatus: newStatus }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssignDriver = async (e) => {
    e.preventDefault();
    if (!driverName || !driverPhone) return;

    try {
      await api.patch(`/v1/admin/orders/${selectedOrder._id}/assign-delivery`, {
        deliveryAgent: { name: driverName, phone: driverPhone }
      });
      setDriverModalOpen(false);
      fetchOrders();
      setDetailsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRefund = async (id) => {
    if (!window.confirm("Are you sure you want to refund this order?")) return;
    try {
      await api.post(`/v1/admin/orders/${id}/refund`);
      fetchOrders();
      setDetailsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const viewDetails = (order) => {
    setSelectedOrder(order);
    setDetailsModalOpen(true);
  };

  const openDriverModal = () => {
    setDriverName(selectedOrder.deliveryAgent?.name || "");
    setDriverPhone(selectedOrder.deliveryAgent?.phone || "");
    setDriverModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-serif text-slate-100">Orders Archival System</h1>
        <p className="text-slate-400 text-sm mt-1">Review customer transactions, update delivery routes, and issue refunds</p>
      </div>

      {/* Filters */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-3 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search by Order ID / Phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500 w-full"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
        >
          <option value="all">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Preparing">Preparing</option>
          <option value="Out For Delivery">Out For Delivery</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Refunded">Refunded</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-slate-500">Loading order records...</div>
        ) : orders.length === 0 ? (
          <div className="py-12 text-center text-slate-500">No matching orders found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-medium">
                  <th className="py-3 px-4">Order Code</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Placing Date</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id} className="border-b border-slate-900 hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-4 font-semibold text-amber-500">{o.orderNumber}</td>
                    <td className="py-4 px-4">
                      <div className="text-slate-200">{o.user?.name || "Guest"}</div>
                      <div className="text-xs text-slate-500">{o.deliveryAddress?.phone || "No phone"}</div>
                    </td>
                    <td className="py-4 px-4 text-slate-400">{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 px-4 font-bold text-slate-200">₹{o.grandTotal}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        o.orderStatus === "Delivered" ? "bg-emerald-500/10 text-emerald-500" :
                        o.orderStatus === "Cancelled" ? "bg-red-500/10 text-red-500" :
                        o.orderStatus === "Refunded" ? "bg-purple-500/10 text-purple-500" : "bg-amber-500/10 text-amber-500"
                      }`}>{o.orderStatus}</span>
                    </td>
                    <td className="py-4 px-4 capitalize">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        o.paymentStatus === "Paid" ? "bg-emerald-500/10 text-emerald-500" :
                        o.paymentStatus === "Refunded" ? "bg-purple-500/10 text-purple-500" : "bg-yellow-500/10 text-yellow-500"
                      }`}>{o.paymentStatus}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => viewDetails(o)}
                          className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-900 rounded flex items-center gap-1"
                        >
                          <Eye size={16} />
                          Details
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

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className="px-3 py-1.5 rounded bg-slate-950 border border-slate-800 text-sm text-slate-400 hover:text-slate-200 disabled:opacity-40 transition-colors"
          >
            Prev
          </button>
          <span className="text-sm text-slate-400">Page {page} of {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            className="px-3 py-1.5 rounded bg-slate-950 border border-slate-800 text-sm text-slate-400 hover:text-slate-200 disabled:opacity-40 transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* Details Modal */}
      {detailsModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold font-serif text-slate-100 mb-2 flex items-center justify-between">
              <span>Order Details</span>
              <span className="text-sm text-amber-500 font-sans font-normal">{selectedOrder.orderNumber}</span>
            </h3>
            <p className="text-slate-400 text-xs mb-6">Placed on {new Date(selectedOrder.createdAt).toLocaleString()}</p>

            <div className="space-y-6 text-slate-300">
              {/* Delivery info */}
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Delivery Address</h4>
                <p className="text-sm">{selectedOrder.deliveryAddress?.street}</p>
                <p className="text-sm">{selectedOrder.deliveryAddress?.city}, {selectedOrder.deliveryAddress?.state} {selectedOrder.deliveryAddress?.zipCode}</p>
                <p className="text-sm text-slate-400 mt-1">Phone: {selectedOrder.deliveryAddress?.phone}</p>
              </div>

              {/* Items Summary */}
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Ordered Dishes</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{item.title} <span className="text-slate-500 font-bold">x {item.quantity}</span></span>
                      <span>₹{item.subtotal}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-800 pt-2 mt-2 flex justify-between font-bold text-slate-100 text-sm">
                  <span>Grand Total</span>
                  <span>₹{selectedOrder.grandTotal}</span>
                </div>
              </div>

              {/* Driver info */}
              {selectedOrder.deliveryAgent?.name && (
                <div className="bg-slate-900/50 p-3 rounded border border-slate-850 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-semibold">Assigned Agent</div>
                    <div className="text-sm font-semibold text-slate-200">{selectedOrder.deliveryAgent.name}</div>
                  </div>
                  <div className="text-xs text-slate-400">{selectedOrder.deliveryAgent.phone}</div>
                </div>
              )}

              {/* State Operations */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <h4 className="text-xs font-bold uppercase text-slate-400">Order Operations</h4>
                
                <div className="flex flex-wrap gap-2">
                  {selectedOrder.orderStatus !== "Delivered" && selectedOrder.orderStatus !== "Cancelled" && selectedOrder.orderStatus !== "Refunded" && (
                    <>
                      <button onClick={() => handleUpdateStatus(selectedOrder._id, "Confirmed")} className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-slate-100">
                        Confirm Order
                      </button>
                      <button onClick={() => handleUpdateStatus(selectedOrder._id, "Preparing")} className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-slate-100">
                        Mark Preparing
                      </button>
                      <button onClick={openDriverModal} className="px-3 py-1.5 rounded bg-amber-500 text-slate-950 text-xs font-semibold flex items-center gap-1">
                        <Truck size={14} />
                        Dispatch Route
                      </button>
                      <button onClick={() => handleUpdateStatus(selectedOrder._id, "Delivered")} className="px-3 py-1.5 rounded bg-emerald-600 text-slate-100 text-xs font-semibold">
                        Complete Order
                      </button>
                    </>
                  )}
                  {selectedOrder.orderStatus !== "Cancelled" && selectedOrder.orderStatus !== "Refunded" && (
                    <button onClick={() => handleUpdateStatus(selectedOrder._id, "Cancelled")} className="px-3 py-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold">
                      Cancel Order
                    </button>
                  )}
                  {selectedOrder.paymentStatus === "Paid" && selectedOrder.orderStatus !== "Refunded" && (
                    <button onClick={() => handleRefund(selectedOrder._id)} className="px-3 py-1.5 rounded bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 text-xs font-semibold flex items-center gap-1">
                      <RefreshCw size={12} />
                      Issue Refund
                    </button>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-800">
                <button
                  onClick={() => setDetailsModalOpen(false)}
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 px-4 py-2.5 rounded-lg text-sm font-semibold"
                >
                  Close Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Driver Assignment Modal */}
      {driverModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 w-full max-w-sm shadow-2xl relative">
            <h3 className="text-lg font-bold font-serif text-slate-100 mb-6">Assign Delivery Agent</h3>
            <form onSubmit={handleAssignDriver} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Agent Name</label>
                <input
                  type="text"
                  required
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Agent Contact Phone</label>
                <input
                  type="text"
                  required
                  value={driverPhone}
                  onChange={(e) => setDriverPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setDriverModalOpen(false)}
                  className="bg-slate-900 hover:bg-slate-800 text-slate-400 px-3 py-2 rounded text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-2 rounded text-xs font-semibold"
                >
                  Assign & Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
