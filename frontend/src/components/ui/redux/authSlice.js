import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null, // Added user to state to store profile data
    },
    reducers: {
        // Sets the loading spinner state
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        // Sets the logged-in user's information
        setUser: (state, action) => {
            state.user = action.payload; // Fixed: assigned payload to user, not loading
        }
    }
});

export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;