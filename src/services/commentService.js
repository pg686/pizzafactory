import * as request from "../lib/request.js";

const baseUrl = 'http://localhost:3030/data/comments';

export const getAllComments = async (pizzaId) => {
    const query = new URLSearchParams({
        where: `pizzaId="${pizzaId}"`,
        load: `owner=_ownerId:users`,
    });

    try {
        const result = await request.get(`${baseUrl}?${query}`);
        return result;
    } catch (error) {
        console.error('Failed to fetch comments', error);
        throw error;
    }
};

export const createComment = async (pizzaId, text) => {
    try {
        const newComment = await request.post(baseUrl, { pizzaId, text, likes: [], dislikes: [] });
        return newComment;
    } catch (error) {
        console.error('Failed to create comment', error);
        throw error;
    }
};

export const like = async (comment) => {
    const updatedComment = {
        ...comment,
        likes: [...comment.likes, comment.owner.email],
        dislikes: comment.dislikes.filter(dislike => dislike !== comment.owner.email),
    };

    try {
        const result = await request.put(`${baseUrl}/${comment._id}`, updatedComment);
        return result;
    } catch (error) {
        console.error('Failed to like comment', error);
        throw error;
    }
};

export const dislike = async (comment) => {
    const updatedComment = {
        ...comment,
        dislikes: [...comment.dislikes, comment.owner.email],
        likes: comment.likes.filter(like => like !== comment.owner.email),
    };

    try {
        const result = await request.put(`${baseUrl}/${comment._id}`, updatedComment);
        return result;
    } catch (error) {
        console.error('Failed to dislike comment', error);
        throw error;
    }
};