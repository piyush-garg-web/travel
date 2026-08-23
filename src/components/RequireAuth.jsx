import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';

export const RequireAuth = ({ children }) => {
  const { isLoggedIn } = useTravel();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`} replace />;
  }

  return children;
};
