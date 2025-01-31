import * as request from "../lib/request.js";
const baseUrl = "http://localhost:3030/data/pizzas";
export const getAllIngredients = async () => {
  const ingredientsUrl = "http://localhost:3030/jsonstore/ingredients";
  const result = await request.get(ingredientsUrl);
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
export const getAllFromUser = async (userId) => {
  const query = new URLSearchParams({
    where: `_ownerId="${userId}"`,
  });
  try {
    const result = await request.get(`${baseUrl}?${query}`);
    return result;
  } catch (err) {}
};
export const edit = async (pizzaId, pizzaData) => {
  const result = await request.put(`${baseUrl}/${pizzaId}`, pizzaData);

  return result;
};
export const remove = async (pizzaId) => {
  const result = await request.remove(`${baseUrl}/${pizzaId}`);

  return result;
};
