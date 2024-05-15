import styles from "./Card.module.scss";
import img from "../../assets/img/no_image.jpg";
import AddButton from "../addbutton/AddButton.tsx";

const Card = () => {
    return (
        <div className={styles.card}>
            <div className={styles.card_img}>
                <img className={styles.img} src={img} alt="card" />
            </div>
            <div className={styles.card_text}>
                <p>Fillet de poulet avec pomme de terre sautée et sauce échalote et champignon</p>
            </div>
            <div className={styles.row}>
                <div className={styles.card_prix}>
                    <p>3,56€</p>
                </div>
                <div className={styles.card_button}>
                    <AddButton text={"+"} />
                </div>
            </div>
        </div>
    );
};

export default Card;
