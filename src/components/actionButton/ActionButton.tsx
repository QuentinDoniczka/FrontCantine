import React from 'react';
import { ActionButtonProps } from '../../types/actionButton.types';
import styles from './ActionButton.module.scss';

const ActionButton: React.FC<ActionButtonProps> = ({
  text,
  onClick,
  theme,
  height,
  width,
  font_size,
  shadow = true,
  type = 'button', // Default type is "button"
}) => {
  // Assign a theme-specific class if a theme is provided
  const themeClass = theme ? styles[`button-theme-${theme}`] : '';

  const buttonStyle = {
    height: height ?? 'auto',
    width: width ?? 'auto',
    fontSize: font_size,
    boxShadow: !shadow ? 'none' : undefined,
  };

  return (
    <button
      className={`${styles.actionbutton} ${themeClass}`}
      onClick={onClick}
      style={buttonStyle}
      type={type} // Set the button type
    >
      {text}
    </button>
  );
};

export default ActionButton;
