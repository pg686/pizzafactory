import * as request from "../lib/request.js";
const baseUrl = 'http://localhost:3030/data/comments';

export const getAllComments = async (pizzaId) => {
const query = new URLSearchParams({
    where: `pizzaId=${pizzaId}`,
    load: `owner=_ownerId:users`,
});

const result = await request.get(`${baseUrl}?${query}`);
 
return result;

}

export const createComment = async (pizzaId, text) => {
 const newComment = await request.post(baseUrl, { pizzaId, text, likes: 0, dislikes: 0 });

 return newComment;
}