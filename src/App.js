import React, { useEffect } from 'react';
import './App.css';
import './Styles/Common.scss';
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import ItemComponent from './Component/Items/ItemComponent';
import Setting from './Component/Setting';
import Sidebar from './Component/Sidebar/Sidebar';
import Header from './Component/Navbar/Header';
import Signup from './Component/SignupLogin/Signup';
import Login from './Component/SignupLogin/Login';
import PrivateRoute from './Component/PrivateRoute';
import { PersistGate } from 'redux-persist/integration/react';

const isMobileDevice = () => {
  return window.innerWidth <= 768;
};

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === "/sign-up" || location.pathname === "/sign-in";

  useEffect(() => {
    if (isMobileDevice() && (location.pathname === '/sign-up' || location.pathname === '/sign-in')) {
      navigate('/customer', { replace: true });
    }
  }, [location]);
  return (
    <div className="main-app">
      {!isAuthPage && <Header />}

      <div className={!isAuthPage ? `main-content-scrollable` : ""}>
        <Routes>
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/customer" element={<div>Customer Landing Page</div>} /> 

          {!isAuthPage && (
            <Route element={!isMobileDevice()?<Sidebar />:<div></div>}>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <ItemComponent />
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
          <Route path="*" element={<Navigate to="/" replace />} />
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
