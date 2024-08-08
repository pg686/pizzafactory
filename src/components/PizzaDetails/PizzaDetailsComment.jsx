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
  email,
  comment,
  handleLike,
  handleDislike,
  isAuthenticated,
}) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  useEffect(() => {
    if (comment) {
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
      handleLike(email, comment, prevLiked);
      return newLiked;
    });
  }, [email, comment, handleLike]);

  const handleDislikeClick = useCallback(() => {
    setDisliked((prevDisliked) => {
      const newDisliked = !prevDisliked;
      if (newDisliked) setLiked(false);
      handleDislike(email, comment, prevDisliked);
      return newDisliked;
    });
  }, [email, comment, handleDislike]);

  return (
    <div className="commentContainer">
      <div className="commentProfile">
        <img
          src={
            comment.owner.imageUrl ||
            "https://digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png"
          }
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
