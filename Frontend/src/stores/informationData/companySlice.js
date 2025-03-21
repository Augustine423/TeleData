
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all companies
export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5004/companies");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch companies");
    }
  }
);

// Fetch a single company by ID
export const fetchCompanyById = createAsyncThunk(
  "companies/fetchCompanyById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5004/companies/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch company");
    }
  }
);

// Add Company
export const addCompany = createAsyncThunk(
  "companies/addCompany",
  async (companyData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5004/companies", companyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add company");
    }
  }
);

// Update Company
export const updateCompany = createAsyncThunk(
  "companies/updateCompany",
  async ({ id, companyData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:5004/companies/${id}`, companyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update company");
    }
  }
);

// Delete Company
export const  deleteCompany= createAsyncThunk(
  "companies/deleteCompany",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:5004/companies/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete company");
    }
  }
);

const companySlice = createSlice({
  name: "companies",
  initialState: {
    companies: [],
    currentCompany: null, // Add a field to store the current company being viewed/edited
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Companies
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred while fetching companies.";
      })

      // Fetch Company By ID
      .addCase(fetchCompanyById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCompany = action.payload; // Store the fetched company in currentCompany
      })
      .addCase(fetchCompanyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred while fetching the company.";
      })

      // Add Company
      .addCase(addCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.companies.push(action.payload); // Add the new company to the list
      })
      .addCase(addCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred while adding the company.";
      })

      // Update Company
      .addCase(updateCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCompany = action.payload; // Full updated company object
        const index = state.companies.findIndex((c) => c.id === updatedCompany.id);
        if (index !== -1) {
          state.companies[index] = updatedCompany; // Update the company in the list
        }
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred while updating the company.";
      })

      // Delete Company
      // .addCase(deleteCompany.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(deleteCompany.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.companies = state.companies.filter((c) => c.id !== action.payload.id); // Remove the deleted company
      // })
      // .addCase(deleteCompany.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload || "An error occurred while deleting the company.";
      // });
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = state.companies.filter((c) => c.id !== action.meta.arg); // Remove the deleted company
    })
    
  },
});

export default companySlice.reducer;