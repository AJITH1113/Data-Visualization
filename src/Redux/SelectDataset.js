import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataset: [], // Array to store all datasets
  selectedDataset: null, // Store the selected dataset details
  isDatasetLoaded: false, // Tracks if a dataset has been loaded
};

const selectDatasetSlice = createSlice({
  name: "selectDataset",
  initialState,
  reducers: {
    loadDatasetFromLocalStorage(state) {
      const datasets = JSON.parse(localStorage.getItem("datasets")) || [];
      state.dataset = datasets; // Load datasets from localStorage
    },

    setSelectedDataset(state, action) {
      state.selectedDataset = action.payload; // Update selected dataset details
    },

    setDatasets(state, action) {
      state.dataset = action.payload; // Update datasets array
    },

    setDatasetLoaded(state, action) {
      state.isDatasetLoaded = action.payload; // Update isDatasetLoaded
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
