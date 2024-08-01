import React, { useEffect, useState, useCallback } from "react";
import "./PizzaDetailsComment.modules.css";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import { getDate } from "../../utils/utils.js";

const PizzaDetailsComments = ({
  comment,
  handleLike,
  handleDislike,
  isAuthenticated,
}) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    if (comment) {
      const email = comment.owner?.email;
      const likes =
        Array.isArray(comment.likes) && comment.likes.includes(email);
      const dislikes =
        Array.isArray(comment.dislikes) && comment.dislikes.includes(email);

      setLiked(likes);
      setDisliked(dislikes && !likes);
    }
  }, [comment]);

  const handleLikeClick = useCallback(() => {
    setLiked((prevLiked) => {
      const newLiked = !prevLiked;
      if (newLiked) setDisliked(false);
      handleLike(comment, newLiked);
      return newLiked;
    });
  }, [comment, handleLike]);

  const handleDislikeClick = useCallback(() => {
    setDisliked((prevDisliked) => {
      const newDisliked = !prevDisliked;
      if (newDisliked) setLiked(false);
      handleDislike(comment, newDisliked);
      return newDisliked;
    });
  }, [comment, handleDislike]);

  return (
    <div className="commentContainer">
      <div className="commentProfile">
        <img
          src="https://pg686.github.io/cuttie/images/andrew.jpg"
          alt="comment profile"
          className="commentImg"
        />
      </div>
      <div className="commentContent">
        <div className="commentOwner">{comment.owner.username}</div>
        <div className="commentData">
          <div className="timePosted">{getDate(comment._createdOn)}</div>
          <div className="reactions">
            <span>{comment.likes?.length ?? 0}</span>
            {liked && isAuthenticated ? (
              <AiFillLike onClick={handleLikeClick} className="likeDislike" />
            ) : (
              <AiOutlineLike
                onClick={handleLikeClick}
                className="likeDislike"
              />
            )}
            <span>{comment.dislikes?.length ?? 0}</span>
            {disliked && isAuthenticated ? (
              <AiFillDislike
                onClick={handleDislikeClick}
                className="likeDislike"
              />
            ) : (
              <AiOutlineDislike
                onClick={handleDislikeClick}
                className="likeDislike"
              />
            )}
          </div>
        </div>
        <div className="commentDescription">{comment.text}</div>
      </div>
    </div>
  );
};

export default PizzaDetailsComments;
