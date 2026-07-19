import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Save } from "lucide-react";

const AdminSettingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Fields state
  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState("");
  const [freeDeliveryThreshold, setFreeDeliveryThreshold] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [paymentGateway, setPaymentGateway] = useState("mock");

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/v1/admin/settings");
      const s = res.data.data;
      setSettings(s);
      
      setRestaurantName(s.restaurantName);
      setAddress(s.address);
      setPhone(s.phone);
      setEmail(s.email);
      setDeliveryCharge(s.deliveryCharge);
      setFreeDeliveryThreshold(s.freeDeliveryThreshold);
      setTaxRate(s.taxRate);
      setOpenTime(s.operatingHours?.open || "09:00");
      setCloseTime(s.operatingHours?.close || "23:00");
      setNotificationsEnabled(s.notificationsEnabled);
      setPaymentGateway(s.paymentGateway || "mock");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    
    const payload = {
      restaurantName,
      address,
      phone,
      email,
      deliveryCharge: parseFloat(deliveryCharge),
      freeDeliveryThreshold: parseFloat(freeDeliveryThreshold),
      taxRate: parseFloat(taxRate),
      operatingHours: { open: openTime, close: closeTime },
      notificationsEnabled,
      paymentGateway
    };

    try {
      await api.put("/v1/admin/settings", payload);
      setSuccessMsg("Settings updated successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold font-serif text-slate-100">Restaurant Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Configure restaurant properties, taxation, operating hours, and gateways</p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
        {successMsg && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 px-4 py-3 rounded-lg text-sm font-semibold">
            {successMsg}
          </div>
        )}

        {/* Brand Information */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider border-b border-slate-900 pb-2">
            Restaurant Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">Restaurant Name</label>
              <input
                type="text"
                required
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">Contact Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">Contact Phone</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">Street Address</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Taxes & Charges */}
        <div className="space-y-4 pt-4">
          <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider border-b border-slate-900 pb-2">
            Pricing, Taxes & Fees
          </h2>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">Delivery Charge (₹)</label>
              <input
                type="number"
                required
                min="0"
                value={deliveryCharge}
                onChange={(e) => setDeliveryCharge(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">Free Delivery Min (₹)</label>
              <input
                type="number"
                required
                min="0"
                value={freeDeliveryThreshold}
                onChange={(e) => setFreeDeliveryThreshold(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">Tax Rate (GST %)</label>
              <input
                type="number"
                required
                min="0"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Operating Hours & Gateway */}
        <div className="space-y-4 pt-4">
          <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider border-b border-slate-900 pb-2">
            Operations & Gateways
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">Kitchen Opening Hour</label>
              <input
                type="text"
                required
                value={openTime}
                onChange={(e) => setOpenTime(e.target.value)}
                placeholder="e.g. 09:00"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">Kitchen Closing Hour</label>
              <input
                type="text"
                required
                value={closeTime}
                onChange={(e) => setCloseTime(e.target.value)}
                placeholder="e.g. 23:00"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">Active Payment Gateway</label>
              <select
                value={paymentGateway}
                onChange={(e) => setPaymentGateway(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              >
                <option value="mock">Local Simulator (Mock)</option>
                <option value="razorpay">Razorpay Live Gateway</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">Email Notifications</label>
              <select
                value={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.value === "true")}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              >
                <option value="true">Enabled</option>
                <option value="false">Disabled</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-800">
          <button
            type="submit"
            disabled={saving}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-6 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <Save size={18} />
            {saving ? "Saving Configurations..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettingsPage;
