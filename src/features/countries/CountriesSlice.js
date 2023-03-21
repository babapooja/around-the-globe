import { createSlice } from "@reduxjs/toolkit";
import {
  showAllCountries,
  searchByCIOC,
  searchByRegion,
} from "./CountriesAction";

const initialState = {
  loading: false,
  countriesData: [],
  countryData: [],
  error: false,
  success: false,
  message: "",
  region: "",
  searchTerm: "",
  theme:
    localStorage.getItem("theme") || "light",
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState: { ...initialState },
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
      state.message = "";
      state.countryData = [];
      state.countriesData = [];
      state.region = "";
      state.searchTerm = "";
    },
    setRegion: (state, action) => {
      state.region = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(showAllCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(showAllCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countriesData = action.payload;
        state.success = true;
      })
      .addCase(showAllCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(searchByCIOC.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchByCIOC.fulfilled, (state, action) => {
        state.loading = false;
        state.countryData = action.payload;
        state.success = true;
      })
      .addCase(searchByCIOC.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(searchByRegion.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchByRegion.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.countriesData = action.payload;
      })
      .addCase(searchByRegion.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const { reset, setRegion, setSearchTerm, setTheme } =
  countriesSlice.actions;

export default countriesSlice.reducer;
