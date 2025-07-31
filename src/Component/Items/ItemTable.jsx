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
import PopupComponent from "../../Common/PopupComponent";
import DailogComponent from "../../Common/DailogComponent";
import { formatPrice, generatePdf } from "../../Common/utils";
import InputComponent from "../../Ui-Elements/Input/InputComponent";
import "./ItemTable.scss";

let initialPayload = {
  fields: ["name", "price", "image_url", "taste", "description", "business_id"],
  filter: {},
};

const ItemTable = () => {
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const columns = [
    { label: "Image", key: "image_url", type: "image", width: "120px" },
    { label: "Item", key: "name", sort: true, width: "200px" },
    { label: "Description", key: "description" },
    { label: "Taste", key: "taste" },
    { label: "Price", key: "price", sort: true, width: "150px" },
    { label: "Action", key: "action", width: "100px" },
  ];

  const dispatch = useDispatch();
  const selectorData = useSelector((state) => state.user.data);
  const selectorDataTaste = useSelector((state) => state.taste.data);
  const dataItem = useMemo(() => selectorData.data || [], [selectorData.data]);
  const [ItemData, setItemData] = useState(dataItem);

  const [activeRowId, setActiveRowId] = useState(null);
  const popupRef = useRef();
  console.log(activeRowId, "activeRowId");

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
    setShow(false);
    if (action) {
      handleSingleRemove(selectedItem);
    }
  };

  const handleAction = () => {
    setEditOpen(!editOpen);
  };

  const handleToClose = () => {
    setEditOpen(!editOpen);
  };

  const rowData = useCallback(() => {
    return ItemData.map((item) => {
      return {
        ...item,
        price: formatPrice(item?.price, "en-IN", "INR"),
        action: (
          <div className="position-relative d-inline-block">
            <div onClick={() => setActiveRowId(item._id)}>
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
                className="position-absolute bg-white border shadow rounded p-2"
                style={{
                  top: "30px",
                  right: "0",
                  zIndex: 1000,
                  minWidth: "100px",
                  width: "120px",
                }}
              >
                <div
                  className="dropdown-item text-dark my-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleAction();
                    const fullImageUrl = `${item.image_url}`;
                    setSelectedItem({
                      ...item,
                      image: fullImageUrl,
                    });
                    setActiveRowId(null);
                  }}
                >
                  Edit
                </div>
                <div
                  className="dropdown-item text-danger my-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedItem(item);
                    setShow(true);
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
        {/* Top bar with right-aligned icon using Bootstrap */}
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
        <TableGrid columns={columns} data={rowData()} />
      </div>
      {show && <PopupComponent onClose={handleClose} onClick={handleClose} />}
      {editOpen && (
        <DailogComponent
          open={editOpen}
          onClick={handleToClose}
          selectedItem={selectedItem}
          onClose={handleToClose}
          title={"Edit"}
          text={" I am Good, Hope the same for you!"}
        />
      )}
    </Fragment>
  );
};

export default ItemTable;
