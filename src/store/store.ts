import { configureStore } from '@reduxjs/toolkit';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import dateReducer from './slices/dateSlice';
import shoppingReducer from './slices/shoppingSlice';

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
	reducer: {
		auth: persistedReducer,
		date: dateReducer,
		shopping: shoppingReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
