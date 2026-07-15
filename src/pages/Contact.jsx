import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button, Card } from "../components/ui";

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email address";
    }
    if (!formData.message.trim()) tempErrors.message = "Message is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      toast.success("Thank you for reaching out! Our gourmet concierge will contact you shortly.");
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } else {
      toast.error("Please resolve the input errors before submitting.");
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-20 max-w-7xl">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-2xs font-extrabold text-primary uppercase tracking-widest bg-primary-light/50 px-4 py-1.5 rounded-full">
          Concierge Services
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-text-primary mt-6 tracking-tight">
          We Are At Your Service
        </h1>
        <p className="text-xs md:text-sm text-text-secondary mt-3">
          Have an inquiry about catering, bulk corporate orders, or specific dietary recommendations? Get in touch.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
        {/* Left Side: Contact Cards */}
        <div className="flex flex-col gap-6 w-full lg:col-span-1">
          {[
            {
              icon: Mail,
              title: "Email Support",
              value: "concierge@craveora.com",
              label: "Write to concierge"
            },
            {
              icon: Phone,
              title: "Direct Hotline",
              value: "+1 (800) 555-0199",
              label: "Mon - Sun: 9AM - 11PM"
            },
            {
              icon: MapPin,
              title: "Culinary Headquarters",
              value: "5th Avenue, New York, NY 10001",
              label: "Visit culinary district"
            }
          ].map((item, idx) => (
            <Card
              key={idx}
              className="p-5 border border-border/30 bg-surface shadow-2xs flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-primary-light/50 flex items-center justify-center text-primary shrink-0">
                <item.icon className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-0.5">
                <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  {item.title}
                </h4>
                <span className="text-sm font-extrabold text-text-primary mt-1">
                  {item.value}
                </span>
                <span className="text-[10px] text-text-muted mt-0.5">
                  {item.label}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Right Side: Form Inputs */}
        <Card className="p-6 md:p-8 lg:col-span-2 border border-border/30 bg-surface shadow-md w-full">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <h3 className="text-base font-extrabold text-text-primary tracking-tight">
              Send Concierge Inquiry
            </h3>

            {/* Name Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-name" className="text-xs font-semibold text-text-secondary pl-1">
                Full Name
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-4 pr-3 py-2.5 text-xs border border-border rounded-full bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                autoComplete="name"
              />
              {errors.name && (
                <span className="text-2xs text-error font-medium px-2">{errors.name}</span>
              )}
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-email" className="text-xs font-semibold text-text-secondary pl-1">
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="e.g. johndoe@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-4 pr-3 py-2.5 text-xs border border-border rounded-full bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                autoComplete="email"
              />
              {errors.email && (
                <span className="text-2xs text-error font-medium px-2">{errors.email}</span>
              )}
            </div>

            {/* Message Textarea */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-message" className="text-xs font-semibold text-text-secondary pl-1">
                Message Detail
              </label>
              <textarea
                id="contact-message"
                rows={5}
                placeholder="Describe your catering or reservation inquiry..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 text-xs border border-border rounded-2xl bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none"
              />
              {errors.message && (
                <span className="text-2xs text-error font-medium px-2">{errors.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full flex items-center justify-center gap-2 mt-2">
              <Send className="w-4 h-4" />
              <span>Send Concierge Request</span>
            </Button>

          </form>
        </Card>
      </div>

    </div>
  );
};

export default Contact;
