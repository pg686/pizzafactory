import React, { useEffect, useState } from "react";
import "./PizzaDetailsComment.modules.css";
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from "react-icons/ai";
import { getDate } from "../../utils/utils.js";
import * as commentService from "../../services/commentService.js";

const PizzaDetailsComments = ({ comment, handleLike, handleDislike, isAuthenticated }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    if (comment) {
      const email = comment?.owner?.email;
      const likes = Array.isArray(comment?.likes) && comment.likes.includes(email);
      const dislikes = Array.isArray(comment?.dislikes) && comment.dislikes.includes(email);

      setLiked(likes);
      setDisliked(dislikes && !likes); // Ensuring setDisliked is not true if setLiked is true
    }
  }, [comment]);

  const handleLikeClick = () => {
    setLiked(true);
    setDisliked(false);
    handleLike(comment);
  };

  const handleDislikeClick = () => {
    setLiked(false);
    setDisliked(true);
    handleDislike(comment);
  };

  return (
    <div className="commentContainer">
      <div className="commentProfile">
        <img
          src="https://pg686.github.io/cuttie/images/andrew.jpg"
          alt=""
          className="commentImg"
        />
      </div>
      <div className="commentContent">
        <div className="commentOwner">{comment.owner.username}</div>
        <div className="commentData">
          <div className="timePosted">{getDate(comment._createdOn)}</div>
          <div className="reactions">
            <span>{comment?.likes?.length}</span>
            {liked && isAuthenticated ? (
              <AiFillLike className="likeDislike" />
            ) : (
              <AiOutlineLike onClick={handleLikeClick} className="likeDislike" />
            )}
            <span>{comment?.dislikes?.length}</span>
            {disliked && isAuthenticated ? (
              <AiFillDislike className="likeDislike" />
            ) : (
              <AiOutlineDislike onClick={handleDislikeClick} className="likeDislike" />
            )}
          </div>
        </div>
        <div className="commentDescription">
          {comment.text}
        </div>
      </div>
    </div>
  );
};

export default PizzaDetailsComments;