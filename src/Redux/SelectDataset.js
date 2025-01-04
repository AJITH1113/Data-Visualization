import { createSlice } from "@reduxjs/toolkit"; // Add this import

const initialState = {
  dataset: [], // Array to store all datasets
  selectedDataset: null, // Store the selected dataset
  isDatasetLoaded: false, // Tracks if a dataset has been loaded
};

const selectDatasetSlice = createSlice({
  name: "selectDataset",
  initialState,
  reducers: {
    loadDatasetFromLocalStorage(state) {
      const datasets = JSON.parse(localStorage.getItem("datasets")) || [];
      state.dataset = datasets; // Update the datasets state
    },

    setSelectedDataset(state, action) {
      state.selectedDataset = action.payload; // Set the selected dataset
    },

    setDatasets(state, action) {
      state.dataset = action.payload; // Set datasets in the state
    },

    setDatasetLoaded(state, action) {
      state.isDatasetLoaded = action.payload; // Update the isDatasetLoaded state
    },
  },
});

export const {
  loadDatasetFromLocalStorage,
  setSelectedDataset,
  setDatasets,
  setDatasetLoaded,
} = selectDatasetSlice.actions;

export default selectDatasetSlice.reducer;
