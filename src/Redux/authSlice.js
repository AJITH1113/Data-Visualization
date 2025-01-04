import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (response.data.statusCode === 1) {
        return response.data;
      } else {
        return rejectWithValue(response.data.statusMessage);
      }
    } catch (error) {
      return rejectWithValue("An error occurred while registering.");
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  registeredUsers: [],
  error: null,
  status: "idle", // Added to track async state
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Save to localStorage
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem("user"); // Remove from localStorage on logout
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.registeredUsers.push(action.payload);
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setUser, logout, setError } = authSlice.actions;
export default authSlice.reducer;
