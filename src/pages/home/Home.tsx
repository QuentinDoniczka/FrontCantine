import FullOverlay from '../../components/fulloverlay/FullOverlay';
import styles from './Home.module.scss';
import MenusHomePage from '../../components/homemenu/MenusHomePage.tsx';

const Home = () => {
	const bg_1_height = '60vh';
	const bg_2_height = '20vh';
	const bg_3_height = '10vh';
	const total_height_num =
		parseInt(bg_1_height, 10) +
		parseInt(bg_2_height, 10) +
		parseInt(bg_3_height, 10);
	const total_height = `${total_height_num}vh`;
	return (
		<div
			className={'row g-0'}
			style={{ height: total_height, width: '100%' }}
		>
			<FullOverlay
				height1={bg_1_height}
				height2={bg_2_height}
				height3={bg_3_height}
			/>
			<div className={styles.slogan}>
				<h1>
					Design Your <span>Dream</span> Menu in Moments,{' '}
					<span>Quick</span> and <span>Easy !</span>
				</h1>
			</div>
			<MenusHomePage />
		</div>
	);
};

export default Home;
