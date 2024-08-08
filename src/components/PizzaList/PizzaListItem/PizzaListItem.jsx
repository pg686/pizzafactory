import React from "react";
import "./PizzaListItem.modules.css";
import { Link } from "react-router-dom";
import { getPizzaDescription } from "../../../utils/utils.js";
import OrderButton from "../../../elements/OrderButton/OrderButton.jsx";
import { useContext } from "react";
import CardContext from "../../../context/cardContext.jsx";
const PizzaListItem = ({
  id,
  name,
  type,
  likesNum,
  price,
  image,
  products,
  comments,
}) => {
  const { card, addPizzaToCard, removeFromCard } = useContext(CardContext);
  return (
    <div className="cardWrapper">
      <div className="cardTitle">
        <h4>{name}</h4>
      </div>
      <img src={image} className="cardImg" />
      <div className="cardInfo">
        <div className="likeAndComments">
          <div>{`${likesNum} likes`}</div>
          <div>{`${comments} comments`}</div>
        </div>
        <div className="pizzaDescriptionWrapper">
          <div className="pizzaDescription">
            {getPizzaDescription(products)}
          </div>
        </div>
        <div className="pizzaType">{type}</div>
        <div className="cardButtons">
          <Link to={`/pizzas/${id}`} className="button">
            Details
          </Link>
          <OrderButton
            addPizzaToCard={addPizzaToCard}
            removeFromCard={removeFromCard}
            card={card}
            pizzaId={id}
            pizzaImg={image}
            pizzaName={name}
            pizzaPrice={price}
          />
        </div>
        <div className="pizzaType">{`Price: ${price}`}</div>
      </div>
    </div>
  );
};

export default PizzaListItem;
