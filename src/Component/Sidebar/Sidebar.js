import React from "react";
import "./Sidebar.scss";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const RouteList = [
  { id: "1", name: "Home", redirect_url: "/merchant" },
  { id: "2", name: "Packages", redirect_url: "/merchant/package" },
  { id: "3", name: "Order List", redirect_url: "/merchant/orderlist" },
  { id: "4", name: "Setting", redirect_url: "/merchant/setting" },
  { id: "5", name: "Customer View", redirect_url: "/customer" },
  { id: "6", name: "Camera", redirect_url: "/add" },
];

const Sidebar = () => {
  const { pathname } = useLocation();

  const isHomeActive =
    pathname === "/merchant" || pathname.startsWith("/merchant/item");

  const getLinkClass = (item) => {
    if (item.redirect_url === "/merchant") {
      return isHomeActive ? "nav-link active" : "nav-link";
    }
    return pathname === item.redirect_url ? "nav-link active" : "nav-link";
  };

  return (
    <div className="layout">
      <div className="sidebar">
        {RouteList.map((item) => (
          <NavLink
            key={item.id}
            to={item.redirect_url}
            className={() => getLinkClass(item)}
          >
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className="main-content">
        <div className="content-scroll-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
