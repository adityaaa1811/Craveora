import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Spinner } from "../components/ui";

// Layouts
import MainLayout from "../components/layout/MainLayout/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import ProtectedRoute from "../components/common/ProtectedRoute";

// Pages
import Home from "../pages/Home"; // Keep Home static for fast initial load
const Menu = lazy(() => import("../pages/Menu"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Cart = lazy(() => import("../pages/Cart"));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));
const OrderSuccessPage = lazy(() => import("../pages/OrderSuccessPage"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("../pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("../pages/ResetPasswordPage"));
const EmailVerificationPage = lazy(() => import("../pages/EmailVerificationPage"));

// Dashboard Pages
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const AddressesPage = lazy(() => import("../pages/AddressesPage"));
const OrdersPage = lazy(() => import("../pages/OrdersPage"));
const OrderDetailsPage = lazy(() => import("../pages/OrderDetailsPage"));
const WishlistPage = lazy(() => import("../pages/WishlistPage"));
const SettingsPage = lazy(() => import("../pages/SettingsPage"));

const NotFound = lazy(() => import("../pages/NotFound"));
const OffersPage = lazy(() => import("../pages/OffersPage"));

// Admin Pages
import AdminLayout from "../layouts/AdminLayout";
const AdminDashboardPage = lazy(() => import("../pages/admin/AdminDashboardPage"));
const AdminProductsPage = lazy(() => import("../pages/admin/AdminProductsPage"));
const AdminCategoriesPage = lazy(() => import("../pages/admin/AdminCategoriesPage"));
const AdminOrdersPage = lazy(() => import("../pages/admin/AdminOrdersPage"));
const AdminUsersPage = lazy(() => import("../pages/admin/AdminUsersPage"));
const AdminReviewsPage = lazy(() => import("../pages/admin/AdminReviewsPage"));
const AdminCouponsPage = lazy(() => import("../pages/admin/AdminCouponsPage"));
const AdminInventoryPage = lazy(() => import("../pages/admin/AdminInventoryPage"));
const AdminSettingsPage = lazy(() => import("../pages/admin/AdminSettingsPage"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="min-h-screen w-full flex items-center justify-center bg-surface">
            <Spinner variant="ring" size="lg" className="text-primary" />
          </div>
        }
      >
        <Routes>
          {/* Main Application Routes using MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/offers" element={<OffersPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              
              {/* Legacy Profile Redirect */}
              <Route path="/profile" element={<Navigate to="/dashboard/profile" replace />} />
              
              {/* Dashboard Layout Wrapper */}
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/dashboard/profile" element={<ProfilePage />} />
                <Route path="/dashboard/addresses" element={<AddressesPage />} />
                <Route path="/dashboard/orders" element={<OrdersPage />} />
                <Route path="/dashboard/orders/:id" element={<OrderDetailsPage />} />
                <Route path="/dashboard/wishlist" element={<WishlistPage />} />
                <Route path="/dashboard/settings" element={<SettingsPage />} />
              </Route>
            </Route>
          </Route>

          {/* Admin Dashboard Routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin", "manager", "support"]} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/products" element={<AdminProductsPage />} />
              <Route path="/admin/categories" element={<AdminCategoriesPage />} />
              <Route path="/admin/orders" element={<AdminOrdersPage />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route path="/admin/reviews" element={<AdminReviewsPage />} />
              <Route path="/admin/coupons" element={<AdminCouponsPage />} />
              <Route path="/admin/inventory" element={<AdminInventoryPage />} />
              <Route path="/admin/settings" element={<AdminSettingsPage />} />
            </Route>
          </Route>

          {/* Authentication Routes using AuthLayout */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/verify-email" element={<EmailVerificationPage />} />
          </Route>

          {/* Catch-all Route under MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
