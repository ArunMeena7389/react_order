import React from 'react';
import './Navbar.css'; // Import the CSS for styling
import { Button } from '@material-ui/core';
import DailogComponent from '../../Common/DailogComponent';

const Navbar = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickToOpen = () => {
        setOpen(true);
    };
    const handleToClose = () => {
        setOpen(false);
    };


    return (
        <nav className="navbar">
            <div style={{
                display: "inline-flex"
            }}>
                <div className="logo">Logo</div>
                <Button style={{
                    marginLeft: "20px",
                    padding: "5px 25px"
                }} color="inherit" variant="outlined" onClick={handleClickToOpen}>+Add</Button>
                <DailogComponent open={open} onClick={handleToClose} onClose={handleToClose} title={"How are you?"} text={" I am Good, Hope the same for you!"} />
            </div>
            <button className="logout-button">
                <img src={"https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"} alt="Profile" className="profile-logo" />
                Logout
            </button>
        </nav>
    );
};

export default Navbar;