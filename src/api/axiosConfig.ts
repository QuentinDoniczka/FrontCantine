import axios from 'axios';
import Cookies from 'js-cookie';

const getBaseURL = () => {
	if (window.location.hostname === 'localhost') {
		return 'http://4.233.201.17:8080/api';
		//return 'https://localhost:7010/api';
	} else {
		return 'https://localhost:7010/api';
	}
};

const axiosInstance = axios.create({
	baseURL: getBaseURL(),
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosInstance.interceptors.request.use(
	config => {
		const token = Cookies.get('jwtToken');
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

export default axiosInstance;
