import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as pizzaService from "../../services/pizzaService.js";
import { useParams } from "react-router-dom";

export default function PizzaCreate() {
  const navigate = useNavigate();
  let { pizzaId } = useParams();

  const [products, setProducts] = useState({});
  const [description, setDescription] = useState([]);
  const [pizzaType, setPizzaType] = useState("vegan");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (!pizzaId) {
      pizzaService.getAllIngredients().then((result) => {
        console.log(result, "result");
        const filteredProducts = Object.entries(result[0]).filter(
          ([key]) => key !== "_id",
        );
        setProducts(Object.fromEntries(filteredProducts));
      });
    }
  }, [pizzaId]);

  const onProductChange = (e) => {
    const { value, checked } = e.target;

    // Find the category and ingredient
    const category = Object.keys(products).find(
      (cat) => value in products[cat],
    );
    if (!category) {
      console.error("Product not found in any category");
      return;
    }

    const ingredient = products[category][value];
    const ingredientPrice = ingredient.price;

    // Update products state
    const updatedProducts = {
      ...products,
      [category]: {
        ...products[category],
        [value]: { ...ingredient, checked },
      },
    };

    setProducts(updatedProducts);

    // Update price and description
    setPrice((prevPrice) =>
      checked ? prevPrice + ingredientPrice : prevPrice - ingredientPrice,
    );
    setDescription((prevDescription) =>
      checked
        ? [...prevDescription, value]
        : prevDescription.filter((item) => item !== value),
    );

    // Update pizza type
    const allCheckedIngredients = Object.values(updatedProducts).flatMap(
      (cat) => Object.values(cat).filter((item) => item.checked),
    );

    if (allCheckedIngredients.some((item) => item.type === "meat")) {
      setPizzaType("meat");
    } else if (
      allCheckedIngredients.some((item) => item.type === "vegetarian")
    ) {
      setPizzaType("vegetarian");
    } else {
      setPizzaType("vegan");
    }
  };

  const createPizzaSubmitHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    let name = formData.get("name");

    let imageUrl = formData.get("imageUrl");

    try {
      await pizzaService.create({
        name,
        description,
        imageUrl,
        pizzaType,
        price,
        products,
        likes: [],
        comments: [],
      });

      navigate("/");
    } catch (err) {
      // Error notification
      console.log(err, "err");
      console.log("efkfd");
    }
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
                  name="name"
                  className="createPizzaInputBox"
                  placeholder="Enter pizza name..."
                />
              </div>
              <div className="createPizzaInput">
                <label htmlFor="pizza-img">Image:</label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  className="createPizzaInputBox"
                  placeholder="Upload a photo..."
                />
              </div>
              <div className="createPizzaInput">
                <label htmlFor="description">Description</label>
                <p>{description.join(", ") || ""}</p>
              </div>
              <div className="createPizzaInput">
                <label htmlFor="price">Price</label>
                <p>{price}</p>
              </div>
              <div className="createPizzaInput">
                <label htmlFor="type">Type</label>
                <p>{pizzaType}</p>
              </div>
            </div>
            <span className="line"></span>
            <div className="ingredients">
              {Object.keys(products).map(
                (category) => (
                  console.log(category, "category"),
                  (
                    <div className="ingredientsContainer" key={category}>
                      <h3>{category}</h3>
                      {Object.keys(products[category]).map((ingredient) => (
                        <div className="ingredient" key={ingredient}>
                          <p>{ingredient}</p>
                          <label>
                            <input
                              type="checkbox"
                              className="pizzaIngedient"
                              value={ingredient}
                              onChange={onProductChange}
                              checked={
                                products[category][ingredient].checked || false
                              }
                            />
                            <span className="checkBoxIngedient"></span>
                          </label>
                        </div>
                      ))}
                    </div>
                  )
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
