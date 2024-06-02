import styles from './Menu.module.scss';
import img from '../../assets/img/test.png';
import Calendar from '../../components/calendar/Calendar.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import Section from '../../components/section/Section.tsx';
import Payment from '../../components/payment/payment.tsx';
import { getMenuByDateRange } from '../../api/menus.ts';
import { useState } from 'react';
import { ProductData } from '../../types/Product.types.ts';
import { resetShoppingState } from '../../store/slices/shoppingSlice.ts';

const Menu = () => {
	const selectedDate = useSelector(
		(state: RootState) => state.date.selectedDate
	);
	const [starterProducts, setStarterProducts] = useState<ProductData[]>([]);
	const [mainProducts, setMainProducts] = useState<ProductData[]>([]);
	const [dessertProducts, setDessertProducts] = useState<ProductData[]>([]);
	const [drinkProducts, setDrinkProducts] = useState<ProductData[]>([]);
	const dispatch = useDispatch();
	const handleDateChange = async (date: {
		day: number;
		month: number;
		year: number;
	}) => {
		const selectedDate = new Date(date.year, date.month - 1, date.day);
		const formattedDate = selectedDate.toLocaleDateString('en-CA');
		dispatch(resetShoppingState());
		try {
			const menuData = await getMenuByDateRange({
				startDate: formattedDate,
				endDate: formattedDate,
			});
			if (menuData.length === 0) {
				setStarterProducts([]);
				setMainProducts([]);
				setDessertProducts([]);
				setDrinkProducts([]);
				return;
			}
			const menuProducts = menuData[0].menuProducts;

			const starterProducts: ProductData[] = [];
			const mainProducts: ProductData[] = [];
			const dessertProducts: ProductData[] = [];
			const drinkProducts: ProductData[] = [];

			menuProducts.forEach((product: ProductData) => {
				switch (product.productType) {
					case 'starter':
						starterProducts.push(product);
						break;
					case 'main':
						mainProducts.push(product);
						break;
					case 'dessert':
						dessertProducts.push(product);
						break;
					case 'drink':
						drinkProducts.push(product);
						break;
					default:
						break;
				}
			});

			setStarterProducts(starterProducts);
			setMainProducts(mainProducts);
			setDessertProducts(dessertProducts);
			setDrinkProducts(drinkProducts);
		} catch (error) {
			console.error('Error when loading menu', error);
		}
	};
	return (
		<div className={styles.menu}>
			<Calendar
				selectedDate={selectedDate}
				onDateChange={handleDateChange}
				manager={false}
				calendarTop={620}
			/>
			<Payment />
			<div className={styles.menu}>
				<img src={img} alt="menu" className={styles.menu_img} />
			</div>
			<Section title="starter" products={starterProducts} />
			<Section title="main" products={mainProducts} />
			<Section title="dessert" products={dessertProducts} />
			<Section title="drink" products={drinkProducts} />
		</div>
	);
};

export default Menu;
