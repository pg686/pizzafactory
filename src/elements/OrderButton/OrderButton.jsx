import React from "react";

const OrderButton = ({
  pizzaId,
  card,
  addPizzaToCard,
  removeFromCard,
  pizzaImg,
  pizzaName,
  pizzaPrice,
}) => {
  console.log(card, "card");
  const productCount = card[pizzaId]?.quantity;
  return !!productCount ? (
    <div className="addQuantityWrapper">
      <button onClick={() => removeFromCard(pizzaId)}>-</button> {productCount}{" "}
      <button
        onClick={() => addPizzaToCard(pizzaId, pizzaName, pizzaPrice, pizzaImg)}
      >
        +
      </button>
    </div>
  ) : (
    <a
      onClick={() => addPizzaToCard(pizzaId, pizzaName, pizzaPrice, pizzaImg)}
      className="button"
    >
      Order
    </a>
  );
};

export default OrderButton;
