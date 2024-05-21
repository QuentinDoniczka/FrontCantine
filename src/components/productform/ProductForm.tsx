import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import styles from './ProductForm.module.scss';
import { Ingredient } from '../../types/Ingredient.types.tsx';
import { getIngredients } from '../../api/Ingredient.ts';

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
	const [imageFile, setImageFile] = useState<File | null>(null);

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
		const formJson = Object.fromEntries(formData.entries());

		if (imageFile) {
			try {
				// TODO: Envoyer l'image au service Azure
				const azureUploadResponse = await uploadImageToAzure(imageFile);
				const imageUrl = azureUploadResponse.url;

				// TODO: Envoyer l'URL de l'image à votre backend
				const backendResponse = await sendImageUrlToBackend(
					imageUrl,
					formJson
				);

				console.log(JSON.stringify(formJson, null, 2));
				console.log('Image URL sent to backend:', imageUrl);
			} catch (error) {
				console.error(
					'Error uploading image or sending URL to backend:',
					error
				);
			}
		} else {
			console.log('No image file selected');
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

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		setImageFile(file || null);
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
				<div>
					<label>Name</label>
					<input type="text" name="productName" />
				</div>
				<div>
					<label>Type</label>
					<select name="productType">
						// "starter", "main", "dessert", "drink"
						<option value="starter">starter</option>
						<option value="main">main</option>
						<option value="dessert">dessert</option>
						<option value="drink">drink</option>
					</select>
				</div>
				<div>
					<label>Description</label>
					<input type="text" name="productDescription" />
				</div>
				<div>
					<label>Image</label>
					<input
						type="file"
						name="productImage"
						onChange={handleImageChange}
					/>
				</div>
				<div>
					<label>Ingredients</label>
					{selectedIngredients.map((ingredient, index) => (
						<div key={index}>
							{loading ? (
								<p>Loading ingredients...</p>
							) : error ? (
								<p>{error}</p>
							) : (
								<div>
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
													value={ingredient.id}
												>
													{ingredient.ingredientName}
												</option>
											)
										)}
									</select>
									<button
										type="button"
										onClick={() =>
											removeIngredientField(index)
										}
									>
										Remove
									</button>
								</div>
							)}
						</div>
					))}
					<button type="button" onClick={addIngredientField}>
						Add Ingredient
					</button>
				</div>
				<button type="submit">Add</button>
			</form>
		</ReactModal>
	);
};

export default ProductForm;
