import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem } from "./Redux/Action";


const Cart = () => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    console.log("store", state);
  return (
    <div className="cart">
      <button className="green" onClick={()=>{
        dispatch(addItem())
      }}>+</button>
      <button className="red" onClick={()=>{
        dispatch(deleteItem())
      }}>-</button>
    </div>
  );
};

export default Cart;