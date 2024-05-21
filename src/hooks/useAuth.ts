import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { AppDispatch, RootState } from '../store/store';
import { resetAuthState, setAuthState } from '../store/slices/authSlice';
import { getRole } from '../api/auth';

const useAuth = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { isAuthenticated, userRole } = useSelector(
		(state: RootState) => state.auth
	);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [userEmail, setUserEmail] = useState<string | null>(null);

	const checkUserStatus = () => {
		const tokenExpiration = localStorage.getItem('tokenExpiration');
		const mail = localStorage.getItem('mail');
		if (tokenExpiration && mail) {
			const expirationDate = new Date(tokenExpiration);
			if (expirationDate > new Date()) {
				setIsLoggedIn(true);
				setUserEmail(mail);
			} else {
				localStorage.removeItem('tokenExpiration');
				localStorage.removeItem('mail');
				Cookies.remove('jwtToken');
				setIsLoggedIn(false);
				setUserEmail(null);
			}
		} else {
			setIsLoggedIn(false);
			setUserEmail(null);
			localStorage.removeItem('tokenExpiration');
			localStorage.removeItem('mail');
			localStorage.removeItem('role');

			Cookies.remove('jwtToken');

			dispatch(resetAuthState());
		}
	};

	useEffect(() => {
		const checkAuth = async () => {
			const token = Cookies.get('jwtToken');
			if (!token) {
				dispatch(
					setAuthState({ isAuthenticated: false, userRole: null })
				);
				return;
			}
			if (!userRole) {
				try {
					const role = await getRole();
					dispatch(
						setAuthState({ isAuthenticated: true, userRole: role })
					);
				} catch (error) {
					dispatch(
						setAuthState({ isAuthenticated: false, userRole: null })
					);
				}
			}
		};

		checkAuth();
		checkUserStatus();

		const handleUserLogin = () => {
			checkUserStatus();
		};

		const handleUserLogout = () => {
			setIsLoggedIn(false);
			setUserEmail(null);
		};

		const handleStorageChange = () => {
			checkUserStatus();
		};

		window.addEventListener('userLogin', handleUserLogin);
		window.addEventListener('userLogout', handleUserLogout);
		window.addEventListener('storage', handleStorageChange);

		return () => {
			window.removeEventListener('userLogin', handleUserLogin);
			window.removeEventListener('userLogout', handleUserLogout);
			window.removeEventListener('storage', handleStorageChange);
		};
	}, [dispatch, userRole]);

	return { isAuthenticated, userRole, isLoggedIn, userEmail };
};

export default useAuth;
