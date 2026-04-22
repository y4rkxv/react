import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '../router';
import { AuthContext } from '../context';
import Loader from '../components/UI/loader/Loader';

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Routes>
      {isAuth
        ? privateRoutes.map(router => (
            <Route
              key={router.path}
              element={<router.component />}
              path={router.path}
            />
          ))
        : publicRoutes.map(router => (
            <Route
              key={router.path}
              element={<router.component />}
              path={router.path}
            />
          ))}
      <Route
        path='*'
        element={<Navigate to={isAuth ? '/posts' : '/login'} />}
      />
    </Routes>
  );
};

export default AppRouter;
