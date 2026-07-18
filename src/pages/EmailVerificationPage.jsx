import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { ShieldCheck, Mail, RefreshCw, Compass } from "lucide-react";
import { Card, CardHeader, CardBody, Button } from "../components/ui";

export const EmailVerificationPage = () => {
  const [isResending, setIsResending] = useState(false);

  const handleResend = () => {
    setIsResending(true);
    
    // Simulate sending email verification code again
    setTimeout(() => {
      setIsResending(false);
      toast.success("Verification link dispatched to your inbox.", {
        icon: "📧"
      });
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const circleVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <Card variant="glass" className="w-full border border-border/25 backdrop-blur-xl shadow-premium text-center">
        <CardHeader className="pt-8 pb-4 flex flex-col items-center select-none">
          <div className="relative mb-4 flex justify-center">
            {/* Pulsing ring */}
            <motion.div 
              animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0, 0.25] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full border-2 border-primary w-16 h-16 m-auto"
            />
            
            <motion.div
              variants={circleVariants}
              className="w-16 h-16 rounded-full bg-primary-light text-primary flex items-center justify-center relative"
            >
              <Mail className="w-7 h-7 stroke-[1.8]" />
            </motion.div>
          </div>
          
          <h1 className="text-xl font-black tracking-widest text-text-primary uppercase font-serif">
            Verify Membership
          </h1>
          <p className="text-[10px] tracking-[0.15em] font-extrabold text-text-muted uppercase mt-2">
            Confirm Your Email Address
          </p>
        </CardHeader>

        <CardBody className="px-6 md:px-8 pb-8 flex flex-col gap-6">
          <motion.p variants={itemVariants} className="text-xs text-text-secondary leading-relaxed">
            Welcome to Craveora! A luxury verification link was sent to your email. Click the validation link inside the email to activate your premium status.
          </motion.p>

          <motion.div 
            variants={itemVariants} 
            className="p-4 bg-primary-light/30 border border-primary/5 rounded-2xl text-[10px] text-text-secondary leading-normal flex items-start gap-2.5 text-left select-none"
          >
            <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>
              Activating your email unlocks high-priority valet handovers, exclusive masterclass invitations, and access to premium dining collections.
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-3.5">
            <Link to="/menu" className="w-full">
              <Button className="w-full py-3.5 text-xs tracking-wider">
                <span>EXPLORE MENU</span>
                <Compass className="w-4 h-4" />
              </Button>
            </Link>

            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="w-full py-3.5 border border-border text-text-secondary hover:text-primary rounded-full text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isResending ? "animate-spin" : ""}`} />
              <span>Resend Verification Email</span>
            </button>
          </motion.div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default EmailVerificationPage;
