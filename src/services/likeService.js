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

export const likeComment = async (email, commentId, isLiked) => {
    const queryCommentId = encodeURIComponent(`commentId="${commentId}"`);
    let result;

    try {
        if (!isLiked) {
            await request.post(`${baseUrl}/commentLikes`, { email, commentId });
            result = true;
            const findDislike = await request.get(`${baseUrl}/commentDislikes?where=${queryCommentId}`);
            if (!!findEntryByUser(findDislike, email)) {
                await request.remove(`${baseUrl}/commentDislikes/${findEntryByUser(findDislike, email)._id}`);
            }
        } else {
            const getLikes = await request.get(`${baseUrl}/commentLikes?where=${queryCommentId}`);
            if(!!findEntryByUser(getLikes, email)){
            await request.remove(`${baseUrl}/commentLikes/${findEntryByUser(getLikes, email)._id}`);
            result = false;
            }
        }
    } catch (error) {
        console.error("Error liking comment:", error);
    } 

    return result;
};
const findEntryByUser = (collection, email)  => collection?.find((x) => x.email === email);
export const dislikeComment = async (email, commentId, isDisliked) => {
 
    const queryCommentId = encodeURIComponent(`commentId="${commentId}"`);
    let result;

    try {
        if (!isDisliked) {
            await request.post(`${baseUrl}/commentDislikes`, { email, commentId });
            result = true;
            const findLike = await request.get(`${baseUrl}/commentLikes?where=${queryCommentId}`);
            if (!!findEntryByUser(findLike, email)) {
                await request.remove(`${baseUrl}/commentLikes/${findEntryByUser(findLike, email)._id}`);
            }
        } else {
            const findDislikes = await request.get(`${baseUrl}/commentDislikes?where=${queryCommentId}`);
            if(!!findEntryByUser(findDislikes, email)){ 
            await request.remove(`${baseUrl}/commentDislikes/${findEntryByUser(findDislikes, email)._id}`);
             result = false;
            }
        }
    } catch (error) {
        console.error("Error disliking comment:", error);
    } 

    return result;
};

export const getCommentLikes = (commentId) => {
  const query = encodeURIComponent(`commentId="${commentId}"`);

  return request
    .get(`${baseUrl}/commentLikes?select=email&where=${query}`)
    .then((res) => res.map((x) => x.email));
};

export const getCommentDislikes = (commentId) => {
    const query = encodeURIComponent(`commentId="${commentId}"`);
let result = [];
try{
    return request
        .get(`${baseUrl}/commentDislikes?select=email&where=${query}`)
        .then((res) => res.map((x) => x.email));
}catch(e){
    return result;
}

}
export const getCommentLikesAndDislikes = async (commentId) => {
    const dislikes = await getCommentDislikes(commentId);
    const likes = await getCommentLikes(commentId);
    return {
        likes,
        dislikes,
    }
}