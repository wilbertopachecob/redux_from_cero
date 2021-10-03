import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";

import { createSelector } from "reselect";

import { apiCallBegan } from "./api";

import { REST_ENDPOINTS } from "../constants/rest-endpoints";

//reducers
let lastID = 0;

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugAddBulk: (bugs, action) => {
      bugs.list = action.payload;
    },
    bugAdded: (bugs, action) => {
      bugs.list.push({
        id: ++lastID,
        description: action.payload.description,
        resolved: false,
        memberId: action.payload.memberId,
      });
    },
    bugRemoved: (bugs, action) => {
      return bugs.list.filter((bug) => bug.id !== action.payload.id);
      // const index = bugs.findIndex((bug) => bug.id === action.payload.id);
      // if (index !== -1) {
      //   // delete bugs[index];
      // }
    },
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      if (index !== -1) {
        bugs.list[index].resolved = true;
      }
    },
    bugAssingToMember: (bugs, action) => {
      const index = bugs.list.findIndex(
        (bug) => bug.id === action.payload.bugId
      );
      if (index !== -1) {
        bugs.list[index].memberId = action.payload.memberId;
      }
    },
  },
});

export const {
  bugAdded,
  bugResolved,
  bugRemoved,
  bugAssingToMember,
  bugAddBulk,
} = slice.actions;

//actions creators
export const loadBugs = () =>
  apiCallBegan({
    url: REST_ENDPOINTS.GET_BUGS,
    onSucess: bugAddBulk.type,
  });

//selectors
// export const getUnresolvedBugs = (state) => state.entities.bugs.filter(bug => !bug.resolved);

//Implementing Memoization
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs.list,
  (bugs) => bugs.filter((bug) => !bug.resolved)
);

export const getUnassingedBugs = createSelector(
  (state) => state.entities.bugs.list,
  (bugs) => bugs.filter((bug) => [undefined, null].includes(bug.memberId))
);

export const getBugsByMemberId = (memberId) =>
  createSelector(
    (state) => state.entities.bugs.list,
    (bugs) => bugs.filter((bug) => bug.memberId === memberId)
  );

export default slice.reducer;

// console.log(slice);

//actions
// export const bugAdded = createAction('bugAdded')
// export const bugRemoved = createAction('bugRemoved');
// export const bugResolved = createAction('bugResolved');

// const reducer = createReducer([], {
//   [bugAdded.type]: (bugs, action) => {
//     bugs.push({
//       id: ++lastID,
//       description: action.payload.description,
//       resolved: false,
//     });
//   },
//   [bugRemoved.type]: (bugs, action) => {
//     const index = bugs.findIndex((bug) => bug.id === action.payload.id);
//     if (index !== -1) {
//       delete bugs[index];
//     }
//   },
//   [bugResolved.type]: (bugs, action) => {
//     const index = bugs.findIndex((bug) => bug.id === action.payload.id);
//     if (index !== -1) {
//       bugs[index].resolved = true;
//     }
//   }
// });

// export default reducer;

// export default function reducer(state = [], action) {
//   switch (action.type) {
//     case bugAdded.type:
//       return [
//         ...state,
//         {
//           id: ++lastID,
//           description: action.payload.description,
//           resolved: false,
//         },
//       ];
//     case bugRemoved.type:
//       return state.filter((bug) => bug.id !== action.payload.id);
//     case bugResolved.type:
//       return state.map((bug) =>
//         bug.id === action.payload.id ? { ...bug, resolved: true } : bug
//       );
//     default:
//       return state;
//   }
// }
