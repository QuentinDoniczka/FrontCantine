// dateSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DateState {
    currentDate: Date;
}

const initialState: DateState = {
    currentDate: new Date(),
};

const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setDate(state, action: PayloadAction<Date>) {
            state.currentDate = action.payload;
        },
        incrementDate(state) {
            const newDate = new Date(state.currentDate);
            newDate.setDate(newDate.getDate() + 1);
            state.currentDate = newDate;
        },
        decrementDate(state) {
            const newDate = new Date(state.currentDate);
            newDate.setDate(newDate.getDate() - 1);
            state.currentDate = newDate;
        },
    },
});

export const { setDate, incrementDate, decrementDate } = dateSlice.actions;
export default dateSlice.reducer;
