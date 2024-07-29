import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as pizzaService from "../../services/pizzaService.js";
import * as commentService from "../../services/commentService.js";
import PizzaDetailsComment from "./PizzaDetailsComment.jsx";
import { getPizzaDescription } from "../../utils/utils.js";
import "./PizzaDetails.modules.css";
import useForm from "../../hooks/useForm.js";
import { useContext } from "react";
import AuthContext from "../../context/authContext.js";
import { Link } from "react-router-dom";
const PizzaDetails = () => {
  let { pizzaId } = useParams();
  const [pizza, setPizza] = useState({});
  const [comments, setComments] = useState([]);
  const { username, userId } = useContext(AuthContext);

  useEffect(() => {
    if (pizzaId) {
      pizzaService.getOne(pizzaId).then((result) => {
        setPizza(result);
      });

      commentService.getAllComments(pizzaId).then((result) => {
setComments(result);
      });
    }
  }, [pizzaId]);
  const addCommentHandler = async (values) => {
   const newComment = await commentService.createComment(pizzaId, values.comment);
newComment.owner = { username };

setComments(state => [...state, newComment]);


  }
  const { values, onChange, onSubmit } = useForm(addCommentHandler, {
    comment: '',
});

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
          {comments.map((comment) => (
            <PizzaDetailsComment key={comment._id} comment={comment} />
          ))}
          <div className="addComment">
            <div className="ownerInfo">
              <img
                src="https://pg686.github.io/cuttie/images/andrew.jpg"
                alt=""
                className="commentImg"
              />

              <div className="commentOwner">{username}</div>
            </div>
            <form className="form" onSubmit={onSubmit}>
            <textarea name="comment" value={values.comment} className="comment"  onChange={onChange}  placeholder="Comment......"></textarea>
            <div className="commentSubmitWrapper">
              <button className="commentSubmit">Add comment</button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaDetails;
