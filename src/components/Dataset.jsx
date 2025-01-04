import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser, deleteUser } from "../Redux/DatasetReducer";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Dataset = () => {
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    datasetId: "",
    datasetName: "",
    description: "",
    datasetType: "ADAM",
  });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const dispatch = useDispatch();
  const dataset = useSelector((state) => state.dataset);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form data
  const validateFormData = () => {
    const validRegex = /^[A-Za-z0-9 ]*$/;

    if (
      !formData.datasetId ||
      !formData.datasetName ||
      !formData.description ||
      !formData.datasetId.match(validRegex) ||
      !formData.datasetName.match(validRegex) ||
      !formData.description.match(validRegex)
    ) {
      return "Please ensure all fields are filled with valid data (only alphabets, numbers, and spaces allowed, no special characters).";
    }

    const hasValidContent =
      /[A-Za-z0-9]/.test(formData.datasetId) &&
      /[A-Za-z0-9]/.test(formData.datasetName) &&
      /[A-Za-z0-9]/.test(formData.description);

    if (!hasValidContent) {
      return "Each field must contain at least one alphabet or number.";
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateFormData();
    if (validationError) {
      alert(validationError);
      return;
    }

    if (isEdit) {
      dispatch(
        updateUser({
          id: formData.id,
          datasetId: formData.datasetId,
          datasetName: formData.datasetName,
          description: formData.description,
          datasetType: formData.datasetType,
        })
      );
      setIsEdit(false);
    } else {
      dispatch(
        addUser({
          id: dataset.length ? dataset[dataset.length - 1].id + 1 : 1,
          datasetId: formData.datasetId,
          datasetName: formData.datasetName,
          description: formData.description,
          datasetType: formData.datasetType,
        })
      );
    }
    setShowForm(false);
    setFormData({
      id: null,
      datasetId: "",
      datasetName: "",
      description: "",
      datasetType: "ADAM",
    });
  };

  const handleEdit = (data) => {
    setFormData({
      id: data.id,
      datasetId: data.datasetId,
      datasetName: data.datasetName,
      description: data.description,
      datasetType: data.datasetType,
    });
    setIsEdit(true);
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleDelete = () => {
    dispatch(deleteUser(deleteId));
    setOpenDeleteDialog(false);
    setDeleteId(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormData({
      id: null,
      datasetId: "",
      datasetName: "",
      description: "",
      datasetType: "ADAM",
    });
    setIsEdit(false);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteId(null);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowForm(true)}
      >
        {isEdit ? "Edit Dataset" : "+Add"}
      </Button>

      <Dialog open={showForm} onClose={handleCloseForm}>
        <DialogTitle>{isEdit ? "Edit Dataset" : "Create Dataset"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              label="Dataset ID"
              type="text"
              fullWidth
              name="datasetId"
              value={formData.datasetId}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              label="Dataset Name"
              type="text"
              fullWidth
              name="datasetName"
              value={formData.datasetName}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Type</InputLabel>
              <Select
                name="datasetType"
                value={formData.datasetType}
                onChange={handleChange}
                required
              >
                <MenuItem value="ADAM">ADAM</MenuItem>
                <MenuItem value="SDTM">SDTM</MenuItem>
              </Select>
            </FormControl>
            <DialogActions style={{ justifyContent: "space-between" }}>
              <Button
                onClick={handleCloseForm}
                color="secondary"
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  background: "red",
                  color: "white",
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  background: "green",
                  color: "white",
                }}
              >
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this dataset?</Typography>
        </DialogContent>
        <DialogActions style={{ justifyContent: "space-between" }}>
          <Button
            onClick={handleCloseDeleteDialog}
            color="secondary"
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginLeft: "10px",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="primary"
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginRight: "10px",
              background: "red",
              color: "white",
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell>Index</TableCell> */}
              <TableCell>Dataset ID</TableCell>
              <TableCell>Dataset Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataset.map((data, index) => (
              <TableRow key={data.id}>
                {/* <TableCell>{index + 1}</TableCell> */}
                <TableCell>{data.datasetId}</TableCell>
                <TableCell>{data.datasetName}</TableCell>
                <TableCell>{data.description}</TableCell>
                <TableCell>{data.datasetType}</TableCell>
                <TableCell>
                  <Tooltip title="Edit Dataset" arrow>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(data)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Dataset" arrow>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteClick(data.id)}
                      style={{ marginLeft: 10 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Dataset;
