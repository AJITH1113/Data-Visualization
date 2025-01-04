// src/Redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import studiesReducer from "./studySlice"; // Import the studiesSlice
import authReducer from "./authSlice"; // Your existing authSlice
// import datasetReducer from "./datasetSlice"; // Your existing datasetSlice
import DatasetReducer from "./DatasetReducer";
import studyReducer from "./studySlice";
import selectDatasetReducer from "./SelectDataset";
import createGraphReducer from "./CreateGraph";
const store = configureStore({
  reducer: {
    auth: authReducer,
    // dataset: datasetReducer,
    studies: studiesReducer, // Add studiesReducer to the store
    dataset: DatasetReducer,
    study: studyReducer,
    selectdataset: selectDatasetReducer, // Ensure this matches
    createGraph: createGraphReducer,
  },
});

export default store;
