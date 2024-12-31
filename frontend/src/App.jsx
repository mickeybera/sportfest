import React from 'react';
import {Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Singup';
import Contest from './components/Contest';
import WinnerPopup from './components/WinnerPopup';
import SchedulePopup from './components/SchedulePopup';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import Gallery24 from './components/Gallery24';

function App() {
    return (
      <>
       
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/contest' element={<Contest />} />
                <Route path='/winnerpopup' element={<WinnerPopup />} />
                <Route path='/sechedule' element={<SchedulePopup />} />
                <Route path='/gallery24' element={<Gallery24 />}/>
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact/>} />
                {/* Add other routes as necessary */}
            </Routes>
            <Footer/>
            <Toaster />
        
      </>
    );
}

export default App;
