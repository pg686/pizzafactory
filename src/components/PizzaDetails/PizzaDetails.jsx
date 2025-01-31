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
import { useNavigate } from "react-router-dom";
import reducer from "../../reducers/commentsReducer.js";
import Path from "../../paths.js";
import * as likeService from "../../services/likeService.js";
import CardContext from "../../context/cardContext.jsx";
import OrderButton from "../../elements/OrderButton/OrderButton.jsx";
const PizzaDetails = () => {
  const { pizzaId } = useParams();
  const [pizza, setPizza] = useState({});
  const navigate = useNavigate();
  const [comments, dispatch] = useReducer(reducer, []);

  const { username, email, isAuthenticated, userId, imageUrl } =
    useContext(AuthContext);
  const { card, addPizzaToCard, removeFromCard } = useContext(CardContext);
  const isOwner = pizza._ownerId === userId;
  useEffect(() => {
    pizzaService.getOne(pizzaId).then((result) => {
      setPizza(result);
    });

    likeService.getPizzaLikes(pizzaId).then((result) => {
      setPizza((state) => ({
        ...state,
        likes: result,
      }));
    });

    commentService.getAllCommentsPerPizza(pizzaId).then((result) => {
      dispatch({
        type: actionTypes.GET_ALL_COMMENTS,
        payload: result,
      });
    });
  }, [pizzaId]);

  useEffect(() => {
    if (
      comments?.length &&
      comments.some((x) => x?.dislikes === undefined) &&
      comments.some((x) => x?.likes === undefined)
    ) {
      comments.forEach((currentComment) => {
        likeService
          .getCommentLikesAndDislikes(currentComment._id)
          .then((result) => {
            dispatch({
              type: actionTypes.UPDATE_COMMENT,
              payload: {
                ...currentComment,
                likes: result.likes,
                dislikes: result.dislikes,
              },
            });
          });
      });
    }
  }, [comments]);
  const addCommentHandler = async (values) => {
    const newComment = await commentService.createComment(
      pizzaId,
      values.comment,
    );
    newComment.owner = { username, email, imageUrl };
    dispatch({
      type: actionTypes.ADD_COMMENT,
      payload: newComment,
    });
  };

  const handleLike = async (email, comment, isLiked) => {
    const result = await likeService.likeComment(email, comment?._id, isLiked);
    dispatch({
      type: actionTypes.UPDATE_COMMENT,
      payload: {
        ...comment,
        likes: result
          ? [...comment.likes, email]
          : comment.likes.filter((x) => x !== email),
        dislikes: comment.dislikes.filter((x) => x !== email),
      },
    });
  };
  const handleDislike = async (email, comment, isDisliked) => {
    const result = await likeService.dislikeComment(
      email,
      comment?._id,
      isDisliked,
    );
    dispatch({
      type: actionTypes.UPDATE_COMMENT,
      payload: {
        ...comment,
        dislikes: result
          ? [...comment.dislikes, email]
          : comment.dislikes.filter((x) => x !== email),
        likes: comment.likes.filter((x) => x !== email),
      },
    });
  };
  const handleDelete = async (pizzaId) => {
    await pizzaService.remove(pizzaId);
    navigate(Path.Home);
  };

  const handlePizzaLike = async () => {
    if (Array.isArray(pizza.likes) && !pizza.likes.includes(email)) {
      console.log("like");
      try {
        await likeService.like(email, pizzaId);
        setPizza((state) => ({
          ...state,
          likes: [...state.likes, email],
        }));
      } catch (err) {
        console.log(err, "err");
      }
    }
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
            <div>{`${pizza?.likes?.length || 0} likes`}</div>
            <div>{`${comments?.length || 0} comments`}</div>
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
              <button
                onClick={() => handlePizzaLike()}
                disabled={pizza?.likes?.includes(email)}
                className="button tertiaryButton"
              >
                Like
              </button>
            )}
            <OrderButton
              addPizzaToCard={addPizzaToCard}
              removeFromCard={removeFromCard}
              productCount={card[pizzaId]?.quantity}
              pizzaId={pizzaId}
              pizzaImg={pizza.imageUrl}
              pizzaName={pizza.name}
              pizzaPrice={pizza.price}
            />
            {isOwner && (
              <button
                onClick={() => handleDelete(pizzaId)}
                className="button warningButton"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="commentsWrapper">
        <h2 className="commentsTitle">Comments</h2>
        <div className="comments">
          {comments.map((comment) => (
            <PizzaDetailsComment
              email={email}
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
                src={
                  imageUrl ||
                  "https://digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png"
                }
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
