import { useEffect, useState } from "react";

import * as pizzaService from "../../services/pizzaService.js";
import PizzaListItem from "./PizzaListItem/PizzaListItem";

export default function PizzaList() {
  const [pizzas, setPizzas] = useState([]);
  useEffect(() => {
    if (!pizzas.length) {
      pizzaService.getAll().then((result) => {
        setPizzas(result);
      });
    }
  }, [pizzas]);

  return (
    <div className="pizzaListWapper">
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
