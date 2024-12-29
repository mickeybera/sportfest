import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa'; // Import necessary icons
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
    const [darkMode, setDarkMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const { currentUser, signUserOut } = useAuth();
    const navigate = useNavigate();

    // Toggle Dark Mode
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            document.body.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.body.classList.remove('dark');
        }
    }, [darkMode]);

    // Handle Scroll to add shadow when user scrolls down
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const handleSignOut = async () => {
        await signUserOut();
        closeMenu();
        navigate('/'); // Navigate to home page after sign out
    };

    return (
        <nav
            className={`p-4 w-full fixed top-0 left-0 z-50 transition-all duration-300 ease-in-out ${
                darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'
            } ${isScrolled ? 'shadow-lg' : ''}`}
        >
            <div className='flex justify-between items-center max-w-7xl mx-auto'>
                {/* Logo */}
                <h1 className='font-bold text-2xl md:text-3xl cursor-pointer'>
                    SportFest<span className='text-violet-800 dark:text-violet-400'>2k25</span>
                </h1>

                {/* Desktop Menu */}
                <div className='hidden md:flex items-center gap-6'>
                    <ul className='flex gap-6 font-medium text-lg cursor-pointer'>
                        <li>
                            <Link to='/' className='hover:text-violet-600'>Home</Link>
                        </li>
                        <li>
                            <Link to='/contest' className='hover:text-violet-600'>Events</Link>
                        </li>
                        <li>
                            <Link to='/about' className='hover:text-violet-600'>About</Link>
                        </li>
                    </ul>
                    {/* Dark Mode Toggle Button */}
                    <button
                        onClick={toggleDarkMode}
                        className='px-2 py-1 flex items-center gap-1 rounded-md font-medium text-sm bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-400 dark:text-black'
                    >
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>
                    {/* Login Button */}
                    {!currentUser ? (
                        <Link to='/login'>
                            <button className='px-4 py-2 rounded-md font-medium text-sm bg-violet-600 text-white hover:bg-violet-700'>
                                Login
                            </button>
                        </Link>
                    ) : (
                        <button
                            className='px-4 py-2 rounded-md font-medium text-sm bg-violet-600 text-white hover:bg-violet-700'
                            onClick={handleSignOut}
                        >
                            Sign out
                        </button>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className='md:hidden flex items-center'>
                    <button onClick={toggleMenu} className='text-2xl'>
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className={`md:hidden mt-4 space-y-4 text-center font-medium`}>
                    <ul className='space-y-2'>
                        <li>
                            <Link
                                to='/'
                                className='block hover:text-violet-600 cursor-pointer'
                                onClick={closeMenu}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/contest'
                                className='block hover:text-violet-600 cursor-pointer'
                                onClick={closeMenu}
                            >
                                Contest
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/about'
                                className='block hover:text-violet-600 cursor-pointer'
                                onClick={closeMenu}
                            >
                                About
                            </Link>
                        </li>
                    </ul>
                    {/* Dark Mode Toggle Button */}
                    <button
                        onClick={() => {
                            toggleDarkMode();
                            closeMenu();
                        }}
                        className='px-2 py-1 flex items-center gap-1 justify-center rounded-md font-medium text-sm bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-400 dark:text-black mx-auto'
                    >
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>
                    {/* Login Button */}
                    {!currentUser ? (
                        <Link to='/login'>
                            <button
                                className='px-4 py-2 rounded-md font-medium text-sm bg-violet-600 text-white hover:bg-violet-700 mx-auto'
                                onClick={closeMenu}
                            >
                                Login
                            </button>
                        </Link>
                    ) : (
                        <button
                            className='px-4 py-2 rounded-md font-medium text-sm bg-violet-600 text-white hover:bg-violet-700 mx-auto'
                            onClick={handleSignOut}
                        >
                            Sign out
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;
