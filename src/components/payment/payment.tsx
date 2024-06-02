import { useSelector } from 'react-redux';
import styles from './Payment.module.scss';
import { selectTotalPrice } from '../../store/slices/shoppingSlice.ts';
import { RootState } from '../../store/store.ts';
import ActionButton from '../actionbutton/ActionButton.tsx';

const Payment = () => {
	const totalPrice = useSelector(selectTotalPrice);
	const items = useSelector((state: RootState) => state.shopping.items);

	return (
		<>
			<div className={styles.payment}>
				<ul>
					{items.map(item => (
						<li key={item.id}>
							{item.name} - {item.price.toFixed(2)}€
						</li>
					))}
				</ul>
				<div className={styles.end}>
					<p>Total Price: {totalPrice.toFixed(2)}€</p>
					<ActionButton
						text="payment"
						onClick={() => {}}
						width={'130'}
						height={'50'}
					/>
				</div>
			</div>
		</>
	);
};

export default Payment;
