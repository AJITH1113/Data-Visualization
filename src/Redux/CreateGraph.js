import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  graphName: "",
  category: "",
  graphType: "",
  xAxis: "",
  yAxis: "",
  filters: "",
  source: "",
  zAxisUnit: "",
  yAxisUnit: "",
  description: "",
  isGraphDataSubmitted: false, // New property
  isGraphDataLoaded:false,
};

const createGraphSlice = createSlice({
  name: "createGraph",
  initialState,
  reducers: {
    setGraphData: (state, action) => {
      const newState = {
        ...state,
        ...action.payload,
        isGraphDataSubmitted: true,
      }; // Set to true when graph data is set
      localStorage.setItem("graphData", JSON.stringify(newState));
      return newState;
    },
    loadGraphDataFromLocalStorage: (state) => {
      const storedGraphData = JSON.parse(localStorage.getItem("graphData"));
      if (storedGraphData) {
        return { ...storedGraphData, isGraphDataSubmitted: true }; // Set to true when graph data is loaded
      }
      return state;
    },
    setGraphDataLoaded(state, action) {
      state.isGraphDataLoaded = action.payload; // Update the isDatasetLoaded state
    },

  },
});
export const { setGraphData, loadGraphDataFromLocalStorage, setGraphDataLoaded } =
  createGraphSlice.actions;

export default createGraphSlice.reducer;
