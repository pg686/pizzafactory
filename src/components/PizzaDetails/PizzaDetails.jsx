import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import * as pizzaService from "../../services/pizzaService.js";
import * as commentService from "../../services/commentService.js";
import PizzaDetailsComment from "./PizzaDetailsComment.jsx";
import { getPizzaDescription } from "../../utils/utils.js";
import "./PizzaDetails.modules.css";
import useForm from "../../hooks/useForm.js";
import AuthContext from "../../context/authContext.js";

const PizzaDetails = () => {
  const { pizzaId } = useParams();
  const [pizza, setPizza] = useState({});
  const [comments, setComments] = useState([]);
  const { username, email, isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    if (pizzaId) {
      pizzaService.getOne(pizzaId).then((result) => {
        setPizza(result);
      });

      commentService.getAllComments(pizzaId).then((result) => {
        console.log(result, "getAllComments");
        setComments(result);
      });
    }
  }, [pizzaId]);

  const addCommentHandler = async (values) => {
    const newComment = await commentService.createComment(
      pizzaId,
      values.comment,
    );
    newComment.owner = { username, email };
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleLike = async (comment) => {
    if (!comment.likes?.includes(email)) {
      const result = await commentService.like(comment);
      updateComment(result);
    }
  };

  const handleDislike = async (comment) => {
    if (!comment.dislikes?.includes(email)) {
      const result = await commentService.dislike(comment);
      updateComment(result);
    }
  };

  const updateComment = (updatedComment) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === updatedComment._id
          ? { ...updatedComment, owner: { username, email } }
          : comment,
      ),
    );
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
            <Link to="" className="button secondaryButton">
              Edit
            </Link>
            <Link to="" className="button tertiaryButton">
              Like
            </Link>
            <Link to="" className="button">
              Order
            </Link>
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
