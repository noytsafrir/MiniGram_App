import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import CreatePostPage from './pages/CreatePostPage';

const App: React.FC = () => {
  // const token = localStorage.getItem('token');
  // console.log("Token from localStorage:", token);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/create" element={isAuthenticated ? <CreatePostPage /> : <Navigate to="/login" />} />

      </Routes>
    </Router>
  );
};

export default App;
