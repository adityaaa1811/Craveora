import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { 
  LayoutDashboard, 
  User, 
  MapPin, 
  ShoppingBag, 
  Heart, 
  Settings, 
  LogOut,
  ChevronRight
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectCurrentUser, logout } from "../store/slices/authSlice";
import { Avatar, Card } from "../components/ui";

export const DashboardLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useAppSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Signed out successfully.");
    navigate("/login");
  };

  const navItems = [
    { path: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
    { path: "/dashboard/profile", label: "My Profile", icon: User },
    { path: "/dashboard/addresses", label: "Saved Addresses", icon: MapPin },
    { path: "/dashboard/orders", label: "Order History", icon: ShoppingBag },
    { path: "/dashboard/wishlist", label: "My Wishlist", icon: Heart },
    { path: "/dashboard/settings", label: "Settings", icon: Settings }
  ];

  return (
    <div className="container mx-auto px-4 md:px-8 py-10 md:py-16 max-w-7xl select-none">
      {/* Title Header */}
      <div className="mb-8 md:mb-12 border-b border-border/30 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-2xs font-extrabold text-primary uppercase tracking-widest bg-primary-light px-4 py-1.5 rounded-full select-none">
            Connoisseur Room
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-text-primary mt-4 tracking-tight">
            My Club Account
          </h1>
        </div>
        <div className="flex items-center gap-3.5 bg-surface border border-border/30 px-5 py-3.5 rounded-2xl shadow-sm self-start">
          <Avatar name={currentUser?.name || "User"} size="md" />
          <div>
            <h4 className="text-xs font-black text-text-primary leading-tight">
              {currentUser?.name || "Aditya Mishra"}
            </h4>
            <span className="text-[10px] text-primary font-bold uppercase tracking-wider block mt-1">
              {currentUser?.tier || "Connoisseur Club"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-10 items-start">
        {/* Navigation Sidebar / Horizontal scroll tabs */}
        <div className="w-full lg:col-span-1 flex flex-col gap-6">
          
          {/* Desktop Sidebar */}
          <Card className="hidden lg:flex flex-col p-6 border border-border/30 bg-surface shadow-md">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                // Determine active state manually for custom sub-navigation paths
                const isActive = item.end 
                  ? location.pathname === item.path 
                  : location.pathname.startsWith(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-extrabold transition-all group ${
                      isActive
                        ? "bg-primary-light text-primary shadow-inner"
                        : "text-text-secondary hover:bg-neutral-50 hover:text-primary"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${
                      isActive ? "text-primary opacity-100" : "text-text-muted"
                    }`} />
                  </Link>
                );
              })}

              <hr className="border-t border-border-light my-2" />

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-extrabold text-text-secondary hover:text-error hover:bg-neutral-50 transition-all cursor-pointer w-full text-left"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </nav>
          </Card>

          {/* Mobile Tabs Scrollbar */}
          <div className="flex lg:hidden border-b border-border-light overflow-x-auto no-scrollbar gap-2 pb-2">
            {navItems.map((item) => {
              const isActive = item.end 
                ? location.pathname === item.path 
                : location.pathname.startsWith(item.path);
                
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-5 py-3.5 rounded-full text-xs font-extrabold transition-all shrink-0 select-none ${
                    isActive
                      ? "bg-primary text-white shadow-md"
                      : "bg-surface border border-border text-text-secondary hover:text-primary"
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-3.5 rounded-full text-xs font-extrabold bg-surface border border-border text-text-secondary hover:text-error shrink-0 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Subpage Content */}
        <div className="lg:col-span-3 min-w-0 w-full min-h-[400px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
