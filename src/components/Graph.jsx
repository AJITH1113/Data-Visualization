import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGraphData, loadGraphDataFromLocalStorage } from "../Redux/CreateGraph";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setGraphDataLoaded } from "../Redux/CreateGraph";
import { setDatasetLoaded } from '../Redux/SelectDataset';


// Regular expression to check for special characters
const invalidCharacters = /[^A-Za-z0-9 ]/;

const Graph = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    graphName: "",
    category: "",
    graphType: "",
    xAxis: "",
    yAxis: "",
    filters: "",
    source: "",
    xAxisUnit: "",  // Changed from zAxisUnit to xAxisUnit
    yAxisUnit: "",
    description: "",
  });

  // Load graph data from localStorage on mount
  useEffect(() => {
    dispatch(loadGraphDataFromLocalStorage());
  }, [dispatch]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle dropdown change for graph type
  const handleGraphTypeChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      graphType: e.target.value,
    }));
  };

  // Check if all fields are filled and no special characters
  const validateForm = () => {
    const {
      graphName,
      category,
      graphType,
      xAxis,
      yAxis,
      filters,
      source,
      xAxisUnit,  // Changed from zAxisUnit to xAxisUnit
      yAxisUnit,
      description,
    } = formData;

    return (
      graphName.trim() &&
      category.trim() &&
      graphType.trim() &&
      xAxis.trim() &&
      yAxis.trim() &&
      filters.trim() &&
      source.trim() &&
      xAxisUnit.trim() &&  // Changed from zAxisUnit to xAxisUnit
      yAxisUnit.trim() &&
      description.trim() &&
      !invalidCharacters.test(graphName) &&
      !invalidCharacters.test(category) &&
      !invalidCharacters.test(graphType) &&
      !invalidCharacters.test(xAxis) &&
      !invalidCharacters.test(yAxis) &&
      !invalidCharacters.test(filters) &&
      !invalidCharacters.test(source) &&
      !invalidCharacters.test(xAxisUnit) &&  // Changed from zAxisUnit to xAxisUnit
      !invalidCharacters.test(yAxisUnit) &&
      !invalidCharacters.test(description)
    );
  };

  // Submit graph data to Redux and console log it
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("All fields must be filled and cannot have special characters.");
      return;
    }
    dispatch(setGraphData(formData));
    console.log("Graph Data Submitted:", formData);
    navigate("/dashboard/studies/widgets", {
      replace: true,
    });
    dispatch(setGraphDataLoaded(true)); // Set isGraphDataLoaded to true
  };
  
  // Handle Back button
  const handleBack = () => {
    dispatch(setGraphDataLoaded(false)); 
    dispatch(setDatasetLoaded(false)); 
    navigate("/dashboard/studies/datasets"); // Correct path to navigate to Datasets
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Graph
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2, // Add spacing between form elements
          }}
        >
          <Grid container spacing={2}>
            {[ 
              { label: "Graph Name", name: "graphName" },
              { label: "Category", name: "category" },
            ].map((field) => (
              <Grid item xs={12} sm={4} key={field.name}>
                <TextField
                  fullWidth
                  label={field.label}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ fontSize: "0.875rem" }}
                  InputProps={{
                    style: { fontSize: "0.875rem" },
                  }}
                  InputLabelProps={{ style: { fontSize: "0.875rem" } }}
                />
              </Grid>
            ))}

            {/* Graph Type Dropdown placed after Graph Name and Category */}
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Graph Type</InputLabel>
                <Select
                  label="Graph Type"
                  name="graphType"
                  value={formData.graphType}
                  onChange={handleGraphTypeChange}
                  variant="outlined"
                  sx={{ fontSize: "0.875rem" }}
                >
                  <MenuItem value="bar">Bar</MenuItem>
                  <MenuItem value="line">Line</MenuItem>
                  <MenuItem value="pie">Pie</MenuItem>
                  <MenuItem value="scatter">Scatter</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {[ 
              { label: "X-Axis", name: "xAxis" },
              { label: "Y-Axis", name: "yAxis" },
              { label: "Filters", name: "filters" },
              { label: "Source", name: "source" },
              { label: "X-Axis Unit", name: "xAxisUnit" },  // Changed from Z-Axis to X-Axis Unit
              { label: "Y-Axis Unit", name: "yAxisUnit" },
            ].map((field) => (
              <Grid item xs={12} sm={4} key={field.name}>
                <TextField
                  fullWidth
                  label={field.label}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ fontSize: "0.875rem" }}
                  InputProps={{
                    style: { fontSize: "0.875rem" },
                  }}
                  InputLabelProps={{ style: { fontSize: "0.875rem" } }}
                />
              </Grid>
            ))}

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={3}
                sx={{ fontSize: "0.875rem" }}
                InputLabelProps={{ style: { fontSize: "0.875rem" } }}
              />
            </Grid>
            
            {/* Action Buttons */}
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleBack}
                sx={{ fontSize: "0.875rem", height: "40px", background:'red', color:'white' }}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ fontSize: "0.875rem", height: "40px" }}
                disabled={!validateForm()} // Disable submit button if form is not valid
              >
                Save & Next
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Graph;
