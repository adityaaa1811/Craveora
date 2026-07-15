import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "react-hot-toast";
import { navigationLinks } from "../../../constants/navigation";
import { Button } from "../../ui";

export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Thank you for subscribing to Craveora newsletters!");
    setEmail("");
  };

  return (
    <footer className="w-full bg-surface-dark border-t border-border/40 py-12 md:py-16 mt-auto text-text-secondary select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand & Narrative */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="text-xl md:text-2xl font-black text-primary tracking-tight">
              Craveora
            </Link>
            <p className="text-xs md:text-sm text-text-muted leading-relaxed">
              Curating high-end restaurant culinary experiences, crafted by master chefs and delivered with meticulous care directly to your table.
            </p>
            <div className="flex gap-4 mt-2">
              <a
                href="#facebook"
                className="p-2 rounded-full hover:bg-neutral-100 hover:text-primary transition-all text-text-secondary"
                aria-label="Facebook Profile"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a
                href="#instagram"
                className="p-2 rounded-full hover:bg-neutral-100 hover:text-primary transition-all text-text-secondary"
                aria-label="Instagram Profile"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href="#twitter"
                className="p-2 rounded-full hover:bg-neutral-100 hover:text-primary transition-all text-text-secondary"
                aria-label="Twitter Profile"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold text-text-primary tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {navigationLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-xs md:text-sm text-text-muted hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold text-text-primary tracking-wider uppercase">
              Contact Info
            </h3>
            <ul className="flex flex-col gap-3 text-xs md:text-sm text-text-muted leading-relaxed">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>concierge@craveora.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+1 (800) 555-0199</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>5th Avenue, Culinary District, NY 10001</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Input */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold text-text-primary tracking-wider uppercase">
              Newsletter
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Subscribe to unlock chef recommendation updates and gourmet discounts.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <label htmlFor="footer-newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="footer-newsletter"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow pl-3 pr-2 py-2 text-xs border border-border rounded-full bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                autoComplete="off"
              />
              <Button type="submit" size="sm" className="px-3">
                <Send className="w-3.5 h-3.5" />
              </Button>
            </form>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-border/40 text-center select-none text-[11px] text-text-muted">
          <p>
            &copy; {new Date().getFullYear()} Craveora. Designed with culinary passion. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
