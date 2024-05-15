import axiosInstance from './axiosConfig';

interface MenuQueryParams {
    startDate: string;
    endDate: string;
}

export const getMenuByDateRange = async (params: MenuQueryParams) => {
    try {
        const response = await axiosInstance.get('/menu', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching menus:', error);
        throw error;
    }
};