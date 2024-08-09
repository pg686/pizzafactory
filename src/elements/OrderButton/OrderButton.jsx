import React from "react";

const OrderButton = ({
  pizzaId,
  hideOrderButton = false,
  productCount,
  addPizzaToCard,
  removeFromCard,
  pizzaImg,
  pizzaName,
  pizzaPrice,
}) => {
  return !!productCount ? (
    <div className="addQuantityWrapper">
      <button
        onClick={() => removeFromCard(pizzaId)}
        disabled={hideOrderButton && productCount === 1}
      >
        -
      </button>{" "}
      {productCount}{" "}
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
