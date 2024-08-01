import React, { useEffect, useState, useContext, useReducer } from "react";
import { useParams, Link } from "react-router-dom";
import * as pizzaService from "../../services/pizzaService.js";
import * as commentService from "../../services/commentService.js";
import PizzaDetailsComment from "./PizzaDetailsComment.jsx";
import { getPizzaDescription } from "../../utils/utils.js";
import "./PizzaDetails.modules.css";
import useForm from "../../hooks/useForm.js";
import AuthContext from "../../context/authContext";
import * as actionTypes from "../../constants/actionTypes.js";
import reducer from "../../reducers/commentsReducer.js";

const PizzaDetails = () => {
  const { pizzaId } = useParams();
  const [pizza, setPizza] = useState({});
  const [comments, dispatch] = useReducer(reducer, []);
  const { username, email, isAuthenticated, userId } = useContext(AuthContext);
  const isOwner = pizza._ownerId === userId;
  useEffect(() => {
    pizzaService.getOne(pizzaId).then((result) => {
      setPizza(result);
    });

    commentService.getAllComments(pizzaId).then((result) => {
      dispatch({
        type: actionTypes.GET_ALL_COMMENTS,
        payload: result,
      });
    });
  }, [pizzaId]);

  const addCommentHandler = async (values) => {
    const newComment = await commentService.createComment(
      pizzaId,
      values.comment,
    );
    newComment.owner = { username, email };
    dispatch({
      type: actionTypes.ADD_COMMENT,
      payload: newComment,
    });
    console.log(comments, "all comments");
  };

  const handleLike = async (comment, isLiked) => {
    const result = await commentService.like(comment, isLiked);
    result.owner = { username, email };
    dispatch({
      type: actionTypes.UPDATE_COMMENT,
      payload: result,
    });
  };

  const handleDislike = async (comment, isDisliked) => {
    const result = await commentService.dislike(comment, isDisliked);
    result.owner = { username, email };
    dispatch({
      type: actionTypes.UPDATE_COMMENT,
      payload: result,
    });
  };

  const { values, onChange, onSubmit } = useForm(addCommentHandler, {
    comment: "",
  });

  return (
    <div className="pizzaDetailsWrapper">
      <div className="pizzaDetails">
        <div className="pizzaImageWrapper">
          <img src={pizza.imageUrl} alt={pizza.name} className="pizzaImg" />
          <div className="likeAndComments">
            <div>{`${pizza.likes?.length || 0} likes`}</div>
            <div>{`${pizza.comments?.length || 0} comments`}</div>
          </div>
        </div>

        <div className="pizzaInfo">
          <h1 className="pizzaName">{pizza.name}</h1>
          <div className="pizzaDescription">
            {pizza.products && getPizzaDescription(pizza.products)}
          </div>
          <div className="pizzaPrice">{`Price: ${pizza.price}`}</div>
          <div className="pizzaType">{pizza.pizzaType}</div>
          <div className="pizzaDetailsButtons">
            {isOwner && (
              <Link
                to={`/pizzas/${pizzaId}/edit`}
                className="button secondaryButton"
              >
                Edit
              </Link>
            )}
            {!isOwner && (
              <Link to="" className="button tertiaryButton">
                Like
              </Link>
            )}
            <Link to="" className="button">
              Order
            </Link>
            {isOwner && (
              <Link
                to="/pizzas/:pizzaId/delete"
                className="button warningButton"
              >
                Delete
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="commentsWrapper">
        <h2 className="commentsTitle">Comments</h2>
        <div className="comments">
          {comments.map((comment) => (
            <PizzaDetailsComment
              key={comment._id}
              comment={comment}
              handleLike={handleLike}
              handleDislike={handleDislike}
              isAuthenticated={isAuthenticated}
            />
          ))}
          <div className="addComment">
            <div className="ownerInfo">
              <img
                src="https://pg686.github.io/cuttie/images/andrew.jpg"
                alt={username}
                className="commentImg"
              />
              <div className="commentOwner">{username}</div>
            </div>
            <form className="form" onSubmit={onSubmit}>
              <textarea
                name="comment"
                value={values.comment}
                className="comment"
                onChange={onChange}
                placeholder="Comment..."
              ></textarea>
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
