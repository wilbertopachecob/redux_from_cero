// import { createStore } from "redux";
// import createStore from "./customStore";
import reducer from "./bugs";
import { configureStore } from "@reduxjs/toolkit";

export default function () {
  const store = configureStore(
    reducer
  );
  return store;  
};
