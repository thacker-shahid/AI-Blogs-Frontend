import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkMode: false
}

const darkModeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setDarkMode: (state) => {
            state.darkMode = !state.darkMode;
        }
    }
})

export const { setDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;