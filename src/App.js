import React from 'react';
import './App.css';
import './Styles/Common.scss';
import { Provider, useSelector } from "react-redux";
import store from "./Redux/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from './Common/Loader';
import {Routes, Route } from "react-router-dom";
import ItemComponent from './Component/Items/ItemComponent';
import Setting from './Component/Setting';
import Sidebar from './Component/Sidebar/Sidebar';
import Header from './Component/Navbar/Header';

const AppContent = () => {
  const loading = useSelector((state) => state.loader.loading);

  return (
<div className="main-app">
  <Header />
   {/* <Loader /> */}

  <div className="main-content-scrollable">
    <Routes>
      <Route element={<Sidebar />}>
        <Route path="/" element={<ItemComponent />} />
        <Route path="/setting" element={<Setting />} />
      </Route>
    </Routes>
  </div>
</div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
