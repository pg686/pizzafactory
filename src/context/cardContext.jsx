import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as orderService from "../services/ordersService.js";

const CardContext = createContext();
import Path from "../paths";
import usePersistedState from "../hooks/usePersistedState.js";

export const CardProvider = ({ children }) => {
  const [card, setCard] = usePersistedState("card", {});
  const navigate = useNavigate();

  const addPizzaToCard = (pizzaId, pizzaName, pizzaPrice, pizzaImg) => {
    const newState = { ...card };
    if (pizzaId && !newState[pizzaId]) {
      newState[pizzaId] = {
        pizzaId,
        pizzaName,
        pizzaPrice,
        pizzaImg,
        quantity: 0,
      };
    }
    newState[pizzaId].quantity++;
    setCard(newState);
  };
  const removeFromCard = (pizzaId) => {
    const newState = { ...card };
    if (newState[pizzaId].quantity === 1) {
      delete newState[pizzaId];
    } else {
      newState[pizzaId].quantity--;
    }

    setCard(newState);
  };
  const removeAllFromCard = (pizzaId) => {
    const newState = { ...card };
    delete newState[pizzaId];
    setCard(newState);
  };

  const completeOrder = async (email) => {
    const pizzas = Object.keys(card).map((key) => ({
      pizzaId: key,
      pizzaName: card[key].pizzaName,
      pizzaPrice: card[key].pizzaPrice,
      pizzaImg: card[key].pizzaImg,
      quantity: card[key].quantity,
    }));
    await orderService.create(email, pizzas);
    setCard({});
    navigate(Path.Home);
  };

  const values = {
    card,
    addPizzaToCard,
    removeFromCard,
    removeAllFromCard,
    completeOrder,
  };
  return <CardContext.Provider value={values}>{children}</CardContext.Provider>;
};
CardContext.displayName = "CardContext";

export default CardContext;
