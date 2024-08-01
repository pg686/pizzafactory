import * as actionTypes from "../constants/actionTypes.js";
const reducer = (state, action) => {
  switch (action?.type) {
    case actionTypes.GET_ALL_COMMENTS:
      return [...action.payload];
    case actionTypes.ADD_COMMENT:
      return [...state, action.payload];
    case actionTypes.UPDATE_COMMENT:
      return [
        ...state.map((comment) => {
          if (comment._id === action.payload._id) {
            return action.payload;
          }
          return comment;
        }),
      ];
    default:
      return state;
  }
};

export default reducer;
