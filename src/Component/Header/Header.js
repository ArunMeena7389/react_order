import React from 'react';
import './Header.css'; // Import the CSS for styling
// import Cart from '../../Cart';
import { Link, Route, Routes } from 'react-router-dom';
import ItemComponent from '../Items/ItemComponent';
import { Grid, Paper } from '@mui/material';

const Header = () => {
    return (
        <Grid container spacing={2}>
            {/* Sidebar */}
            <Grid item xs={12} sm={3} md={2} style={{
            }}>
                <Paper elevation={3} style={{ colorInterpolation: "red" }}>
                    <div class="sidebar mt-5">
                        <ul>
                            <li><Link href="#">Home</Link></li>
                            <li><Link href="#">About</Link></li>
                            <li><Link href="#">Services</Link></li>
                            <li><Link href="#">Contact</Link></li>
                        </ul>
                    </div>
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
