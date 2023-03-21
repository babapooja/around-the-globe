import { configureStore } from "@reduxjs/toolkit";
import reducer from "../features/countries/CountriesSlice";

export const store = configureStore({
  reducer: {
    countries: reducer
  },
});

