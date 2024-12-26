import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Singup';
import Contest from './components/Contest';
import WinnerPopup from './components/WinnerPopup';
import SchedulePopup from './components/SchedulePopup';

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
                {/* Add other routes as necessary */}
            </Routes>
        
      </>
    );
}

export default App;
