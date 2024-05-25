import React, { useState } from 'react';
import styles from './Register.module.scss';
import ActionButton from '../actionbutton/ActionButton.tsx';
import { register } from '../../api/auth';
import { validatePassword, getErrorMessage } from '../../utils/utils.ts';

interface RegisterProps {
	onSwitchModal: () => void;
}

interface ApiError {
	response: {
		status: number;
		data: Array<{ code: string; description: string }>;
	};
}

const Register: React.FC<RegisterProps> = ({ onSwitchModal }) => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [successMessage, setSuccessMessage] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');

	const handleRegister = async (e: React.FormEvent): Promise<void> => {
		e.preventDefault();
		setSuccessMessage('');
		setErrorMessage('');

		if (password !== confirmPassword) {
			setErrorMessage('Passwords do not match!');
			return;
		}

		if (!validatePassword(password)) {
			setErrorMessage(
				'Password must contain at least one special character, one uppercase letter, one number, and be at least 12 characters long.'
			);
			return;
		}

		const registerParams = {
			email,
			password,
			firstName,
			lastName,
		};

		try {
			const response = await register(registerParams);
			console.log('Registration successful:', response);
			setSuccessMessage('Your account has been successfully created!');
			// Switch to login after a short delay
			setTimeout(() => {
				onSwitchModal();
			}, 3000); // 3 seconds delay
		} catch (error) {
			const apiError = error as ApiError;
			console.error('Registration error:', apiError);
			if (apiError.response && apiError.response.status === 400) {
				const errorCode = apiError.response.data[0]?.code;
				setErrorMessage(getErrorMessage(errorCode));
			} else {
				setErrorMessage(
					'An unexpected error occurred. Please try again.'
				);
			}
		}
	};

	return (
		<div className="container mt-4">
			<form className={styles.form} onSubmit={handleRegister}>
				<div className={styles.group}>
					<label>First Name:</label>
					<input
						type="text"
						value={firstName}
						onChange={e => setFirstName(e.target.value)}
						required
					/>
				</div>
				<div className={styles.group}>
					<label>Last Name:</label>
					<input
						type="text"
						value={lastName}
						onChange={e => setLastName(e.target.value)}
						required
					/>
				</div>
				<div className={styles.group}>
					<label>Email:</label>
					<input
						type="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className={styles.group}>
					<label>Password:</label>
					<input
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
					/>
				</div>
				<div className={styles.group}>
					<label>Confirm Password:</label>
					<input
						type="password"
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
						required
					/>
				</div>
				<div className={styles.group_button}>
					<ActionButton
						text={'Login'}
						theme={4}
						height={'35px'}
						width={'100px'}
						font_size={18}
						shadow={false}
						onClick={onSwitchModal}
					/>
					<ActionButton
						text={'Register'}
						theme={3}
						height={'35px'}
						width={'100px'}
						font_size={18}
						shadow={false}
						type="submit"
					/>
				</div>
				{successMessage && (
					<div className={styles.successMessage}>
						{successMessage}
					</div>
				)}
				{errorMessage && (
					<div className={styles.errorMessage}>{errorMessage}</div>
				)}
			</form>
		</div>
	);
};

export default Register;
