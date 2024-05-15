import { useEffect, useState } from 'react';
import styles from "./MenusHomePage.module.scss";
import Card from "../card/Card.tsx";
import ActionButton from "../actionButton/ActionButton.tsx";
import { getMenuByDateRange } from '../../api/menus';

const MenusHomePage = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Initialiser les dates
    useEffect(() => {
        setStartDate('2024-05-10');
        setEndDate('2024-05-17');
    }, []);

    useEffect(() => {
        if (startDate && endDate) {
            const fetchMenus = async () => {
                try {
                    const menusData = await getMenuByDateRange({ startDate, endDate });
                    console.log('Fetched menus:', menusData);
                } catch (error) {
                    console.error('Failed to fetch menus:', error);
                }
            };

            fetchMenus();
        }
    }, [startDate, endDate]);

    return (
        <>
            <div className={styles.card_group}>
                <div className={"col-6"}>
                    <div className={styles.buttons}>
                        <ActionButton text={"Monday"} theme={2} height={"50px"} width={"150px"} font_size={22} />
                        <ActionButton text={"Tuesday"} theme={2} height={"50px"} width={"150px"} font_size={22} />
                        <ActionButton text={"Wednesday"} theme={2} height={"50px"} width={"150px"} font_size={22} />
                        <ActionButton text={"Thursday"} theme={2} height={"50px"} width={"150px"} font_size={22} />
                        <ActionButton text={"Friday"} theme={2} height={"50px"} width={"150px"} font_size={22} />
                    </div>
                    <div className={styles.cards}>
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </div>
                <div className={"col-2"}>
                    <div className={styles.single_button}>
                        <ActionButton text={"Friday"} theme={2} height={"50px"} width={"150px"} font_size={22} />
                    </div>
                    <div className={styles.card}>
                        <Card />
                    </div>
                </div>
            </div>
        </>
    );
}

export default MenusHomePage;
