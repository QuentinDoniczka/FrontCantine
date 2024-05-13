import styles from "./Footer.module.scss";

const Footer = () => {
    return (
        <footer className={styles.footernav}>
            <nav>
                <div className={"col-6"}>
                    <a href="/contact" className="navbar-link">Contact Us</a>
                    <a href="/newsletter" className="navbar-link">Newsletter</a>
                    <a href="/feedback" className="navbar-link">Feedback</a>
                </div>
                <div className={"col-2"}>
                    <a href="/credit" className="navbar-link">© Credit</a>
                </div>

            </nav>
        </footer>
    );
}

export default Footer;