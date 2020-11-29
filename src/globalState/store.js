import React, { createContext, useReducer } from 'react';
import Reducer from './reducer';

const initialState = {
  sepalLength: 5,
  sepalWidth: 3.1,
  petalLenght: 7.1,
  petalWidth: 1,
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
