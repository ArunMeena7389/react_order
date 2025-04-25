import React, { useEffect, useState } from 'react';
import './Header.scss';
// import { Button } from '@material-ui/core';
import DailogComponent from '../../Common/DailogComponent';
import { Autocomplete, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getmenueDataAction, selectTasteAction } from '../../Redux/Action';
import { useDispatch, useSelector } from 'react-redux';

let initialPayload = {
    "fields": ["name", "price", "image_url", "taste", "description"],
    "filter": {
    }
}

const tasteDropdownData = [
    { id: "1", label: 'Sweet', title: 'Sweet' },
    { id: "2", label: 'Spicy', title: 'Spicy', },
    { id: "3", label: 'Sour', title: 'Sour' },
];
const Header = () => {
    const [open, setOpen] = React.useState(false);
    const selectorDataTaste = useSelector((state) => state.taste.data);
    const [selectedData, setSelectedData] = useState(selectorDataTaste);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickToOpen = () => {
        setOpen(true);
    };
    const handleToClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const matched = tasteDropdownData?.filter(option =>
            selectorDataTaste.some(selected => selected.id === option.id)
        );
        setSelectedData(matched);
        // eslint-disable-next-line
    }, [selectorDataTaste.data, tasteDropdownData]);

    return (
        <nav className="header">
            <div style={{
                display: "inline-flex"
            }}>
                <div className="d-flex justify-content-center align-items-center rounded-circle bg-secondary text-white fw-bold"
                    style={{ width: '40px', height: '40px', fontSize: '1rem' }}
                >
                    αɱ
                </div>
                <Button style={{
                    marginLeft: "20px",
                    padding: "5px 25px"
                }} color="inherit" variant="outlined" onClick={handleClickToOpen}>+Add</Button>
                {open && <DailogComponent open={open} onClick={handleToClose} onClose={handleToClose} title={"Add a item"} text={" I am Good, Hope the same for you!"} />}
            </div>
            <div className='d-flex m-2' style={{ gap: 10 }}>
                <div>
                    <Autocomplete
                        multiple
                        limitTags={1}
                        id="multiple-limit-tags"
                        options={tasteDropdownData}
                        getOptionLabel={(option) => option.title}
                        value={selectedData}
                        renderInput={(params) => (
                            <TextField {...params} placeholder="Taste" sx={{
                                '& .MuiInputBase-root': {
                                    backgroundColor: 'white',
                                    color: 'black',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#ccc',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#888',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#1976d2', // primary blue on focus
                                },
                                '& label': {
                                    color: '#555',
                                },
                                '& label.Mui-focused': {
                                    color: '#1976d2',
                                },
                            }} />
                        )}
                        sx={{ width: '500px' }}

                        onChange={(event, newValue) => {
                            if (newValue?.length) {
                                initialPayload.filter.taste = newValue.map(dt => { return dt?.title?.toLowerCase() });
                            } else {
                                initialPayload.filter = {}
                            }
                            dispatch(getmenueDataAction(initialPayload));
                            setSelectedData(newValue);
                            dispatch(selectTasteAction(newValue));

                        }}
                    />
                </div>
                <button className="logout-button" onClick={() => {
                    localStorage.removeItem('token');
                    navigate("/sign-in");

                }}
                >
                    <img src={"https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"} alt="Profile" className="profile-logo" />
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Header;