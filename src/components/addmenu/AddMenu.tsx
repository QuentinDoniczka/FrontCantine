import React, { useState, useEffect } from 'react';
import styles from './AddMenu.module.scss';
import closeIcon from '../../assets/icons/close.svg';
import validateIcon from '../../assets/icons/validate.svg';
import editIcon from '../../assets/icons/edit.svg';
import { getProducts } from '../../api/product.ts';
import { ProductData, ProductDataResponse } from '../../types/Product.types.ts';
import { MenuDto, MenuProductDto } from '../../types/Menu.types.ts';

import { RootState } from '../../store/store.ts';
import { useSelector } from 'react-redux';

type AddMenuProps = {
	onAdd: () => void;
	onUpdate: () => void;
	onRemove: () => void;
	hasMultiple: boolean;
	onStateChange: (state: 'button' | 'form' | 'validated') => void;
	title: string;
	product?: ProductData[];
};

const SEARCH_DELAY_MS = 1000;
const MIN_SEARCH_LENGTH = 2;

const AddMenu: React.FC<AddMenuProps> = ({
	onAdd,
	onUpdate,
	onRemove,
	hasMultiple,
	onStateChange,
	title,
	product,
}) => {
	const [state, setState] = useState<'button' | 'form' | 'validated'>(
		'button'
	);
	const [errors, setErrors] = useState<string[]>([]);
	const [price, setPrice] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [products, setProducts] = useState<ProductDataResponse[]>([]);
	const [timer, setTimer] = useState<number | null>(null);
	const [selectedProduct, setSelectedProduct] =
		useState<ProductDataResponse | null>(null);
	const selectedDate = useSelector(
		(state: RootState) => state.date.selectedDate
	);
	console.log(product);
	useEffect(() => {}, [selectedDate]);
	useEffect(() => {
		const fetchProducts = async () => {
			if (searchTerm.length >= MIN_SEARCH_LENGTH) {
				try {
					const fetchedProducts = await getProducts(
						searchTerm,
						title
					);
					setProducts(fetchedProducts);
				} catch (error) {
					console.error(
						'Error fetching products from the database:',
						error
					);
				}
			} else {
				setProducts([]);
			}
		};

		if (timer) {
			const timeoutId = setTimeout(fetchProducts, timer);
			return () => clearTimeout(timeoutId);
		}
	}, [timer, searchTerm, title]);

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setSearchTerm(value);
		setTimer(SEARCH_DELAY_MS);
	};

	const handleButtonClick = () => {
		setState('form');
		onStateChange('form');
	};

	const handleCancelClick = () => {
		if (hasMultiple) {
			onRemove();
		} else {
			setState('button');
			onStateChange('button');
		}
	};

	const handleValidateClick = () => {
		if (state === 'form') {
			const selected = products.find(
				product => product.productName === searchTerm
			);
			const priceNumber = parseFloat(price);

			if (selected && priceNumber > 0) {
				setSelectedProduct(selected);
				if (!selectedProduct) {
					onAdd();
				} else {
					onUpdate();
				}
				setState('validated');
				onStateChange('validated');
				setErrors([]);
				addProductToLocalStorage(selected, priceNumber, selectedDate);
			} else {
				const newErrors: string[] = [];
				if (!selected) {
					newErrors.push(
						"The product doesn't exist in the database."
					);
				} else if (isNaN(priceNumber) || priceNumber <= 0) {
					newErrors.push('The price must be greater than 0.');
				}
				setErrors(newErrors);
			}
		} else if (state === 'validated') {
			onUpdate();
		}
	};

	const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPrice(e.target.value);
	};
	const addProductToLocalStorage = (
		productData: ProductDataResponse,
		price: number,
		date: { day: number; month: number; year: number }
	) => {
		const dateKey = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
		const existingMenu: MenuDto | null = JSON.parse(
			localStorage.getItem(dateKey) || 'null'
		);

		const menuProduct: MenuProductDto = {
			menuProductPrice: price,
			productId: productData.productId,
			type: productData.productType,
		};

		if (existingMenu) {
			const existingProductIndex = existingMenu.menuProducts.findIndex(
				item => item.menuProduct.productId === menuProduct.productId
			);

			if (existingProductIndex !== -1) {
				existingMenu.menuProducts[existingProductIndex] = {
					menuProduct,
					productData,
				};
			} else {
				existingMenu.menuProducts.push({
					menuProduct,
					productData,
				});
			}

			localStorage.setItem(dateKey, JSON.stringify(existingMenu));
		} else {
			const newMenu: MenuDto = {
				menuDate: dateKey,
				menuProducts: [
					{
						menuProduct,
						productData,
					},
				],
			};

			localStorage.setItem(dateKey, JSON.stringify(newMenu));
		}
	};

	return (
		<div className={styles.container}>
			{state === 'button' && (
				<div className={styles.button} onClick={handleButtonClick}>
					<p>+</p>
				</div>
			)}
			{state === 'form' && (
				<form className={styles.card}>
					<div className={styles.input_form}>
						{errors.length > 0 && (
							<div className={styles.errors}>
								{errors.map((error, index) => (
									<p key={index}>{error}</p>
								))}
							</div>
						)}
						<label htmlFor="product">Product</label>
						<input
							type="text"
							id="product"
							value={searchTerm}
							onChange={handleSearch}
							list="productList"
							className={styles.input_product}
							placeholder={'Search....'}
						/>
						<div
							className={`${styles.results} ${searchTerm.length >= MIN_SEARCH_LENGTH ? '' : styles.hidden}`}
						>
							{products.map((product, index) => (
								<div
									key={index}
									onClick={() =>
										setSearchTerm(product.productName)
									}
								>
									{product.productName}
								</div>
							))}
						</div>
					</div>
					<div className={styles.button_group}>
						<img
							src={closeIcon}
							alt="Close"
							onClick={handleCancelClick}
							className={styles.icon}
						/>
						<div className={styles.input_container}>
							<input
								type="number"
								value={price}
								onChange={handlePriceChange}
								placeholder="0"
							/>
							<span>€</span>
						</div>
						<img
							src={validateIcon}
							alt="Validate"
							onClick={handleValidateClick}
							className={styles.icon}
						/>
					</div>
				</form>
			)}
			{state === 'validated' && selectedProduct && (
				<div className={styles.card}>
					<img
						className={styles.product_image}
						src={selectedProduct.productImageUrl}
						alt={selectedProduct.productName}
					/>
					<h3>{selectedProduct.productName}</h3>
					<p>{selectedProduct.productDescription}</p>
					<div className={styles.button_group_price}>
						<p>{price} €</p>
						<img
							src={editIcon}
							alt="Edit"
							onClick={() => setState('form')}
							className={styles.icon}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default AddMenu;
