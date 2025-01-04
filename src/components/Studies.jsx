import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const steps = ["Select Study", "Select Dataset", "Create Graph", "Widgets"];

export default function HorizontalLinearAlternativeLabelStepper() {
  // Access isStudyLoaded, isDatasetLoaded, and isGraphDataLoaded states from Redux
  const isStudyLoaded = useSelector((state) => state.studies.isStudyLoaded);
  const isDatasetLoaded = useSelector(
    (state) => state.selectdataset.isDatasetLoaded
  );
  const isGraphDataLoaded = useSelector(
    (state) => state.createGraph.isGraphDataLoaded
  );

  // Determine the active step based on the loading states
  const activeStep = isStudyLoaded
    ? isDatasetLoaded
      ? isGraphDataLoaded
        ? 3 // Move to the final step if the graph data is loaded
        : 2 // Stay at step 2 if only the graph data is not loaded
      : 1 // Stay at step 1 if the dataset is not loaded
    : 0; // Start at step 0 if the study is not loaded

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Display loaded states below the Stepper */}
      {/* <Box sx={{ mt: 2, textAlign: "center", fontWeight: "bold" }}>
        <div>{`isStudyLoaded: ${isStudyLoaded}`}</div>
        <div>{`isDatasetLoaded: ${isDatasetLoaded}`}</div>
        <div>{`isGraphDataLoaded: ${isGraphDataLoaded}`}</div>
      </Box> */}

      <Outlet />
    </div>
  );
}
