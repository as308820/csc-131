import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:3001";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("Submitting signup:", formData);

    if (!formData.name || !formData.email || !formData.password) {
      alert("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("/signup", formData);

      if (response.status === 201) {
        console.log("User created successfully");
        navigate("/login"); 
      } else {
        console.warn("Unexpected status code:", response.status);
        alert(`Signup failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.status, error.response.data);
        alert(`Signup failed: ${error.response.data.message || error.message}`);
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("No response from server. Please check your network.");
      } else {
        console.error("Axios error:", error.message);
        alert(`Signup failed: ${error.message}`);
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, margin: '40px auto' }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
        Sign Up
      </Typography>

      <Box component="form" onSubmit={handleSignUp} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Typography variant="body2" align="center">
          Already have an account? <Link to="/login">Log In</Link>
        </Typography>
      </Box>
    </Paper>
  );
}