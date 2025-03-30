import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input } from '@material-ui/core';
import { addMenuDataAction, getmenueDataAction } from '../Redux/Action';
import { useDispatch } from 'react-redux';

function DailogComponent({ onClick, ...props }) {
  const dispatch = useDispatch()
  const { onClose, open, title } = props;
  const [stateValue, setStateValue] = useState({
    image: {},
    name: "",
    price: "",
    taste: "",
    description: ""

  })
  const onClickSave = () => {
    dispatch(addMenuDataAction(stateValue));
    onClick();
    dispatch(getmenueDataAction());
  }
  const handleOnChange = (val, type) => {
    setStateValue((prev) => ({
      ...prev,
      [type]: val
    }));

  }
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
            <Input type='file' error={stateValue?.image ? false : true} onChange={(e) => { handleOnChange(e.target.files[0], "image") }} />
            <br />
            <br />
            <Input
              style={{
                border: "2px solid #ccc",
                borderRadius: "5px",
              }}
              placeholder="Name Of Item" variant="outlined" fullWidth error={stateValue.name ? false : true} value={stateValue.name} onChange={(e) => { handleOnChange(e.target.value, "name") }} />
            <br />
            <br />
            <Input placeholder="Price" variant="outlined" fullWidth error={stateValue.price ? false : true} value={stateValue.price} onChange={(e) => { handleOnChange(e.target.value, "price") }} />
            <br />
            <br />
            <Input placeholder="Taste" variant="outlined" fullWidth error={stateValue.taste ? false : true} value={stateValue.taste} onChange={(e) => { handleOnChange(e.target.value, "taste") }} />
            <br />
            <br />
            <Input placeholder="Description" variant="outlined" fullWidth error={stateValue.description ? false : true} value={stateValue.description} onChange={(e) => { handleOnChange(e.target.value, "description") }} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickSave}
            color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DailogComponent;