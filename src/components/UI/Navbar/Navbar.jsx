import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MyButton from '../button/MyButton';
import { AuthContext } from '../../../context';

const Navbar = () => {
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth');
  };

  return (
    <div className='navbar'>
      <div className='navbar__links'>
        <MyButton onClick={() => navigate('/about')}>About</MyButton>
        <MyButton onClick={() => navigate('/posts')}>Posts</MyButton>
      </div>
      <MyButton onClick={logout}>Sign out</MyButton>
    </div>
  );
};

export default Navbar;
