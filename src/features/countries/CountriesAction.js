// all API calls
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://restcountries.com/v3.1";

// show all countries
export const showAllCountries = createAsyncThunk(
  "countries/showAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/all`);
      return response.data;
    } catch (err) {
      const message = (err.response && err.response.data) || err.message;
      //   rejectWithValue sends the error message as a payload
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// search by cioc code
export const searchByCIOC = createAsyncThunk(
  "countries/searchByCIOC",
  async (cioc, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/alpha/${cioc}`);
      return response.data;
    } catch (err) {
      const message = (err.response && err.response.data) || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// search by region
export const searchByRegion = createAsyncThunk(
  "countries/searchByRegion",
  async (region, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/region/${region}`);
      return response.data;
    } catch (err) {
      const message = (err.response && err.response.data) || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// search by country name
