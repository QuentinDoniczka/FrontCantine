import styles from './AddButton.module.scss';
interface AddButtonProps {
	text: string;
	onClick: () => void;
}

const AddButton = ({ text, onClick }: AddButtonProps) => {
	return (
		<button className={styles.button} onClick={onClick}>
			<span>{text}</span>
		</button>
	);
};

export default AddButton;
