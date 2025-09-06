import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./customer.scss";
import BottomPopupFilter from "./BottomPopupFilter";
import { useLocation } from "react-router-dom";
import BottomPopupAddCart from "./BottomPopupAddCart";
import InputComponent from "../../Ui-Elements/Input/InputComponent";
import SvgIcon from "../../SvgIcon/SvgIcon";
import BadgesComponent from "../../Ui-Elements/Badges/BadgesComponent";
import { formatPrice } from "../../Common/utils";

const CustomerMain = () => {
  const location = useLocation();
  const customerMenuData = useSelector((state) => state?.customerMenu?.data);
  const customerPackageData = useSelector(
    (state) => state?.packageCustomer?.data
  );
  const dataItem = customerMenuData?.data || [];
  const [dataItemMenu, setDataItemMenu] = useState(
    dataItem.map((item) => ({ ...item, count: 0 }))
  );
  const [searchValue, setSearchValue] = useState("");
  const [openFilterPopup, setOpenFilterPopup] = useState(false);
  const [openAddCartPopup, setOpenAddCartPopup] = useState(false);
  const [addedCartData, setAddedCartData] = useState([]);
  const [isShowPackage, setIsShowPacka] = useState(true);
  const businessID = location.state?.businessID;

  useEffect(() => {
    // dispatch(getCustomerDataAction(businessID));
    // eslint-disable-next-line
  }, [businessID]);

  useEffect(() => {
    const filterCartData = dataItemMenu.filter((item) => item.count);
    setAddedCartData(filterCartData);
  }, [dataItemMenu]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchValue(event.target.value);
    const delayDebounce = setTimeout(() => {
      const searchTerm = event?.target?.value?.trim()?.toLowerCase() || "";
      const filteredItems = dataItem.filter((item) =>
        (item.name || "")?.trim()?.toLowerCase().includes(searchTerm)
      );
      setDataItemMenu(filteredItems);
    }, 3000);
    return () => clearTimeout(delayDebounce);
  };

  const handleAddClick = (data, type) => {
    if (type === "Add") {
      setDataItemMenu((prev) =>
        prev.map((item) =>
          item._id === data._id ? { ...item, count: 1 } : { ...item }
        )
      );
    } else if (type === "plush") {
      setDataItemMenu((prev) =>
        prev.map((item) =>
          item._id === data._id
            ? { ...item, count: item.count + 1 }
            : { ...item }
        )
      );
    } else if (type === "minus") {
      setDataItemMenu((prev) =>
        prev.map((item) =>
          item._id === data._id
            ? { ...item, count: item.count - 1 }
            : { ...item }
        )
      );
    }
  };

  return (
    <div className="customer-container">
      <div
        className="customer-header flex items-center justify-between mb-1 p-1"
        style={{
          backgroundColor: "#f8f9fa",
        }}
      >
        <div
          style={{ fontSize: "30px" }}
          onClick={() => setOpenFilterPopup(true)}
        >
          <SvgIcon
            name="Filter"
            width={30}
            height={30}
            className="text-primary"
          />
        </div>
        <div
          style={{ fontSize: "30px" }}
          onClick={() => setOpenAddCartPopup(true)}
        >
          <div className="relative inline-block">
            <SvgIcon
              name="Shopping"
              width={30}
              height={30}
              className="text-primary"
            />

            {addedCartData.length ? (
              <BadgesComponent
                text={addedCartData.length}
                variant="danger"
                NotificationCount
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <InputComponent
          name="Search"
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={handleSearch}
          required
          prefix={
            <SvgIcon
              name="search"
              width={16}
              height={16}
              className="text-secondary"
            />
          }
        />
      </div>
      <div style={{ width: "20%" }}>
        <BadgesComponent
          text={!isShowPackage ? "COMBO" : "ITEMS"}
          variant={"secondary"}
          customClass={"p-2 m-1"}
          onClick={() => {
            setIsShowPacka(!isShowPackage);
          }}
        />
      </div>
      {!isShowPackage ? (
        <div className="customer-card-wrapper">
          {dataItemMenu?.map((item, index) => (
            <div className="card customer-card" key={index}>
              <img
                className="card-img-top customer-image"
                src={item.image_url}
                alt="Customer"
              />
              <div className="card-body text-center text-white">
                <h5 className="card-title">
                  {item.name.split(" ").slice(0, 2).join(" ")}
                  {item.name.split(" ").length > 2 && "..."}
                </h5>
                <p className="card-text">{formatPrice(item.price)}</p>

                {!item.count ? (
                  <button
                    className="add-btn"
                    onClick={() => {
                      handleAddClick(item, "Add");
                    }}
                  >
                    + ADD
                  </button>
                ) : (
                  <div className="counter-wrapper">
                    <button
                      className="count-btn-min"
                      onClick={() => handleAddClick(item, "minus")}
                    >
                      -
                    </button>
                    <span className="count-display">{item.count}</span>
                    <button
                      className="count-btn-plush"
                      onClick={() => handleAddClick(item, "plush")}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="customer-card-wrapper">
          {customerPackageData?.map((item, index) => (
            <div className="card customer-card" key={index}>
              <img
                className="card-img-top customer-image"
                src={item.image_url}
                alt="Customer"
              />
              <div className="card-body text-center text-white">
                <h5 className="card-title">
                  {item.packageName.split(" ").slice(0, 2).join(" ")}
                  {item.packageName.split(" ").length > 2 && "..."}
                </h5>
                <p className="card-text">{formatPrice(item.price)}</p>

                {!item.count ? (
                  <button
                    className="add-btn"
                    onClick={() => {
                      handleAddClick(item, "Add");
                    }}
                  >
                    + ADD
                  </button>
                ) : (
                  <div className="counter-wrapper">
                    <button
                      className="count-btn-min"
                      onClick={() => handleAddClick(item, "minus")}
                    >
                      -
                    </button>
                    <span className="count-display">{item.count}</span>
                    <button
                      className="count-btn-plush"
                      onClick={() => handleAddClick(item, "plush")}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <BottomPopupFilter
        open={openFilterPopup}
        onClose={() => setOpenFilterPopup(false)}
        onOpen={() => {}}
      />
      <BottomPopupAddCart
        open={openAddCartPopup}
        onClose={() => setOpenAddCartPopup(false)}
        onOpen={() => {}}
        addedCartData={addedCartData}
        handleAddClick={handleAddClick}
      />
    </div>
  );
};

export default CustomerMain;
