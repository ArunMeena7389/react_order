import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';

function DailogComponent(props) {
  const { onClick, onClose, open, title } = props;
  return (
    <div>
      <Dialog open={open} onClose={onClose} fullWidth="xl">
        <DialogTitle>{title}
          <Button onClick={onClick}
            color="primary" autoFocus style={{
              float: "right",
              marginRight: "-20px",
              fontSize: "20px"
            }}>
            X
          </Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <input type='file' />
            <br />
            <br />
            <TextField label="Item" variant="outlined" fullWidth/>
            <br />
            <br />
            <TextField label="Price" variant="outlined" fullWidth/>
            <br />
            <br />
            <TextField label="Description" variant="outlined" fullWidth/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClick}
            color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DailogComponent;