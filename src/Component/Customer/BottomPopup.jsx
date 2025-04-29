import React from 'react';
import { SwipeableDrawer, Box } from '@mui/material';

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
      <Box>
  
      </Box>
    </SwipeableDrawer>
  );
};

export default BottomPopup;