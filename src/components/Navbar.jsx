import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/authSlice";
import { Tooltip } from "@mui/material";

const Navbar = ({ toggleSidebar, isCollapsed }) => {
  const [showProfile, setShowProfile] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const username = useSelector((state) => state.auth.user?.username);

  const toggleProfile = () => {
    setShowProfile((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target) && !event.target.closest("#person-icon")) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        backgroundColor: "#506edc",
        color: "white",
        height: "50px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Menu Toggle Button */}
        <div
          style={{
            color: "white",
            padding: "10px 0",
            cursor: "pointer",
            marginRight: "20px",
          }}
          onClick={toggleSidebar}
        >
          <MenuIcon fontSize="large" />
        </div>
        <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>Data Visualization</h1>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "15px", fontSize: "18px" }}>
          Welcome, {username || "Guest"}
        </span>

        <Tooltip title="Profile" arrow>
          <PersonIcon
            id="person-icon"
            onClick={toggleProfile}
            style={{
              cursor: "pointer",
              fontSize: "36px",
              color: "white",
            }}
          />
        </Tooltip>

        {showProfile && (
          <div
            ref={profileRef}
            style={{
              position: "absolute",
              top: "55px",
              right: "20px",
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "15px",
              zIndex: 1000,
            }}
          >
            <button
              style={{
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                fontSize: "14px",
              }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
