// src/components/register/Register.tsx
import React, { useState } from "react";
import styles from "./Register.module.scss";
import ActionButton from "../actionButton/ActionButton.tsx";
interface RegisterProps {
    onSwitchModal: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSwitchModal }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle registration logic here
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log("Register with", { email, password });
    };

    return (
        <div className="container mt-4">
            <form className={styles.form} onSubmit={handleRegister}>
                <div className={styles.group}>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className={styles.group}>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div className={styles.group}>
                    <label>Confirm Password:</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                           required/>
                </div>
                <div className={styles.group_button}>
                    <ActionButton text={"Register"}
                                  theme={3}
                                  height={"35px"}
                                  width={"100px"}
                                  font_size={18}
                                  shadow={false}

                    />
                    <ActionButton text={"Login"}
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

export default Register;
