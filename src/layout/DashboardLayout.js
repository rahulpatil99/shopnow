import React from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
      <DashboardHeader />
      <div style={{ display: "flex" }}>
        <DashboardSidebar />
        <main style={{ flexGrow: 1 }}>
          <Outlet /> {/* This will render the current route's component */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
