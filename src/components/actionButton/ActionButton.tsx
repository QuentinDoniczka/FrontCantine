import React from "react";
import {ActionButtonProps} from "../../types/actionButton.types";
import styles from "./ActionButton.module.scss";

const ActionButton: React.FC<ActionButtonProps> = ({
                                                       text,
                                                       onClick,
                                                       theme,
                                                       height,
                                                       width,
                                                       font_size,
                                                       shadow = true,
                                                   }) => {
    // Assign a theme-specific class if a theme is provided
    const themeClass = theme ? styles[`button-theme-${theme}`] : '';

    const buttonStyle = {
        height: height ?? 'auto', // 'auto' is used if height is null or undefined
        width: width ?? 'auto',  // 'auto' is used if width is null or undefined
        fontSize: font_size,
        boxShadow: !shadow ? 'none' : undefined,
        
    };

    return (
        <button
            className={`${styles.actionbutton} ${themeClass}`}
            onClick={onClick}
            style={buttonStyle}
        >
            {text}
        </button>
    );
};

export default ActionButton;
