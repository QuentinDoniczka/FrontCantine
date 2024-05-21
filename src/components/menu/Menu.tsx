import React from 'react';
import styles from './Menu.module.scss';

type MenuProps = {
	title: string;
	count: number;
};

const Menu: React.FC<MenuProps> = ({ title, count }) => {
	const menuContainers = [];
	for (let i = 0; i < count; i++) {
		menuContainers.push(
			<div key={i} className={styles.menu_container}></div>
		);
	}

	return (
		<div>
			<div className={styles.title}>
				<h2>{title}</h2>
			</div>
			{menuContainers}
		</div>
	);
};

export default Menu;
