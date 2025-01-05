import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadDatasetFromLocalStorage,
  setSelectedDataset,
  setDatasetLoaded,
} from "../Redux/SelectDataset";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

const Datasets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rows = useSelector((state) => state.dataset); // Access datasets from Redux
  const [tempSelectedDatasetId, setTempSelectedDatasetId] =
    React.useState(null);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  useEffect(() => {
    dispatch(loadDatasetFromLocalStorage()); // Load datasets from localStorage on mount
  }, [dispatch]);

  const handleRadioChange = (event, datasetId) => {
    setTempSelectedDatasetId(datasetId); // Update selected dataset ID
  };

  const handleSelectDataset = () => {
    const selectedDataset = rows.find(
      (row) => row.datasetId === tempSelectedDatasetId
    );

    if (selectedDataset) {
      // Dispatch selected dataset to Redux
      dispatch(setSelectedDataset(selectedDataset));
      // Save selected dataset to localStorage
      localStorage.setItem("selectedDataset", JSON.stringify(selectedDataset));
      setOpenSnackbar(true); // Show success message
      dispatch(setDatasetLoaded(true)); // Update loaded state
      navigate("/dashboard/studies/graph", {
        state: { selectedDataset },
        replace: true,
      });
    } else {
      alert("Please select a dataset.");
    }
  };

  const handleBack = () => {
    navigate("/dashboard/studies/study"); // Navigate back to the 'Study' page
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Selection</TableCell>
              <TableCell>Dataset ID</TableCell>
              <TableCell>Dataset Name</TableCell>
              <TableCell>Dataset Description</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow key={row.datasetId}>
                  <TableCell>
                    <Radio
                      checked={tempSelectedDatasetId === row.datasetId}
                      onChange={(event) =>
                        handleRadioChange(event, row.datasetId)
                      }
                      value={row.datasetId}
                    />
                  </TableCell>
                  <TableCell>{row.datasetId}</TableCell>
                  <TableCell>{row.datasetName}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.datasetType}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No datasets found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container sx={{ marginTop: 2, justifyContent: "space-between" }}>
        <Grid item>
          <Button variant="outlined" color="secondary" onClick={handleBack}>
            Back
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSelectDataset}
          >
            Select Dataset
          </Button>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Dataset selected successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Datasets;
