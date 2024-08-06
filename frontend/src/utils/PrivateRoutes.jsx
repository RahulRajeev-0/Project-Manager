import React, { useEffect, useState } from 'react';
import isAuthUser from './isAuthUser';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      const authInfo = await isAuthUser();
      console.log(authInfo.isAuthenticated);
      setIsAuthenticated(authInfo.isAuthenticated);
      setLoading(false); // Stop loading after data fetch
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
