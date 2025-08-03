// Sidebar.jsx
import React from "react";
import "./Sidebar.scss";
import { NavLink, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="layout">
      {/* Sidebar */}
      <div className="sidebar">
        <NavLink
          to="/merchant"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/merchant/orderlist"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Order List
        </NavLink>

        <NavLink
          to="/merchant/setting"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Setting
        </NavLink>

        <NavLink
          to="/customer"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Customer View
        </NavLink>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-scroll-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
