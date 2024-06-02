export interface ProductData {
	menuProductId: string;
	productName: string;
	productType: string;
	productDescription: string;
	ingredientIds: string[];
	productImage: File;
	menuProductPrice: number;
	productImageUrl: string;
}
export interface ProductDataResponse {
	productId: string;
	productName: string;
	productType: string;
	productDescription: string;
	productImageUrl: string;
	productPrice?: number;
}
