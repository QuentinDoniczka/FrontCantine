import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Manage.module.scss';
import img from '../../assets/img/test.png';
import TypeMenu from '../../components/typemenu/TypeMenu.tsx';
import ActionButton from '../../components/actionbutton/ActionButton';
import ProductForm from '../../components/productform/ProductForm.tsx';
import Calendar from '../../components/calendar/Calendar.tsx';
import { RootState } from '../../store/store.ts';
import { setSelectedDate } from '../../store/slices/dateSlice.ts';

const Manage: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [starterProducts, setStarterProducts] = useState([]);
	const [mainProducts, setMainProducts] = useState([]);
	const [dessertProducts, setDessertProducts] = useState([]);
	const [drinkProducts, setDrinkProducts] = useState([]);
	const selectedDate = useSelector(
		(state: RootState) => state.date.selectedDate
	);

	const dispatch = useDispatch();

	useEffect(() => {
		const { year, month, day } = selectedDate;
		const formattedDate = new Date(year, month - 1, day + 1)
			.toISOString()
			.split('T')[0];
		const storedMenu = localStorage.getItem(formattedDate);
		localStorage.removeItem(formattedDate);
		if (storedMenu) {
			const menuData = JSON.parse(storedMenu);
			const products = menuData.menuProducts.map(
				(item: { productData: never }) => item.productData
			);
			setStarterProducts(
				products.filter(
					(product: { productType: string }) =>
						product.productType === 'starter'
				)
			);
			setMainProducts(
				products.filter(
					(product: { productType: string }) =>
						product.productType === 'main'
				)
			);
			setDessertProducts(
				products.filter(
					(product: { productType: string }) =>
						product.productType === 'dessert'
				)
			);
			setDrinkProducts(
				products.filter(
					(product: { productType: string }) =>
						product.productType === 'drink'
				)
			);
		}
	}, [selectedDate]);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleDateChange = (date: {
		day: number;
		month: number;
		year: number;
	}) => {
		dispatch(setSelectedDate(date));
	};

	return (
		<div className={styles.manage}>
			<div className={styles.imageContainer}>
				<img
					src={img}
					alt="cantine image"
					className={styles.manage_img}
				/>
				<div className={styles.button_product}>
					<ActionButton
						text={'Add a new product'}
						theme={2}
						height={'40px'}
						width={'250px'}
						font_size={22}
						shadow={true}
						onClick={openModal}
					/>
				</div>
			</div>
			<Calendar
				selectedDate={selectedDate}
				onDateChange={handleDateChange}
				calendarTop={100}
			/>
			<TypeMenu title="starter" products={starterProducts} />
			<TypeMenu title="main" products={mainProducts} />
			<TypeMenu title="dessert" products={dessertProducts} />
			<TypeMenu title="drink" products={drinkProducts} />

			<ProductForm isOpen={isModalOpen} onRequestClose={closeModal} />
		</div>
	);
};

export default Manage;
