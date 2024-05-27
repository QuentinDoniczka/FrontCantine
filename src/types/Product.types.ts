export interface ProductData {
	productName: string;
	productType: string;
	productDescription: string;
	ingredientIds: string[];
	productImage: File;
}
export interface ProductDataResponse {
	productId: string;
	productName: string;
	productType: string;
	productDescription: string;
	productImageUrl: string;
	productPrice?: number;
}
