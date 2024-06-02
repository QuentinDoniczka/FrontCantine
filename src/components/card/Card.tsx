import styles from './Card.module.scss';
import img from '../../assets/img/no_image.jpg';
import AddButton from '../addbutton/AddButton.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../../store/slices/shoppingSlice.ts';
import { RootState } from '../../store/store.ts';

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
	const dispatch = useDispatch();
	const items = useSelector((state: RootState) => state.shopping.items);
	const isInCart = data ? items.some(item => item.id === data.id) : false;

	const handleAddToCart = () => {
		if (data) {
			dispatch(
				addItem({
					id: data.id,
					name: data.name,
					price: data.price,
				})
			);
		}
	};
	const handleRemoveFromCart = () => {
		if (data) {
			dispatch(removeItem(data.id));
		}
	};
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
				{isInCart ? (
					<AddButton text={'-'} onClick={handleRemoveFromCart} />
				) : (
					<AddButton text={'+'} onClick={handleAddToCart} />
				)}
			</div>
		</div>
	);
};

export default Card;
