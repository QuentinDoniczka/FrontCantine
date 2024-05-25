import React, { useState } from 'react';
import styles from './AddMenu.module.scss';
import closeIcon from '../../assets/icons/close.svg';
import validateIcon from '../../assets/icons/validate.svg';
import editIcon from '../../assets/icons/edit.svg';

type AddMenuProps = {
	onAdd: () => void;
	onUpdate: () => void;
	onRemove: () => void;
	hasMultiple: boolean;
	onStateChange: (state: 'button' | 'form' | 'validated') => void;
};

const AddMenu: React.FC<AddMenuProps> = ({
	onAdd,
	onUpdate,
	onRemove,
	hasMultiple,
	onStateChange,
}) => {
	const [state, setState] = useState<'button' | 'form' | 'validated'>(
		'button'
	);
	const [price, setPrice] = useState('');

	const handleButtonClick = () => {
		setState('form');
		onStateChange('form');
	};

	const handleCancelClick = () => {
		if (hasMultiple) {
			onRemove();
		} else {
			setState('button');
			onStateChange('button');
		}
	};

	const handleValidateClick = () => {
		if (state === 'form') {
			onAdd();
		} else if (state === 'validated') {
			onUpdate();
		}
		setState('validated');
		onStateChange('validated');
	};

	const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPrice(e.target.value);
	};

	return (
		<div className={styles.container}>
			{state === 'button' && (
				<div className={styles.button} onClick={handleButtonClick}>
					<p>+</p>
				</div>
			)}
			{state === 'form' && (
				<form className={styles.card}>
					<div className={styles.button_group}>
						<img
							src={closeIcon}
							alt="Close"
							onClick={handleCancelClick}
							className={styles.icon}
						/>
						<div className={styles.input_container}>
							<input
								type="number"
								value={price}
								onChange={handlePriceChange}
								placeholder="0"
							/>
							<span>€</span>
						</div>
						<img
							src={validateIcon}
							alt="Validate"
							onClick={handleValidateClick}
							className={styles.icon}
						/>
					</div>
				</form>
			)}

			{state === 'validated' && (
				<div className={styles.card}>
					<img
						src={editIcon}
						alt="Edit"
						onClick={() => setState('form')}
						className={styles.icon}
					/>
					<p>{price} €</p>
				</div>
			)}
		</div>
	);
};

export default AddMenu;
