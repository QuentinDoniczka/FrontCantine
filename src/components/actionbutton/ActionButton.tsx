import React from 'react';
import styles from './ActionButton.module.scss';

interface ActionButtonProps {
	text: string;
	onClick: () => void;
	theme?: number;
	height?: string;
	width?: string;
	font_size?: number;
	shadow?: boolean;
	type?: 'button' | 'submit' | 'reset';
	border?: boolean;
	active?: boolean;
}
const ActionButton: React.FC<ActionButtonProps> = ({
	text,
	onClick,
	theme,
	height,
	width,
	font_size,
	shadow = true,
	type = 'button', // Default type is "button"
	border = false,
	active,
}) => {
	// Assign a theme-specific class if a theme is provided
	const themeClass = theme ? styles[`button-theme-${theme}`] : '';
	const activeClass = active ? styles.active : '';

	const buttonStyle = {
		height: height ?? 'auto',
		width: width ?? 'auto',
		fontSize: font_size,
		boxShadow: !shadow ? 'none' : undefined,
		border: border ? '2px solid black' : undefined,
	};

	return (
		<button
			className={`${styles.actionbutton} ${themeClass} ${activeClass}`}
			onClick={onClick}
			style={buttonStyle}
			type={type}
		>
			{text}
		</button>
	);
};

export default ActionButton;
