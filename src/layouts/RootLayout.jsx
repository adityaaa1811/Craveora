import React from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <header>
        <nav>Navbar Placeholder</nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>Footer Placeholder</p>
      </footer>
    </div>
  );
};

export default RootLayout;
