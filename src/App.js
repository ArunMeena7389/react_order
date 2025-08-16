import React, { lazy, Suspense } from "react";
import "./App.css";
import "./Styles/Common.scss";
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import PrivateRoute from "./Component/PrivateRoute";
import { PersistGate } from "redux-persist/integration/react";
import CustomFallbackUi from "./Common/CustomFallbackUI";
import Profile from "./Component/Profile/Profile";
const ViewStream = lazy(() => import("./Stream/ViewStream"));
const AddStream = lazy(() => import("./Stream/AddStream"));
const ItemTable = lazy(() => import("./Component/Items/ItemTable"));
const Setting = lazy(() => import("./Component/Setting"));
const Sidebar = lazy(() => import("./Component/Sidebar/Sidebar"));
const Header = lazy(() => import("./Component/Navbar/Header"));
const Signup = lazy(() => import("./Component/SignupLogin/Signup"));
const Login = lazy(() => import("./Component/SignupLogin/Login"));
const CustomerMain = lazy(() => import("./Component/Customer/CustomerMain"));
const CustomerRedirectPage = lazy(() =>
  import("./Component/Customer/CustomerRedirectPage")
);
const OrderList = lazy(() => import("./Routes/OrderList/OrderList"));
const ItemCreateEdit = lazy(() => import("./Component/Items/ItemCreateEdit"));

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
      <Suspense fallback={<CustomFallbackUi />}>
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
             <Route path="/add" element={<AddStream/>} />
        <Route path="/view" element={<ViewStream />} />

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
                  path="/merchant"
                  element={
                    <PrivateRoute>
                      <ItemTable />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/merchant/orderlist"
                  element={
                    <PrivateRoute>
                      <OrderList />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/merchant/setting"
                  element={
                    <PrivateRoute>
                      <Setting />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/merchant/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/merchant/item"
                  element={
                    <PrivateRoute>
                      <ItemCreateEdit />
                    </PrivateRoute>
                  }
                />
              </Route>
            )}

            {/* Redirect unknown paths */}
            <Route
              path="*"
              element={
                <Navigate
                  to={!isMobileDevice() ? "/merchant" : "/customer"}
                  replace
                />
              }
            />
          </Routes>
        </div>
      </Suspense>
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
