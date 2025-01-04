import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Radio,
  Snackbar,
  Alert,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  addStudy,
  addSelectedStudy,
  loadStudiesFromLocalStorage,
  editStudy,
  deleteStudy,
} from "../Redux/studySlice";
import { useNavigate } from "react-router-dom";

const Study = () => {
  const [studyFormData, setStudyFormData] = useState({
    name: "",
    studyId: "",
    description: "",
  });
  const [selectedStudyIndex, setSelectedStudyIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null); // Edit index state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const rows = useSelector((state) => state.studies.rows) || [];
  const selectedStudy = useSelector((state) => state.studies.selectedStudy);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadStudiesFromLocalStorage());
  }, [dispatch]);

  useEffect(() => {
    if (selectedStudy) {
      setSelectedStudyIndex(rows.findIndex((row) => row.studyId === selectedStudy.studyId));
    }
  }, [selectedStudy, rows]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudyFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { name, studyId, description } = studyFormData;
    const invalidCharacters = /[^a-zA-Z0-9\s]/;
    return (
      name.trim() &&
      studyId.trim() &&
      description.trim() &&
      !invalidCharacters.test(name) &&
      !invalidCharacters.test(studyId) &&
      !invalidCharacters.test(description)
    );
  };

  const handleAddOrEdit = () => {
    if (!validateForm()) {
      alert("All fields must be filled and cannot have invalid characters.");
      return;
    }

    if (editIndex !== null) {
      // Editing an existing study
      dispatch(editStudy({ studyId: studyFormData.studyId, updatedStudy: studyFormData }));
      setEditIndex(null); // Reset editIndex after editing
    } else {
      const isDuplicateId = rows.some((row) => row.studyId === studyFormData.studyId);
      if (isDuplicateId) {
        alert(`Study ID "${studyFormData.studyId}" is already in use. Please enter a unique ID.`);
        return;
      }
      // Adding a new study
      dispatch(addStudy(studyFormData));
    }

    setStudyFormData({
      name: "",
      studyId: "",
      description: "",
    });
    setFormVisible(false);
  };

  const handleDelete = (studyId) => {
    setDeleteIndex(studyId);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      dispatch(deleteStudy(deleteIndex));
    }
    setShowDeletePopup(false);
    setDeleteIndex(null);
  };

  const handleRadioChange = (studyId) => {
    setSelectedStudyIndex(studyId);
  };

  const handleEdit = (studyId) => {
    // Set form data to the selected study
    const studyToEdit = rows.find((row) => row.studyId === studyId);
    if (studyToEdit) {
      setStudyFormData({
        name: studyToEdit.name,
        studyId: studyToEdit.studyId,
        description: studyToEdit.description,
      });
      setEditIndex(studyId); // Set the edit index to identify we are editing
      setFormVisible(true); // Show the form for editing
    }
  };

  const handleAddStudy = () => {
    const selectedRow = rows.find(row => row.studyId === selectedStudyIndex);
    if (selectedRow) {
      navigate("/dashboard/studies/datasets");

      setTimeout(() => {
        dispatch(addSelectedStudy(selectedRow));
        setOpenSnackbar(true);
      }, 100);
    } else {
      alert("Please select a study.");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    navigate("/dashboard/studies/datasets");
  };

  return (
    <Box sx={{ padding: "20px", maxHeight: "1000px" }}>
      <Button variant="contained" color="success" onClick={() => setFormVisible((prev) => !prev)}>
        {editIndex !== null ? "Edit Study" : "+ Add Study"}
      </Button>

      {formVisible && (
        <Box
          sx={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1300,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              padding: "20px",
              width: "400px",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: 3,
              zIndex: 1400,
            }}
          >
            <h3 style={{ margin: "10px 0", textAlign: "center" }}>
              {editIndex !== null ? "Edit Study" : "Create Study"}
            </h3>
            {[{ label: "Study ID", field: "studyId" }, { label: "Name", field: "name" }, { label: "Description", field: "description" }].map(({ label, field }) => (
  <TextField
    key={field}
    label={label}
    name={field}
    value={studyFormData[field]}
    onChange={handleInputChange}
    sx={{ marginBottom: 2, width: "100%" }}
  />
))}

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button onClick={() => setFormVisible(false)} variant="outlined" color="error" sx={{ background: "red", color: "white" }}>
                Cancel
              </Button>
              <Button onClick={handleAddOrEdit} variant="contained" color="primary" sx={{ background: "green", color: "white" }}>
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {showDeletePopup && (
        <Box
          sx={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1500,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "300px",
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: 3,
            }}
          >
            <h3 style={{ margin: '10px' }}>Confirm Delete</h3>
            <p style={{ margin: '10px' }}>Are you sure you want to delete this study?</p>
            <Box sx={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
              <Button onClick={() => setShowDeletePopup(false)} variant="outlined" color="primary">
                Cancel
              </Button>
              <Button onClick={confirmDelete} variant="contained" color="error">
                Yes, Delete
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      <TableContainer component={Paper} sx={{ marginTop: 3, maxHeight: 350, border: "1px solid black" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Selection</TableCell>
              <TableCell>Study ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow key={row.studyId}>
                  <TableCell>
                    <Radio
                      checked={selectedStudyIndex === row.studyId}
                      onChange={() => handleRadioChange(row.studyId)}
                    />
                  </TableCell>
                  <TableCell>{row.studyId || "N/A"}</TableCell>
                  <TableCell>{row.name || "N/A"}</TableCell>
                  <TableCell>{row.description || "N/A"}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEdit(row.studyId)}>
                        <Edit color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(row.studyId)}>
                        <Delete color="secondary" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No studies found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
        <Button onClick={handleAddStudy} variant="contained">
          Save & Next
        </Button>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          Study added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Study;
