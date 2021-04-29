import React, { useReducer } from 'react';

export const myContext = React.createContext(null);

const reducer = (state, action) => {
  if (action.type === 'LOGGED_IN') {
    return { ...state, currentUser: action.payload };
  }
  if (action.type === 'LOG_OUT') {
    return { ...state, currentUser: null };
  }
};

const initialState = {
  currentUser: null,
};

export default function Context({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <myContext.Provider value={{ ...state, dispatch }}>
      {children}
    </myContext.Provider>
  );
}
