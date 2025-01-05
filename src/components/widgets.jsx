import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
} from "@mui/material"; // MUI components
import { useNavigate } from "react-router-dom";
import "./widgets.css";
import { setGraphDataLoaded } from "../Redux/CreateGraph";
import TumorSizeGraph from "../charts/TumorSizeGraph";

const Widgets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedStudy = useSelector((state) => state.studies.selectedStudy);
  const isStudyLoaded = useSelector((state) => state.studies.isStudyLoaded);
  const graphData = useSelector((state) => state.createGraph);
  const datasets = useSelector((state) => state.selectdataset.selectedDataset);
  console.log(graphData);
  console.log(datasets);

  // Fetching the selected dataset from Redux or localStorage
  // const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
  // const localSelectedDataset = JSON.parse(
  //   localStorage.getItem("selectedDataset")
  // );

  const handleBack = () => {
    dispatch(setGraphDataLoaded(false));
    navigate("/dashboard/studies/graph"); // Correct path to navigate to Datasets
  };

  return (
    <div className="widgets-container" style={{ padding: "20px" }}>
      {/* Back Button */}

      <Typography variant="h4" gutterBottom>
        Widgets
      </Typography>
      <TumorSizeGraph />

      {/* <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Selected Study
          </Typography>
          {isStudyLoaded && selectedStudy ? (
            <div>
              <Typography variant="body1">
                <strong>Study Name:</strong> {selectedStudy.name}
              </Typography>
              <Typography variant="body1">
                <strong>Study ID:</strong> {selectedStudy.studyId}
              </Typography>
              <Typography variant="body1">
                <strong>Description:</strong> {selectedStudy.description}
              </Typography>
            </div>
          ) : (
            <Typography variant="body1">No study selected.</Typography>
          )}
        </CardContent>
      </Card>
      <Card>
        <h1>Dataset data</h1>
      </Card>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleBack}
          sx={{
            fontSize: "0.875rem",
            height: "40px",
            marginRight: "10px",
            background: "red",
            color: "white",
          }}
        >
          Back
        </Button>
      </Box> */}
    </div>
  );
};

export default Widgets;
