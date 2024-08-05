import { useContext, useEffect, useState } from "react";
import * as pizzaService from "../../services/pizzaService.js";
import PizzaListItem from "./PizzaListItem/PizzaListItem";
import * as likeService from "../../services/likeService.js";
import * as commentService from "../../services/commentService.js";
import Select from "react-select";

export default function PizzaList({ userId }) {
  const [pizzas, setPizzas] = useState([]);
  const [filterState, setFilterState] = useState({
    value: "all",
    label: "All",
  });
  const [sortState, setSortState] = useState({
    value: "descending likes",
    label: "Likes descending",
  });
  const optionsFilter = [
    { value: "all", label: "All" },
    { value: "vegan", label: "Vegan" },
    { value: "vegetarian", label: "Vegetarian" },
    { value: "meat", label: "Meat" },
  ];
  const optionSort = [
    { value: "descending  comments", label: "Comments descending" },
    { value: "ascending comments", label: "Comments ascending" },
    { value: "descending price", label: "Price descending" },
    { value: "ascending price", label: "Price ascending" },
    { value: "descending likes", label: "Likes descending" },
    { value: "ascending likes", label: "Likes ascending" },
  ];

  useEffect(() => {
    if (userId) {
      pizzaService.getAllFromUser(userId).then((result) => {
        setPizzas(result);
      });
    } else {
      pizzaService.getAll().then((result) => {
        setPizzas(result);
      });
    }
  }, []);

  useEffect(() => {
    if (pizzas?.length && pizzas?.some((x) => x.comments === undefined)) {
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
    if (pizzas?.length && pizzas?.some((x) => x.likes === undefined)) {
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

  const onChangeFilter = (e) => {
    setFilterState(e);
  };
  const onChangeSort = (e) => {
    setSortState(e);
  };
  return (
    <>
      <div className="selectMenu">
        <div className="selectMenuItem">
          <span>Type:</span>
          <Select
            options={optionsFilter}
            value={filterState}
            onChange={onChangeFilter}
          />
        </div>
        <div className="selectMenuItem">
          <span>Sort:</span>
          <Select
            options={optionSort}
            value={sortState}
            onChange={onChangeSort}
          />
        </div>
      </div>
      <div className="pizzaList">
        {pizzas.length ? (
          pizzas
            ?.filter((pizza) =>
              filterState.value !== "all"
                ? pizza.pizzaType === filterState.value
                : true,
            )
            .sort((a, b) => {
              const [type, parameter] = sortState.value?.split(" ");
              const isDescending = type === "descending";
              const isPrice = parameter === "price";

              const valueA = isPrice ? a[parameter] : a[parameter]?.length;
              const valueB = isPrice ? b[parameter] : b[parameter]?.length;

              return isDescending ? valueB - valueA : valueA - valueB;
            })
            .map((pizza) => {
              return (
                <PizzaListItem
                  key={pizza._id}
                  id={pizza._id}
                  name={pizza.name}
                  type={pizza.pizzaType}
                  likesNum={pizza?.likes?.length}
                  price={pizza.price}
                  image={pizza.imageUrl}
                  products={pizza.products}
                  comments={pizza?.comments?.length}
                />
              );
            })
        ) : (
          <div>No pizzas yet</div>
        )}
      </div>
    </>
  );
}
