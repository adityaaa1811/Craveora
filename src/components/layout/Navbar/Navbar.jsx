import React, { useState, useEffect, useMemo } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Menu, Search, X, LogOut, LayoutDashboard, User as UserIcon, Settings, Bell, Truck, Award } from "lucide-react";
import { toast } from "react-hot-toast";
import { products } from "../../../features/menu/data/products";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { selectCartTotalQuantity } from "../../../store/slices/cartSlice";
import { selectWishlistItems } from "../../../store/slices/wishlistSlice";
import { 
  selectCurrentUser, 
  selectIsAuthenticated, 
  logout 
} from "../../../store/slices/authSlice";
import { navigationLinks } from "../../../constants/navigation";
import { Avatar, Drawer, Modal } from "../../ui";
import BrandLogo from "./BrandLogo";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // Scrolled shadow states
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Recent searches state loaded from localStorage
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem("craveora_recent_searches");
    return saved ? JSON.parse(saved) : ["Burrata", "Risotto", "Truffle", "Steak"];
  });

  // Notifications state loaded from localStorage
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("craveora_notifications");
    return saved ? JSON.parse(saved) : [
      { id: "n1", type: "order", title: "Order En Route", message: "Valet has departed our culinary studio with your gourmet order CRV-2026-98745.", time: "12 mins ago", read: false },
      { id: "n2", type: "offer", title: "Sunday Brunch Special", message: "Enjoy 20% off Japanese Wagyu ribeye steaks using code CRAVE20 today.", time: "3 hours ago", read: false },
      { id: "n3", type: "wishlist", title: "Burrata Restocked", message: "Truffle Burrata Salad is back in fresh executive kitchen stock.", time: "1 day ago", read: true },
      { id: "n4", type: "system", title: "Connoisseur Active", message: "Your luxury Craveora Club room membership tier is successfully active.", time: "2 days ago", read: true }
    ];
  });

  // Redux selects
  const cartQuantity = useAppSelector(selectCartTotalQuantity);
  const wishlistItems = useAppSelector(selectWishlistItems);
  const wishlistCount = wishlistItems.length;
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const currentUser = useAppSelector(selectCurrentUser);

  // Close profile dropdown on click outside
  useEffect(() => {
    if (!isProfileDropdownOpen) return;
    const handleCloseDropdown = () => setIsProfileDropdownOpen(false);
    window.addEventListener("click", handleCloseDropdown);
    return () => window.removeEventListener("click", handleCloseDropdown);
  }, [isProfileDropdownOpen]);

  // Close notifications dropdown on click outside
  useEffect(() => {
    if (!isNotificationsOpen) return;
    const handleCloseDropdown = () => setIsNotificationsOpen(false);
    window.addEventListener("click", handleCloseDropdown);
    return () => window.removeEventListener("click", handleCloseDropdown);
  }, [isNotificationsOpen]);

  const saveNotifications = (updatedList) => {
    setNotifications(updatedList);
    localStorage.setItem("craveora_notifications", JSON.stringify(updatedList));
  };

  const handleMarkAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    saveNotifications(updated);
    toast.success("All notifications marked as read.");
  };

  const handleReadNotification = (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    saveNotifications(updated);
  };

  // Advanced Search suggestions
  const searchSuggestions = useMemo(() => {
    const clean = searchQuery.trim().toLowerCase();
    if (!clean) return [];
    return products.filter((p) =>
      p.title.toLowerCase().includes(clean) ||
      p.description.toLowerCase().includes(clean)
    ).slice(0, 5);
  }, [searchQuery]);

  const saveRecentSearch = (query) => {
    if (!query.trim()) return;
    const clean = query.trim();
    const updated = [clean, ...recentSearches.filter((s) => s !== clean)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("craveora_recent_searches", JSON.stringify(updated));
  };

  const handleDeleteRecentSearch = (e, item) => {
    e.stopPropagation();
    const updated = recentSearches.filter((s) => s !== item);
    setRecentSearches(updated);
    localStorage.setItem("craveora_recent_searches", JSON.stringify(updated));
  };

  const handleSuggestionClick = (title) => {
    saveRecentSearch(title);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Signed out successfully.");
  };

  // Track scrolled height to toggle shadows
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Guarantee mobile menu drawer closes on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Memoize links to prevent unnecessary rebuilds
  const renderLinks = useMemo(() => {
    return navigationLinks.map((link) => (
      <NavLink
        key={link.path}
        to={link.path}
        className={({ isActive }) =>
          `relative py-2 text-xs md:text-sm font-bold tracking-wide transition-colors focus:outline-none focus:text-primary rounded-md px-1 select-none ${
            isActive ? "text-primary" : "text-text-secondary hover:text-primary"
          }`
        }
      >
        {({ isActive }) => (
          <>
            <span>{link.label}</span>
            {isActive && (
              <motion.div
                layoutId="activeNavbarUnderline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </>
        )}
      </NavLink>
    ));
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    saveRecentSearch(searchQuery);
    setIsSearchOpen(false);
    navigate(`/menu?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 select-none ${
          isScrolled
            ? "bg-surface/85 backdrop-blur-md shadow-md border-b border-border/20 py-3"
            : "bg-surface/80 backdrop-blur-md border-b border-border/10 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-10 items-center">
            
            {/* Left: Brand Logo */}
            <div className="flex-shrink-0">
              <BrandLogo />
            </div>

            {/* Center: Desktop Navigation Links */}
            <div className="hidden md:flex space-x-8 items-center">
              {renderLinks}
            </div>

            {/* Right: Icon Utilities */}
            <div className="hidden md:flex items-center gap-5">
              
              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-text-secondary hover:text-primary hover:bg-neutral-50 transition-all rounded-full cursor-pointer focus:ring-2 focus:ring-primary/20 outline-none"
                aria-label="Search Catalog"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist badge */}
              <Link
                to="/profile"
                className="relative p-2 text-text-secondary hover:text-primary hover:bg-neutral-50 transition-all rounded-full cursor-pointer focus:ring-2 focus:ring-primary/20 outline-none"
                aria-label="Wishlist items"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-black text-white ring-2 ring-surface">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart badge */}
              <Link
                to="/cart"
                className="relative p-2 text-text-secondary hover:text-primary hover:bg-neutral-50 transition-all rounded-full cursor-pointer focus:ring-2 focus:ring-primary/20 outline-none"
                aria-label="Gourmet bag items"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartQuantity > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-black text-white ring-2 ring-surface">
                    {cartQuantity}
                  </span>
                )}
              </Link>

              {/* Notification Center Trigger */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsNotificationsOpen(!isNotificationsOpen);
                  }}
                  type="button"
                  className="relative p-2 text-text-secondary hover:text-primary hover:bg-neutral-50 transition-all rounded-full focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
                  aria-label="Toggle notifications center"
                  aria-expanded={isNotificationsOpen}
                  aria-haspopup="menu"
                >
                  <Bell className="w-5 h-5" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-error ring-2 ring-surface animate-pulse" />
                  )}
                </button>

                <AnimatePresence>
                  {isNotificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-0 top-12 w-80 bg-surface border border-border/40 rounded-2xl shadow-lg p-4 z-50 flex flex-col gap-3 select-none"
                      role="menu"
                      aria-label="Notification center panel"
                    >
                      <div className="flex justify-between items-center pb-2.5 border-b border-border-light">
                        <span className="text-[11px] font-black text-text-primary uppercase tracking-wider">
                          Notifications
                        </span>
                        {notifications.some(n => !n.read) && (
                          <button
                            type="button"
                            onClick={handleMarkAllRead}
                            className="text-[10px] font-black text-primary hover:underline cursor-pointer"
                          >
                            Mark All Read
                          </button>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1 no-scrollbar">
                        {notifications.length === 0 ? (
                          <div className="text-center py-6 flex flex-col items-center gap-2">
                            <Bell className="w-8 h-8 text-neutral-300 stroke-[1.5]" />
                            <span className="text-[10px] font-bold text-text-muted">No notifications yet.</span>
                          </div>
                        ) : (
                          notifications.map((item) => {
                            const Icon = item.type === "order" ? Truck : item.type === "offer" ? Award : item.type === "wishlist" ? Heart : Bell;
                            return (
                              <div
                                key={item.id}
                                onClick={() => handleReadNotification(item.id)}
                                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex gap-3 text-left ${
                                  item.read 
                                    ? "bg-surface border-transparent" 
                                    : "bg-primary-light/10 border-primary-light/20 shadow-2xs"
                                }`}
                                role="menuitem"
                              >
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                                  item.read ? "bg-neutral-100 text-text-muted" : "bg-primary-light text-primary"
                                }`}>
                                  <Icon className="w-3.5 h-3.5" />
                                </div>
                                <div className="flex flex-col gap-0.5 min-w-0">
                                  <div className="flex justify-between items-baseline gap-2">
                                    <span className="text-[10px] font-bold text-text-primary truncate">
                                      {item.title}
                                    </span>
                                    <span className="text-[8px] text-text-muted shrink-0 font-mono">
                                      {item.time}
                                    </span>
                                  </div>
                                  <p className="text-[9px] text-text-secondary leading-normal mt-0.5 clamp-2">
                                    {item.message}
                                  </p>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile Avatar / Auth CTAs */}
              {isAuthenticated ? (
                <div className="relative flex items-center gap-3">
                  <button
                    onClick={toggleDropdown}
                    type="button"
                    className="cursor-pointer focus:ring-2 focus:ring-primary/20 rounded-full outline-none"
                    aria-label="View user options menu"
                    aria-expanded={isProfileDropdownOpen}
                    aria-haspopup="menu"
                  >
                    <Avatar name={currentUser?.name || "User"} size="sm" />
                  </button>

                  <AnimatePresence>
                    {isProfileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 top-12 w-48 bg-surface border border-border/40 rounded-2xl shadow-lg p-2.5 z-50 flex flex-col gap-0.5 select-none"
                        role="menu"
                        aria-label="User choices"
                      >
                        {/* Welcome label */}
                        <div className="px-3 py-2 border-b border-border-light/80 mb-1.5 flex flex-col">
                          <span className="text-[10px] font-black text-primary uppercase tracking-wider">
                            {currentUser?.name || "Member"}
                          </span>
                          <span className="text-[8px] text-text-muted font-bold tracking-widest mt-0.5">
                            {currentUser?.tier || "Connoisseur Club"}
                          </span>
                        </div>

                        {[
                          { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
                          { path: "/dashboard/profile", label: "My Profile", icon: UserIcon },
                          { path: "/dashboard/orders", label: "Order History", icon: ShoppingBag },
                          { path: "/dashboard/wishlist", label: "My Wishlist", icon: Heart },
                          { path: "/dashboard/settings", label: "Settings", icon: Settings }
                        ].map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-2xs font-extrabold text-text-secondary hover:text-primary hover:bg-neutral-50 transition-all"
                            role="menuitem"
                          >
                            <item.icon className="w-3.5 h-3.5 text-text-muted group-hover:text-primary" />
                            <span>{item.label}</span>
                          </Link>
                        ))}

                        <hr className="border-t border-border-light my-1" />

                        <button
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            handleLogout();
                          }}
                          type="button"
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-2xs font-extrabold text-text-secondary hover:text-error hover:bg-neutral-50 transition-all cursor-pointer w-full text-left"
                          role="menuitem"
                        >
                          <LogOut className="w-3.5 h-3.5 text-text-muted" />
                          <span>Sign Out</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="text-xs md:text-sm font-bold text-text-secondary hover:text-primary transition-colors py-2 px-1 focus:outline-none focus:text-primary"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="text-xs md:text-sm font-bold text-white bg-primary hover:bg-primary-hover transition-colors py-2 px-4 rounded-full select-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Actions Hamburger */}
            <div className="flex md:hidden items-center gap-4">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 text-text-secondary hover:text-primary rounded-full cursor-pointer focus:ring-2 focus:ring-primary/20"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                to="/cart"
                className="relative p-1.5 text-text-secondary hover:text-primary rounded-full focus:ring-2 focus:ring-primary/20"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5.5 h-5.5" />
                {cartQuantity > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-black text-white ring-2 ring-surface">
                    {cartQuantity}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                type="button"
                className="p-1.5 text-text-secondary hover:text-primary rounded-full transition-colors focus:outline-none cursor-pointer focus:ring-2 focus:ring-primary/20"
                aria-label="Open menu drawer"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Global Search Dialog Modal */}
      <Modal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)}>
        <form onSubmit={handleSearchSubmit} className="flex flex-col gap-4 p-4 select-none">
          <div className="flex items-center justify-between pb-2 border-b border-border-light/80">
            <h3 className="text-sm font-extrabold text-text-primary tracking-tight">
              Search Gourmet Catalog
            </h3>
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="p-1 rounded-full text-text-muted hover:bg-neutral-100 hover:text-primary transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for dishes, pastries, or elixirs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-xs border border-border rounded-full bg-surface text-text-primary focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
              autoFocus
            />
            <Search className="w-4 h-4 text-text-muted absolute left-4 top-3.5" />
          </div>

          {/* Conditional dropdown elements */}
          {searchQuery.trim() === "" ? (
            <div className="flex flex-col gap-4 mt-2">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] text-text-muted font-bold uppercase tracking-wider pl-1">
                    Recent Searches
                  </span>
                  <div className="flex flex-col gap-1">
                    {recentSearches.map((item) => (
                      <div
                        key={item}
                        onClick={() => {
                          setSearchQuery(item);
                          saveRecentSearch(item);
                          setIsSearchOpen(false);
                          navigate(`/menu?search=${encodeURIComponent(item)}`);
                        }}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-2xs font-semibold text-text-secondary hover:bg-neutral-50 hover:text-primary transition-colors cursor-pointer"
                      >
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={(e) => handleDeleteRecentSearch(e, item)}
                          className="p-1 text-text-muted hover:text-error transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              <div className="flex flex-col gap-2">
                <span className="text-[9px] text-text-muted font-bold uppercase tracking-wider pl-1">
                  Popular Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {["Wagyu", "Salad", "Lobster", "Panna Cotta"].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        setSearchQuery(tag);
                        saveRecentSearch(tag);
                        setIsSearchOpen(false);
                        navigate(`/menu?search=${encodeURIComponent(tag)}`);
                      }}
                      className="px-3.5 py-2 text-2xs font-semibold text-text-secondary border border-border/80 rounded-full hover:bg-primary-light hover:text-primary transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5 mt-2">
              <span className="text-[9px] text-text-muted font-bold uppercase tracking-wider pl-1">
                Dishes Found
              </span>
              <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1 no-scrollbar">
                {searchSuggestions.length === 0 ? (
                  <div className="py-6 text-center text-2xs text-text-muted italic">
                    No dishes found matching "{searchQuery}"
                  </div>
                ) : (
                  searchSuggestions.map((item) => (
                    <Link
                      key={item.id}
                      to={`/menu/${item.id}`}
                      onClick={() => handleSuggestionClick(item.title)}
                      className="flex items-center gap-3 p-2 rounded-xl border border-transparent hover:bg-neutral-50 hover:border-border/40 transition-all text-left"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-10 h-10 rounded-lg object-cover border border-border-light shrink-0"
                      />
                      <div className="flex-grow min-w-0 flex flex-col gap-0.5">
                        <span className="text-2xs font-bold text-text-primary truncate">
                          {item.title}
                        </span>
                        <span className="text-[9px] text-text-muted font-semibold uppercase font-mono">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          )}
        </form>
      </Modal>

      {/* Mobile Menu Slide Drawer */}
      <Drawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        placement="right"
        title="Craveora Menu"
      >
        <div className="flex flex-col h-full justify-between py-2 select-none">
          <div className="flex flex-col gap-4">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-2xl text-base font-bold tracking-wide transition-all ${
                    isActive
                      ? "bg-primary-light text-primary"
                      : "text-text-secondary hover:bg-neutral-50 hover:text-primary"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="border-t border-border-light pt-6 flex flex-col gap-3 mt-auto">
            <Link
              to="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-text-secondary hover:text-primary font-bold text-sm"
            >
              <Heart className="w-5 h-5" />
              <span>Wishlist ({wishlistCount})</span>
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-text-secondary hover:text-primary font-bold text-sm"
                >
                  <Avatar name={currentUser?.name || "User"} size="sm" />
                  <span>My Profile Settings</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 text-text-secondary hover:text-error font-bold text-sm cursor-pointer w-full text-left"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2.5 px-4 pt-2">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-3 border border-border text-text-secondary hover:text-primary rounded-full text-xs font-bold transition-all focus:ring-2 focus:ring-primary/20"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-3 bg-primary text-white hover:bg-primary-hover rounded-full text-xs font-bold transition-all focus:ring-2 focus:ring-primary/20"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
