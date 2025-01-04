import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import DatasetIcon from "@mui/icons-material/Dataset";
import AddchartIcon from "@mui/icons-material/Addchart";
import DashboardIcon from '@mui/icons-material/Dashboard';
import WidgetsIcon from '@mui/icons-material/Widgets';
const linkStyle = {
  textDecoration: "none",
  color: "#333",
  padding: "10px",
  display: "flex",
  alignItems: "center",
  margin: "5px 0",
  backgroundColor: "#ddd",
  borderRadius: "5px",
};

const hoverStyle = {
  backgroundColor: "#ccc",
};

const activeStyle = {
  backgroundColor: "#007bff",
  color: "#fff",
};

const Sidebar = ({ isCollapsed }) => {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null); // State to track active menu

  const handleMouseEnter = (menu) => {
    setHoveredMenu(menu);
  };

  const handleMouseLeave = () => {
    setHoveredMenu(null);
  };

  const handleClick = (menu) => {
    setActiveMenu(menu); // Set clicked menu as active
  };

  return (
    <div
      style={{
        width: isCollapsed ? "45px" : "200px",
        backgroundColor: "#f8f9fa",
        padding: "10px",
        height: "100%",
        transition: "width 0.3s",
      }}
    >
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <Link
              to="/dashboard/Dashboards"
              style={
                activeMenu === "dashboard"
                  ? { ...linkStyle, ...activeStyle }
                  : hoveredMenu === "dashboard"
                  ? { ...linkStyle, ...hoverStyle }
                  : linkStyle
              }
              onMouseEnter={() => handleMouseEnter("dashboard")}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick("dashboard")} // Set active on click
            >
              {/* <DashboardIcon style={{ marginRight: isCollapsed ? "0" : "8px" }} /> */}
              <DashboardIcon style={{ marginRight: isCollapsed ? "0" : "8px" }} />
              {!isCollapsed && "Dashboard"}
            </Link>
          </li>
          <li>
            <Link
              to="studies/study"
              style={
                activeMenu === "studies"
                  ? { ...linkStyle, ...activeStyle }
                  : hoveredMenu === "studies"
                  ? { ...linkStyle, ...hoverStyle }
                  : linkStyle
              }
              onMouseEnter={() => handleMouseEnter("studies")}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick("studies")} // Set active on click
            >
              <AddchartIcon style={{ marginRight: isCollapsed ? "0" : "8px" }} />
              {!isCollapsed && "Studies"}
            </Link>
          </li>
          <li>
            <Link
              to="dataset"
              style={
                activeMenu === "dataset"
                  ? { ...linkStyle, ...activeStyle }
                  : hoveredMenu === "dataset"
                  ? { ...linkStyle, ...hoverStyle }
                  : linkStyle
              }
              onMouseEnter={() => handleMouseEnter("dataset")}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick("dataset")} // Set active on click
            >
              <DatasetIcon style={{ marginRight: isCollapsed ? "0" : "8px" }} />
              {!isCollapsed && "Dataset"}
            </Link>
          </li>
          <li>
          <Link
              to="widget"
              style={
                activeMenu === "widget"
                  ? { ...linkStyle, ...activeStyle }
                  : hoveredMenu === "widget"
                  ? { ...linkStyle, ...hoverStyle }
                  : linkStyle
              }
              onMouseEnter={() => handleMouseEnter("widget")}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick("widget")} // Set active on click
            >
              <WidgetsIcon style={{ marginRight: isCollapsed ? "0" : "8px" }} />
              {!isCollapsed && "widget"}
            </Link>

          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
