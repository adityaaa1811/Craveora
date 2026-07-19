import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { selectCurrentUser, logout } from "../store/slices/authSlice";
import {
  LayoutDashboard,
  Utensils,
  FolderTree,
  ShoppingBag,
  Users,
  MessageSquareCode,
  TicketPercent,
  Warehouse,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  X,
  Store,
  User as UserIcon
} from "lucide-react";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Products", path: "/admin/products", icon: Utensils },
    { name: "Categories", path: "/admin/categories", icon: FolderTree },
    { name: "Orders", path: "/admin/orders", icon: ShoppingBag },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Reviews", path: "/admin/reviews", icon: MessageSquareCode },
    { name: "Coupons", path: "/admin/coupons", icon: TicketPercent },
    { name: "Inventory", path: "/admin/inventory", icon: Warehouse },
    { name: "Settings", path: "/admin/settings", icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex font-sans">
      {/* Sidebar for Desktop / Tablet */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-950 border-r border-slate-800 transition-transform duration-300 transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:static lg:flex lg:flex-col`}>
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-wider text-amber-500 font-serif">Craveora</span>
            <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded uppercase font-semibold">Admin</span>
          </Link>
          <button className="lg:hidden text-slate-400 hover:text-slate-200" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Nav links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/10"
                      : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition-colors"
          >
            <Store size={18} />
            Back to Shop
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Navigation */}
        <header className="h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-20">
          <button className="lg:hidden text-slate-400 hover:text-slate-200" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>

          {/* Page Info */}
          <div className="hidden sm:block text-slate-400 text-sm font-medium">
            Operational Overview & Diagnostics
          </div>

          {/* User Profile / Admin Card */}
          <div className="flex items-center gap-4 ml-auto">
            <div className="text-right hidden md:block">
              <div className="text-sm font-semibold text-slate-200">{user?.name || "Administrator"}</div>
              <div className="text-xs text-amber-500 capitalize">{user?.role || "Admin"}</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-500 font-bold uppercase">
              {user?.name ? user.name[0] : <UserIcon size={18} />}
            </div>
          </div>
        </header>

        {/* Nested Page Viewport */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-slate-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
