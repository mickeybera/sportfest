import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Contest from './components/Contest';
import WinnerPopup from './components/WinnerPopup';
import SchedulePopup from './components/SchedulePopup';

import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import Gallery24 from './components/Gallery24';
import Gallery25 from './components/Gallery25';

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/contest' element={<Contest />} />
                <Route path='/winnerpopup' element={<WinnerPopup />} />
                <Route path='/schedule' element={<SchedulePopup />} />
                
                <Route path='/gallery24' element={<Gallery24 />} />
                <Route path='/gallery25' element={<Gallery25 />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
            </Routes>
            <Footer />
            <Toaster />
        </>
    );
}

export default App;
