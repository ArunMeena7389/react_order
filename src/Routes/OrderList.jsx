import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getorderDataAction } from "../Redux/Action";
import CustomTable from "../Common/CustomTable";

const OrderList = () => {
  const dispatch = useDispatch();
  const orderListData = useSelector((state) => state?.orderList?.data);
  console.log(orderListData, "orderListData");
  const dataItem = orderListData.data || [];
  useEffect(() => {
    dispatch(getorderDataAction());
  }, []);
  return (
    <Fragment>
      <h3 style={{color:"white"}}>Order List</h3>
      <CustomTable data={dataItem}/>
    </Fragment>
  );
};

export default OrderList;
