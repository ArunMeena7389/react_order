import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ImageUploader from "../../Ui-Elements/ImageUploader/ImageUploader";
import InputComponent from "../../Ui-Elements/Input/InputComponent";
import ButtonComponent from "../../Ui-Elements/Button/ButtonComponent";
import TableGrid from "../../Ui-Elements/Table/TableGrid";
import PopupComponent from "../../Ui-Elements/Popup/PopupComponent";
import SvgIcon from "../../SvgIcon/SvgIcon";
import Image from "../../Image/image.png";
import { formatPrice } from "../../Common/utils";
import "./Package.scss";
import {
  addPackageAction,
  getmenueDataAction,
  updatePackageDataAction,
} from "../../Redux/Action";

let initialPayload = {
  fields: ["name", "price", "image_url", "taste", "description", "business_id"],
  filter: {},
};
const AddEditPacka = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedItem = useMemo(() => location.state || {}, [location.state]);

  const columns = [
    { label: "Image", key: "image_url", type: "image", width: "120px" },
    { label: "Item", key: "name", sort: true, width: "200px" },
    { label: "Price", key: "price", sort: true, width: "150px" },
  ];

  const [preview, setPreview] = useState(selectedItem?.image_url || null);
  const [itemID, setItemID] = useState(selectedItem.items || []);
  const [items, setItems] = useState([]);
  const [saveItemID, setSaveItemID] = useState(selectedItem.items || []);
  const [stateValue, setStateValue] = useState({
    packageName: selectedItem?.packageName || "",
    price: selectedItem?.price || "",
    discount: selectedItem?.discount || 0,
    image: "",
  });
  const [error, setError] = useState({
    image: false,
    packageName: false,
    price: false,
    discount: false,
  });
  const [showItem, setShowItem] = useState(false);
  const onClickSave = async () => {
    if (stateValue.packageName) {
      if (selectedItem._id) {
        await dispatch(
          updatePackageDataAction(selectedItem._id, {
            packageName: stateValue.packageName,
            items: saveItemID,
            discount: stateValue.discount,
            image: stateValue.image,
          })
        );
      } else {
        dispatch(
          await addPackageAction({
            packageName: stateValue.packageName,
            items: saveItemID,
            discount: stateValue.discount,
            image: stateValue.image,
          })
        );
      }
      navigate("/merchant/package");
    }
  };

  useEffect(() => {
    dispatch(
      getmenueDataAction(initialPayload, (data) => {
        setItems(data.data);
      })
    );
    // eslint-disable-next-line
  }, []);

  const rowData = useCallback(() => {
    return (
      <div className="w-100">
        {items.map((item) => (
          <div
            key={item.id}
            className={`mg-item-contain d-flex align-items-center w-100 mb-2 border p-2
       ${itemID.includes(item._id) ? "bg-primary text-white" : "bg-white"}`}
            onClick={() => {
              if (itemID.includes(item._id)) {
                setItemID(itemID.filter((id) => id !== item._id));
              } else {
                setItemID([...itemID, item._id]);
              }
            }}
          >
            <div style={{ width: "140px" }}>
              <img
                src={item.image_url}
                alt={item.image}
                className="rounded me-2"
                width="45"
                height="45"
              />
            </div>
            <h6 className="">{item.name}</h6>
            <p className="mb-0 text-muted ms-auto">
              {formatPrice(item?.price, "en-IN", "INR")}
            </p>
          </div>
        ))}
      </div>
    );
    // eslint-disable-next-line
  }, [items, itemID]);
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
            label="Name Of Package"
            name="Package"
            type="text"
            placeholder="Enter"
            value={stateValue.packageName}
            onChange={(e) => {
              handleOnChange(e.target.value, "packageName");
              error.name = false;
              setError({ ...error });
            }}
            required
            error={error.name ? "required" : ""}
          />
          <br />
          <ButtonComponent
            name=" Add Item"
            type="add"
            variant="primary"
            icon="+"
            onClick={() => {
              setShowItem(true);
              dispatch(
                getmenueDataAction(initialPayload, (data) => {
                  setItems(data.data);
                })
              );
            }}
          />
          <br />
          <TableGrid
            columns={columns}
            data={items.filter((item) => saveItemID.includes(item._id))}
          />
        </div>
      </div>
      <div className="form-footer">
        <ButtonComponent
          name="Cancel"
          onClick={() => navigate("/merchant/package")}
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
      <PopupComponent
        isOpen={showItem}
        onClose={() => {
          setShowItem(false);
          setItemID(saveItemID);
        }}
        title="Items"
        width="600px"
        height="auto"
        content={rowData()}
        footer={
          <>
            <ButtonComponent
              name="Add"
              variant="primary"
              onClick={() => {
                setSaveItemID(itemID);
                setShowItem(false);
              }}
            />
          </>
        }
      />
    </Fragment>
  );
};

export default AddEditPacka;
