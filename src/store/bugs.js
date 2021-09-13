import { createAction } from "@reduxjs/toolkit";

//actions
export const bugAdded = createAction('BUG_ADDED')
export const bugRemoved = createAction('BUG_REMOVED');
export const bugResolved = createAction('BUG_RESOLVED');

//reducers
let lastID = 0;

export default function reducer(state = [], action) {
  switch (action.type) {
    case bugAdded.type:
      return [
        ...state,
        {
          id: ++lastID,
          description: action.payload.description,
          resolved: false,
        },
      ];
    case bugRemoved.type:
      return state.filter((bug) => bug.id !== action.payload.id);
    case bugResolved.type:
      return state.map((bug) =>
        bug.id === action.payload.id ? { ...bug, resolved: true } : bug
      );
    default:
      return state;
  }
}
