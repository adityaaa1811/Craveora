import React from "react";

export const Skeleton = ({ className = "" }) => {
  return (
    <div className={`animate-pulse bg-slate-850 rounded-lg ${className}`} />
  );
};

export const ProductSkeleton = () => {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex flex-col gap-4 select-none">
      <Skeleton className="w-full h-48 rounded-xl" />
      <Skeleton className="w-2/3 h-5" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-full h-4" />
      <div className="flex justify-between items-center mt-2">
        <Skeleton className="w-1/3 h-6" />
        <Skeleton className="w-1/4 h-8 rounded-lg" />
      </div>
    </div>
  );
};

export const MenuSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
    </div>
  );
};

export default Skeleton;
