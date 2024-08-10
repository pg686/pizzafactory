import React from "react";
import { useContext } from "react";
import CardContext from "../../context/cardContext";
import OrderButton from "../../elements/OrderButton/OrderButton.jsx";
import "./ShoppingCard.modules.css";
import { TiDeleteOutline } from "react-icons/ti";
import AuthContext from "../../context/authContext.jsx";
const ShoppingCard = () => {
  const { email } = useContext(AuthContext);
  const {
    card,
    addPizzaToCard,
    removeFromCard,
    removeAllFromCard,
    completeOrder,
  } = useContext(CardContext);
  const calculateTotalPrice = Object.keys(card)
    .map((key) => card[key].quantity * card[key].pizzaPrice)
    .reduce((acc, curr) => acc + curr, 0);
  return (
    <div className="shoppingCardWrapper">
      <h2>Shopping Card</h2>
      {Object.keys(card).map((key) => {
        const { pizzaId, pizzaName, pizzaPrice, pizzaImg, quantity } =
          card[key];
        const calculateTotalPrice = () => quantity * pizzaPrice;
        return (
          <div key={key} className="shoppingCardItemWrapper">
            <img src={pizzaImg} className="shoppingCardItemImg" />
            <div className="shoppingCardItemName">{pizzaName}</div>
            <div className="shoppingCardItemPrice">{`Price: ${calculateTotalPrice()}`}</div>
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
      <div className="totalPrice">Total Price: {calculateTotalPrice}</div>
      <a className="button" onClick={() => completeOrder(email)}>
        Complete order
      </a>
    </div>
  );
};

export default ShoppingCard;
