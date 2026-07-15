import React, { useState } from "react";
import { MapPin, X, Check, Clock } from "lucide-react";
import { Button } from "../../../../components/ui";

export const DeliveryEstimator = ({
  pincode,
  pincodeError,
  pincodeSuccess,
  deliveryEstimate,
  onCheck,
  onClear
}) => {
  const [inputPin, setInputPin] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onCheck) {
      onCheck(inputPin);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-5 rounded-2xl border border-border/40 bg-surface shadow-sm select-none">
      <h4 className="flex items-center gap-2 text-sm font-bold text-text-primary">
        <MapPin className="w-4 h-4 text-primary" />
        <span>Delivery Pincode Checker</span>
      </h4>

      {pincode && pincodeSuccess ? (
        /* Verified Pincode State */
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3 p-3 bg-primary-light/40 border border-secondary/20 rounded-xl">
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white">
                <Check className="w-3 h-3" />
              </div>
              <span className="font-extrabold text-primary">
                Pincode: {pincode}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                onClear();
                setInputPin("");
              }}
              className="p-1 rounded-full text-text-muted hover:text-primary hover:bg-neutral-100 transition-all cursor-pointer"
              aria-label="Clear pincode estimate"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {deliveryEstimate && (
            <div className="flex items-start gap-2.5 px-3 py-2 text-xs text-text-secondary leading-normal bg-neutral-50 rounded-xl">
              <Clock className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <span>{deliveryEstimate}</span>
            </div>
          )}
        </div>
      ) : (
        /* Pin Entry State */
        <form onSubmit={handleSubmit} className="flex gap-2">
          <label htmlFor="pincode-input" className="sr-only">
            Enter shipping pincode
          </label>
          <input
            id="pincode-input"
            type="text"
            placeholder="e.g. 90210"
            value={inputPin}
            onChange={(e) => setInputPin(e.target.value)}
            className="flex-grow pl-4 pr-3 py-2 text-xs border border-border rounded-full bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
            maxLength={6}
            autoComplete="off"
          />
          <Button type="submit" size="sm" className="px-5">
            Check
          </Button>
        </form>
      )}

      {/* Error Feedback */}
      {pincodeError && !pincode && (
        <span className="text-2xs text-error font-medium px-2">
          {pincodeError}
        </span>
      )}
    </div>
  );
};

export default DeliveryEstimator;
