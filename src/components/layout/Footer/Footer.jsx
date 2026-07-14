import React from "react";
import { Link } from "react-router-dom";
import { navigationLinks } from "../../../constants/navigation";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo Placeholder */}
          <div>
            <Link to="/" className="text-lg font-bold">
              Craveora
            </Link>
            <p className="text-sm text-gray-500 mt-2">
              Delicious food delivered directly to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-gray-500 hover:text-black">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Placeholders */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-3">
              Social Links
            </h3>
            <div className="flex space-x-4">
              <span className="text-sm text-gray-500">Facebook Placeholder</span>
              <span className="text-sm text-gray-500">Instagram Placeholder</span>
              <span className="text-sm text-gray-500">Twitter Placeholder</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 pt-6 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Craveora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
