// Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import ActionButton from '../actionbutton/ActionButton.tsx';
import { login } from '../../api/auth.ts';
import Cookies from 'js-cookie';
import { setAuthState } from '../../store/slices/authSlice.ts';
import { useDispatch } from 'react-redux';

interface LoginProps {
	onSwitchModal: () => void;
	onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchModal, onClose }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const data = await login({ email, password });
			Cookies.set('jwtToken', data.token, {
				secure: true,
				sameSite: 'strict',
			});
			localStorage.setItem('tokenExpiration', data.expiration);
			localStorage.setItem('mail', data.mail);

			dispatch(
				setAuthState({
					isAuthenticated: true,
					userRole: data.role,
				})
			);

			// Dispatch event to notify other components that the user has logged in
			const event = new CustomEvent('userLogin');
			window.dispatchEvent(event);
			onClose();
			navigate('/');
		} catch (error) {
			setError(
				'Login failed. Please check your credentials and try again.'
			);
		}
	};

	return (
		<div className="container mt-4">
			<form className={styles.form} onSubmit={handleLogin}>
				<div className={styles.group}>
					<label>Email:</label>
					<input
						type="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
						className={error ? styles.error : ''}
					/>
				</div>
				<div className={styles.group}>
					<label>Password:</label>
					<input
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
						className={error ? styles.error : ''}
					/>
				</div>
				<div className={styles.group_button}>
					<ActionButton
						text={'Register'}
						theme={4}
						height={'35px'}
						width={'100px'}
						font_size={18}
						shadow={false}
						onClick={onSwitchModal}
					/>
					<ActionButton
						text={'Login'}
						theme={3}
						height={'35px'}
						width={'100px'}
						font_size={18}
						shadow={false}
						type="submit"
						onClick={() => {}}
					/>
				</div>
				{error && <p className={styles.errorText}>{error}</p>}
			</form>
		</div>
	);
};

export default Login;
