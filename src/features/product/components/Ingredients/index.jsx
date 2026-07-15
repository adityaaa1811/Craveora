import React from "react";
import { Check } from "lucide-react";

export const Ingredients = ({ ingredients }) => {
  if (!ingredients || ingredients.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-base font-bold text-text-primary">
        Key Ingredients
      </h4>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ingredients.map((ingredient, index) => (
          <li
            key={index}
            className="flex items-center gap-3 p-3 rounded-xl border border-border/30 bg-surface shadow-2xs hover:border-primary/10 transition-colors"
          >
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 shrink-0">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span className="text-xs font-semibold text-text-secondary">
              {ingredient}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ingredients;
