import React, { useEffect, useState } from "react";
import api from "../../services/api";
import {
  Plus,
  Edit2,
  Trash2,
  Copy,
  Check,
  Search,
  Filter,
  Trash,
  CheckCircle,
  XCircle
} from "lucide-react";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // For edit
  
  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(10);
  const [badge, setBadge] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/products?limit=100&search=${search}&category=${categoryFilter}`);
      setProducts(res.data.data.results || []);
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, categoryFilter]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setCurrentProduct(null);
    setTitle("");
    setDescription("");
    setPrice("");
    setOldPrice("");
    setImage("");
    setCategory(categories[0]?.name || "");
    setStock(10);
    setBadge("");
    setModalOpen(true);
  };

  const openEditModal = (prod) => {
    setCurrentProduct(prod);
    setTitle(prod.title);
    setDescription(prod.description);
    setPrice(prod.price);
    setOldPrice(prod.oldPrice || "");
    setImage(prod.image);
    setCategory(prod.category);
    setStock(prod.stock || 10);
    setBadge(prod.badge || "");
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      price: parseFloat(price),
      oldPrice: oldPrice ? parseFloat(oldPrice) : undefined,
      image,
      category,
      stock: parseInt(stock, 10),
      badge: badge || undefined
    };

    try {
      if (currentProduct) {
        await api.put(`/v1/admin/products/${currentProduct._id}`, payload);
      } else {
        await api.post("/v1/admin/products", payload);
      }
      setModalOpen(false);
      fetchProducts();
    } catch (err) {
      console.error("Failed to save product:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this gourmet product?")) return;
    try {
      await api.delete(`/v1/admin/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDuplicate = async (id) => {
    try {
      await api.post(`/v1/admin/products/${id}/duplicate`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === products.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map(p => p._id));
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} products?`)) return;
    try {
      await api.post("/v1/admin/products/bulk-delete", { ids: selectedIds });
      setSelectedIds([]);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleBulkUpdateStatus = async (status) => {
    try {
      await api.patch("/v1/admin/products/bulk-status", { ids: selectedIds, availability: status });
      setSelectedIds([]);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-slate-100">Gourmet Products</h1>
          <p className="text-slate-400 text-sm mt-1">Manage kitchen menu availability, details, and duplication</p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 self-start transition-colors"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Filters & Bulk Controls */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-3 text-slate-500" size={16} />
            <input
              type="text"
              placeholder="Search dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500 w-full"
            />
          </div>

          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500 appearance-none"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c._id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Bulk Action Controls */}
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-lg">
            <span className="text-xs text-slate-400 px-2 font-medium">{selectedIds.length} Selected</span>
            <button
              onClick={() => handleBulkUpdateStatus("In Stock")}
              className="p-1.5 text-emerald-400 hover:bg-slate-800 rounded transition-colors"
              title="Set In Stock"
            >
              <CheckCircle size={16} />
            </button>
            <button
              onClick={() => handleBulkUpdateStatus("Out of Stock")}
              className="p-1.5 text-yellow-400 hover:bg-slate-800 rounded transition-colors"
              title="Set Out of Stock"
            >
              <XCircle size={16} />
            </button>
            <button
              onClick={handleBulkDelete}
              className="p-1.5 text-red-400 hover:bg-slate-800 rounded transition-colors"
              title="Delete Selected"
            >
              <Trash size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Products Table */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-slate-500">Loading gourmet collection...</div>
        ) : products.length === 0 ? (
          <div className="py-12 text-center text-slate-500">No products matching filters found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-medium bg-slate-950">
                  <th className="py-3 px-4 w-12 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === products.length}
                      onChange={handleSelectAll}
                      className="rounded border-slate-800 bg-slate-900 text-amber-500"
                    />
                  </th>
                  <th className="py-3 px-4">Dish</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="border-b border-slate-900 hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(p._id)}
                        onChange={() => handleSelect(p._id)}
                        className="rounded border-slate-800 bg-slate-900 text-amber-500"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.title} className="h-10 w-12 object-cover rounded-lg border border-slate-800" />
                        <div>
                          <div className="font-semibold text-slate-200">{p.title}</div>
                          {p.badge && <span className="text-[10px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded font-bold">{p.badge}</span>}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-400">{p.category}</td>
                    <td className="py-4 px-4 font-bold text-slate-200">
                      ₹{p.price}
                      {p.oldPrice && <span className="text-xs text-slate-500 line-through ml-2">₹{p.oldPrice}</span>}
                    </td>
                    <td className="py-4 px-4 text-slate-300 font-medium">{p.stock} units</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        p.deliveryInfo?.availability === "In Stock" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                      }`}>{p.deliveryInfo?.availability || "In Stock"}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => openEditModal(p)} className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-900 rounded" title="Edit">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDuplicate(p._id)} className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-slate-900 rounded" title="Duplicate">
                          <Copy size={16} />
                        </button>
                        <button onClick={() => handleDelete(p._id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-900 rounded" title="Delete">
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

      {/* Modal - Create/Edit Product */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold font-serif text-slate-100 mb-6">
              {currentProduct ? "Edit Product Details" : "Create Gourmet Product"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Dish Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</label>
                <textarea
                  required
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Old Price (₹)</label>
                  <input
                    type="number"
                    value={oldPrice}
                    onChange={(e) => setOldPrice(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    {categories.map((c) => (
                      <option key={c._id} value={p => c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Stock level</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Image URL</label>
                <input
                  type="text"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Promo Badge (Optional)</label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="e.g. Chef's Special, Spicy"
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
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
