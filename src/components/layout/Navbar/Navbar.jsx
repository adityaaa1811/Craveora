import React, { useState, useEffect, useMemo } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Menu, Search, X, LogOut, LayoutDashboard, User as UserIcon, Settings } from "lucide-react";
import { toast } from "react-hot-toast";
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
  const dispatch = useAppDispatch();
  
  // Scrolled shadow states
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

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
    setIsSearchOpen(false);
    setSearchQuery("");
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
          <div className="flex flex-col gap-2 mt-2">
            <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider pl-1">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {["Steak", "Pastries", "Lobster", "Elixirs"].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchQuery(tag)}
                  className="px-3 py-1.5 text-2xs font-semibold text-text-secondary border border-border rounded-full hover:bg-primary-light hover:text-primary transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
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
