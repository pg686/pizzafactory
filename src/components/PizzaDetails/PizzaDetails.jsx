import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as pizzaService from "../../services/pizzaService.js";
import PizzaDetailsComment from "./PizzaDetailsComment.jsx";
import { getPizzaDescription } from "../../utils/utils.js";
import "./PizzaDetails.modules.css";
import { Link } from "react-router-dom";
const PizzaDetails = () => {
  let { pizzaId } = useParams();
  const [pizza, setPizza] = useState({});

  useEffect(() => {
    if (pizzaId) {
      pizzaService.getOne(pizzaId).then((result) => {
        setPizza(result);
      });
    }
  }, [pizzaId]);

  console.log(pizza, "pizza");
  return (
    <div className="pizzaDetailsWrapper">
      {" "}
      <div className="pizzaDetails">
        <div className="pizzaImageWrapper">
          <img src={pizza?.imageUrl} className="pizzaImg" />
          <div className="likeAndComments">
            <div>{`${pizza?.likes?.length} likes`}</div>
            <div>{`${pizza?.comments?.length} comments`}</div>
          </div>
        </div>

        <div className="pizzaInfo">
          <h1 className="pizzaName"> {pizza?.name}</h1>

          <div className="pizzaDescription">
            {pizza?.products && getPizzaDescription(pizza.products)}
          </div>
          <div className="pizzaPrice">{`Price: ${pizza?.price}`}</div>
          <div className="pizzaType">{pizza?.pizzaType}</div>
          <div className="pizzaDetailsButtons">
            <Link to={``} className="button secondaryButton">
              Edit
            </Link>

            <Link to={``} className="button tertiaryButton">
              Like
            </Link>
            <Link to={``} className="button">
              Order
            </Link>
          </div>
        </div>
      </div>
      <div className="commentsWrapper">
        <h2 className="commentsTitle">Comments</h2>
        <div className="comments">
          <PizzaDetailsComment />
          <div className="addComment">
            <div className="ownerInfo">
              <img
                src="https://pg686.github.io/cuttie/images/andrew.jpg"
                alt=""
                className="commentImg"
              />

              <div className="commentOwner">Ivan</div>
            </div>
            <textarea className="comment"></textarea>
            <div className="commentSubmitWrapper">
              <button className="commentSubmit">Add comment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaDetails;
