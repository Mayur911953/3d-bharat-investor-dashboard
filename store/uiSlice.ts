import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  darkMode: boolean;
  savedDeals: string[];
}

const initialState: UiState = { darkMode: true, savedDeals: [] };

const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDarkMode(state) { state.darkMode = !state.darkMode; },
    toggleSavedDeal(state, action: PayloadAction<string>) {
      state.savedDeals = state.savedDeals.includes(action.payload)
        ? state.savedDeals.filter((id) => id !== action.payload)
        : [...state.savedDeals, action.payload];
    }
  }
});

export const { toggleDarkMode, toggleSavedDeal } = slice.actions;
export default slice.reducer;
