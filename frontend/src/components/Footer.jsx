import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-8 mt-8 border-t border-gray-200 dark:border-gray-700 shadow-md">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        
        {/* Left Section */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h3 className="text-2xl font-bold uppercase">🏆 SportFest<span className='text-violet-600'>2K25</span></h3>
          <p className="text-sm mt-2">Uniting Athletes, Celebrating Victories!</p>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center md:justify-start gap-4 text-sm mb-6 md:mb-0">
          <li>
            <Link to='/'><a className="hover:text-violet-600 dark:hover:text-violet-600 transition">Home</a></Link>
          </li>
          <li>
            <Link to='/contest'><a className="hover:text-violet-600 dark:hover:text-violet-600 transition">Contest</a></Link>
          </li>
          <li>
            <Link to='/about'><a className="hover:text-violet-600 dark:hover:text-violet-600 transition">About</a></Link>
          </li>
          <li>
            <Link to='/'><a className="hover:text-violet-600 dark:hover:text-violet-600 transition">Contact Us</a></Link>
          </li>
          <li>
            <Link to='/'><a className="hover:text-blue-500 dark:hover:text-yellow-400 transition">About Us</a></Link>
          </li>
        </ul>

        {/* Right Section */}
        <div className="text-center md:text-right">
          <p className="text-sm">&copy; {new Date().getFullYear()} SportFest. All Rights Reserved.</p>
          <p className="text-xs mt-1">Designed with ❤️ by SWA & GCELTians</p>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="mt-6 border-t border-gray-300 dark:border-gray-700 pt-4">
        <div className="flex justify-center gap-6">
          <a href="#" className="hover:text-blue-500 dark:hover:text-yellow-400 transition text-lg">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="hover:text-blue-500 dark:hover:text-yellow-400 transition text-lg">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="hover:text-blue-500 dark:hover:text-yellow-400 transition text-lg">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="hover:text-blue-500 dark:hover:text-yellow-400 transition text-lg">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
