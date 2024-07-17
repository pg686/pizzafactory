import React from "react";
import "./PizzaListItem.modules.css";
import { Link } from "react-router-dom";
import { getPizzaDescription } from "../../../utils/utils.js";

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
          <a href="#" className="button">
            Order
          </a>
        </div>
        <div className="pizzaType">{`Price: ${price}`}</div>
      </div>
    </div>
  );
};

export default PizzaListItem;
