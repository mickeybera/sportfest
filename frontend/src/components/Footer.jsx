import React from 'react';
import { Link } from 'react-router-dom';
import swa from '../../public/swa.jpg';

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-8 mt-8 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">

        {/* Left Section */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h3 className="text-2xl font-bold uppercase">🏆 Kreedakriti<span style={{ color: 'var(--color-custom)' }}>2K25</span></h3>
          <p className="text-sm mt-2">Uniting Athletes, Celebrating Victories!</p>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center md:justify-start gap-4 text-sm mb-6 md:mb-0">
          <li>
            <Link to='/' className="hover:text-violet-600 hover:underline font-bold dark:hover:text-violet-600 transition">Home</Link>
          </li>
          <li>
            <Link to='/contest' className="hover:text-violet-600 hover:underline font-bold dark:hover:text-violet-600 transition">Events</Link>
          </li>
          <li>
            <Link to='/' className="hover:text-violet-600 hover:underline font-bold dark:hover:text-violet-600 transition">Gallery</Link>
          </li>
          <li>
            <Link to='/about' className="hover:text-violet-600 hover:underline font-bold dark:hover:text-violet-600 transition">About</Link>
          </li>
          <li>
            <Link to='/contact' className="hover:text-violet-600 hover:underline font-bold dark:hover:text-violet-600 transition">Contact Us</Link>
          </li>
        </ul>

        {/* Right Section */}
        <div className="text-center md:text-right">
          <div className='flex gap-2 justify-center md:justify-end'>
            <div>
              <a href="https://www.swagcelt.in/" target='_blank'>
              <img 
              src={swa} width={50} height={15} alt="SWA Logo" />
              </a>
            </div>
            <div>
              <p className="text-sm">&copy; {new Date().getFullYear()} SportFest. All Rights Reserved.</p>
              <p className="text-xs mt-1">Designed with ❤️ by SWA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="mt-6 border-t border-gray-300 dark:border-gray-700 pt-4">
        <div className="flex justify-center gap-6 text-lg">
          <a href="#" className="hover:text-violet-500 dark:hover:text-yellow-400 transition">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="hover:text-violet-500 dark:hover:text-yellow-400 transition">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="hover:text-violet-500 dark:hover:text-yellow-400 transition">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="hover:text-violet-500 dark:hover:text-yellow-400 transition">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
