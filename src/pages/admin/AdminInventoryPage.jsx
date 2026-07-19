import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { ShieldAlert, RefreshCw, AlertTriangle, CheckCircle, Package } from "lucide-react";

const AdminInventoryPage = () => {
  const [inventory, setInventory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stockInput, setStockInput] = useState("");

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const res = await api.get("/v1/admin/inventory");
      setInventory(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const openUpdateModal = (prod) => {
    setSelectedProduct(prod);
    setStockInput(prod.stock);
    setUpdateModalOpen(true);
  };

  const handleUpdateStock = async (e) => {
    e.preventDefault();
    if (stockInput === "" || isNaN(parseInt(stockInput, 10))) return;

    try {
      await api.patch(`/v1/admin/inventory/${selectedProduct._id}`, { stock: parseInt(stockInput, 10) });
      setUpdateModalOpen(false);
      fetchInventory();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  const { currentStock = [], lowStock = [], outOfStock = [] } = inventory || {};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-serif text-slate-100">Inventory Management</h1>
        <p className="text-slate-400 text-sm mt-1">Audit kitchen stock levels, configure low stock thresholds, and update availability</p>
      </div>

      {/* Stock Alerts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs uppercase font-bold tracking-wider">Total Menu Items</div>
            <div className="text-2xl font-bold text-slate-100 mt-1">{currentStock.length}</div>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg"><Package size={24} /></div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs uppercase font-bold tracking-wider">Low Stock Warnings</div>
            <div className="text-2xl font-bold text-yellow-500 mt-1">{lowStock.length}</div>
          </div>
          <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-lg"><AlertTriangle size={24} /></div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs uppercase font-bold tracking-wider">Out Of Stock</div>
            <div className="text-2xl font-bold text-red-500 mt-1">{outOfStock.length}</div>
          </div>
          <div className="p-3 bg-red-500/10 text-red-500 rounded-lg"><ShieldAlert size={24} /></div>
        </div>
      </div>

      {/* Main Stock Table */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950">
          <h2 className="text-lg font-bold text-slate-200">Current Stock Levels</h2>
          <button onClick={fetchInventory} className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-900 rounded" title="Refresh">
            <RefreshCw size={16} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-medium">
                <th className="py-3 px-4">Gourmet Dish</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock Level</th>
                <th className="py-3 px-4">Availability</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStock.map((prod) => {
                const isLow = prod.stock <= 5;
                const isOut = prod.stock === 0;

                return (
                  <tr key={prod._id} className="border-b border-slate-900 hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-4 font-semibold text-slate-200">{prod.title}</td>
                    <td className="py-4 px-4 text-slate-400">₹{prod.price}</td>
                    <td className="py-4 px-4">
                      <span className={`font-semibold ${isOut ? "text-red-500" : isLow ? "text-yellow-500" : "text-slate-200"}`}>
                        {prod.stock} units
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        isOut ? "bg-red-500/10 text-red-500" :
                        isLow ? "bg-yellow-500/10 text-yellow-500" : "bg-emerald-500/10 text-emerald-500"
                      }`}>
                        {isOut ? "Out of Stock" : isLow ? "Low Stock" : "In Stock"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => openUpdateModal(prod)}
                        className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 hover:border-amber-500 text-slate-300 hover:text-amber-500 text-xs font-semibold transition-colors"
                      >
                        Adjust Stock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Adjust Modal */}
      {updateModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 w-full max-w-sm shadow-2xl relative">
            <h3 className="text-lg font-bold font-serif text-slate-100 mb-2">Adjust Inventory Stock</h3>
            <p className="text-slate-400 text-xs mb-6">Product: <span className="text-amber-500 font-semibold">{selectedProduct.title}</span></p>

            <form onSubmit={handleUpdateStock} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Quantity in stock</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={stockInput}
                  onChange={(e) => setStockInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setUpdateModalOpen(false)}
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 px-3 py-2 rounded text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-2 rounded text-xs font-semibold"
                >
                  Update Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInventoryPage;
