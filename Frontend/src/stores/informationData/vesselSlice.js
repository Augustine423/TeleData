import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";  // Added createSlice here
import axios from "axios";

export const fetchVessels = createAsyncThunk(
  "vessels/fetchVessels",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5004/vessels");
      return response.data;  // Directly return response.data without extra await
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch vessels");
    }
  }
);

const companySlice = createSlice({
  name: "vessels",
  initialState: {
    vessels: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVessels.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVessels.fulfilled, (state, action) => {
        state.loading = false;
        state.vessels = action.payload;
      })
      .addCase(fetchVessels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default companySlice.reducer;
