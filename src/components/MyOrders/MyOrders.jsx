import React, { useEffect, useState, useContext } from "react";
import OrderItem from "./OrderItem.jsx";
import * as orderService from "../../services/ordersService.js";
import { getDate } from "../../utils/utils.js";
import "./MyOrders.modules.css";
import AuthContext from "../../context/authContext.jsx";
import { calculateTotalPrice } from "../../utils/utils.js";
const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { userId } = useContext(AuthContext);
  useEffect(() => {
    orderService.getAllForUser(userId).then((res) => setOrders(res));
  }, []);
  return (
    <div className="pageWrapper">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <h3>No orders yet</h3>
      ) : (
        orders.map((order, i) => {
          return (
            <>
              <>
                {order.pizzas.map((pizza, i) => {
                  return (
                    <>
                      <h3>{`${getDate(order._createdOn)} - Total price ${calculateTotalPrice(pizza?.quantity, pizza?.pizzaPrice)}`}</h3>
                      <OrderItem key={i} {...pizza} />
                    </>
                  );
                })}
              </>
            </>
          );
        })
      )}
    </div>
  );
};

export default MyOrders;
