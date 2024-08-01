const reducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_COMMENTS":
      return [...action.payload];
    case "CREATE_COMMENT":
      return [...state, action.payload];
    case "UPDATE_COMMENT":
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
