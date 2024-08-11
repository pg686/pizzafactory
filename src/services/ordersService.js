import * as request from "../lib/request.js";

const baseUrl = "http://localhost:3030/data/orders";

export const create = (email, pizzas) =>
  request.post(`${baseUrl}`, { email, pizzas });

export const getAllForUser = async (userId) => {
  const query = new URLSearchParams({
    where: `_ownerId="${userId}"`,
  });
  try {
    const result = await request.get(`${baseUrl}?${query}`);
    return result;
  } catch (err) {}
};
