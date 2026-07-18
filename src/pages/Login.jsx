import React, { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/slices/authSlice";
import api from "../services/api";
import { Card, CardHeader, CardBody, Input, Button } from "../components/ui";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // Get redirect path from search params, default to home page
  const redirectTo = searchParams.get("redirect") || "/";

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

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", data);
      const { token, user } = response.data.data;

      // Update Redux Store (middleware will auto-persist to localStorage)
      dispatch(login({ user, token }));
      
      toast.success(`Welcome back, ${user.name}`);
      navigate(redirectTo, { replace: true });
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Invalid email or password.";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card variant="glass" className="w-full border border-border/20 backdrop-blur-xl">
        <CardHeader className="text-center pt-8 pb-4">
          <Link to="/" className="inline-block">
            <h1 className="text-2xl font-black tracking-[0.2em] text-primary select-none font-serif">
              CRAVEORA
            </h1>
          </Link>
          <p className="text-[10px] tracking-[0.15em] font-bold text-text-muted uppercase mt-2">
            Delicacy Connoisseur Sign In
          </p>
        </CardHeader>

        <CardBody className="px-6 md:px-8 pb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {/* Email Field */}
            <Input
              label="Email Address"
              type="email"
              placeholder="e.g., aditya@craveora.com"
              prefix={<Mail className="w-4 h-4 text-text-muted" />}
              error={errors.email?.message}
              disabled={isLoading}
              {...register("email")}
            />

            {/* Password Field */}
            <div className="flex flex-col gap-1">
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                prefix={<Lock className="w-4 h-4 text-text-muted" />}
                error={errors.password?.message}
                disabled={isLoading}
                {...register("password")}
              />
            </div>

            {/* Subtext Options */}
            <div className="flex items-center justify-between px-1 text-2xs font-bold text-text-secondary">
              <label className="flex items-center gap-2 cursor-pointer select-none mb-0">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 rounded-sm border-border text-primary focus:ring-primary/20 accent-primary cursor-pointer"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => toast.success("Reset link simulated.")}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full mt-2 py-3.5 text-xs tracking-wider"
            >
              <span>SIGN IN</span>
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </Button>

            {/* Sign Up Link */}
            <p className="text-center text-xs text-text-secondary mt-2">
              New to Craveora?{" "}
              <Link
                to={`/register${searchParams.toString() ? `?${searchParams.toString()}` : ""}`}
                className="font-black text-primary hover:text-primary-hover transition-colors"
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

export default Login;
