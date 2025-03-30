import React from 'react';
import Navbar from './Component/Navbar/Navbar';
import Header from './Component/Header/Header';
import './App.css';
import { Provider } from "react-redux";
import store from "./Redux/store";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <Provider store={store}>
            <Navbar />
            <div style={{
                display: 'inline'
            }}>
                <Header />
            </div>
        </Provider>
    );
};

export default App;
