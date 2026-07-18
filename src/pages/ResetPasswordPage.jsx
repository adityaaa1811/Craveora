import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardBody, Input, Button } from "../components/ui";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[\W_]/, "Password must contain at least one special character"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const ResetPasswordPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const passwordVal = watch("password") || "";

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

  const onSubmit = () => {
    setIsLoading(true);
    
    // Simulate updating password
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast.success("Security credentials updated!");
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card variant="glass" className="w-full border border-border/25 backdrop-blur-xl shadow-premium">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="reset-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <CardHeader className="text-center pt-8 pb-4">
                <h1 className="text-xl font-black tracking-widest text-text-primary select-none uppercase font-serif">
                  Reset Password
                </h1>
                <p className="text-[10px] tracking-[0.15em] font-extrabold text-text-muted uppercase mt-2">
                  Update Security Credentials
                </p>
              </CardHeader>

              <CardBody className="px-6 md:px-8 pb-8">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                  <Input
                    label="New Password"
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
                    </div>
                  )}

                  <Input
                    label="Confirm New Password"
                    type="password"
                    placeholder="••••••••"
                    prefix={<Lock className="w-4 h-4 text-text-muted" />}
                    error={errors.confirmPassword?.message}
                    disabled={isLoading}
                    autocomplete="new-password"
                    {...register("confirmPassword")}
                  />

                  <Button
                    type="submit"
                    isLoading={isLoading}
                    className="w-full mt-4 py-3.5 text-xs tracking-wider"
                  >
                    <span>RESTORE CREDENTIALS</span>
                    {!isLoading && <ArrowRight className="w-4 h-4" />}
                  </Button>
                </form>
              </CardBody>
            </motion.div>
          ) : (
            <motion.div
              key="success-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <CardHeader className="text-center pt-8 pb-4 flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-success-light text-success flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h1 className="text-xl font-black tracking-widest text-text-primary select-none uppercase font-serif">
                  Access Restored
                </h1>
                <p className="text-[10px] tracking-[0.15em] font-extrabold text-success uppercase mt-2">
                  Password Updated Successfully
                </p>
              </CardHeader>

              <CardBody className="px-6 md:px-8 pb-8 text-center flex flex-col gap-6">
                <p className="text-xs text-text-secondary leading-relaxed">
                  Your luxury access credentials have been securely updated. You may now proceed to authenticate.
                </p>

                <Link
                  to="/login"
                  className="w-full"
                >
                  <Button className="w-full py-3.5 text-xs tracking-wider">
                    <span>PROCEED TO SIGN IN</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardBody>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default ResetPasswordPage;
