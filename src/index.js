import configureStore from "./store/configureStore";
import {
  loadBugs,
  addBug, 
  resolveBug,
  assingBugToMember,
} from "./store/bugs";
import { projectAdded } from "./store/projects";
import { memberAdded } from "./store/members";

const store = configureStore();

const unsubscribe = store.subscribe(() => {
  console.log("Store Changed!", store.getState());
});

// store.dispatch(projectAdded({ name: "My First Project" }));

// store.dispatch(bugAdded({ description: "My first bug" }));
// store.dispatch(bugAdded({ description: "My second bug" }));
// store.dispatch(bugAdded({ description: "My third bug" }));

// store.dispatch(bugResolved({ id: 1 }));

// store.dispatch(bugRemoved({ id: 1 }));

// const x = getUnresolvedBugs(store.getState());
// const y = getUnresolvedBugs(store.getState());

// console.log(x === y);

// console.log(getUnresolvedBugs(store.getState()));

// store.dispatch(memberAdded({ name: "Wilberto Pacheco Batista" }));
// store.dispatch(bugAssingToMember({ bugId: 3, memberId: 1 }));

// console.log(getUnassingedBugs(store.getState()));
// console.log(getBugsByMemberId(1)(store.getState()));

// store.dispatch({ type: "error", payload: { message: "An error occured" } });

store.dispatch(loadBugs());
store.dispatch(addBug({ description: "My stored bug" }));
store.dispatch(resolveBug(1633803904496));
store.dispatch(assingBugToMember({id: 1633803904496, userId: 1}));