import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Navbar at the top, full width */}
      <Navbar toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />
      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar on the left */}
        <Sidebar isCollapsed={isCollapsed} />
        {/* Main content area */}
        <div style={{ flex: 1, overflowY: "hidden", padding: "10px 20px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
