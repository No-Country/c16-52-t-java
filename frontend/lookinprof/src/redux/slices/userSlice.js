import { createSlice } from '@reduxjs/toolkit'

// Initial state with all properties defined
const INITIAL_STATE = {
  currentUser: null,
  hiddenMenu: true,
  isAuthenticated: false, // Ensure this field is defined if you're using it
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setVerified: state => {
      if (state.currentUser) {
        state.currentUser.verified = true;
      }
    },
    toggleMenuHidden: state => {
      state.hiddenMenu = !state.hiddenMenu;
    },
    // Corrected to use action.payload to dynamically set isAuthenticated
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

// Export actions
export const { setCurrentUser, setVerified, toggleMenuHidden, setIsAuthenticated } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
