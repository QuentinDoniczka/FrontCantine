import styles from './Card.module.scss';
import img from '../../assets/img/no_image.jpg';
import AddButton from '../addbutton/AddButton.tsx';

interface CardProps {
	data?: {
		id: string;
		name: string;
		description: string;
		price: number;
		type: string;
		imageUrl: string;
	};
}

const Card = ({ data }: CardProps) => {
	console.log('Card data:', data);
	return (
		<div className={styles.card}>
			<div className={styles.card_img}>
				<img
					className={styles.img}
					src={data?.imageUrl || img}
					alt="card"
				/>
			</div>
			<div className={styles.card_text}>
				<p>{data?.description || 'No description for this menu'}</p>
			</div>
			<div className={styles.row}>
				<div className={styles.card_prix}>
					<p>{data?.price ? `${data.price.toFixed(2)}€` : '0,00€'}</p>
				</div>
				<div className={styles.card_button}>
					<AddButton text={'+'} />
				</div>
			</div>
		</div>
	);
};

export default Card;
