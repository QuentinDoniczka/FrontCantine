import axiosInstance from './axiosConfig';
import { Ingredient } from '../types/Ingredient.types.ts';

export const getIngredients = async (): Promise<Ingredient[]> => {
	try {
		const response =
			await axiosInstance.get<Ingredient[]>('/ingredient/all');
		return response.data;
	} catch (error) {
		console.error('Error fetching ingredients:', error);
		throw error;
	}
};
