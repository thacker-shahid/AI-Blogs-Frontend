import { createSlice } from "@reduxjs/toolkit";

const isCookiePresentInCookies = () => {
    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
    return !!token;
}

const loadUserFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('user');
        if (serializedState === null) {
            return {
                user: JSON.parse(serializedState),
                verifyEmailRouteStatus: false
            };
        }
        return {
            user: JSON.parse(serializedState),
            verifyEmailRouteStatus: false
        }
    } catch (error) {
        return { user: null }
    }
}

const initialState = loadUserFromLocalStorage();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {           // This setUser function is called actions function. 
            // Reducer funtion takes old/initial state and actions and change the state to the new state.
            state.user = action.payload.user;
            localStorage.setItem('user', JSON.stringify(state.user));
        },
        logout: (state) => { // This logout function is  called actions function.
            state.user = null;
            localStorage.removeItem('user');
        },
        setVerifyEmailRoute: (state, action) => {
            state.verifyEmailRouteStatus = action.payload;
        }
    }
})

export const { setUser, logout, setVerifyEmailRoute } = authSlice.actions;
export default authSlice.reducer;