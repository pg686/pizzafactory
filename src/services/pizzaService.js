import * as request from "../lib/request.js";
const baseUrl = "http://localhost:3030/jsonstore/pizzas";
export const getAllIngredients = async () => {
  const ingredientsUrl = "http://localhost:3030/jsonstore/ingredients";
  const result = await request.get(ingredientsUrl);
  console.log(result);
  return Object.values(result);
};

export const create = async (pizzaData) => {
  const result = await request.post(baseUrl, pizzaData);

  return result;
};

export const getAll = async () => {
  const result = await request.get(baseUrl);
  return Object.values(result);
};

export const getOne = async (id) => {
  const result = await request.get(`${baseUrl}/${id}`);
  return result;
};
