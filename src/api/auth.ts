import axiosInstance from './axiosConfig';

interface LoginParams {
  email: string;
  password: string;
}

export const login = async (params: LoginParams) => {
  try {
    const response = await axiosInstance.post('/account/login', params);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};
