import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getorderDataAction } from "../../Redux/Action";
import TableGrid from "../../Ui-Elements/Table/TableGrid";
import { formatPrice } from "../../Common/utils";
import ButtonComponent from "../../Ui-Elements/Button/ButtonComponent";
import PopupComponent from "../../Ui-Elements/Popup/PopupComponent";
import SvgIcon from "../../SvgIcon/SvgIcon";
import "./OrderList.scss";
import BadgesComponent from "../../Ui-Elements/Badges/BadgesComponent";

const OrderList = () => {
  const dispatch = useDispatch();
  const orderListData = useSelector((state) => state?.orderList?.data);
  console.log(orderListData, "orderListData");
  const dataItem = useMemo(
    () => orderListData.data || [],
    [orderListData.data]
  );
  const [orderList, setOrderList] = useState(dataItem);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const columns = [
    { label: "Detail", key: "action", width: "70px" },
    { label: "Customer", key: "customer_name", width: "250px" },
    { label: "Price", key: "total_price", width: "150px" },
    { label: "Payment Status", key: "payment_status", width: "150px" },
    { label: "Order Status", key: "order_status", sort: true, width: "150px" },
    { label: "Accept Status", key: "order_accept", sort: true, width: "150px" },
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
            variant={!item.payment_status ? "success" : "warning"}
            text={item.payment_status}
          />
        ),
        order_accept: (
          <BadgesComponent
            variant={!item.order_accept ? "warning" : "success"}
            text={item.order_accept ? "Accepted" : "Pending"}
          />
        ),
        action: (
          <div
            onClick={(e) => {
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
            onClick={(e) => {
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
  console.log(orderList, "selectedOrder");

  const handleClose = () => {
    setShowDetailPopup(false);
  };
  return (
    <Fragment>
      <div className="mg-orderlist-main">
        <h3>Order List</h3>
        <TableGrid columns={columns} data={rowData()} />
        <PopupComponent
          isOpen={showDetailPopup}
          onClose={() => {
            handleClose();
          }}
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
                onClick={() => {
                  handleClose();
                }}
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
