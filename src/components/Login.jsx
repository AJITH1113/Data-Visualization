import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setError } from "../Redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { Box, TextField, Button, Typography, Container, Paper, Grid } from '@mui/material';
import "./Login.css";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  useEffect(() => {
    // Clear any existing errors when the Login component is rendered
    dispatch(setError(null));
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.email === "ajith@gmail.com" && formData.password === "Ajith@123") {
      const user = { email: formData.email, username: "Ajith" }; // Sample user data
      dispatch(setUser(user)); // Dispatch user data to store
      navigate("/dashboard/Dashboards");
    } else {
      dispatch(setError("Invalid email or password."));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper sx={{ padding: 3, display: "flex", flexDirection: "column", alignItems: "center", border:'1px solid black', marginTop:'20%' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign In
        </Typography>
        <img src="Developer_image.png" alt="" height="100px" width="100px" style={{marginBottom:'10px'}} />
        
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
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
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                type="password"
                
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
                Log In
              </Button>
            </Grid>
          </Grid>
        </form>

        <Grid container justifyContent="center" sx={{ mt: 2 }}>
          <Grid item>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link to="/register">Sign Up</Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      
    </Container>
  );
};

export default Login;
