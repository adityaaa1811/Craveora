import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-background px-4 py-12 overflow-hidden">
      {/* Soft luxury ambient highlights */}
      <div className="absolute -top-1/4 -left-1/4 w-[70vw] h-[70vw] rounded-full bg-primary/4 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-1/4 -right-1/4 w-[70vw] h-[70vw] rounded-full bg-secondary/8 blur-[140px] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
