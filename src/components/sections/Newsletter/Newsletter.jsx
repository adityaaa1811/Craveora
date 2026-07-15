import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../../ui";

/**
 * Newsletter Section
 * Integrates an elegant form structure offering subscription to the brand newsletter.
 */
export const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Welcome to the club! Check your inbox for gourmet updates.");
    setEmail("");
  };

  return (
    <section
      id="newsletter"
      className="w-full py-20 md:py-28 border-t border-border/30 bg-cover bg-center select-none relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 248, 243, 0.93), rgba(255, 248, 243, 0.93)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop')"
      }}
    >
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        
        {/* Section Header */}
        <span className="text-2xs uppercase tracking-widest font-extrabold block text-primary mb-2">
          Gourmet Insights
        </span>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-text-primary mb-4">
          Join The Craveora Club
        </h2>
        <p className="text-xs md:text-sm text-text-secondary mb-8 max-w-lg mx-auto leading-relaxed">
          Subscribe to receive exclusive seasonal menu drops, chef insights, secret recipes, and priority private event bookings.
        </p>

        {/* Subscription Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <div className="flex-grow">
            <label htmlFor="newsletter-email" className="sr-only">
              Email Address
            </label>
            <input
              type="email"
              id="newsletter-email"
              placeholder="Enter your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3.5 text-xs border border-border rounded-full bg-surface/90 text-text-primary placeholder-text-muted focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-2xs"
              autoComplete="email"
            />
          </div>
          <Button
            type="submit"
            className="px-8 py-3.5 rounded-full flex justify-center shrink-0 shadow"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
