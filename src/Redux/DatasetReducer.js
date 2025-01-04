import { createSlice } from "@reduxjs/toolkit";

// Helper functions to save and load state to/from localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("dataset", serializedState);
  } catch (e) {
    console.error("Could not save state to local storage", e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("dataset");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load state from local storage", e);
    return [];
  }
};

const DataSlice = createSlice({
  name: "dataset",
  initialState: loadFromLocalStorage(),
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
      saveToLocalStorage(state);
    },
    updateUser: (state, action) => {
      const index = state.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
        saveToLocalStorage(state);
      }
    },
    deleteUser: (state, action) => {
      const newState = state.filter((user) => user.id !== action.payload);
      saveToLocalStorage(newState);
      return newState;
    },
  },
});

export const { addUser, updateUser, deleteUser } = DataSlice.actions;
export default DataSlice.reducer;
