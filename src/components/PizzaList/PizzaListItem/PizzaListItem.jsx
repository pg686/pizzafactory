import React from 'react'
import "./PizzaListItem.modules.css";
import { Link } from "react-router-dom";

const PizzaListItem = ({  
_id,
name,
type,
likesNum,
price,
image,
products,
comments}) => {
const pizzaProducts = Object.values(products).reduce((acc, curr) => {
 const currentProducts = Object.entries(curr).filter(item => item[1].checked).map(item => item[0]);
 acc = [...acc, ...currentProducts];
 return acc;
}, []).join(', ');

  return (
    <div className="cardWrapper">
        <div className='cardTitle'>
            <h4>{name}</h4>
        </div>
        <img src={image} className="cardImg"  />
           <div className="cardInfo">
        <div className="likeAndComments">
          <div>{`${likesNum} likes`}</div>
          <div>{`${comments} comments`}</div>
        </div>
        <div className="pizzaDescriptionWrapper">
        <div className="pizzaDescription">
{pizzaProducts}
        </div>
        </div>
      <div className="pizzaType">
        {type}
      </div>
<div className="cardButtons">
<Link to={`/pizzas/${_id}`}  className="button">Details</Link>
  <a href="#" className="button">Order</a>
</div>
<div className="pizzaType">
        {`Price: ${price}`}
      </div>
           </div>
    </div>
  )
}

export default PizzaListItem