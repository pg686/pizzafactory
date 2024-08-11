import React from "react";
import "./ShoppingCardItem.modules.css";
import { calculateTotalPrice } from "../../utils/utils.js";
import OrderButton from "../../elements/OrderButton/OrderButton.jsx";
const ShoppingCardItem = (
  pizzaName,
  pizzaPrice,
  pizzaImg,
  quantity,
  addPizzaToCard,
  removeFromCard,
) => {
  return (
    <div className="shoppingCardItemWrapper">
      <div className="shoppingCardItemImg">
        <img src={pizzaImg} />
      </div>

      <div className="shoppingCardItemName">{pizzaName}</div>
      <div className="shoppingCardItemPrice">{`Price: ${calculateTotalPrice(quantity, pizzaPrice)}`}</div>
      <OrderButton
        hideOrderButton
        addPizzaToCard={addPizzaToCard}
        removeFromCard={removeFromCard}
        card={card}
        pizzaId={id}
        pizzaImg={image}
        pizzaName={name}
        pizzaPrice={price}
      />
    </div>
  );
};

export default ShoppingCardItem;
