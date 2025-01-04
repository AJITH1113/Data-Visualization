import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, setUser } from "../Redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import { Box, TextField, Button, Container, Typography, Grid, Paper } from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return emailRegex.test(email);
  };
  
  useEffect(() => {
    dispatch(setError(null)); // Clear any existing errors when the Register component is rendered
  }, [dispatch]);

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username) {
      dispatch(setError("Username is required."));
    } else if (!validateEmail(formData.email)) {
      dispatch(setError("Enter a valid email address."));
    } else if (!validatePassword(formData.password)) {
      dispatch(setError("Password must meet the criteria."));
    } else if (formData.password !== formData.confirmPassword) {
      dispatch(setError("Passwords do not match."));
    } else {
      try {
        const response = await axios.post("http://localhost:9000/api/auth/register", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        alert("data send successfully");

        if (response.data.statusCode === 1) {
          dispatch(setUser({ username: formData.username, email: formData.email }));
          navigate("/dashboard/Dashboards");
        } else {
          dispatch(setError(response.data.statusMessage));
        }
      } catch (error) {
        dispatch(setError("An error occurred while registering."));
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper sx={{ padding: 3, display: "flex", flexDirection: "column", alignItems: "center", border:"1px solid black", marginTop:'10%' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        <img src="Developer_image.png" alt="" height="100px" width="100px" style={{marginBottom:'10px'}} />
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                variant="outlined"
                fullWidth
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography variant="body2" color="error" align="center">
                  {error}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid container justifyContent="center" sx={{ mt: 2 }}>
          <Grid item>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link to="/login">Sign In</Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Register;
