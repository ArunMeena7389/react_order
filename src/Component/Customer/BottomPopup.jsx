import React from 'react';
import { SwipeableDrawer, Box, Typography, List, ListItemButton, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const BottomPopup = ({ open, onClose, onOpen }) => {
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
                        {[
                            'Sort',
                            'Price',
                            'Taste',
                            'Ratings',
                        ].map((text, index) => (
                            <ListItemButton key={index}>{text}</ListItemButton>
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
                            <FormControlLabel
                                value="relevance"
                                control={<Radio color="warning" />}
                                label="Relevance"
                            />
                            <FormControlLabel
                                value="distance"
                                control={<Radio />}
                                label="By Price"
                            />
                            <FormControlLabel
                                value="popularity"
                                control={<Radio />}
                                label="By Rating"
                            />
                            <FormControlLabel
                                value="costLow"
                                control={<Radio />}
                                label="Cost for two: Low to High"
                            />
                            <FormControlLabel
                                value="costHigh"
                                control={<Radio />}
                                label="Cost for two: High to Low"
                            />
                        </RadioGroup>
                    </FormControl>
                </Box>
            </Box>
        </SwipeableDrawer>
    );
};

export default BottomPopup;