// Logout.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { resetAuthState } from '../../store/slices/authSlice.ts';

interface LogoutProps {
	email: string | null;
}

const Logout: React.FC<LogoutProps> = ({ email }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
	) => {
		e.preventDefault();

		localStorage.removeItem('tokenExpiration');
		localStorage.removeItem('mail');
		localStorage.removeItem('role');

		Cookies.remove('jwtToken');

		dispatch(resetAuthState());

		// Dispatch event to notify other components that the user has logged out
		const event = new CustomEvent('userLogout');
		window.dispatchEvent(event);

		navigate('/login');
	};

	return (
		<a href="/login" onClick={handleLogout}>
			{email}
		</a>
	);
};

export default Logout;
