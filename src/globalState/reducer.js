const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEPLA_LENGTH':
      return {
        ...state,
        sepalLength: action.payload,
      };
    case 'SET_SEPLA_WIDTH':
      return {
        ...state,
        sepalWidth: action.payload,
      };
    case 'SET_PETAL_LENGTH':
      return {
        ...state,
        petalLenght: action.payload,
      };
    case 'SET_PETAL_WIDTH':
      return {
        ...state,
        petalWidth: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
