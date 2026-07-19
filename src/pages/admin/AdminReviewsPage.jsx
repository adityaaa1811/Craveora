import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Check, X, Trash2, Star, MessageSquare } from "lucide-react";

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const statusParam = statusFilter !== "all" ? `&status=${statusFilter}` : "";
      const res = await api.get(`/v1/admin/reviews?page=${page}&limit=10${statusParam}`);
      setReviews(res.data.data.results || []);
      setTotalPages(res.data.data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [page, statusFilter]);

  const handleModerate = async (id, status) => {
    try {
      await api.patch(`/v1/admin/reviews/${id}/status`, { status });
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await api.delete(`/v1/reviews/${id}`); // Uses existing delete review controller
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-serif text-slate-100">Review Moderation</h1>
        <p className="text-slate-400 text-sm mt-1">Approve, reject, or remove customer feedback and gourmet ratings</p>
      </div>

      {/* Filter */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
        >
          <option value="all">All Feedback</option>
          <option value="Pending">Pending Moderation</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Reviews Table */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-slate-500">Loading customer reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="py-12 text-center text-slate-500">No customer reviews found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-medium">
                  <th className="py-3 px-4">Gourmet Dish</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Review comment</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((r) => (
                  <tr key={r._id} className="border-b border-slate-900 hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-4 font-semibold text-slate-200">{r.product?.title || "N/A"}</td>
                    <td className="py-4 px-4">
                      <div className="text-slate-200">{r.user?.name || "Guest"}</div>
                      <div className="text-xs text-slate-500">{r.user?.email || "N/A"}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center text-amber-500 gap-1 font-bold">
                        <Star size={14} className="fill-current" />
                        {r.rating}
                      </div>
                    </td>
                    <td className="py-4 px-4 max-w-xs text-slate-300">
                      <div className="font-semibold text-slate-100">{r.title}</div>
                      <div className="text-xs text-slate-400 mt-1 truncate" title={r.comment}>{r.comment}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        r.status === "Approved" ? "bg-emerald-500/10 text-emerald-500" :
                        r.status === "Rejected" ? "bg-red-500/10 text-red-500" : "bg-yellow-500/10 text-yellow-500"
                      }`}>{r.status}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        {r.status !== "Approved" && (
                          <button
                            onClick={() => handleModerate(r._id, "Approved")}
                            className="p-1.5 text-emerald-400 hover:bg-slate-900 rounded"
                            title="Approve Review"
                          >
                            <Check size={16} />
                          </button>
                        )}
                        {r.status !== "Rejected" && (
                          <button
                            onClick={() => handleModerate(r._id, "Rejected")}
                            className="p-1.5 text-yellow-400 hover:bg-slate-900 rounded"
                            title="Reject Review"
                          >
                            <X size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(r._id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-900 rounded"
                          title="Delete Review"
                        >
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

      {/* Pagination */}
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
    </div>
  );
};

export default AdminReviewsPage;
