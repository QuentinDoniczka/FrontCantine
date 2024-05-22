import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import styles from './ProductForm.module.scss';
import { Ingredient } from '../../types/Ingredient.types';
import { getIngredients } from '../../api/Ingredient';
import { postProduct } from '../../api/product.ts';
import { ProductData } from '../../types/Product.types.ts';
import ActionButton from '../actionButton/ActionButton.tsx';
import { resizeAndFormatImage } from '../../utils/sizeUtils.ts';

type ModalProps = {
	isOpen: boolean;
	onRequestClose: () => void;
};

const ProductForm: React.FC<ModalProps> = ({ isOpen, onRequestClose }) => {
	const [ingredients, setIngredients] = useState<Ingredient[]>([]);
	const [selectedIngredients, setSelectedIngredients] = useState<string[]>(
		[]
	);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchIngredients = async () => {
			try {
				const data = await getIngredients();
				setIngredients(data);
				setLoading(false);
			} catch (err) {
				setError('Error fetching ingredients');
				setLoading(false);
			}
		};
		fetchIngredients();
	}, []);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);

		let productImage = formData.get('productImage') as File;
		if (productImage) {
			const resizedBlob = await resizeAndFormatImage(productImage);
			if (resizedBlob) {
				productImage = new File([resizedBlob], productImage.name, {
					type: 'image/bmp',
				});
			}
		}

		const productData: ProductData = {
			productName: formData.get('productName') as string,
			productType: formData.get('productType') as string,
			productDescription: formData.get('productDescription') as string,
			ingredientIds: selectedIngredients,
			productImage,
		};

		console.log('Product data:', productData);
		try {
			await postProduct(productData);
			console.log('Product created successfully');
			onRequestClose();
		} catch (error) {
			console.error('Error creating product:', error);
		}
	};

	const handleIngredientChange = (index: number, value: string) => {
		const updatedIngredients = [...selectedIngredients];
		updatedIngredients[index] = value;
		setSelectedIngredients(updatedIngredients);
	};

	const addIngredientField = () => {
		setSelectedIngredients([...selectedIngredients, '']);
	};

	const removeIngredientField = (index: number) => {
		const updatedIngredients = [...selectedIngredients];
		updatedIngredients.splice(index, 1);
		setSelectedIngredients(updatedIngredients);
	};

	return (
		<ReactModal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			overlayClassName={styles.modalOverlay}
			className={styles.modalContent}
		>
			<form className={styles.form} onSubmit={handleSubmit}>
				<h2>Add a new Product</h2>
				<div className={styles.group_input}>
					<label>Type :</label>
					<select name="productType">
						<option value="">Select a type</option>
						<option value="starter">starter</option>
						<option value="main">main</option>
						<option value="dessert">dessert</option>
						<option value="drink">drink</option>
					</select>
				</div>
				<div className={styles.group_input}>
					<label>Name :</label>
					<input type="text" name="productName" />
				</div>
				<div className={styles.group_input}>
					<label>Description :</label>
					<input type="text" name="productDescription" />
				</div>
				<div className={styles.group_input}>
					<label>Image :</label>
					<input
						type="file"
						name="productImage"
						className={styles.input_file}
					/>
				</div>
				<div className={styles.group_input_ingredient}>
					<label>Ingredients</label>
					<div className={styles.button_add}>
						<ActionButton
							text={'Add'}
							theme={3}
							height={'30px'}
							width={'100px'}
							font_size={16}
							shadow={false}
							onClick={addIngredientField}
						/>
					</div>
					{selectedIngredients.map((ingredient, index) => (
						<div key={index}>
							{loading ? (
								<p>Loading ingredients...</p>
							) : error ? (
								<p>{error}</p>
							) : (
								<div className={styles.ingredient}>
									<select
										name={`ingredientId${index}`}
										value={ingredient}
										onChange={e =>
											handleIngredientChange(
												index,
												e.target.value
											)
										}
									>
										<option value="">
											Select an ingredient
										</option>
										{ingredients.map(
											(ingredient, index) => (
												<option
													key={index}
													value={
														ingredient.ingredientId
													}
												>
													{ingredient.ingredientName}
												</option>
											)
										)}
									</select>
									<ActionButton
										text={'Remove'}
										theme={4}
										height={'35px'}
										width={'100px'}
										font_size={18}
										shadow={false}
										onClick={() =>
											removeIngredientField(index)
										}
									/>
								</div>
							)}
						</div>
					))}
				</div>
				<ActionButton
					text={'Create'}
					theme={3}
					height={'30px'}
					width={'100%'}
					font_size={16}
					shadow={false}
					type="submit"
				/>
			</form>
		</ReactModal>
	);
};

export default ProductForm;
