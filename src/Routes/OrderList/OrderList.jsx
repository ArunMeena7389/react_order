import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getorderDataAction, updateOrderDataAction } from "../../Redux/Action";
import TableGrid from "../../Ui-Elements/Table/TableGrid";
import { formatPrice } from "../../Common/utils";
import ButtonComponent from "../../Ui-Elements/Button/ButtonComponent";
import PopupComponent from "../../Ui-Elements/Popup/PopupComponent";
import SvgIcon from "../../SvgIcon/SvgIcon";
import "./OrderList.scss";
import BadgesComponent from "../../Ui-Elements/Badges/BadgesComponent";
import {
  added_new,
  connectSocket,
  disconnectSocket,
  off_new,
} from "../../Common/SocketService";
import InputComponent from "../../Ui-Elements/Input/InputComponent";
import DropdownComponent from "../../Ui-Elements/Dropdown/DropdownComponent";

const OrderList = () => {
  const dispatch = useDispatch();
  const orderListData = useSelector((state) => state?.orderList);
  const dataItem = useMemo(
    () => orderListData.data || [],
    [orderListData.data]
  );
  const [orderList, setOrderList] = useState(dataItem);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [dropdownValue, setDropdownValue] = useState("today");
  const columns = [
    { label: "Detail", key: "action", width: "70px" },
    { label: "Customer", key: "customer_name", width: "200px" },
    { label: "Order ID", key: "order_id", sort: true, width: "100px" },
    { label: "Price", key: "total_price", width: "150px" },
    { label: "Payment Status", key: "payment_status", width: "150px" },
    { label: "Order Status", key: "order_status", sort: true, width: "150px" },
    { label: "Order Time", key: "order_time", width: "150px" },
  ];

  const columnsList = [
    { label: "Image", key: "image_url", type: "image", width: "90px" },
    { label: "Item", key: "name", width: "150px" },
    { label: "Taste", key: "taste", width: "100px" },
    { label: "Price", key: "price", width: "100px" },
    { label: "Quantity", key: "count", width: "100px" },
  ];

  useEffect(() => {
    connectSocket();
    added_new((newOrder) => {
      setOrderList((prev) => [...prev, newOrder]);
    });

    return () => {
      off_new();
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    setOrderList(dataItem);
    // eslint-disable-next-line
  }, [dataItem]);

  useEffect(() => {
    dispatch(getorderDataAction());
    // eslint-disable-next-line
  }, []);

  const rowData = useCallback(() => {
    return orderList.map((item) => {
      return {
        ...item,
        total_price: formatPrice(item?.total_price, "en-IN", "INR"),
        payment_status: (
          <BadgesComponent
            title="Click for change payment status"
            variant={item.payment_status === "Paid" ? "success" : "warning"}
            text={item.payment_status}
            customClass="cursor-pointer"
            onClick={() => {
              dispatch(
                updateOrderDataAction(
                  item._id,
                  {
                    payment_status:
                      item.payment_status === "Pending" ? "Paid" : "Pending",
                  },
                  (data) => {
                    setOrderList((prev) =>
                      prev.map((order) =>
                        order._id === data._id ? data : order
                      )
                    );
                  }
                )
              );
            }}
          />
        ),
        order_status: (
          <BadgesComponent
            title="Click for change order status"
            variant={
              item.order_status === "Ordered"
                ? "warning"
                : item.order_status === "Deliverd"
                ? "success"
                : ""
            }
            text={item.order_status}
            customClass="cursor-pointer"
            onClick={() => {
              dispatch(
                updateOrderDataAction(
                  item._id,
                  {
                    order_status:
                      item.order_status === "Ordered"
                        ? "Accepted"
                        : item.order_status === "Accepted"
                        ? "Deliverd"
                        : "Ordered",
                  },
                  (data) => {
                    setOrderList((prev) =>
                      prev.map((order) =>
                        order._id === data._id ? data : order
                      )
                    );
                  }
                )
              );
            }}
          />
        ),
        action: (
          <div
            onClick={() => {
              setShowDetailPopup(true);
              setSelectedOrder(item || []);
            }}
            className="text-center"
          >
            <SvgIcon
              name="Detail"
              width={24}
              height={24}
              style={{ cursor: "pointer" }}
            />
          </div>
        ),
      };
    });
    // eslint-disable-next-line
  }, [orderList]);

  const rowDataItemList = useCallback(() => {
    return selectedOrder?.order_item?.map((item) => {
      return {
        ...item,
        total_price: formatPrice(item?.total_price, "en-IN", "INR"),
        order_accept: item.order_accept ? "Accepted" : "Pendding",
        action: (
          <div
            onClick={() => {
              setShowDetailPopup(true);
              setSelectedOrder(item?.order_item || []);
            }}
            className="text-center"
          >
            <SvgIcon
              name="Detail"
              width={24}
              height={24}
              style={{ cursor: "pointer" }}
            />
          </div>
        ),
      };
    });
    // eslint-disable-next-line
  }, [selectedOrder?.order_item]);

  const handleClose = () => {
    setShowDetailPopup(false);
  };
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <Fragment>
      <div className="mg-orderlist-main">
        <div className="flex">
          <h2>Order List</h2>
          <div className="ml-4 mb-2">
            <InputComponent
              value={searchValue}
              onChange={(e) => {
                handleSearch(e);
              }}
              placeholder="Search by Order ID"
              suffixIcon
              prefix={
                <SvgIcon
                  name="search"
                  width={16}
                  height={16}
                  className="text-gray-500"
                />
              }
            />
          </div>
          <div
            style={{
              position: "absolute",
              right: "30px",
              width: "200px",
            }}
          >
            <DropdownComponent
              value={dropdownValue}
              options={[
                { label: "Today", value: "today" },
                { label: "Yesterday", value: "yesterday" },
                { label: "All", value: "all" },
              ]}
              onChange={(e) => {
                setDropdownValue(e.target.value);
              }}
            />
          </div>
        </div>
        <TableGrid columns={columns} data={rowData()} />
        <PopupComponent
          isOpen={showDetailPopup}
          onClose={handleClose}
          title={`Order Item (${selectedOrder?.customer_name})`}
          width="90%"
          height="90vh"
          content={
            <div className="mg-order-item-table">
              <TableGrid columns={columnsList} data={rowDataItemList()} />
            </div>
          }
          footer={
            <>
              <ButtonComponent
                name="Cancel"
                variant="secondary"
                onClick={handleClose}
              />
              <ButtonComponent
                name="Save"
                variant="primary"
                onClick={() => {
                  handleClose("save");
                }}
              />
            </>
          }
        />
      </div>
    </Fragment>
  );
};

export default OrderList;
