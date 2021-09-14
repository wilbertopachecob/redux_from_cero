import { combineReducers } from "@reduxjs/toolkit";
import bugReducer from "./bugs";
import projectReducer from "./projects";


export default combineReducers({
    projectReducer,
    bugReducer,
})