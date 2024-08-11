import React from "react";
import "./MyOrders.modules.css";
import { calculateTotalPrice } from "../../utils/utils.js";

const OrderItem = ({ quantity, pizzaImg, pizzaName, pizzaPrice }) => {
  return (
    <div className="orderItemWrapper">
      <div className="orderItemQuantity">{`${quantity} X`} </div>
      <img src={pizzaImg} className="orderItemImg" />
      <div className="orderItemName">{pizzaName}</div>
      <div className="orderItemPrice">{`Price: ${calculateTotalPrice(quantity, pizzaPrice)}`}</div>
    </div>
  );
};
export default OrderItem;
