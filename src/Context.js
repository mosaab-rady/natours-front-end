import React, { useEffect, useReducer } from 'react';
import { request } from './js/axios';

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

  useEffect(() => {
    if (
      document.cookie
        .split(';')
        .some((item) =>
          item.trim().startsWith('jwt_react=logged in sucessfully')
        ) &&
      !state.currentUser
    ) {
      const getMe = async () => {
        const response = await request(
          'GET',
          'http://localhost:5000/api/v1/users/me'
        );
        if (response)
          if (response.data.status === 'success')
            dispatch({ type: 'LOGGED_IN', payload: response.data.data.user });
      };
      getMe();
    }
  }, [state]);

  return (
    <myContext.Provider value={{ ...state, dispatch }}>
      {children}
    </myContext.Provider>
  );
}
