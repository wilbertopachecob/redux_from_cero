import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugRemoved,
  bugResolved,
  getUnresolvedBugs,
} from "./store/bugs";
import { projectAdded } from "./store/projects";

const store = configureStore();

const unsubscribe = store.subscribe(() => {
  console.log("Store Changed!", store.getState());
});

store.dispatch(projectAdded({ name: "My First Project" }));

store.dispatch(bugAdded({ description: "My first bug" }));
store.dispatch(bugAdded({ description: "My second bug" }));
store.dispatch(bugAdded({ description: "My third bug" }));

store.dispatch(bugResolved({ id: 1 }));

store.dispatch(bugRemoved({ id: 1 }));

const x = getUnresolvedBugs(store.getState());
const y = getUnresolvedBugs(store.getState());

console.log(x === y);

console.log(getUnresolvedBugs(store.getState()));
