import React, { useState } from "react";
import styles from "./Header.module.scss";
import img from "../../assets/img/logo.png";
import ActionButton from "../actionButton/ActionButton.tsx";
import ReactModal from "react-modal";
import Login from "../login/Login.tsx";
import Register from "../register/Register.tsx";

const Header: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<'login' | 'register'>('login');

    const openModal = (content: 'login' | 'register') => {
        setModalContent(content);
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);
  return (
      <header>
          <nav className={styles.headernav}>
              <div className={"col-1"}>
                  <img src={img} alt="logo" className={styles.logo}/>
              </div>
              <div className={`${styles.headerpagesnav} col-3`}>
                  <a href="/home" className="navbar-link">Home</a>
                  <a href="/manage" className="navbar-link">Manage</a>
                  <a href="/admin" className="navbar-link">Admin</a>
              </div>
              <div className={`${styles.headerpagesnav} col-4`}>
                  <p> Week of Monday 25-12 </p>
              </div>
              <div className={`${styles.lastdiv} col-4`}>
                  <ActionButton text={"Register"}
                                theme={2}
                                height={"40px"}
                                width={"120px"}
                                font_size={22}
                                shadow={false}
                                onClick={() => openModal('register')}/>
                  <ActionButton text={"Login"}
                                theme={1}
                                height={"50px"}
                                width={"150px"}
                                onClick={() => openModal('login')}/>
              </div>
          </nav>
          <ReactModal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              overlayClassName={styles.modalOverlay}
              className={`${styles.modalContent} ${modalContent === 'login' ? styles.loginContent : styles.registerContent}`}
          >
              {modalContent === 'login' ? <Login onSwitchModal={() => openModal('register')} /> : <Register onSwitchModal={() => openModal('login')} />}
          </ReactModal>
      </header>
  );
}
export default Header;