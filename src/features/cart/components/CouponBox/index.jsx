import React, { useState } from "react";
import { Tag, X, Check } from "lucide-react";
import { Button } from "../../../../components/ui";

export const CouponBox = ({
  couponCode,
  couponError,
  couponSuccess,
  onApply,
  onRemove
}) => {
  const [inputCode, setInputCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onApply) {
      onApply(inputCode);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-5 rounded-2xl border border-border/40 bg-surface shadow-sm select-none">
      <h4 className="flex items-center gap-2 text-sm font-bold text-text-primary">
        <Tag className="w-4 h-4 text-primary" />
        <span>Gourmet Coupon Codes</span>
      </h4>

      {couponCode ? (
        /* Active Coupon State */
        <div className="flex items-center justify-between gap-3 p-3 bg-emerald-50 border border-success-light rounded-xl">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-success text-white">
              <Check className="w-3 h-3" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-success-hover uppercase tracking-wider block">
                {couponCode}
              </span>
              {couponSuccess && (
                <span className="text-[10px] text-success font-medium">
                  {couponSuccess}
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              onRemove();
              setInputCode("");
            }}
            className="p-1 rounded-full text-text-muted hover:text-primary hover:bg-neutral-100 transition-all cursor-pointer"
            aria-label="Remove coupon code"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* Form Entry State */
        <form onSubmit={handleSubmit} className="flex gap-2">
          <label htmlFor="coupon-input" className="sr-only">
            Enter coupon code
          </label>
          <input
            id="coupon-input"
            type="text"
            placeholder="e.g. CRAVE20"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            className="flex-grow pl-4 pr-3 py-2 text-xs border border-border rounded-full bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
            autoComplete="off"
          />
          <Button type="submit" size="sm" className="px-5">
            Apply
          </Button>
        </form>
      )}

      {/* Error Feedback */}
      {couponError && !couponCode && (
        <span className="text-2xs text-error font-medium px-2">
          {couponError}
        </span>
      )}
    </div>
  );
};

export default CouponBox;
