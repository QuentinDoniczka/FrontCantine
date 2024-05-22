import axiosInstance from './axiosConfig';
import { ProductData } from '../types/Product.types.ts';

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
