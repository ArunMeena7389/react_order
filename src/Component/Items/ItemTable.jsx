import React, {
  Fragment,
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TableGrid from "../../Ui-Elements/Table/TableGrid";
import { deleteMenuDataAction, getmenueDataAction } from "../../Redux/Action";
import { showCustomLoader } from "../../Common/showCustomLoader";
import { useDispatch, useSelector } from "react-redux";
import SvgIcon from "../../SvgIcon/SvgIcon";
// import PopupComponent from "../../Common/PopupComponent";
import { formatPrice, generatePdf } from "../../Common/utils";
import InputComponent from "../../Ui-Elements/Input/InputComponent";
import "./ItemTable.scss";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../Ui-Elements/Button/ButtonComponent";
import PopupComponent from "../../Ui-Elements/Popup/PopupComponent";

let initialPayload = {
  fields: ["name", "price", "image_url", "taste", "description", "business_id"],
  filter: {},
};

const ItemTable = () => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const columns = [
    { label: "Image", key: "image_url", type: "image", width: "120px" },
    { label: "Item", key: "name", sort: true, width: "200px" },
    { label: "Description", key: "description" },
    { label: "Taste", key: "taste", width: "150px" },
    { label: "Price", key: "price", sort: true, width: "150px" },
    { label: "Action", key: "action", width: "100px" },
  ];

  const dispatch = useDispatch();
  const selectorData = useSelector((state) => state.user.data);
  const selectorDataTaste = useSelector((state) => state.taste.data);
  const dataItem = useMemo(() => selectorData.data || [], [selectorData.data]);
  const [ItemData, setItemData] = useState(dataItem);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const [activeRowId, setActiveRowId] = useState(null);
  const popupRef = useRef();
  const navigate = useNavigate();

  const handleOutsideClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setActiveRowId(null);
    }
  };

  useEffect(() => {
    setItemData(dataItem);
    // eslint-disable-next-line
  }, [dataItem]);

  function searchItems(query, data) {
    const lowerQuery = query.toLowerCase();
    setItemData(
      data.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerQuery) ||
          item.taste.toLowerCase().includes(lowerQuery)
      )
    );
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const getmenueData = async () => {
    showCustomLoader(true);
    if (selectorDataTaste?.length) {
      initialPayload.filter.taste = selectorDataTaste.map((dt) =>
        dt?.title?.toLowerCase()
      );
    }
    await dispatch(getmenueDataAction(initialPayload));
    showCustomLoader(false);
  };

  useEffect(() => {
    getmenueData();
    // eslint-disable-next-line
  }, []);

  const handleSingleRemove = async (item) => {
    showCustomLoader(true);
    await dispatch(deleteMenuDataAction(item._id));
    await dispatch(getmenueDataAction(initialPayload));
    showCustomLoader(false);
  };

  const handleClose = (action) => {
    setShowDeletePopup(false);
    if (action) {
      handleSingleRemove(selectedItem);
    }
  };

  const rowData = useCallback(() => {
    return ItemData.map((item) => {
      return {
        ...item,
        price: formatPrice(item?.price, "en-IN", "INR"),
        action: (
          <div className="position-relative d-inline-block">
            <div
              onClick={(e) => {
                setActiveRowId(item._id);
                const rect = e.currentTarget.getBoundingClientRect();
                setPopupPosition({
                  top: rect.bottom + window.scrollY,
                  left: rect.right - 120 + window.scrollX, // width of popup box
                });
              }}
            >
              <SvgIcon
                name="threedot"
                width={24}
                height={24}
                style={{ cursor: "pointer" }}
              />
            </div>
            {activeRowId === item._id && (
              <div
                ref={popupRef}
                className="position-fixed bg-white border shadow rounded p-2"
                style={{
                  top: popupPosition.top,
                  left: popupPosition.left,
                  zIndex: 1000,
                  width: "120px",
                }}
              >
                <div
                  className="dropdown-item text-dark my-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    const selected = {
                      ...item,
                      image: item.image_url,
                    };
                    setSelectedItem(selected);
                    setActiveRowId(null);

                    navigate("/merchant/item", {
                      state: selected,
                    });
                  }}
                >
                  Edit
                </div>
                <div
                  className="dropdown-item text-danger my-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedItem(item);
                    setShowDeletePopup(true);
                    setActiveRowId(null);
                  }}
                >
                  Delete
                </div>
              </div>
            )}
          </div>
        ),
      };
    });
    // eslint-disable-next-line
  }, [ItemData, activeRowId]);

  return (
    <Fragment>
      <div>
        <div className="d-flex justify-content-end align-items-center gap-3 p-2 flex-wrap">
          {/* Input Field */}
          <div style={{ minWidth: "150px" }}>
            <InputComponent
              name="search"
              type="text"
              placeholder="Search"
              value={searchValue}
              prefix={
                <SvgIcon
                  name="search"
                  width={16}
                  height={16}
                  className="text-secondary"
                />
              }
              onChange={(e) => {
                searchItems(e.target.value, dataItem);
                setSearchValue(e.target.value);
              }}
              suffixIcon={true}
            />
          </div>

          {/* PDF Button */}
          <div
            className="border rounded px-3 py-2 bg-light d-flex align-items-center"
            style={{
              cursor: "pointer",
              height: "40px", // 👈 Match input height
            }}
            onClick={() => generatePdf(dataItem)}
          >
            <SvgIcon
              name="pdf"
              width={20}
              height={20}
              className="text-secondary"
            />
          </div>
        </div>

        {/* Table */}
        <div className="mg-item-table">
          <TableGrid columns={columns} data={rowData()} />
        </div>
      </div>

      <PopupComponent
        isOpen={showDeletePopup}
        onClose={() => {
          handleClose();
        }}
        title="Delete"
        width="500px"
        height="auto"
        content={"Are sure you want to delete this item ? 🗑️"}
        footer={
          <>
            <ButtonComponent
              name="Cancel"
              variant="secondary"
              onClick={() => {
                handleClose();
              }}
            />
            <ButtonComponent
              name="Delete"
              variant="primary"
              onClick={() => {
                handleClose("Delete");
              }}
            />
          </>
        }
      />
    </Fragment>
  );
};

export default ItemTable;
