import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DateState {
	selectedDate: {
		day: number;
		month: number;
		year: number;
	};
}

const initialState: DateState = {
	selectedDate: {
		day: new Date().getDate(),
		month: new Date().getMonth() + 1,
		year: new Date().getFullYear(),
	},
};

const dateSlice = createSlice({
	name: 'date',
	initialState,
	reducers: {
		setSelectedDate: (
			state,
			action: PayloadAction<DateState['selectedDate']>
		) => {
			state.selectedDate = action.payload;
		},
	},
});

export const { setSelectedDate } = dateSlice.actions;

export default dateSlice.reducer;
