import { useEffect, useState } from 'react';
import styles from './MenusHomePage.module.scss';
import Card from '../card/Card.tsx';
import ActionButton from '../actionbutton/ActionButton.tsx';
import { getMenuByDateRange } from '../../api/menus';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { Menu } from '../../types/Menu.types.ts';
import { ExtractedDataDto } from '../../types/Menu.types.ts';

const MenusHomePage = () => {
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [clickedButton, setClickedButton] = useState('');
	const selectedDate = useSelector(
		(state: RootState) => state.date.selectedDate
	);
	const [menusData, setMenusData] = useState<Menu[]>([]);
	useEffect(() => {
		if (selectedDate) {
			const currentDate = new Date(
				selectedDate.year,
				selectedDate.month - 1,
				selectedDate.day
			);
			const dayOfWeek = currentDate.toLocaleDateString('en-US', {
				weekday: 'long',
			});
			setClickedButton(dayOfWeek);
		}
	}, [selectedDate]);
	const calculateWeekRange = (date: {
		day: number;
		month: number;
		year: number;
	}) => {
		const currentDate = new Date(date.year, date.month - 1, date.day);
		const dayOfWeek = currentDate.getDay();
		const monday = new Date(currentDate),
			friday = new Date(currentDate);
		monday.setDate(
			currentDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)
		);
		friday.setDate(monday.getDate() + 4);
		return {
			startDate: monday.toISOString().split('T')[0],
			endDate: friday.toISOString().split('T')[0],
		};
	};
	const handleButtonClick = (buttonName: string) => {
		setClickedButton(buttonName);
	};
	useEffect(() => {
		if (selectedDate) {
			const { startDate, endDate } = calculateWeekRange(selectedDate);
			setStartDate(startDate);
			setEndDate(endDate);
		}
	}, [selectedDate]);
	useEffect(() => {
		if (startDate && endDate) {
			const fetchMenus = async () => {
				try {
					const fetchedMenusData = await getMenuByDateRange({
						startDate,
						endDate,
					});
					setMenusData(fetchedMenusData);
					console.log('Fetched menus:', fetchedMenusData);
				} catch (error) {
					console.error('Failed to fetch menus:', error);
				}
			};

			fetchMenus();
		}
	}, [startDate, endDate]);
	const extractedData: ExtractedDataDto = menusData.reduce(
		(acc: ExtractedDataDto, menu: Menu) => {
			const menuDate = new Date(menu.menuDate);
			const dayOfWeek = menuDate
				.toLocaleDateString('en-US', { weekday: 'long' })
				.toLowerCase();

			if (!acc[dayOfWeek]) {
				acc[dayOfWeek] = [];
			}

			acc[dayOfWeek] = menu.menuProducts
				.filter(product => product.productType === 'main')
				.map(product => ({
					id: product.productId,
					name: product.productName,
					description: product.productDescription,
					price: product.menuProductPrice,
					type: product.productType,
					imageUrl: product.productImageUrl,
				}));
			console.log('Acc:', acc);
			return acc;
		},
		{}
	);

	return (
		<>
			<div className={styles.card_group}>
				<div className={'col-6'}>
					<div className={styles.buttons}>
						<ActionButton
							text={'Monday'}
							theme={2}
							height={'50px'}
							width={'150px'}
							font_size={22}
							onClick={() => handleButtonClick('Monday')}
							active={clickedButton === 'Monday'}
						/>
						<ActionButton
							text={'Tuesday'}
							theme={2}
							height={'50px'}
							width={'150px'}
							font_size={22}
							onClick={() => handleButtonClick('Tuesday')}
							active={clickedButton === 'Tuesday'}
						/>
						<ActionButton
							text={'Wednesday'}
							theme={2}
							height={'50px'}
							width={'150px'}
							font_size={22}
							onClick={() => handleButtonClick('Wednesday')}
							active={clickedButton === 'Wednesday'}
						/>
						<ActionButton
							text={'Thursday'}
							theme={2}
							height={'50px'}
							width={'150px'}
							font_size={22}
							onClick={() => handleButtonClick('Thursday')}
							active={clickedButton === 'Thursday'}
						/>
						<ActionButton
							text={'Friday'}
							theme={2}
							height={'50px'}
							width={'150px'}
							font_size={22}
							onClick={() => handleButtonClick('Friday')}
							active={clickedButton === 'Friday'}
						/>
					</div>
					<div className={styles.cards}>
						{extractedData[clickedButton.toLowerCase()] ? (
							<>
								<Card
									data={
										extractedData[
											clickedButton.toLowerCase()
										][0]
									}
								/>
								<Card
									data={
										extractedData[
											clickedButton.toLowerCase()
										][1]
									}
								/>
								<Card
									data={
										extractedData[
											clickedButton.toLowerCase()
										][2]
									}
								/>
							</>
						) : (
							<>
								<Card />
								<Card />
								<Card />
							</>
						)}
					</div>
				</div>
				<div className={'col-2'}>
					<div className={styles.single_button}>
						<ActionButton
							text={'See All Menus'}
							theme={5}
							height={'50px'}
							width={'180px'}
							font_size={22}
							onClick={() => {
								console.log('Monday clicked');
							}}
							border={true}
						/>
					</div>
					<div className={styles.card}></div>
				</div>
			</div>
		</>
	);
};

export default MenusHomePage;
