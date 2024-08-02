import { useEffect, useState } from "react";
import * as pizzaService from "../../services/pizzaService.js";
import PizzaListItem from "./PizzaListItem/PizzaListItem";
import * as likeService from "../../services/likeService.js";
import * as commentService from "../../services/commentService.js";

export default function PizzaList() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    pizzaService.getAll().then((result) => {
      setPizzas(result);
    });
  }, []);

  useEffect(() => {
    if (pizzas.length) {
      pizzas.forEach((currentPizza) => {
        commentService
          .getAllCommentsPerPizza(currentPizza._id)
          .then((result) => {
            setPizzas((prevState) =>
              prevState.map((x) =>
                x._id === currentPizza._id ? { ...x, comments: result } : x,
              ),
            );
          });
      });
    }
  }, [pizzas]);

  useEffect(() => {
    if (pizzas.length) {
      pizzas.forEach((currentPizza) => {
        likeService.getPizzaLikes(currentPizza._id).then((result) => {
          setPizzas((prevState) =>
            prevState.map((x) =>
              x._id === currentPizza._id ? { ...x, likes: result } : x,
            ),
          );
        });
      });
    }
  }, [pizzas]);

  return (
    <div className="pizzaListWrapper">
      <h1>Pizzas</h1>
      <div className="pizzaList">
        {pizzas.map((pizza) => {
          console.log(pizza, "pizza pizzaList");
          return (
            <PizzaListItem
              key={pizza._id}
              id={pizza._id}
              name={pizza.name}
              type={pizza.pizzaType}
              likesNum={pizza.likes.length}
              price={pizza.price}
              image={pizza.imageUrl}
              products={pizza.products}
              comments={pizza.comments.length}
            />
          );
        })}
      </div>
    </div>
  );
}
