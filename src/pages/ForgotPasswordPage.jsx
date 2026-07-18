import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardBody, Input, Button } from "../components/ui";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
});

export const ForgotPasswordPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    
    // Simulate sending recovery email
    setTimeout(() => {
      setIsLoading(false);
      setSubmittedEmail(data.email);
      setIsSubmitted(true);
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
              key="request-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <CardHeader className="text-center pt-8 pb-4">
                <h1 className="text-xl font-black tracking-widest text-text-primary select-none uppercase font-serif">
                  Account Recovery
                </h1>
                <p className="text-[10px] tracking-[0.15em] font-extrabold text-text-muted uppercase mt-2">
                  Request Luxury Access Reset
                </p>
              </CardHeader>

              <CardBody className="px-6 md:px-8 pb-8">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  <p className="text-[11px] text-text-secondary leading-relaxed px-1 text-center">
                    Enter the email address associated with your Craveora membership. We will transmit an elite recovery link.
                  </p>

                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="e.g. aditya@craveora.com"
                    prefix={<Mail className="w-4 h-4 text-text-muted" />}
                    error={errors.email?.message}
                    disabled={isLoading}
                    autocomplete="email"
                    {...register("email")}
                  />

                  <Button
                    type="submit"
                    isLoading={isLoading}
                    className="w-full mt-2 py-3.5 text-xs tracking-wider"
                  >
                    <span>SEND RESET LINK</span>
                    {!isLoading && <ArrowRight className="w-4 h-4" />}
                  </Button>

                  <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 text-2xs font-extrabold text-text-secondary hover:text-primary transition-colors mt-2"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>RETURN TO SIGN IN</span>
                  </Link>
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
                  Transmission Sent
                </h1>
                <p className="text-[10px] tracking-[0.15em] font-extrabold text-success uppercase mt-2">
                  Link Dispatched Successfully
                </p>
              </CardHeader>

              <CardBody className="px-6 md:px-8 pb-8 text-center flex flex-col gap-6">
                <p className="text-xs text-text-secondary leading-relaxed">
                  We have successfully generated and dispatched a recovery token to <strong className="text-text-primary">{submittedEmail}</strong>.
                  It will expire in 15 minutes.
                </p>

                <div className="p-4 bg-primary-light/30 border border-primary/5 rounded-2xl text-[10px] text-text-secondary leading-normal flex items-start gap-2.5 text-left">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    If the message does not appear within 2 minutes, check your promotions, updates, or spam folders.
                  </span>
                </div>

                <div className="flex flex-col gap-3.5">
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="w-full py-3.5 border border-border text-text-secondary hover:text-primary rounded-full text-xs font-bold transition-all cursor-pointer"
                  >
                    Resend Email Link
                  </button>

                  <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 text-2xs font-extrabold text-text-secondary hover:text-primary transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>RETURN TO SIGN IN</span>
                  </Link>
                </div>
              </CardBody>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default ForgotPasswordPage;
