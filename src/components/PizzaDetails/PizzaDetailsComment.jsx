import React from "react";
import "./PizzaDetailsComment.modules.css";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
const PizzaDetailsComments = () => {
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
        <div className="commentOwner">Ivan</div>
        <div className="commentData">
          <div className="timePosted">{"12.12.2021"}</div>
          <div className="reactions">
            <span>{"0"}</span>
            <AiOutlineLike className="likeDislike" />
            <AiOutlineDislike className="likeDislike" />
          </div>
        </div>
        <div className="commentDescription">
          {
            "fsdffsf sdffsdfsdffsdfsdff sdfsdffsdfsd ffsdfsdffsdf sdffsdfsdf fsdfsdffsdfsdffsddfsdffsd"
          }
        </div>
      </div>
    </div>
  );
};

export default PizzaDetailsComments;
