import React from 'react';
import { Route, Routes } from 'react-router-dom'
import { Box } from '@mui/material'

import './App.css';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ExerciseDetail from './pages/ExerciseDetail';

const App = () => {
    return (
        <Box width="400px" sx={{ width: { xl: '1480px', xs: '400px' } }} m="auto"> 
        <NavBar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
        </Routes>
        <Footer />
        </Box>
    );
};

export default App