//action types
const ACTION_TYPES = {
  BUG_ADDED: "BUG_ADDED",
  BUG_REMOVED: "BUG_REMOVED",
  BUG_RESOLVED: "BUG_RESOLVED",
};

//actions
export const bugAdded = (description) => ({
  type: ACTION_TYPES.BUG_ADDED,
  payload: { description },
});

export const bugRemoved = (id) => ({
  type: ACTION_TYPES.BUG_REMOVED,
  payload: { id },
});

export const bugResolved = (id) => ({
  type: ACTION_TYPES.BUG_RESOLVED,
  payload: { id },
});

//reducers
let lastID = 0;

export default function reducer(state = [], action) {
  switch (action.type) {
    case ACTION_TYPES.BUG_ADDED:
      return [
        ...state,
        {
          id: ++lastID,
          description: action.payload.description,
          resolved: false,
        },
      ];
    case ACTION_TYPES.BUG_REMOVED:
      return state.filter((bug) => bug.id !== action.payload.id);
    case ACTION_TYPES.BUG_RESOLVED:
      return state.map((bug) =>
        bug.id === action.payload.id ? { ...bug, resolved: true } : bug
      );
    default:
      return state;
  }
}
