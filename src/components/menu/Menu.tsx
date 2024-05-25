import React, { useState } from 'react';
import styles from './Menu.module.scss';
import AddMenu from '../addmenu/AddMenu.tsx';

type MenuProps = {
	title: string;
	count: number;
};

const Menu: React.FC<MenuProps> = ({ title, count }) => {
	const [menuItems, setMenuItems] = useState(
		Array.from({ length: count }, () => [{ id: 0, state: 'button' }])
	);

	const handleAddMenu = (index: number) => {
		setMenuItems(prevItems => {
			const newItems = [...prevItems];
			if (newItems[index].length < 3) {
				newItems[index] = [
					...newItems[index],
					{ id: Date.now(), state: 'button' },
				];
			}
			return newItems;
		});
	};

	const handleRemoveMenu = (sectionIndex: number, itemIndex: number) => {
		setMenuItems(prevItems => {
			const newItems = [...prevItems];
			newItems[sectionIndex] = newItems[sectionIndex].filter(
				(_, index) => index !== itemIndex
			);

			const buttonCount = newItems[sectionIndex].filter(
				item => item.state === 'button'
			).length;
			if (buttonCount === 0) {
				newItems[sectionIndex] = [
					...newItems[sectionIndex],
					{ id: Date.now(), state: 'button' },
				];
			}

			return newItems;
		});
	};

	const handleStateChange = (
		sectionIndex: number,
		itemIndex: number,
		state: 'button' | 'form' | 'validated'
	) => {
		setMenuItems(prevItems => {
			const newItems = [...prevItems];
			newItems[sectionIndex][itemIndex].state = state;
			return newItems;
		});
	};

	return (
		<div>
			<div className={styles.title}>
				<h2>{title}</h2>
			</div>
			{menuItems.map((section, sectionIndex) => (
				<div key={sectionIndex} className={styles.menu_container}>
					{section.map((item, itemIndex) => (
						<AddMenu
							key={item.id}
							onAdd={() => handleAddMenu(sectionIndex)}
							onUpdate={() => {}}
							onRemove={() =>
								handleRemoveMenu(sectionIndex, itemIndex)
							}
							hasMultiple={section.length > 1}
							onStateChange={state =>
								handleStateChange(
									sectionIndex,
									itemIndex,
									state
								)
							}
						/>
					))}
				</div>
			))}
		</div>
	);
};

export default Menu;
