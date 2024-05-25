import React, { useState } from 'react';
import styles from './Manage.module.scss';
import img from '../../assets/img/test.png';
import Menu from '../../components/menu/Menu';
import ActionButton from '../../components/actionbutton/ActionButton';
import ProductForm from '../../components/productform/ProductForm.tsx';
import Calendar from '../../components/calendar/Calendar.tsx';

const Manage: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState<{
		day: number;
		month: number;
		year: number;
	}>(() => {
		const today = new Date();
		return {
			day: today.getDate(),
			month: today.getMonth(),
			year: today.getFullYear(),
		};
	});
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
		setSelectedDate(date);
		console.log('Date sélectionnée :', selectedDate);
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
			/>
			<Menu title="starter" count={1} />
			<Menu title="main" count={2} />
			<Menu title="dessert" count={1} />
			<Menu title="drink" count={1} />

			<ProductForm isOpen={isModalOpen} onRequestClose={closeModal} />
		</div>
	);
};

export default Manage;
