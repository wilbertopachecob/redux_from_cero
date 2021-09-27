import { combineReducers } from "redux";
import bugReducer from "./bugs";
import projectReducer from "./projects";
import memberReducer from "./members";


export default combineReducers({
    projects: projectReducer,
    bugs: bugReducer,
    members: memberReducer,
})