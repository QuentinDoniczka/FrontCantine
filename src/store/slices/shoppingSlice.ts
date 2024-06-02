import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store.ts';

interface ShoppingItem {
	id: string;
	name: string;
	price: number;
}

interface ShoppingState {
	items: ShoppingItem[];
	totalPrice: number;
}

const initialState: ShoppingState = {
	items: [],
	totalPrice: 0,
};

const shoppingSlice = createSlice({
	name: 'shopping',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<ShoppingItem>) => {
			state.items.push(action.payload);
			state.totalPrice += action.payload.price;
		},
		removeItem: (state, action: PayloadAction<string>) => {
			const index = state.items.findIndex(
				item => item.id === action.payload
			);
			if (index !== -1) {
				const item = state.items[index];
				state.totalPrice -= item.price;
				state.items.splice(index, 1);
			}
		},
		resetShoppingState: state => {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

export const { addItem, removeItem, resetShoppingState } =
	shoppingSlice.actions;

export const selectTotalPrice = (state: RootState) => state.shopping.totalPrice;
export const selectDate = (state: RootState) => {
	const { day, month, year } = state.date.selectedDate;
	return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};

export default shoppingSlice.reducer;
