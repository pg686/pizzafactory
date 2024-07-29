import React from "react";
import "./PizzaDetailsComment.modules.css";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import {getDate} from "../../utils/utils.js";
const PizzaDetailsComments = ({comment}) => {
  console.log(comment, "comment");
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
            <span>{comment.likes}</span>
            <AiOutlineLike className="likeDislike" />
            <span>{comment.dislikes}</span>
            <AiOutlineDislike className="likeDislike" />
          </div>
        </div>
        <div className="commentDescription">
          {
            comment.text
          }
        </div>
      </div>
    </div>
  );
};

export default PizzaDetailsComments;
