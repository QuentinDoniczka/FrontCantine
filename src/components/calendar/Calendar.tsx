import { useEffect, useState } from 'react';
import styles from './Calendar.module.scss';
import LeftArrow from '../../assets/icons/left.svg';
import RightArrow from '../../assets/icons/right.svg';
import { monthsOfYear } from '../../utils/constants.ts';
import ActionButton from '../actionbutton/ActionButton.tsx';

interface CalendarProps {
	selectedDate: { day: number; month: number; year: number };
	onDateChange: (date: { day: number; month: number; year: number }) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateChange }) => {
	const [month, setMonth] = useState(selectedDate.month - 1);
	const [year, setYear] = useState(selectedDate.year);
	const [selectedDay, setSelectedDay] = useState(selectedDate.day);

	useEffect(() => {
		onDateChange({ day: selectedDay, month: month + 1, year: year });
	}, [selectedDay, month, year]);

	const handleDayClick = (day: number) => {
		setSelectedDay(day);
		console.log(`day selected : ${day}`);
	};
	const findFirstAvailableDay = (month: number, year: number) => {
		const firstdayIndex = new Date(year, month, 1).getDay();
		console.log(firstdayIndex);
		switch (firstdayIndex) {
			case 6:
				return 3;
			case 0:
				return 2;
			default:
				return 1;
		}
	};
	const handlePrevMonth = () => {
		setMonth(prevMonth => {
			const newMonth = prevMonth - 1;
			if (newMonth < 0) {
				setYear(prevYear => prevYear - 1);
				const firstAvailableDay = findFirstAvailableDay(11, year - 1);
				setSelectedDay(firstAvailableDay);
				return 11;
			}
			const firstAvailableDay = findFirstAvailableDay(newMonth, year);
			setSelectedDay(firstAvailableDay);
			return newMonth;
		});
	};

	const handleNextMonth = () => {
		setMonth(prevMonth => {
			const newMonth = prevMonth + 1;
			if (newMonth > 11) {
				setYear(prevYear => prevYear + 1);
				const firstAvailableDay = findFirstAvailableDay(0, year + 1);
				setSelectedDay(firstAvailableDay);
				return 0;
			}
			const firstAvailableDay = findFirstAvailableDay(newMonth, year);
			setSelectedDay(firstAvailableDay);
			return newMonth;
		});
	};

	const generateCalendarNumbers = (month: number, year: number) => {
		const tabCalendar = generateTableCalendar(month, year);
		let CountFirstDayIndex = new Date(year, month, 1).getDay();
		CountFirstDayIndex = CountFirstDayIndex == 1 ? 7 : CountFirstDayIndex;

		let inMonth = CountFirstDayIndex == 1 ? 1 : 0;
		let monthStatus = inMonth;
		let counter = 1;
		const calendarNumbers = [];

		for (let row = 0; row < 6; row++) {
			counter++;
			const rowElements = [];

			for (let col = 0; col < 5; col++) {
				const dayNumber = tabCalendar[row][col];
				if (monthStatus == 0 && dayNumber < 5) {
					monthStatus = 1;
					inMonth = 1;
					counter = 1;
				}
				if (monthStatus == 1 && counter > dayNumber) {
					monthStatus = 2;
					inMonth = 0;
				}
				let className = '';
				let clickable = false;
				if (inMonth) {
					className = styles.day;
					clickable = true;
					if (dayNumber === selectedDay) {
						className = `${styles.day} ${styles.selected}`;
					}
				} else {
					className = styles.not_in_month;
				}

				rowElements.push(
					<td
						key={`${row}-${col}`}
						className={className}
						onClick={
							clickable
								? () => handleDayClick(dayNumber)
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
	const generateTableCalendar = (month: number, year: number) => {
		let firstDayIndex = new Date(year, month, 1).getDay();
		firstDayIndex = firstDayIndex == 0 ? 7 : firstDayIndex;
		const prevMonthDays = new Date(year, month, 0).getDate();
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		console.log(firstDayIndex, prevMonthDays, daysInMonth);

		let dayCounter = prevMonthDays - (firstDayIndex - 1);
		let nextmMouthCounter = 0;
		const tabCalendar = [];

		for (let line = 0; line < 6; line++) {
			const row = [];
			for (let col = 0; col < 7; col++) {
				if (dayCounter >= prevMonthDays && nextmMouthCounter == 0) {
					nextmMouthCounter = 1;
					dayCounter = 1;
				}
				if (dayCounter > daysInMonth && nextmMouthCounter == 1) {
					dayCounter = 1;
				}
				row.push(dayCounter);
				dayCounter++;
			}
			tabCalendar.push(row);
		}
		return tabCalendar;
	};
	const calendarNumbers = generateCalendarNumbers(month, year);

	return (
		<div className={styles.background_calendar}>
			<div className={styles.calendar}>
				<div className={styles.calendar_head}>
					<img
						src={LeftArrow}
						alt="Left Arrow"
						className={styles.left_arrow}
						onClick={handlePrevMonth}
					/>
					<p>{monthsOfYear[month]}</p>
					<img
						src={RightArrow}
						alt="Right Arrow"
						className={styles.left_arrow}
						onClick={handleNextMonth}
					/>
				</div>
				<div className={styles.date}>
					<p>
						{selectedDay}/{month + 1}/{year}
					</p>
				</div>
				<table className={styles.table}>
					<tbody>{calendarNumbers}</tbody>
				</table>
				<div className={styles.button_container}>
					<ActionButton
						text="Save"
						onClick={() => console.log('Valider')}
						theme={2}
						border={true}
						width="130px"
						height="50px"
						font_size={22}
					/>
					<ActionButton
						text="Deploy"
						onClick={() => console.log('Valider')}
						theme={5}
						width="130px"
						height="50px"
						border={true}
						font_size={22}
					/>
				</div>
			</div>
		</div>
	);
};

export default Calendar;
