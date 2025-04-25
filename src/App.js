import React from 'react';
import './App.css';
import './Styles/Common.scss';
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import ItemComponent from './Component/Items/ItemComponent';
import Setting from './Component/Setting';
import Sidebar from './Component/Sidebar/Sidebar';
import Header from './Component/Navbar/Header';
import Signup from './Component/SignupLogin/Signup';
import Login from './Component/SignupLogin/Login';
import PrivateRoute from './Component/PrivateRoute';
import { PersistGate } from 'redux-persist/integration/react';

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/sign-up" || location.pathname === "/sign-in";

  return (
    <div className="main-app">
      {!isAuthPage && <Header />}

      <div className={!isAuthPage ? `main-content-scrollable` : ""}>
        <Routes>
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Login />} />

          {!isAuthPage && (
            <Route element={<Sidebar />}>
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
