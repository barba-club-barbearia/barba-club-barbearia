"use client";

import React from "react";
import Header from "../Header";
import { NavBar } from "../Nav";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen bg-black">
      <Header />

      {/* Main Content - Now uses absolute positioning to fill remaining space */}
      <main className="absolute top-[77px] bottom-[64px] left-0 right-0 overflow-y-auto">
        <div>{children}</div>
      </main>

      {/* Bottom Navigation */}
      <NavBar />
    </div>
  );
};

export default AppLayout;
