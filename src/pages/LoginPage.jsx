import React, { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { 
  authStart, 
  authSuccess, 
  authFail, 
  clearError,
  selectAuthLoading
} from "../store/slices/authSlice";
import { Card, CardHeader, CardBody, Input, Button } from "../components/ui";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isLoading = useAppSelector(selectAuthLoading);

  // Retrieve path origin for routing redirect, default to /profile or home
  const fromPath = location.state?.from?.pathname || "/profile";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    // Clear any previous Redux auth errors on mount
    dispatch(clearError());
  }, [dispatch]);

  const onSubmit = (data) => {
    dispatch(authStart());
    
    // Simulate luxury API handshake delay
    setTimeout(() => {
      if (data.email.toLowerCase().includes("fail")) {
        const errorMsg = "Connoisseur credentials invalid. Please check and retry.";
        dispatch(authFail(errorMsg));
        toast.error(errorMsg);
      } else {
        const mockUser = {
          name: "Aditya Mishra",
          email: data.email,
          phone: "+1 (800) 555-0199",
          tier: "Connoisseur Club"
        };
        const mockToken = "jwt-mock-token-craveora-2026";
        
        dispatch(authSuccess({ user: mockUser, token: mockToken }));
        toast.success(`Welcome back, ${mockUser.name}!`);
        navigate(fromPath, { replace: true });
      }
    }, 1500);
  };

  const handleGuestLogin = () => {
    toast.success("Welcome, Guest Connoisseur! Enjoy exploring our selections.", {
      icon: "✨"
    });
    navigate("/menu");
  };

  const handleSocialLogin = (platform) => {
    toast.success(`${platform} Authentication is in demonstration mode.`, {
      icon: "🔐"
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card variant="glass" className="w-full border border-border/25 backdrop-blur-xl shadow-premium">
        <CardHeader className="text-center pt-8 pb-4">
          <Link to="/" className="inline-block">
            <h1 className="text-2xl font-black tracking-[0.25em] text-primary select-none font-serif">
              CRAVEORA
            </h1>
          </Link>
          <p className="text-[10px] tracking-[0.18em] font-extrabold text-text-muted uppercase mt-2">
            Delicacy Connoisseur Sign In
          </p>
        </CardHeader>

        <CardBody className="px-6 md:px-8 pb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {/* Email Input */}
            <Input
              label="Email Address"
              type="email"
              placeholder="e.g. aditya@craveora.com"
              prefix={<Mail className="w-4 h-4 text-text-muted" />}
              error={errors.email?.message}
              disabled={isLoading}
              autocomplete="username"
              {...register("email")}
            />

            {/* Password Input */}
            <div className="flex flex-col gap-1">
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                prefix={<Lock className="w-4 h-4 text-text-muted" />}
                error={errors.password?.message}
                disabled={isLoading}
                autocomplete="current-password"
                {...register("password")}
              />
            </div>

            {/* Options */}
            <div className="flex items-center justify-between px-1 text-2xs font-extrabold text-text-secondary select-none">
              <label className="flex items-center gap-2 cursor-pointer mb-0">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 rounded-sm border-border text-primary focus:ring-primary/20 accent-primary cursor-pointer"
                  disabled={isLoading}
                />
                <span>Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="hover:text-primary transition-colors cursor-pointer text-text-muted"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full mt-2 py-3.5 text-xs tracking-wider"
            >
              <span>SIGN IN</span>
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </Button>

            {/* Guest Entry Button */}
            <button
              type="button"
              onClick={handleGuestLogin}
              disabled={isLoading}
              className="w-full py-3.5 border border-border text-text-secondary hover:text-primary rounded-full text-xs font-bold transition-all focus:ring-2 focus:ring-primary/20 cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>CONTINUE AS GUEST</span>
            </button>

            {/* Divider */}
            <div className="flex items-center my-1">
              <hr className="flex-grow border-t border-border-light" />
              <span className="text-[9px] font-black text-text-muted uppercase tracking-wider px-3 select-none">
                or sign in with
              </span>
              <hr className="flex-grow border-t border-border-light" />
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleSocialLogin("Google")}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 py-3 border border-border/80 hover:border-primary/20 rounded-full text-2xs font-extrabold text-text-secondary hover:text-primary hover:bg-neutral-50 transition-all cursor-pointer"
              >
                {/* Simple Custom Google SVG */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.77c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin("GitHub")}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 py-3 border border-border/80 hover:border-primary/20 rounded-full text-2xs font-extrabold text-text-secondary hover:text-primary hover:bg-neutral-50 transition-all cursor-pointer"
              >
                {/* GitHub Custom SVG */}
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span>GitHub</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-xs text-text-secondary mt-2">
              New to Craveora?{" "}
              <Link
                to="/register"
                className="font-black text-primary hover:text-primary-hover transition-colors focus:outline-none"
              >
                Create an account
              </Link>
            </p>
          </form>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default LoginPage;
