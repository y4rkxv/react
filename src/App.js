import React from 'react';
import './styles/App.css';
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';
import Posts from './pages/Posts';
import About from './pages/About';
import Navbar from './components/UI/Navbar/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/' element={<Navigate to='/posts' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
