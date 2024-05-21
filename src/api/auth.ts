import axiosInstance from './axiosConfig';

interface LoginParams {
	email: string;
	password: string;
}

interface RegisterParams {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

interface AuthResponse {
	token: string;
	expiration: string;
	mail: string;
	role: string;
}

export const login = async (params: LoginParams): Promise<AuthResponse> => {
	try {
		const response = await axiosInstance.post<AuthResponse>(
			'/account/login',
			params
		);
		return response.data;
	} catch (error) {
		console.error('Error during login:', error);
		throw error;
	}
};

export const register = async (params: RegisterParams) => {
	try {
		const response = await axiosInstance.post('/account/register', params);
		return response.data;
	} catch (error) {
		console.error('Error during registration:', error);
		throw error;
	}
};

export const getRole = async (): Promise<string> => {
	try {
		const response = await axiosInstance.get('/account/role');
		return response.data;
	} catch (error) {
		console.error('Error fetching user role:', error);
		throw error;
	}
};
