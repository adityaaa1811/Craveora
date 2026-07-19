import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Search, ShieldAlert, ShieldCheck, History } from "lucide-react";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // History modal states
  const [selectedUser, setSelectedUser] = useState(null);
  const [historyOrders, setHistoryOrders] = useState([]);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const roleParam = roleFilter ? `&role=${roleFilter}` : "";
      const searchParam = search ? `&search=${search}` : "";
      const res = await api.get(`/v1/admin/users?page=${page}&limit=10${roleParam}${searchParam}`);
      setUsers(res.data.data.results || []);
      setTotalPages(res.data.data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, roleFilter, search]);

  const handleToggleSuspend = async (userId, currentlySuspended) => {
    try {
      const endpoint = currentlySuspended ? "activate" : "suspend";
      await api.patch(`/v1/admin/users/${userId}/${endpoint}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      await api.patch(`/v1/admin/users/${userId}/role`, { role: newRole });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const viewUserHistory = async (user) => {
    setSelectedUser(user);
    setHistoryModalOpen(true);
    setHistoryLoading(true);
    try {
      const res = await api.get(`/v1/admin/users/${user._id}/orders`);
      setHistoryOrders(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setHistoryLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-serif text-slate-100">User Accounts</h1>
        <p className="text-slate-400 text-sm mt-1">Manage user access permissions, modify system roles, and audit account states</p>
      </div>

      {/* Filters */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-3 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search by Name or Email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500 w-full"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
          className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
        >
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="support">Support Staff</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-slate-500">Loading user accounts...</div>
        ) : users.length === 0 ? (
          <div className="py-12 text-center text-slate-500">No matching users found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-medium">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-b border-slate-900 hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-4 font-semibold text-slate-200">{u.name}</td>
                    <td className="py-4 px-4 text-slate-400">{u.email}</td>
                    <td className="py-4 px-4">
                      <select
                        value={u.role}
                        onChange={(e) => handleChangeRole(u._id, e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-amber-500 capitalize"
                      >
                        <option value="user">User</option>
                        <option value="support">Support</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        u.isSuspended ? "bg-red-500/10 text-red-500" : "bg-emerald-500/10 text-emerald-500"
                      }`}>{u.isSuspended ? "Suspended" : "Active"}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => viewUserHistory(u)}
                          className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-slate-900 rounded flex items-center gap-1 text-xs font-semibold"
                          title="View Order History"
                        >
                          <History size={14} />
                          Orders
                        </button>

                        <button
                          onClick={() => handleToggleSuspend(u._id, u.isSuspended)}
                          className={`p-1.5 rounded flex items-center gap-1 text-xs font-semibold ${
                            u.isSuspended 
                              ? "text-emerald-400 hover:text-emerald-300 hover:bg-slate-900" 
                              : "text-red-400 hover:text-red-300 hover:bg-slate-900"
                          }`}
                        >
                          {u.isSuspended ? (
                            <>
                              <ShieldCheck size={14} />
                              Unsuspend
                            </>
                          ) : (
                            <>
                              <ShieldAlert size={14} />
                              Suspend
                            </>
                          )}
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className="px-3 py-1.5 rounded bg-slate-950 border border-slate-800 text-sm text-slate-400 hover:text-slate-200 disabled:opacity-40"
          >
            Prev
          </button>
          <span className="text-sm text-slate-400">Page {page} of {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            className="px-3 py-1.5 rounded bg-slate-950 border border-slate-800 text-sm text-slate-400 hover:text-slate-200 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {/* User History Modal */}
      {historyModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 w-full max-w-lg shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <h3 className="text-xl font-bold font-serif text-slate-100 mb-2">Order History</h3>
            <p className="text-slate-400 text-xs mb-6">Customer: {selectedUser.name} ({selectedUser.email})</p>

            {historyLoading ? (
              <div className="py-8 text-center text-slate-500">Loading customer history...</div>
            ) : historyOrders.length === 0 ? (
              <div className="py-8 text-center text-slate-500">No orders placed by this customer.</div>
            ) : (
              <div className="space-y-4">
                {historyOrders.map((o) => (
                  <div key={o._id} className="bg-slate-900 p-4 rounded-lg border border-slate-850 flex justify-between items-center">
                    <div>
                      <div className="text-sm font-semibold text-amber-500">{o.orderNumber}</div>
                      <div className="text-xs text-slate-400 mt-1">{new Date(o.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-slate-100">₹{o.grandTotal}</div>
                      <div className="text-xs text-slate-500 capitalize mt-1">{o.orderStatus}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end pt-6 border-t border-slate-800 mt-6">
              <button
                onClick={() => setHistoryModalOpen(false)}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 px-4 py-2.5 rounded-lg text-sm font-semibold"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
