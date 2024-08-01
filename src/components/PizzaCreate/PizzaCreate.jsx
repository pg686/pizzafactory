import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as pizzaService from "../../services/pizzaService.js";
import { useParams } from "react-router-dom";

const CreateEditFormKeys = {
  Name: "name",
  ImageUrl: "imageUrl",
  Description: "description",
  Price: "price",
  PizzaType: "pizzaType",
  Products: "products",
};
export default function PizzaCreate() {
  const navigate = useNavigate();
  let { pizzaId } = useParams();
  const [pizza, setPizza] = useState({
    [CreateEditFormKeys.Name]: "",
    [CreateEditFormKeys.ImageUrl]: "",
    [CreateEditFormKeys.Description]: [],
    [CreateEditFormKeys.Price]: 0,
    [CreateEditFormKeys.PizzaType]: "vegan",
    [CreateEditFormKeys.Products]: {},
  });

  useEffect(() => {
    if (!pizzaId) {
      pizzaService.getAllIngredients().then((result) => {
        const filteredProducts = Object.entries(result[0]).filter(
          ([key]) => key !== "_id",
        );
        setPizza((state) => ({
          ...state,
          [CreateEditFormKeys.Products]: Object.fromEntries(filteredProducts),
        }));
      });
    } else {
      pizzaService.getOne(pizzaId).then((result) => {
        const filteredProducts = Object.entries(result.products).filter(
          ([key]) => key !== "_id",
        );
        setPizza({
          [CreateEditFormKeys.Name]: result.name,
          [CreateEditFormKeys.ImageUrl]: result.imageUrl,
          [CreateEditFormKeys.Description]: result.description,
          [CreateEditFormKeys.Price]: result.price,
          [CreateEditFormKeys.PizzaType]: result.pizzaType,
          [CreateEditFormKeys.Products]: Object.fromEntries(filteredProducts),
        });
      });
    }
  }, [pizzaId]);

  const onProductChange = (e) => {
    const { value, checked } = e.target;

    // Find the category and ingredient
    const category = Object.keys(pizza[CreateEditFormKeys.Products]).find(
      (cat) => value in pizza[CreateEditFormKeys.Products][cat],
    );
    if (!category) {
      console.error("Product not found in any category");
      return;
    }

    const ingredient = pizza[CreateEditFormKeys.Products][category][value];
    const ingredientPrice = ingredient.price;

    // Update products state
    const updatedProducts = {
      ...pizza[CreateEditFormKeys.Products],
      [category]: {
        ...pizza[CreateEditFormKeys.Products][category],
        [value]: { ...ingredient, checked },
      },
    };

    setPizza((state) => ({
      ...state,
      [CreateEditFormKeys.Products]: updatedProducts,
      [CreateEditFormKeys.Price]: checked
        ? state[CreateEditFormKeys.Price] + ingredientPrice
        : state[CreateEditFormKeys.Price] - ingredientPrice,
      [CreateEditFormKeys.Description]: checked
        ? [...state[CreateEditFormKeys.Description], value]
        : state[CreateEditFormKeys.Description].filter(
            (item) => item !== value,
          ),
    }));
    // Update pizza type
    const allCheckedIngredients = Object.values(updatedProducts).flatMap(
      (cat) => Object.values(cat).filter((item) => item.checked),
    );

    if (allCheckedIngredients.some((item) => item.type === "meat")) {
      setPizza((state) => ({
        ...state,
        [CreateEditFormKeys.PizzaType]: "meat",
      }));
    } else if (
      allCheckedIngredients.some((item) => item.type === "vegetarian")
    ) {
      setPizza((state) => ({
        ...state,
        [CreateEditFormKeys.PizzaType]: "vegetarian",
      }));
    } else {
      setPizza((state) => ({
        ...state,
        [CreateEditFormKeys.PizzaType]: "vegan",
      }));
    }
  };

  const createPizzaSubmitHandler = async (e) => {
    e.preventDefault();
    if (pizzaId) {
      try {
        await pizzaService.edit(pizzaId, {
          name: pizza.name,
          description: pizza.description,
          imageUrl: pizza.imageUrl,
          pizzaType: pizza.pizzaType,
          price: pizza.price,
          products: pizza.products,
          likes: [],
          comments: [],
        });

        navigate("/");
      } catch (err) {
        // Error notification
        console.log(err, "err");
      }
    } else {
      try {
        await pizzaService.create({
          name: pizza.name,
          description: pizza.description,
          imageUrl: pizza.imageUrl,
          pizzaType: pizza.pizzaType,
          price: pizza.price,
          products: pizza.products,
          likes: [],
          comments: [],
        });

        navigate("/");
      } catch (err) {
        // Error notification
        console.log(err, "err");
      }
    }
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setPizza((state) => ({
      ...state,
      [name]: value,
    }));
  };
  return (
    <div className="createWrapper">
      <div id="create-page">
        <form id="create" onSubmit={createPizzaSubmitHandler}>
          <div className="createPizzaContainer">
            <div className="pizzaInfoContainer">
              <h1>Create Pizza</h1>
              <div className="createPizzaInput">
                <label htmlFor="pizza-name">Pizza name:</label>
                <input
                  type="text"
                  id="name"
                  onChange={onChange}
                  name={CreateEditFormKeys.Name}
                  value={pizza?.[CreateEditFormKeys.Name]}
                  className="createPizzaInputBox"
                  placeholder="Enter pizza name..."
                />
              </div>
              <div className="createPizzaInput">
                <label htmlFor="pizza-img">Image:</label>
                <input
                  type="text"
                  id="imageUrl"
                  onChange={onChange}
                  name={CreateEditFormKeys.ImageUrl}
                  value={pizza?.[CreateEditFormKeys.ImageUrl]}
                  className="createPizzaInputBox"
                  placeholder="Upload a photo..."
                />
              </div>
              <div className="createPizzaInput">
                <label htmlFor="description">Description</label>
                <p>
                  {pizza?.[CreateEditFormKeys.Description]?.join(", ") || ""}
                </p>
              </div>
              <div className="createPizzaInput">
                <label htmlFor="price">Price</label>
                <p>{pizza?.[CreateEditFormKeys.Price]}</p>
              </div>
              <div className="createPizzaInput">
                <label htmlFor="type">Type</label>
                <p>{pizza?.[CreateEditFormKeys.PizzaType]}</p>
              </div>
            </div>
            <span className="line"></span>
            <div className="ingredients">
              {Object.keys(pizza[CreateEditFormKeys.Products]).map(
                (category) => (
                  <div className="ingredientsContainer" key={category}>
                    <h3>{category}</h3>
                    {Object.keys(
                      pizza?.[CreateEditFormKeys.Products][category],
                    ).map((ingredient) => (
                      <div className="ingredient" key={ingredient}>
                        <p>{ingredient}</p>
                        <label>
                          <input
                            type="checkbox"
                            className="pizzaIngedient"
                            value={ingredient}
                            onChange={onProductChange}
                            checked={
                              pizza[CreateEditFormKeys.Products][category][
                                ingredient
                              ].checked || false
                            }
                          />
                          <span className="checkBoxIngedient"></span>
                        </label>
                      </div>
                    ))}
                  </div>
                ),
              )}
            </div>
            <input className="btn submit" type="submit" value="Create Pizza" />
          </div>
        </form>
      </div>
    </div>
  );
}
