import React from "react";
import { Clock, ChefHat, CheckCircle2, XCircle } from "lucide-react";

export const DeliveryInfo = ({ deliveryInfo }) => {
  if (!deliveryInfo) return null;
  const { prepTime, availability, estimatedDelivery } = deliveryInfo;

  const isAvailable = availability?.toLowerCase() === "in stock";

  return (
    <div className="grid grid-cols-3 gap-4 border border-border/40 bg-surface p-4 rounded-2xl shadow-sm">
      {/* Availability */}
      <div className="flex flex-col items-center justify-center text-center p-2 border-r border-border-light/80">
        {isAvailable ? (
          <CheckCircle2 className="w-5 h-5 text-success mb-2" />
        ) : (
          <XCircle className="w-5 h-5 text-error mb-2" />
        )}
        <span className="text-2xs text-text-muted font-bold uppercase tracking-wider">
          Status
        </span>
        <span className="text-xs font-extrabold text-text-primary mt-0.5">
          {availability || "Unavailable"}
        </span>
      </div>

      {/* Prep Time */}
      <div className="flex flex-col items-center justify-center text-center p-2 border-r border-border-light/80">
        <ChefHat className="w-5 h-5 text-primary mb-2" />
        <span className="text-2xs text-text-muted font-bold uppercase tracking-wider">
          Preparation
        </span>
        <span className="text-xs font-extrabold text-text-primary mt-0.5">
          {prepTime || "15 mins"}
        </span>
      </div>

      {/* Delivery Estimate */}
      <div className="flex flex-col items-center justify-center text-center p-2">
        <Clock className="w-5 h-5 text-secondary mb-2" />
        <span className="text-2xs text-text-muted font-bold uppercase tracking-wider">
          Delivery
        </span>
        <span className="text-xs font-extrabold text-text-primary mt-0.5">
          {estimatedDelivery || "30 mins"}
        </span>
      </div>
    </div>
  );
};

export default DeliveryInfo;
