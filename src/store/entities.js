import { combineReducers } from "redux";
import bugReducer from "./bugs";
import projectReducer from "./projects";


export default combineReducers({
    projects: projectReducer,
    bugs: bugReducer,
})