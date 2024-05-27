import axiosInstance from './axiosConfig';
import { ProductData, ProductDataResponse } from '../types/Product.types.ts';

export const getProducts = async (
	filter: string,
	productType: string
): Promise<ProductDataResponse[]> => {
	try {
		const response = await axiosInstance.get('/product', {
			params: { filter, productType },
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching products:', error);
		throw error;
	}
};

export const postProduct = async (productData: ProductData) => {
	try {
		const formData = new FormData();
		formData.append('productName', productData.productName);
		formData.append('productType', productData.productType);
		formData.append('productDescription', productData.productDescription);
		productData.ingredientIds.forEach(id =>
			formData.append('ingredientIds', id)
		);
		formData.append('productImage', productData.productImage);

		const response = await axiosInstance.post('/product', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
		return response.data;
	} catch (error) {
		console.error('Error creating product:', error);
		throw error;
	}
};
