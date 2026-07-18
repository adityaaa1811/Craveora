import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Spinner } from "../components/ui";

// Layouts
import MainLayout from "../components/layout/MainLayout/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

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
const Profile = lazy(() => import("../pages/Profile"));
const NotFound = lazy(() => import("../pages/NotFound"));

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

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route path="/profile" element={<Profile />} />
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
