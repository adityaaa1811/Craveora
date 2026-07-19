import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown } from "lucide-react";

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  // Form Fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await api.get("/v1/admin/categories");
      setCategories(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setCurrentCategory(null);
    setName("");
    setDescription("");
    setImage("");
    setSortOrder(categories.length);
    setModalOpen(true);
  };

  const openEditModal = (cat) => {
    setCurrentCategory(cat);
    setName(cat.name);
    setDescription(cat.description || "");
    setImage(cat.image || "");
    setSortOrder(cat.sortOrder || 0);
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      description,
      image,
      sortOrder: parseInt(sortOrder, 10),
    };

    try {
      if (currentCategory) {
        await api.put(`/v1/admin/categories/${currentCategory._id}`, payload);
      } else {
        await api.post("/v1/admin/categories", payload);
      }
      setModalOpen(false);
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await api.delete(`/v1/admin/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const shiftOrder = async (idx, direction) => {
    const updated = [...categories];
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= updated.length) return;

    // Swap sortOrders
    const temp = updated[idx].sortOrder;
    updated[idx].sortOrder = updated[targetIdx].sortOrder;
    updated[targetIdx].sortOrder = temp;

    try {
      await api.patch("/v1/admin/categories/reorder", {
        categories: [
          { _id: updated[idx]._id, sortOrder: updated[idx].sortOrder },
          { _id: updated[targetIdx]._id, sortOrder: updated[targetIdx].sortOrder },
        ],
      });
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-serif text-slate-100">Category Management</h1>
          <p className="text-slate-400 text-sm mt-1">Configure gourmet menu sections and visual layouts</p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"
        >
          <Plus size={18} />
          Create Category
        </button>
      </div>

      <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-slate-500">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="py-12 text-center text-slate-500">No categories created yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-medium">
                  <th className="py-3 px-4 w-16 text-center">Order</th>
                  <th className="py-3 px-4">Preview</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, idx) => (
                  <tr key={cat._id} className="border-b border-slate-900 hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          disabled={idx === 0}
                          onClick={() => shiftOrder(idx, -1)}
                          className="p-1 text-slate-500 hover:text-slate-200 disabled:opacity-30 disabled:hover:text-slate-500"
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          disabled={idx === categories.length - 1}
                          onClick={() => shiftOrder(idx, 1)}
                          className="p-1 text-slate-500 hover:text-slate-200 disabled:opacity-30 disabled:hover:text-slate-500"
                        >
                          <ArrowDown size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {cat.image ? (
                        <img src={cat.image} alt={cat.name} className="h-10 w-12 object-cover rounded-lg border border-slate-800" />
                      ) : (
                        <div className="h-10 w-12 bg-slate-900 rounded-lg flex items-center justify-center text-slate-600 text-xs font-bold font-mono">
                          N/A
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-200">{cat.name}</td>
                    <td className="py-4 px-4 text-slate-400 max-w-xs truncate">{cat.description || "—"}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => openEditModal(cat)} className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-900 rounded" title="Edit">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(cat._id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-900 rounded" title="Delete">
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

      {/* Modal - Create/Edit Category */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 w-full max-w-md shadow-2xl relative">
            <h3 className="text-xl font-bold font-serif text-slate-100 mb-6">
              {currentCategory ? "Edit Category Details" : "Create Menu Category"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Category Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</label>
                <textarea
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Image URL</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Sort Weight Index</label>
                <input
                  type="number"
                  required
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
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
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategoriesPage;
