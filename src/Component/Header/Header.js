import React from 'react';
import './Header.css'; // Import the CSS for styling
import Cart from '../../Cart';
import { Link, Route, Routes } from 'react-router-dom';
import ItemComponent from '../Items/ItemComponent';
import { Grid, Paper } from '@mui/material';

const Header = () => {
    return (
        <Grid container spacing={2}>
            {/* Sidebar */}
            <Grid item xs={12} sm={3} md={2} style={{
            }}>
                <Paper elevation={3} className="sidebar">
                    <nav className="nav">
                        <ul>
                            <li>
                                <Link to="/">Item</Link>
                            </li>
                            <li>
                                <Link to="/order">Order</Link>
                            </li>
                            <li>
                                <Link to="/setting">Setting</Link>
                            </li>
                            <li>
                                <Cart />
                            </li>
                        </ul>
                    </nav>
                </Paper>
            </Grid>

            {/* Main Content */}
            <Grid item xs={12} sm={9} md={10}>
                    <Routes>
                        <Route path="/" element={<ItemComponent />} />
                    </Routes>
                
            </Grid>
        </Grid>
    );
};

export default Header;
