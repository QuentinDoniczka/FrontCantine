import styles from "./Card.module.scss";
import img from "../../assets/img/no_image.jpg";

const Card = () => {
    return (
        <div className={styles.card}>
            <div className={styles.card_content}>
                <img className={styles.img} src={img} alt="card" />
            </div>
        </div>
    );
};

export default Card;
