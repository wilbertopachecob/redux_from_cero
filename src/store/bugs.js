import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";

import { createSelector } from "reselect";
import { differenceInMinutes } from "date-fns";
import { apiCallBegan } from "./api";

import { REST_ENDPOINTS } from "../constants/rest-endpoints";

const CACHE_LIMIT = 10;

// let lastID = 0;

//reducers
const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugRequested: (bugs, action) => {
      bugs.loading = true;
    },
    bugRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },
    bugAddBulk: (bugs, action) => {
      bugs.list = action.payload;
      // bugRequestFailed();
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },
    bugAdded: (bugs, action) => {
      // bugs.list.push({
      //   id: ++lastID,
      //   description: action.payload.description,
      //   resolved: false,
      //   memberId: action.payload.memberId,
      // });
      bugs.list.push(action.payload);
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
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      if (index !== -1) {
        bugs.list[index].userId = action.payload.userId;
      }
    },
  },
});

const {
  bugAdded,
  bugResolved,
  bugRemoved,
  bugAssingToMember,
  bugAddBulk,
  bugRequested,
  bugRequestFailed,
} = slice.actions;

//actions creators
export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;
  if (differenceInMinutes(lastFetch, Date.now()) < CACHE_LIMIT) {
    return;
  }
  dispatch(
    apiCallBegan({
      url: REST_ENDPOINTS.GET_BUGS,
      onStart: bugRequested.type,
      onSucess: bugAddBulk.type,
      onFail: bugRequestFailed.type,
    })
  );
};

export const addBug = (bug) => (dispatch) =>
  dispatch(
    apiCallBegan({
      url: REST_ENDPOINTS.ADD_BUG,
      method: "POST",
      data: bug,
      onSucess: bugAdded.type,
    })
  );

export const resolveBug = (id) => (dispatch) =>
  dispatch(
    apiCallBegan({
      url: REST_ENDPOINTS.UPDATE_BUG + id,
      method: "PATCH",
      data: { resolve: true },
      onSucess: bugResolved.type,
    })
  );

export const assingBugToMember = (bug) => (dispatch) =>
  dispatch(
    apiCallBegan({
      url: REST_ENDPOINTS.UPDATE_BUG + bug.id,
      method: "PATCH",
      data: { userId: bug.userId },
      onSucess: bugAssingToMember.type,
    })
  );

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
