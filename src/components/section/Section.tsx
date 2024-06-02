import React from 'react';
import styles from './Section.module.scss';
import Card from '../../components/card/Card';
import { ProductData } from '../../types/Product.types';

interface SectionProps {
	title: string;
	products: ProductData[];
}

const Section: React.FC<SectionProps> = ({ title, products }) => {
	const transformProductData = (product: ProductData) => {
		return {
			id: product.menuProductId,
			name: product.productName,
			description: product.productDescription,
			price: product.menuProductPrice,
			type: product.productType,
			imageUrl: product.productImageUrl,
		};
	};
	console.log(products);
	return (
		<div className={styles.section}>
			<div className={styles.title}>
				<h2>{title}</h2>
			</div>
			<div className={styles.menu_container}>
				{products[0] ? (
					<Card data={transformProductData(products[0])} />
				) : (
					<Card />
				)}

				{products[1] ? (
					<Card data={transformProductData(products[1])} />
				) : (
					<Card />
				)}

				{products[2] ? (
					<Card data={transformProductData(products[2])} />
				) : (
					<Card />
				)}
			</div>
		</div>
	);
};

export default Section;
