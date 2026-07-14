import React from "react";

/**
 * Newsletter Section
 * Integrates an elegant form structure offering subscription to the brand newsletter.
 */
const Newsletter = () => {
  return (
    <section id="newsletter" className="w-full py-16 md:py-24 border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Section Header */}
        <span className="text-xs uppercase tracking-widest font-semibold block text-gray-500 mb-2">
          Gourmet Insights
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
          Join The Craveora Club
        </h2>
        <p className="text-sm text-gray-600 mb-8 max-w-lg mx-auto">
          Subscribe to receive exclusive seasonal menu drops, chef insights, secret recipes, and priority private event bookings.
        </p>

        {/* Subscription Form Structure (No business logic) */}
        <form
          onSubmit={(e) => e.preventDefault()}
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
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black text-sm"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 border border-black bg-black text-white hover:bg-white hover:text-black font-semibold text-sm transition-colors text-center"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
