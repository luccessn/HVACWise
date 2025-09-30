/* eslint-disable prettier/prettier */
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Initials, Reducer } from "./Reducer";
//Uniqei8 Toke For Every Browsers
//უსაფრთხო Base64
const safeEncode = (str) => {
  return btoa(unescape(encodeURIComponent(str)));
};
const safeDecode = (str) => {
  return decodeURIComponent(escape(atob(str)));
};
const getInitialState = () => {
  const token = localStorage.getItem("hvacToken");
  let hvacItems = [];
  if (token) {
    try {
      const decoded = safeDecode(token);
      hvacItems = JSON.parse(decoded);
    } catch (err) {
      localStorage.removeItem("hvacToken");
    }
  }
  return { ...Initials, hvacItems };
};
export const Appcontext = createContext();
export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, Initials, getInitialState);
  useEffect(() => {
    try {
      const token = safeEncode(JSON.stringify(state.hvacItems));
      localStorage.setItem("hvacToken", token);
    } catch (err) {
      // console.error("ჩაიშალა კოვზი ნაცარში N1:", err);
    }
  }, [state.hvacItems]);

  return (
    <Appcontext.Provider value={{ state, dispatch }}>
      {children}
    </Appcontext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(Appcontext);
  if (context) {
    return context;
  }
  throw new Error("UseAppcontext is Not Working");
};
