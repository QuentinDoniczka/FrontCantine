import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { roleHierarchy } from '../utils/constants.ts';

type Props = {
	children: React.ReactNode;
	requiredRole: 'Client' | 'Manager' | 'Admin' | 'SuperAdmin';
};

const Protected: React.FC<Props> = ({ children, requiredRole }) => {
	const { isAuthenticated, userRole } = useAuth();

	const isRoleSufficient = (
		userRole: string | null,
		requiredRole: string
	): boolean => {
		if (!userRole) return false;
		return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
	};

	if (!isAuthenticated || !isRoleSufficient(userRole, requiredRole)) {
		return <Navigate to="/" replace />;
	}

	return <>{children}</>;
};

export default Protected;
