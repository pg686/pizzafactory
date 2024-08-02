import * as request from "../lib/request.js";

const baseUrl = "http://localhost:3030/data";
export const like = (email, pizzaId) =>
  request.post(`${baseUrl}/pizzaLikes`, { email, pizzaId });
export const getPizzaLikes = (pizzaId) => {
  const query = encodeURIComponent(`pizzaId="${pizzaId}"`);

  return request
    .get(`${baseUrl}/pizzaLikes?select=email&where=${query}`)
    .then((res) => res.map((x) => x.email));
};
