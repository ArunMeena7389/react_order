import React, { Fragment, useRef, useState } from "react";
// import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import {
  addMenuDataAction,
  getmenueDataAction,
  updateMenuDataAction,
} from "../Redux/Action";
import { useDispatch, useSelector } from "react-redux";
import Image from "../Image/image.png";
import {
  Button,
  MenuItem,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { showCustomLoader } from "./showCustomLoader";
import InputComponent from "../Ui-Elements/Input/InputComponent";
import TextAreaComponent from "../Ui-Elements/TextArea/TextAreaComponent";

let initialPayload = {
  fields: ["name", "price", "image_url", "taste", "description"],
  filter: {},
};

function DailogComponent({
  onClick,
  onClose,
  open,
  title,
  selectedItem,
  ...props
}) {
  const [preview, setPreview] = useState(selectedItem?.image || null); // for preview URL
  const [stateValue, setStateValue] = useState({
    name: selectedItem?.name || "",
    price: selectedItem?.price || "",
    taste: selectedItem?.taste || "",
    description: selectedItem?.description || "",
  });

  const [error, setError] = useState({
    image: false,
    name: false,
    price: false,
    taste: false,
    description: false,
  });

  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const selectorDataTaste = useSelector((state) => state.taste.data);

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
        await dispatch(updateMenuDataAction(selectedItem._id, stateValue));
      } else {
        await dispatch(addMenuDataAction(stateValue));
      }
      onClick();
      if (selectorDataTaste?.length)
        initialPayload.filter.taste = selectorDataTaste.map((dt) => {
          return dt?.title?.toLowerCase();
        });
      await dispatch(getmenueDataAction(initialPayload));
    }
    showCustomLoader(false);
  };

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
      [type]: val,
    }));
  };

  return (
    <Fragment>
      <Dialog open={open} onClose={onClose} fullWidth="xl">
        <DialogTitle>
          {title}
          <Button
            onClick={onClick}
            color="primary"
            autoFocus
            style={{
              float: "right",
              marginRight: "-20px",
              fontSize: "20px",
            }}
          >
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
                  handleOnChange(e.target.files[0], "image");
                  error.image = false;
                  setError({ ...error });
                }}
                className="hidden"
                style={{
                  display: "none",
                }}
              />
              <div className="w-48 h-48 cursor-pointer border-2 border-dashed border-gray-300 rounded-lg overflow-hidden hover:shadow-md transition">
                <img
                  src={preview || Image}
                  alt="Preview"
                  className={`w-full h-full object-cover cursor-pointer ${
                    error.image && "image-error-border"
                  }`}
                  width={"170px"}
                  height={"120px"}
                  style={{
                    cursor: "pointer",
                    borderRadius: "10px",
                  }}
                  onClick={handleImageClick}
                />
              </div>
            </div>
            {error.image && (
              <p className="error-color mt-2">Image is required</p>
            )}
            <br />
            <InputComponent
              label="Name Of Item"
              name="Item"
              type="text"
              placeholder="Enter"
              value={stateValue.name}
              onChange={(e) => {
                handleOnChange(e.target.value, "name");
                error.name = false;
                setError({ ...error });
              }}
              required
              error={error.name ? "required" : ""}
            />
            <InputComponent
              label="Price"
              name="Price"
              type="number"
              placeholder="Price"
              value={stateValue.price}
              onChange={(e) => {
                handleOnChange(e.target.value, "price");
                error.price = false;
                setError({ ...error });
              }}
              required
              error={error.price ? "required" : ""}
              prefix={"₹"}
            />

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
            <br />
            <br />
            {/* <InputComponent
              label="Description"
              name="Description"
              type="text"
              placeholder="Enter"
              value={stateValue.description}
              onChange={(e) => {
                handleOnChange(e.target.value, "description");
                error.description = false;
                setError({ ...error });
              }}
              required
              error={error.description ? "required" : ""}
            /> */}
            <TextAreaComponent
              label="Description"
              name="description"
              placeholder="Write something..."
              value={stateValue.description}
              onChange={(e) => {
                handleOnChange(e.target.value, "description");
                error.description = false;
                setError({ ...error });
              }}
              error={error.description ? "required" : ""}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickSave} color="success" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default DailogComponent;
