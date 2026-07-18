import React, { useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { User, Mail, Lock, Phone, ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { 
  authStart, 
  authSuccess, 
  clearError,
  selectAuthLoading
} from "../store/slices/authSlice";
import { Card, CardHeader, CardBody, Input, Button } from "../components/ui";

const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required").min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(1, "Last name is required").min(2, "Last name must be at least 2 characters"),
    email: z
      .string()
      .min(1, "Email address is required")
      .email("Please enter a valid email address"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number (e.g. +18005550199)"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[\W_]/, "Password must contain at least one special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectAuthLoading);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false
    },
  });

  const passwordVal = watch("password") || "";

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Compute password strength dynamically
  const passwordStrength = useMemo(() => {
    if (!passwordVal) return { score: 0, label: "None", color: "bg-neutral-200" };
    
    let score = 0;
    if (passwordVal.length >= 8) score++;
    if (/[A-Z]/.test(passwordVal)) score++;
    if (/[0-9]/.test(passwordVal)) score++;
    if (/[\W_]/.test(passwordVal)) score++;

    switch (score) {
      case 1:
        return { score, label: "Weak", color: "bg-error", textColor: "text-error" };
      case 2:
        return { score, label: "Medium", color: "bg-warning", textColor: "text-warning" };
      case 3:
        return { score, label: "Good", color: "bg-success/70", textColor: "text-success-hover" };
      case 4:
        return { score, label: "Strong", color: "bg-success", textColor: "text-success" };
      default:
        return { score: 0, label: "None", color: "bg-neutral-200", textColor: "text-text-muted" };
    }
  }, [passwordVal]);

  const onSubmit = (data) => {
    dispatch(authStart());

    // Simulate luxury API creation delay
    setTimeout(() => {
      const mockUser = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        tier: "Connoisseur Club"
      };
      const mockToken = "jwt-mock-token-craveora-2026";
      
      dispatch(authSuccess({ user: mockUser, token: mockToken }));
      toast.success("Account created successfully!");
      navigate("/verify-email");
    }, 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <Card variant="glass" className="w-full border border-border/25 backdrop-blur-xl shadow-premium">
        <CardHeader className="text-center pt-8 pb-4">
          <Link to="/" className="inline-block">
            <h1 className="text-2xl font-black tracking-[0.25em] text-primary select-none font-serif">
              CRAVEORA
            </h1>
          </Link>
          <p className="text-[10px] tracking-[0.18em] font-extrabold text-text-muted uppercase mt-2">
            Create Connoisseur Account
          </p>
        </CardHeader>

        <CardBody className="px-6 md:px-8 pb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            
            {/* Name Fields Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="First Name"
                placeholder="e.g. John"
                prefix={<User className="w-4 h-4 text-text-muted" />}
                error={errors.firstName?.message}
                disabled={isLoading}
                autocomplete="given-name"
                {...register("firstName")}
              />

              <Input
                label="Last Name"
                placeholder="e.g. Doe"
                prefix={<User className="w-4 h-4 text-text-muted" />}
                error={errors.lastName?.message}
                disabled={isLoading}
                autocomplete="family-name"
                {...register("lastName")}
              />
            </div>

            {/* Email Field */}
            <Input
              label="Email Address"
              type="email"
              placeholder="e.g. john@example.com"
              prefix={<Mail className="w-4 h-4 text-text-muted" />}
              error={errors.email?.message}
              disabled={isLoading}
              autocomplete="email"
              {...register("email")}
            />

            {/* Phone Field */}
            <Input
              label="Phone Number"
              placeholder="e.g. +18005550199"
              prefix={<Phone className="w-4 h-4 text-text-muted" />}
              error={errors.phone?.message}
              disabled={isLoading}
              autocomplete="tel"
              {...register("phone")}
            />

            {/* Password Field */}
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              prefix={<Lock className="w-4 h-4 text-text-muted" />}
              error={errors.password?.message}
              disabled={isLoading}
              autocomplete="new-password"
              {...register("password")}
            />

            {/* Password Strength Meter */}
            {passwordVal && (
              <div className="flex flex-col gap-1.5 px-1 select-none">
                <div className="flex justify-between items-center text-2xs font-extrabold">
                  <span className="text-text-secondary">Password Strength</span>
                  <span className={passwordStrength.textColor}>{passwordStrength.label}</span>
                </div>
                <div className="flex gap-1 h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                  {[1, 2, 3, 4].map((level) => (
                    <div 
                      key={level} 
                      className={`flex-grow h-full rounded-full transition-all duration-300 ${
                        level <= passwordStrength.score ? passwordStrength.color : "bg-neutral-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[10px] text-text-muted leading-tight mt-0.5">
                  Require min 8 chars, 1 uppercase, 1 digit, and 1 special symbol.
                </p>
              </div>
            )}

            {/* Confirm Password Field */}
            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              prefix={<Lock className="w-4 h-4 text-text-muted" />}
              error={errors.confirmPassword?.message}
              disabled={isLoading}
              autocomplete="new-password"
              {...register("confirmPassword")}
            />

            {/* Accept Terms Checkbox */}
            <div className="px-1 flex flex-col gap-1.5 mt-1 select-none">
              <label className="flex items-start gap-2.5 cursor-pointer leading-tight mb-0">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded-sm border-border text-primary focus:ring-primary/20 accent-primary cursor-pointer mt-0.5"
                  disabled={isLoading}
                  {...register("acceptTerms")}
                />
                <span className="text-2xs font-extrabold text-text-secondary">
                  I accept the Craveora Terms of Service & Connoisseur Code of Conduct.
                </span>
              </label>
              {errors.acceptTerms && (
                <span className="text-2xs text-error font-semibold pl-6 block">
                  {errors.acceptTerms.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full mt-2 py-3.5 text-xs tracking-wider"
            >
              <span>CREATE ACCOUNT</span>
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </Button>

            {/* Link to login */}
            <p className="text-center text-xs text-text-secondary mt-2">
              Already have a membership?{" "}
              <Link
                to="/login"
                className="font-black text-primary hover:text-primary-hover transition-colors focus:outline-none"
              >
                Sign In
              </Link>
            </p>
          </form>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default RegisterPage;
