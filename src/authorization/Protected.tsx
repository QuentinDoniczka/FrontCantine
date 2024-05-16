import React from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

const Protected = ({ children }: Props): React.ReactElement | null => {
  const user = true; // TODO replace with real user
  const authChecked = true; // TODO replace with real auth check

  if (!authChecked) {
    return null; // or <Loading />
  }

  if (!user) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default Protected;
