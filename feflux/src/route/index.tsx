import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../page/home';
import Login from '../page/login';
import Register from '../page/register';
import Category from '../page/category';
import Update from '../page/update';

export const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/category/add' element={<Category />} />
            <Route path='/category/edit/:id' element={<Update />} />
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
};

export const PublicRoutes = () => {
  return (
      <Routes>
          <Route path='/' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
  );
};