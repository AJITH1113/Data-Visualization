import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const steps = ["Select Study", "Select Dataset", "Create Graph", "Widgets"];

export default function HorizontalLinearAlternativeLabelStepper() {
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);

  const isStudyLoaded = useSelector((state) => state.studies.isStudyLoaded);
  const isDatasetLoaded = useSelector(
    (state) => state.selectdataset.isDatasetLoaded
  );
  const isGraphDataLoaded = useSelector(
    (state) => state.createGraph.isGraphDataLoaded
  );

  // Update the active step based on the current path
  useEffect(() => {
    if (location.pathname.includes("/studies/study")) {
      setActiveStep(0);
    } else if (location.pathname.includes("/studies/datasets")) {
      setActiveStep(1);
    } else if (location.pathname.includes("/studies/graph")) {
      setActiveStep(2);
    } else if (location.pathname.includes("/studies/widgets")) {
      setActiveStep(3);
    }
  }, [location.pathname]);

  return (
    <div>
      {/* Navigation bar */}
      <Box sx={{ mb: 2 }}>
        <NavLink
          to="/dashboard/studies/study"
          style={({ isActive }) => ({
            margin: "0 10px",
            textDecoration: "none",
            color: isActive ? "darkblue" : "blue",
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          STD_ID
        </NavLink>
        {">"}
        <NavLink
          to="/dashboard/studies/datasets"
          style={({ isActive }) => ({
            margin: "0 10px",
            textDecoration: "none",
            color: isActive ? "darkblue" : "blue",
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          DATASET_ID
        </NavLink>
        {">"}
        <NavLink
          to="/dashboard/studies/graph"
          style={({ isActive }) => ({
            margin: "0 10px",
            textDecoration: "none",
            color: isActive ? "darkblue" : "blue",
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          GRAPH
        </NavLink>
        {">"}
        <NavLink
          to="/dashboard/studies/widgets"
          style={({ isActive }) => ({
            margin: "0 10px",
            textDecoration: "none",
            color: isActive ? "darkblue" : "blue",
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          WIDGETS
        </NavLink>
      </Box>

      {/* Stepper */}
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Outlet />
    </div>
  );
}
