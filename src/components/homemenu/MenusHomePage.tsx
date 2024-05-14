import styles from "./MenusHomePage.module.scss";
import Card from "../card/Card.tsx";
import ActionButton from "../actionButton/ActionButton.tsx";

const MenusHomePage = () => {
    return (
        <>
            <div className={styles.card_group}>
                <div className={"col-6"}>
                    <div className={styles.buttons}>
                        <ActionButton text={"Monday"} theme={2} height={"50px"} width={"150px"} font_size={22}/>
                        <ActionButton text={"Tuesday"} theme={2} height={"50px"} width={"150px"} font_size={22}/>
                        <ActionButton text={"Wednesday"} theme={2} height={"50px"} width={"150px"} font_size={22}/>
                        <ActionButton text={"Thursday"} theme={2} height={"50px"} width={"150px"} font_size={22}/>
                        <ActionButton text={"Friday"} theme={2} height={"50px"} width={"150px"} font_size={22}/>
                    </div>
                    <div className={styles.cards}>
                        <Card/>
                        <Card/>
                        <Card/>
                    </div>
                </div>
                <div className={"col-2"}>
                    <div className={styles.single_button}>
                        <ActionButton text={"Friday"} theme={2} height={"50px"} width={"150px"} font_size={22}/>
                    </div>
                    <div className={styles.card}>
                    <Card/>
                    </div>
                </div>
            </div>
        </>

    )
}
export default MenusHomePage