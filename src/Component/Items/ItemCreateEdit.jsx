import React, { Fragment, useMemo, useState } from "react";
import InputComponent from "../../Ui-Elements/Input/InputComponent";
import { useDispatch } from "react-redux";
import { showCustomLoader } from "../../Common/showCustomLoader";
import "./ItemCreateEdit.scss";
import { addMenuDataAction, updateMenuDataAction } from "../../Redux/Action";
import TextAreaComponent from "../../Ui-Elements/TextArea/TextAreaComponent";
import Image from "../../Image/image.png";
import DropdownComponent from "../../Ui-Elements/Dropdown/DropdownComponent";
import ButtonComponent from "../../Ui-Elements/Button/ButtonComponent";
import SvgIcon from "../../SvgIcon/SvgIcon";
import { useLocation, useNavigate } from "react-router-dom";
import AiPopup from "../../Common/AiPopup";
import ImageUploader from "../../Ui-Elements/ImageUploader/ImageUploader";

const ItemCreateEdit = ({
  //   selectedItem,
  ...props
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedItem = useMemo(() => location.state || {}, [location.state]);

  const [preview, setPreview] = useState(selectedItem?.image || null);
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
  const [isOpenAiPopup, setIsOpenAiPopup] = useState(false);
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
      navigate("/merchant");
    }
    showCustomLoader(false);
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
      <div className="item-form-wrapper">
        <div className="form-scroll-content">
          <ImageUploader
            image={preview || Image}
            required={error.image}
            onChange={(e, file) => {
              handleOnChange(file, "image");
              error.image = false;
              setError({ ...error });
            }}
            size={200}
          />
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
          <br />
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
          <br />
          <DropdownComponent
            label="Taste"
            name="taste"
            value={stateValue.taste}
            onChange={(e) => {
              handleOnChange(e.target.value, "taste");
              error.taste = false;
              setError({ ...error });
            }}
            required
            error={error.taste ? "Taste is required" : ""}
            options={[
              { label: "Sweet", value: "sweet" },
              { label: "Spicy", value: "spicy" },
              { label: "Sour", value: "sour" },
            ]}
          />
          <br />
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
            className="mb-3"
            showAiButton={true}
            handleAiPopup={() => setIsOpenAiPopup(true)}
          />
        </div>
      </div>
      <div className="form-footer">
        <ButtonComponent
          name="Cancel"
          onClick={() => navigate("/merchant")}
          variant="secondary"
          className="ml-3"
        />
        <ButtonComponent
          name="Submit"
          onClick={onClickSave}
          type="submit"
          variant="primary"
          iconRight={<SvgIcon name="arrow-right" width={16} height={16} />}
        />
      </div>
      <AiPopup
        textValue={stateValue.description}
        isOpen={isOpenAiPopup}
        onClose={() => setIsOpenAiPopup(false)}
        onPrimaryClick={(data) => {
          handleOnChange(data.aitextValue, "description");
          setIsOpenAiPopup(false);
        }}
      />
    </Fragment>
  );
};

export default ItemCreateEdit;
