import React, { useState } from 'react';
import styles from './TypeMenu.module.scss';
import AddMenu from '../addmenu/AddMenu.tsx';
import { ProductData } from '../../types/Product.types.ts';
type MenuProps = {
	title: string;
	products: ProductData[];
};

const TypeMenu: React.FC<MenuProps> = ({ title, products }) => {
	const [menuItems, setMenuItems] = useState([{ id: 0, state: 'button' }]);

	const handleAddMenu = () => {
		setMenuItems(prevItems => {
			if (prevItems.length < 3) {
				return [...prevItems, { id: Date.now(), state: 'button' }];
			}
			return prevItems;
		});
	};

	const handleRemoveMenu = (itemIndex: number) => {
		setMenuItems(prevItems => {
			const newItems = prevItems.filter(
				(_, index) => index !== itemIndex
			);

			if (newItems.length === 0) {
				return [{ id: Date.now(), state: 'button' }];
			}

			return newItems;
		});
	};

	const handleStateChange = (
		itemIndex: number,
		state: 'button' | 'form' | 'validated'
	) => {
		setMenuItems(prevItems => {
			const newItems = [...prevItems];
			const isLastItem = itemIndex === newItems.length - 1;

			const validatedCount = newItems.filter(
				item => item.state === 'validated'
			).length;

			if (state === 'validated' && validatedCount === 0 && isLastItem) {
				newItems.push({ id: Date.now(), state: 'button' });
			}

			newItems[itemIndex].state = state;
			return newItems;
		});
	};

	return (
		<div>
			<div className={styles.title}>
				<h2>{title}</h2>
			</div>
			<div className={styles.menu_container}>
				{menuItems.map((item, itemIndex) => {
					return (
						<AddMenu
							key={item.id}
							onAdd={handleAddMenu}
							onUpdate={() => {}}
							onRemove={() => handleRemoveMenu(itemIndex)}
							hasMultiple={menuItems.length > 1}
							onStateChange={state =>
								handleStateChange(itemIndex, state)
							}
							title={title}
							product={products}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default TypeMenu;
