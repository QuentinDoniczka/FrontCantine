import { useState } from 'react';
import styles from './Calendar.module.scss';

const Calendar = () => {
	const [selectedDay, setSelectedDay] = useState<number | null>(null);

	const handleDayClick = (day: number) => {
		setSelectedDay(day);
		console.log(`Jour sélectionné : ${day}`);
	};

	const generateCalendarNumbers = (month: number, year: number) => {
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		const firstDayIndex = new Date(year, month, 1).getDay();
		const prevMonthDays = new Date(year, month, 0).getDate();

		const calendarNumbers = [];

		let day = 1;
		let prevMonthDay = prevMonthDays - (firstDayIndex - 2);
		let nextMonthDay = 1;
		let currentDayIndex = firstDayIndex;

		for (let row = 0; row < 6; row++) {
			const rowElements = [];

			for (let col = 0; col < 5; col++) {
				if (currentDayIndex === 6) {
					currentDayIndex = 0;
					day += 2;
				}

				let className = '';
				let dayNumber: number | null = null;
				let clickable = false;

				if (row === 0 && col < firstDayIndex - 1) {
					className = styles.not_in_month;
					dayNumber = prevMonthDay;
					prevMonthDay++;
				} else if (day <= daysInMonth) {
					className = styles.day;
					dayNumber = day;
					clickable = true;
					if (dayNumber === selectedDay) {
						className = `${styles.day} ${styles.selected}`;
					}
					day++;
					currentDayIndex++;
				} else {
					className = styles.not_in_month;
					dayNumber = nextMonthDay;
					nextMonthDay++;
				}

				rowElements.push(
					<td
						key={`${row}-${col}`}
						className={className}
						onClick={
							clickable
								? () => handleDayClick(dayNumber!)
								: undefined
						}
					>
						{dayNumber}
					</td>
				);
			}

			calendarNumbers.push(<tr key={row}>{rowElements}</tr>);
		}

		return calendarNumbers;
	};

	const month = 12;
	const year = 2024;

	const calendarNumbers = generateCalendarNumbers(month, year);

	return (
		<div className={styles.background_calendar}>
			<div className={styles.calendar}>
				<table className={styles.table}>
					<tbody>{calendarNumbers}</tbody>
				</table>
			</div>
		</div>
	);
};

export default Calendar;
