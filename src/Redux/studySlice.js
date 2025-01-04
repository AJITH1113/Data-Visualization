import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: [],
  selectedStudy: null,
  isStudyLoaded: false,
  stepperStudy: true, // Tracks if a study is selected
};

const studySlice = createSlice({
  name: "studies",
  initialState,
  reducers: {
    loadStudiesFromLocalStorage: (state) => {
      const storedStudies = JSON.parse(localStorage.getItem("studies"));
      if (storedStudies) {
        state.rows = storedStudies;
        state.isStudyLoaded = false;
      }
      const storedSelectedStudy = JSON.parse(localStorage.getItem("selectedStudy"));
      if (storedSelectedStudy) {
        state.selectedStudy = storedSelectedStudy;
      }
    },
    addStudy: (state, action) => {
      state.rows.push(action.payload);
      localStorage.setItem("studies", JSON.stringify(state.rows));
    },
    editStudy: (state, action) => {
      const { studyId, updatedStudy } = action.payload;
      const index = state.rows.findIndex(row => row.studyId === studyId);
      if (index !== -1) {
        state.rows[index] = { ...state.rows[index], ...updatedStudy }; // Update study with all fields
        localStorage.setItem("studies", JSON.stringify(state.rows));
      }
    },
    deleteStudy: (state, action) => {
      const studyId = action.payload;
      const index = state.rows.findIndex((row) => row.studyId === studyId);
      if (index !== -1) {
        state.rows.splice(index, 1);
        localStorage.setItem("studies", JSON.stringify(state.rows));
      }
    },
    addSelectedStudy: (state, action) => {
      state.selectedStudy = action.payload;
      state.stepperStudy = false; // Update stepperStudy to false when a study is selected
      localStorage.setItem("selectedStudy", JSON.stringify(state.selectedStudy));
      state.isStudyLoaded = true;
    },
    resetStepperStudy: (state) => {
      state.stepperStudy = true; // Reset stepperStudy to true if needed
    },
  },
});

export const { addStudy, editStudy, deleteStudy, loadStudiesFromLocalStorage, addSelectedStudy, resetStepperStudy } = studySlice.actions;
export default studySlice.reducer;
