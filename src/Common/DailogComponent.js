import React, { Fragment, useRef, useState } from 'react'
// import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import { addMenuDataAction, getmenueDataAction, updateMenuDataAction } from '../Redux/Action';
import { useDispatch } from 'react-redux';
import Image from "../Image/image.png";
import { Button, InputLabel, MenuItem, Select,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField  } from '@mui/material';
import { showCustomLoader } from './showCustomLoader';

function DailogComponent({ onClick, onClose, open, title, selectedItem, ...props }) {
  const [preview, setPreview] = useState(selectedItem?.image || null); // for preview URL
  const [stateValue, setStateValue] = useState({
    name: selectedItem?.name || "",
    price: selectedItem?.price || "",
    taste: selectedItem?.taste || "",
    description: selectedItem?.description || ""
  });

  const [error, setError] = useState({
    image: false,
    name: false,
    price: false,
    taste: false,
    description: false
  })

  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const onClickSave = async () => {
    showCustomLoader(true);
    let newError = Object.keys(stateValue).reduce((acc, key) => {
      acc[key] = !stateValue[key];
      return acc;
    }, {});
    if (!preview) {
      newError.image = true;
    }
    setError({ ...newError });
    const isValid = !Object.values(newError).some(Boolean);
    if (isValid && preview) {
      if (selectedItem?.image) {
        await dispatch(updateMenuDataAction(selectedItem._id, stateValue))
      } else {
        await dispatch(addMenuDataAction(stateValue));
      }
      onClick();
      await dispatch(getmenueDataAction({
        "fields": ["name", "price", "image_url", "taste", "description"]
      }));
    }
    showCustomLoader(false);
  }

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleOnChange = (val, type) => {
    if (type === "image" && val) {
      const objectUrl = URL.createObjectURL(val);
      setPreview(objectUrl);
    }
    setStateValue((prev) => ({
      ...prev,
      [type]: val
    }));
  }

  return (
    <Fragment>
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
            <div className="flex flex-col items-center gap-4 ">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => {
                  handleOnChange(e.target.files[0], "image")
                  error.image = false;
                  setError({ ...error })
                }}
                className="hidden"
                style={{
                  display: "none"
                }}
              />
              <div
                className="w-48 h-48 cursor-pointer border-2 border-dashed border-gray-300 rounded-lg overflow-hidden hover:shadow-md transition"
              >
                <img
                  src={
                    preview ||
                    Image
                  }
                  alt="Preview"
                  className={`w-full h-full object-cover cursor-pointer ${error.image && "image-error-border"}`}
                  width={"170px"}
                  height={"120px"}
                  style={{
                    cursor: "pointer",
                    borderRadius: "10px"
                  }}
                  onClick={handleImageClick}
                />
              </div>
            </div>
            {error.image && <p className='error-color mt-2'>Image is required</p>}
            <br />
            <TextField
              style={{
                borderRadius: "5px",
              }}
              placeholder="Name Of Item"
              variant="outlined"
              fullWidth
              error={error.name}
              value={stateValue.name}
              onChange={(e) => {
                handleOnChange(e.target.value, "name")
                error.name = false;
                setError({ ...error })
              }}
            />
            <br />
            <br />
            <TextField
              placeholder="Price"
              type="number"
              variant="outlined"
              fullWidth
              error={error.price}
              value={stateValue.price}
              onChange={(e) => {
                handleOnChange(e.target.value, "price")
                error.price = false;
                setError({ ...error })
              }}
            />
            <br />
            <br />

            <Select
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={stateValue.taste}
  error={error.taste}
  fullWidth
  variant="outlined"
  displayEmpty
  onChange={(e) => {
    handleOnChange(e.target.value, "taste");
    error.taste = false;
    setError({ ...error });
  }}
>
  <MenuItem value="" disabled>
    Select Taste
  </MenuItem>
  <MenuItem value="sweet">Sweet</MenuItem>
  <MenuItem value="spicy">Spicy</MenuItem>
  <MenuItem value="sour">Sour</MenuItem>
</Select>
            {/* <TextField
              placeholder="Taste"
              variant="outlined"
              fullWidth
              error={error.taste}
              value={stateValue.taste}
              onChange={(e) => {
                handleOnChange(e.target.value, "taste")
                error.taste = false;
                setError({ ...error })
              }}
            /> */}
            <br />
            <br />
            <TextField
              placeholder="Description"
              variant="outlined"
              fullWidth
              error={error.description}
              value={stateValue.description}
              onChange={(e) => {
                handleOnChange(e.target.value, "description")
                error.description = false;
                setError({ ...error })
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickSave}
            color="success" variant='contained'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default DailogComponent;