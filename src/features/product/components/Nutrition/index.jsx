import React from "react";

export const Nutrition = ({ nutrition }) => {
  if (!nutrition) return null;
  const { calories, fat, protein, carbs } = nutrition;

  const items = [
    { label: "Calories", value: calories, color: "text-primary bg-primary-light" },
    { label: "Protein", value: protein, color: "text-emerald-700 bg-emerald-50" },
    { label: "Fats", value: fat, color: "text-amber-700 bg-amber-50" },
    { label: "Carbs", value: carbs, color: "text-blue-700 bg-blue-50" }
  ];

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-base font-bold text-text-primary">
        Nutritional Information
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 rounded-2xl border border-border/30 bg-surface shadow-2xs text-center"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs mb-3 ${item.color}`}>
              {item.value ? item.value.replace(/[^0-9]/g, "") : "--"}
            </div>
            <span className="text-2xs text-text-muted font-bold uppercase tracking-wider">
              {item.label}
            </span>
            <span className="text-sm font-extrabold text-text-primary mt-0.5">
              {item.value || "0g"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nutrition;
