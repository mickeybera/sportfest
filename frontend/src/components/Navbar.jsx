import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import college from '../../public/college.jpg';

function Navbar() {
    const [darkMode, setDarkMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [galleryDropdownOpen, setGalleryDropdownOpen] = useState(false);
    const [mobileGalleryDropdownOpen, setMobileGalleryDropdownOpen] = useState(false);

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

    // Handle Scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDarkMode = () => setDarkMode(!darkMode);
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);
    const closeGalleryDropdowns = () => {
        setGalleryDropdownOpen(false);
        setMobileGalleryDropdownOpen(false);
    };

    const handleSignOut = async () => {
        await signUserOut();
        closeMenu();
        navigate('/');
    };

    return (
        <nav
            className={`p-4 w-full fixed top-0 left-0 z-50 transition-all duration-300 ease-in-out ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'
                } ${isScrolled ? 'shadow-lg' : ''}`}
        >
            <div className='flex justify-between items-center max-w-7xl mx-auto'>
                {/* Logo */}
                <div className='ml-2 flex gap-2'>
                    <a href="https://gcelt.gov.in/" target='_blank' rel="noopener noreferrer">
                        <img
                            src={college}
                            width={50}
                            height={10}
                            alt='College Logo'
                            className={`object-contain ${darkMode ? 'invert' : ''} sm:ml-1`}
                        />
                    </a>
                    <h1 className='mt-2 font-bold text-2xl md:text-3xl cursor-pointer'>
                        SportFest<span className='text-violet-800 dark:text-violet-400'>2k25</span>
                    </h1>
                </div>

                {/* Desktop Menu */}
                <div className='hidden md:flex items-center gap-6'>
                    <ul className='flex gap-3 font-medium text-lg cursor-pointer'>
                        <li>
                            <Link to='/' className='px-3 py-1 hover:border-2 hover:border-violet-600 hover:rounded-md transition-all'>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to='/contest' className='px-3 py-1 hover:border-2 hover:border-violet-600 hover:rounded-md transition-all'>
                                Events
                            </Link>
                        </li>
                        {/* Gallery Dropdown */}
                        <li className='relative'>
                            <button
                                onClick={() => setGalleryDropdownOpen(!galleryDropdownOpen)}
                                className='px-3 py-1 hover:border-2 hover:border-violet-600 hover:rounded-md transition-all'
                            >
                                Gallery
                            </button>
                            {galleryDropdownOpen && (
                                <ul className='absolute left-0 mt-1 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-50'>
                                    <li>
                                        <Link to='/gallery24' onClick={(e) => {
                                            e.stopPropagation();
                                            closeGalleryDropdowns();
                                        }} className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700'>
                                            2024
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/gallery25' onClick={(e) => {
                                            e.stopPropagation();
                                            closeGalleryDropdowns();
                                        }} className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700'>
                                            2025
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/gallery26' onClick={(e) => {
                                            e.stopPropagation();
                                            closeGalleryDropdowns();
                                        }} className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700'>
                                            2026
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <Link to='/about' className='px-3 py-1 hover:border-2 hover:border-violet-600 hover:rounded-md transition-all'>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to='/contact' className='px-3 py-1 hover:border-2 hover:border-violet-600 hover:rounded-md transition-all'>
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                    {/* Dark Mode Toggle */}
                    <button onClick={toggleDarkMode} className='px-2 py-1 rounded-md bg-violet-600 text-white'>
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>
                    {/* Auth Buttons */}
                    {!currentUser ? (
                        <Link to='/login'>
                            <button className='px-4 py-2 rounded-md bg-violet-600 text-white'>Login</button>
                        </Link>
                    ) : (
                        <button onClick={handleSignOut} className='px-4 py-2 rounded-md bg-red-600 text-white'>
                            Logout
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
                <div className='md:hidden mt-4 text-center font-medium'>
                    <ul className='space-y-2'>
                        <li>
                            <Link to='/' onClick={closeMenu}>Home</Link>
                        </li>
                        <li>
                            <Link to='/contest' onClick={closeMenu}>Events</Link>
                        </li>
                        {/* Mobile Gallery Dropdown */}
                        <li>
                            <button onClick={() => setMobileGalleryDropdownOpen(!mobileGalleryDropdownOpen)} className='text-left px-4 py-2'>
                                Gallery
                            </button>
                            {mobileGalleryDropdownOpen && (
                                <ul className='ml-4 space-y-1'>
                                    <li>
                                        <Link to='/gallery24' onClick={(e) => {
                                            e.stopPropagation();
                                            closeGalleryDropdowns();
                                            closeMenu();
                                        }}>
                                            2024
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/gallery25' onClick={(e) => {
                                            e.stopPropagation();
                                            closeGalleryDropdowns();
                                            closeMenu();
                                        }}>
                                            2025
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/gallery26' onClick={(e) => {
                                            e.stopPropagation();
                                            closeGalleryDropdowns();
                                            closeMenu();
                                        }}>
                                            2026
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <Link to='/about' onClick={closeMenu}>About</Link>
                        </li>
                        <li>
                            <Link to='/contact' onClick={closeMenu}>Contact Us</Link>
                        </li>
                    </ul>
                    <div onClick={closeMenu}>
                        <button onClick={toggleDarkMode} className='mt-2 px-4 py-2 bg-violet-600 text-white rounded-md'>
                            {darkMode ? <FaSun /> : <FaMoon />}
                        </button>
                    </div>
                    {/* Login button */}
                    <div className='mt-2'>
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
                                className='px-4 py-2 rounded-md font-medium text-sm bg-red-600 text-white hover:bg-red-700 mx-auto'
                                onClick={handleSignOut}
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;

