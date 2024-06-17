import * as request from '../lib/request.js'

export const getAllIngredients = async () => {
    const ingredientsUrl = 'http://localhost:3030/jsonstore/ingredients'
    const result = await request.get(ingredientsUrl);
    return Object.values(result);
}