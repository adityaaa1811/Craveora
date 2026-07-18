import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { 
  Bell, 
  Moon, 
  Lock, 
  LogOut, 
  Save 
} from "lucide-react";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/slices/authSlice";
import { Card, Button } from "../components/ui";

export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Local state for setting toggles
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true
  });
  const [theme, setTheme] = useState("system");
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    telemetry: false
  });

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Preferences updated successfully.");
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Signed out successfully.");
    navigate("/login");
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-6 md:p-8 border border-border/30 bg-surface shadow-sm">
        <form onSubmit={handleSave} className="flex flex-col gap-8">
          
          {/* 1. Notification Preferences */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 border-b border-border-light pb-2 select-none">
              <Bell className="w-4 h-4 text-primary" />
              <h4 className="text-xs font-black text-text-primary uppercase tracking-wider">
                Notification Preferences
              </h4>
            </div>

            <div className="flex flex-col gap-3.5 px-1">
              {[
                { key: "email", label: "Email Notifications", desc: "Receive luxury menus, chef recommendations, and invoice updates." },
                { key: "push", label: "Push Notifications", desc: "Receive immediate updates when valets depart or dishes are ready." },
                { key: "sms", label: "SMS Updates", desc: "Receive text message notifications for courier checkpoints." }
              ].map((item) => (
                <label key={item.key} className="flex items-start gap-3 cursor-pointer leading-tight select-none">
                  <input
                    type="checkbox"
                    checked={notifications[item.key]}
                    onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                    className="w-4 h-4 rounded-sm border-border text-primary focus:ring-primary/20 accent-primary cursor-pointer mt-0.5"
                  />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-text-secondary">{item.label}</span>
                    <span className="text-[10px] text-text-muted leading-normal">{item.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* 2. Theme Preferences */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 border-b border-border-light pb-2 select-none">
              <Moon className="w-4 h-4 text-primary" />
              <h4 className="text-xs font-black text-text-primary uppercase tracking-wider">
                Theme Preferences
              </h4>
            </div>

            <div className="grid grid-cols-3 gap-4 px-1 select-none">
              {[
                { id: "light", label: "Light Room" },
                { id: "dark", label: "Dark Salon" },
                { id: "system", label: "System Sync" }
              ].map((t) => {
                const isActive = theme === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTheme(t.id)}
                    className={`p-4 border rounded-2xl text-[10px] font-extrabold transition-all cursor-pointer text-center ${
                      isActive
                        ? "border-primary bg-primary-light/40 text-primary shadow-inner"
                        : "border-border text-text-secondary hover:bg-neutral-50"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Privacy Settings */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 border-b border-border-light pb-2 select-none">
              <Lock className="w-4 h-4 text-primary" />
              <h4 className="text-xs font-black text-text-primary uppercase tracking-wider">
                Privacy Settings
              </h4>
            </div>

            <div className="flex flex-col gap-3.5 px-1">
              {[
                { key: "profileVisible", label: "Public Profile Visibility", desc: "Allow other Connoisseurs to see reviews and club badges." },
                { key: "telemetry", label: "Anonymized Analytics", desc: "Share anonymous platform interactions to improve dining UI." }
              ].map((item) => (
                <label key={item.key} className="flex items-start gap-3 cursor-pointer leading-tight select-none">
                  <input
                    type="checkbox"
                    checked={privacy[item.key]}
                    onChange={(e) => setPrivacy({ ...privacy, [item.key]: e.target.checked })}
                    className="w-4 h-4 rounded-sm border-border text-primary focus:ring-primary/20 accent-primary cursor-pointer mt-0.5"
                  />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-text-secondary">{item.label}</span>
                    <span className="text-[10px] text-text-muted leading-normal">{item.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Actions Footer */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-4 pt-4 border-t border-border-light select-none">
            <Button type="submit" className="px-6 h-11 text-xs tracking-wider">
              <Save className="w-4 h-4" />
              <span>SAVE PREFERENCES</span>
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleLogout}
              className="px-6 h-11 text-xs tracking-wider text-text-secondary hover:text-error hover:border-error/20"
            >
              <LogOut className="w-4 h-4" />
              <span>SIGN OUT ACCOUNT</span>
            </Button>
          </div>

        </form>
      </Card>
    </div>
  );
};

export default SettingsPage;
