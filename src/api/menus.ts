import axiosInstance from './axiosConfig';
import { MenuPost } from '../types/Menu.types.ts';

interface MenuQueryParams {
	startDate: string;
	endDate: string;
}

export const getMenuByDateRange = async (params: MenuQueryParams) => {
	try {
		console.log(params.startDate);
		console.log(params.endDate);
		const response = await axiosInstance.get('/menu', { params });
		return response.data;
	} catch (error) {
		console.error('Error fetching menus:', error);
		throw error;
	}
};
export const createMenu = async (menu: MenuPost) => {
	try {
		const response = await axiosInstance.post('/menu', menu);
		return response.data;
	} catch (error) {
		console.error('Error creating menu:', error);
		throw error;
	}
};
export const deleteMenuByDate = async (menuDate: string) => {
	try {
		const response = await axiosInstance.delete(`/menu/${menuDate}`);
		return response.data;
	} catch (error) {
		console.error('Error deleting menu:', error);
		throw error;
	}
};
