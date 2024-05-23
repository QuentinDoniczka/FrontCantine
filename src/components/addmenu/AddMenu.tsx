import React, { useState } from 'react';
import styles from './AddMenu.module.scss';

type AddMenuProps = {
	onAdd: () => void;
};

const AddMenu: React.FC<AddMenuProps> = ({ onAdd }) => {
	const [state, setState] = useState<'button' | 'form' | 'validated'>(
		'button'
	);

	const handleButtonClick = () => {
		setState('form');
	};

	const handleCancelClick = () => {
		setState('button');
	};

	const handleValidateClick = () => {
		setState('validated');
		onAdd();
	};

	return (
		<div className={styles.container}>
			{state === 'button' && (
				<button className={styles.button} onClick={handleButtonClick}>
					<p>+</p>
				</button>
			)}
			{state === 'form' && (
				<div className={styles.card}>
					<button onClick={handleValidateClick}>Valider</button>
					<button onClick={handleCancelClick}>Cancel</button>
				</div>
			)}
			{state === 'validated' && <div className={styles.card}></div>}
		</div>
	);
};

export default AddMenu;
