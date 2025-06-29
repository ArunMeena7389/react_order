import React from "react";
import "./Sidebar.scss";
import { NavLink, Outlet } from "react-router-dom";
import { Grid, Paper } from "@mui/material";

const Sidebar = () => {
  return (
    <Grid container spacing={2}>
      {/* Sidebar */}
      <Grid item xs={12} sm={3} md={2}>
        <Paper elevation={3}>
          <div className="sidebar mt-5">
            <div>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link deactive"
                }
              >
                <p>Home</p>
              </NavLink>
              <NavLink
                to="/orderlist"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link deactive"
                }
              >
                <p>Order List</p>
              </NavLink>
              <NavLink
                to="/setting"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link deactive"
                }
              >
                <p>Setting</p>
              </NavLink>
              <NavLink
                to="/customer"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link deactive"
                }
              >
                <p>Customer View</p>
              </NavLink>
            </div>
          </div>
        </Paper>
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} sm={9} md={10}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Sidebar;
