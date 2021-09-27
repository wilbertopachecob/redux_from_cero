import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugAssingToMember,
  getUnresolvedBugs,
  getUnassingedBugs,
  getBugsByMemberId,
} from "./store/bugs";
import { projectAdded } from "./store/projects";
import { memberAdded } from "./store/members";

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

store.dispatch(memberAdded({ name: "Wilberto Pacheco Batista" }));
store.dispatch(bugAssingToMember({ bugId: 3, memberId: 1 }));

console.log(getUnassingedBugs(store.getState()));
console.log(getBugsByMemberId(1)(store.getState()));