import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  rows: [], // Array to hold dataset rows
};

const datasetSlice = createSlice({
  name: 'dataset',
  initialState,
  reducers: {
    // Add a new row to the dataset
    addRow: (state, action) => {
      state.rows.push(action.payload);
    },
    
    // Update an existing row
    updateRow: (state, action) => {
      const { oldRow, newRow } = action.payload;
      const index = state.rows.findIndex((row) => row.name === oldRow.name);
      if (index !== -1) {
        state.rows[index] = newRow;
      }
    },
    
    // Delete a row from the dataset
    deleteRow: (state, action) => {
      state.rows = state.rows.filter((row) => row.name !== action.payload.name);
    },
    
    // Load rows from localStorage
    loadRowsFromLocalStorage: (state) => {
      const savedRows = JSON.parse(localStorage.getItem('tableData')) || [];
      console.log(savedRows); // Check if all fields are present
      state.rows = savedRows;
    },

    // Add rows from the dataset (the one you want to load)
    setDataset: (state, action) => {
      state.rows = action.payload;
    },
  },
});

export const { addRow, updateRow, deleteRow, loadRowsFromLocalStorage, setDataset } = datasetSlice.actions;

export default datasetSlice.reducer;
