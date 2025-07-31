import React from "react";
import "./App.css";
import "./Styles/Common.scss";
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import ItemTable from "./Component/Items/ItemTable";
import Setting from "./Component/Setting";
import Sidebar from "./Component/Sidebar/Sidebar";
import Header from "./Component/Navbar/Header";
import Signup from "./Component/SignupLogin/Signup";
import Login from "./Component/SignupLogin/Login";
import PrivateRoute from "./Component/PrivateRoute";
import { PersistGate } from "redux-persist/integration/react";
import CustomerMain from "./Component/Customer/CustomerMain";
import CustomerRedirectPage from "./Component/Customer/CustomerRedirectPage";
import OrderList from "./Routes/OrderList";

const isMobileDevice = () => {
  return window.innerWidth <= 768;
};

const AppContent = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/sign-up" ||
    location.pathname === "/sign-in" ||
    isMobileDevice();

  return (
    <div className="main-app">
      {!isAuthPage && <Header />}

      <div className={!isAuthPage ? `main-content-scrollable` : ""}>
        <Routes>
          {!isMobileDevice() && (
            <>
              <Route path="/sign-up" element={<Signup />} />
              <Route path="/sign-in" element={<Login />} />
            </>
          )}
          <Route path="/customer/:id" element={<CustomerRedirectPage />} />
          <Route path="/customer" element={<CustomerMain />} />

          {!isAuthPage && (
            <Route
              element={
                !isMobileDevice() || location.pathname === "/customer" ? (
                  <Sidebar />
                ) : (
                  <div></div>
                )
              }
            >
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <ItemTable />
                  </PrivateRoute>
                }
              />
              <Route
                path="/orderlist"
                element={
                  <PrivateRoute>
                    <OrderList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/setting"
                element={
                  <PrivateRoute>
                    <Setting />
                  </PrivateRoute>
                }
              />
            </Route>
          )}

          {/* Redirect unknown paths */}
          <Route
            path="*"
            element={
              <Navigate to={!isMobileDevice() ? "/" : "/customer"} replace />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
};

export default App;
