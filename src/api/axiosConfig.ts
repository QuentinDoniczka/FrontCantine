import axios from 'axios';

const getBaseURL = () => {
  if (window.location.hostname === 'localhost') {
    return 'https://localhost:7010/api'; // URL pour l'environnement local
  } else {
    return 'https://your-production-api.com/api'; // URL pour l'environnement de production
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
    const token = localStorage.getItem('jwtToken');
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
