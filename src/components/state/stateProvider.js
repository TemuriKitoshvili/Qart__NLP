import React, { createContext, useContext, useReducer } from 'react';

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider
    value={useReducer(reducer, initialState, () => {
      const localStateData = localStorage.getItem('stateData');
      return localStateData ? JSON.parse(localStateData) : initialState;
    })}
  >
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
