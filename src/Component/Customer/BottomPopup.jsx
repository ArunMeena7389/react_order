import React, { useState } from 'react';
import { SwipeableDrawer, Box, Typography, List, ListItemButton, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const staticPriceData = [
    { id: 1, label: '0 - 100 Rs.', value: "price100" },
    { id: 2, label: '100 - 200 Rs.', value: "price200" },
    { id: 3, label: '200 - 300 Rs.', value: "price300" },
    { id: 5, label: 'above 300 Rs.', value: "pricePlush" },

];

const staticSortData = [
    { id: 1, label: 'Relevance', value: "relevance" },
    { id: 2, label: 'By Price', value: "price" },
    { id: 3, label: 'By Rating', value: "rating" },
    { id: 5, label: 'Cost for two: Low to High', value: "costLow" },
    { id: 6, label: 'Cost for two: High to Low', value: "costHigh" },

];

const staticCategoryData = [
    { id: 1, label: 'Sweet', value: "sweet" },
    { id: 2, label: 'Spicy', value: "spicy" },
    { id: 3, label: 'Normal', value: "normal" },
    { id: 5, label: 'Veg', value: "veg" },
    { id: 6, label: 'Non-Veg', value: "nonVeg" },

];

const BottomPopup = ({ open, onClose, onOpen }) => {
    const [filterName, setFilterName] = useState([
        { id: 1, name: 'Sort', isActive: false },
        { id: 2, name: 'Price', isActive: false },
        { id: 3, name: 'Taste', isActive: false },
    ]);

    const [filterList, setFilterList] = useState(staticSortData);

    const onHandleClickFilter = (text) => {
        setFilterName(prev =>
            prev.map(item =>
                item.id === text.id
                    ? { ...item, isActive: true }
                    : { ...item, isActive: false }
            )
        );
        if (text.id === 1) setFilterList(staticSortData);
        if (text.id === 2) setFilterList(staticPriceData);
        if (text.id === 3) setFilterList(staticCategoryData);
    }
    return (
        <SwipeableDrawer
            anchor="bottom"
            open={open}
            onClose={onClose}
            onOpen={onOpen}
            PaperProps={{
                sx: {
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    padding: 2,
                    maxHeight: '80vh',
                    height: '80vh',
                },
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 500,
                    bgcolor: '#fff',
                    display: 'flex',
                    borderRadius: '12px 12px 0 0',
                    overflow: 'hidden',
                }}
            >
                {/* Sidebar Left */}
                <Box sx={{ width: '40%', borderRight: '2px solid #f0f0f0' }}>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h6" fontWeight="bold">
                            Filter
                        </Typography>
                    </Box>
                    <List>
                        {filterName.map((text, index) => (
                            <ListItemButton key={index} onClick={() => {
                                onHandleClickFilter(text)
                            }} style={{ background: `${text.isActive ? "#E8E8E8" : ""}` }}>{text.name}</ListItemButton>
                        ))}
                    </List>
                </Box>

                {/* Main Content Right */}
                <Box sx={{ width: '60%', p: 2, position: 'relative' }}>
                    <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                        <CloseIcon onClick={onClose} style={{ cursor: 'pointer' }} />
                    </Box>

                    <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                        SORT BY
                    </Typography>

                    <FormControl component="fieldset">
                        <RadioGroup defaultValue="relevance" name="sort-options">
                            {filterList.map((dt, index) => (
                                <FormControlLabel
                                    key={index}
                                    value={dt.value}
                                    control={<Radio color={dt.id === 1 ? "warning" : "primary"} />}
                                    label={dt.label}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Box>
            </Box>
        </SwipeableDrawer>
    );
};

export default BottomPopup;