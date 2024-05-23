import React, { useState } from 'react';
import styles from './Menu.module.scss';
import AddMenu from '../addmenu/AddMenu.tsx';

type MenuProps = {
	title: string;
	count: number;
};

const Menu: React.FC<MenuProps> = ({ title, count }) => {
	const [menuItems, setMenuItems] = useState(
		Array.from({ length: count }, () => [0])
	);

	const handleAddMenu = (index: number) => {
		setMenuItems(prevItems => {
			const newItems = [...prevItems];
			if (newItems[index].length < 3) {
				newItems[index] = [...newItems[index], newItems[index].length];
			}
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
					{section.map(item => (
						<AddMenu
							key={item}
							onAdd={() => handleAddMenu(sectionIndex)}
						/>
					))}
				</div>
			))}
		</div>
	);
};

export default Menu;
