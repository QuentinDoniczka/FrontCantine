export const passwordPattern =
	/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{12,}$/;

export const validatePassword = (password: string): boolean => {
	return passwordPattern.test(password);
};

export const getErrorMessage = (errorCode: string): string => {
	switch (errorCode) {
		case 'DuplicateUserName':
			return 'Username is already taken.';
		// Add more cases as needed for different error codes
		default:
			return 'An unexpected error occurred. Please try again.';
	}
};
