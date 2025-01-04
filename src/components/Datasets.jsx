// Datasets.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadDatasetFromLocalStorage,
  setSelectedDataset,
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
import { setDatasetLoaded } from "../Redux/SelectDataset";

const Datasets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rows = useSelector((state) => state.dataset); // Access datasets from Redux
  const [tempSelectedRow, setTempSelectedRow] = React.useState(null);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  useEffect(() => {
    dispatch(loadDatasetFromLocalStorage()); // Ensure datasets are loaded from localStorage on component mount
  }, [dispatch]);

  const handleRadioChange = (event, index) => {
    setTempSelectedRow(index + 1); // Set the selected dataset's serial number
  };

  const handleSelectDataset = () => {
    const selectedDataset = rows.find(
      (row, index) => index + 1 === tempSelectedRow
    );
    if (selectedDataset) {
      dispatch(setSelectedDataset(selectedDataset.id)); // Dispatch Redux action
      localStorage.setItem("selectedDataset", JSON.stringify(selectedDataset)); // Store selected dataset in localStorage
      setOpenSnackbar(true); // Show success message
      navigate("/dashboard/studies/graph", {
        state: { selectedDataset },
        replace: true,
      });
      dispatch(setDatasetLoaded(true));
    } else {
      alert("Please select a dataset.");
    }
  };

  const handleBack = () => {
    navigate("/dashboard/studies/study"); // Navigate to the 'Study' component
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
              {/* <TableCell>S.No</TableCell> */}
              <TableCell>Dataset ID</TableCell>
              <TableCell>Dataset Name</TableCell>
              <TableCell>Dataset Descripiton</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Radio
                      checked={tempSelectedRow === index + 1}
                      onChange={(event) => handleRadioChange(event, index)}
                      value={index + 1}
                    />
                  </TableCell>
                  {/* <TableCell>{index + 1}</TableCell> */}
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
