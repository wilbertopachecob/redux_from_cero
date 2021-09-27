import { createSlice } from "@reduxjs/toolkit";

//reducers
let lastID = 0;

const slice = createSlice({
  name: 'members',
  initialState: [],
  reducers: {
    memberAdded: (members, action) => {
        members.push({
        id: ++lastID,
        name: action.payload.name,
      }); 
    },
  }
});

export const { memberAdded } = slice.actions;

export default slice.reducer;