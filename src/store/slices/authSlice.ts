import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
	isAuthenticated: boolean;
	userRole: string | null;
}

const initialState: AuthState = {
	isAuthenticated: false,
	userRole: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthState(
			state,
			action: PayloadAction<{
				isAuthenticated: boolean;
				userRole: string | null;
			}>
		) {
			state.isAuthenticated = action.payload.isAuthenticated;
			state.userRole = action.payload.userRole;
		},
		resetAuthState(state) {
			state.isAuthenticated = false;
			state.userRole = null;
		},
	},
});

export const { setAuthState, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
