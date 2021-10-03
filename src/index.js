import configureStore from "./store/configureStore";
import {
  loadBugs,
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
import { apiCallBegan, apiCallFailed, apiCallSuccess } from "./store/api";

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

// const HOST = 'http://localhost:9001/api/';
// fetch(HOST+'bugs').then(response => response.json()).then(console.log);

store.dispatch(loadBugs());

// store.dispatch({
//   type: apiCallBegan.type,
//   payload: {
//     url: "bugs",
//     method: "GET",
//     // onSucess: "bugAddBulk",
//     onSucess: bugAddBulk,
//     onFail: "error",
//   },
// });

// store.dispatch({
//   type: "bugAddBulk",
//   payload: [
//     {
//       id: 1,
//       description: "Bug 1",
//       userId: 1,
//       resolved: true,
//     },
//     {
//       id: 2,
//       description: "Bug 2",
//       userId: 1,
//     },
//     {
//       id: 3,
//       description: "Bug 3",
//       userId: 2,
//     },
//     {
//       id: 4,
//       description: "Bug 4",
//     },
//   ],
// });
