import { ProductDataResponse } from './Product.types.ts';

export interface MenuProductDto {
	menuProductPrice: number;
	productId: string;
	type: string;
}

export interface MenuDto {
	menuDate: string;
	menuProducts: Array<{
		menuProduct: MenuProductDto;
		productData: ProductDataResponse;
	}>;
}
export interface MenuProductPost {
	menuProductPrice: number;
	productId: string;
}

export interface MenuPost {
	menuDate: string;
	menuProducts: MenuProductPost[];
}
export interface MenuProduct {
	productId: string;
	productName: string;
	productDescription: string;
	menuProductPrice: number;
	productType: string;
	productImageUrl: string;
}

export interface Menu {
	menuId: string;
	menuDate: string;
	menuProducts: MenuProduct[];
}

export interface ExtractedDataDto {
	[key: string]: {
		id: string;
		name: string;
		description: string;
		price: number;
		type: string;
		imageUrl: string;
	}[];
}
