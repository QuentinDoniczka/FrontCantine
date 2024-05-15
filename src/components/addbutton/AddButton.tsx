import React from 'react';
import styles from './AddButton.module.scss';
interface AddButtonProps {
    text: string;
}

const AddButton: React.FC<AddButtonProps> = ({ text }) => {
    return (
        <button className={styles.button}>
            <span>{text}</span>
        </button>
    );
}

export default AddButton;
