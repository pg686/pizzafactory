import React from "react";
import { useContext } from "react";
import CardContext from "../../context/cardContext";
import OrderButton from "../../elements/OrderButton/OrderButton.jsx";
import "./ShoppingCard.modules.css";
import { TiDeleteOutline } from "react-icons/ti";
import AuthContext from "../../context/authContext.jsx";
import { calculateTotalPrice } from "../../utils/utils.js";
const ShoppingCard = () => {
  const { email } = useContext(AuthContext);
  const {
    card,
    addPizzaToCard,
    removeFromCard,
    removeAllFromCard,
    completeOrder,
  } = useContext(CardContext);
  return (
    <div className="pageWrapper">
      <h2>Shopping Cart</h2>
      {Object.keys(card).length ? (
        <>
          {Object.keys(card).map((key) => {
            const { pizzaId, pizzaName, pizzaPrice, pizzaImg, quantity } =
              card[key];
            return (
              <div key={key} className="shoppingCardItemWrapper">
                <img
                  src={pizzaImg}
                  className="shoppingCardItemImg"
                  alt={pizzaName}
                />
                <div className="shoppingCardItemName">{pizzaName}</div>
                <div className="shoppingCardItemPrice">{`Price: ${calculateTotalPrice(quantity, pizzaPrice)}`}</div>
                <div className="orderButton">
                  <OrderButton
                    addPizzaToCard={addPizzaToCard}
                    removeFromCard={removeFromCard}
                    hideOrderButton
                    productCount={quantity}
                    pizzaId={pizzaId}
                    pizzaImg={pizzaImg}
                    pizzaName={pizzaName}
                    pizzaPrice={pizzaPrice}
                  />
                </div>
                <TiDeleteOutline onClick={() => removeAllFromCard(pizzaId)} />
              </div>
            );
          })}
          <div className="totalPrice">
            Total Price:{" "}
            {Object.keys(card)
              .map((key) => card[key].quantity * card[key].pizzaPrice)
              .reduce((acc, curr) => acc + curr, 0)}
          </div>
          <a className="button" onClick={() => completeOrder(email)}>
            Complete order
          </a>
        </>
      ) : (
        <div className="noItemsInShoppingCart">
          There are no items in your shopping cart
        </div>
      )}
    </div>
  );
};

export default ShoppingCard;
