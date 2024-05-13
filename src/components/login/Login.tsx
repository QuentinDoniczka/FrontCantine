import React, { useState } from "react";
import styles from "./Login.module.scss";
import ActionButton from "../actionButton/ActionButton.tsx";
interface LoginProps {
    onSwitchModal: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchModal }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log("Login with", { email, password });
    };

    return (
        <div className="container mt-4">
            <form className={styles.form} onSubmit={handleLogin}>
                <div className={styles.group}>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className={styles.group}>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div className={styles.group_button}>
                    <ActionButton text={"Login"}
                                  theme={3}
                                  height={"35px"}
                                  width={"100px"}
                                  font_size={18}
                                  shadow={false}/>
                    <ActionButton text={"Register"}
                                    theme={4}
                                    height={"35px"}
                                    width={"100px"}
                                    font_size={18}
                                    shadow={false}
                                    onClick={onSwitchModal}
                    />
                </div>
            </form>
        </div>
    );
};

export default Login;