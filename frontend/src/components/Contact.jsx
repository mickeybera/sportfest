import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaPhone } from "react-icons/fa6";

function ContactForm() {
 const numbers = [
    {name: "Sk Soyel", number: 8902158312},
    {name: "Riyazul Islam", number: 8617825294},
    {name: "Tapas Nayak", number: 7479285397},
    {name: "Puspendu Pandey", number: 7319152523},
    {name: "Nabakumar Mahata", number: 7679747410},
 ];
    return (
        <div className="mt-20 max-w-4xl mx-auto  p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg md:p-8">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
                Contact Us
            </h1>
            <ul>
                {numbers.map((num) => (
                    <li className='hover:text-blue-500 mt-2 flex gap-2'><FaPhone /><span className='font-semibold'>{num.name}</span> <a href={`tel: ${num.number}`}>+91 {num.number}</a></li>
                ))}
            </ul>
        </div>
    );
}

export default ContactForm;

{/* <a href="mailto:">
   
   </a> */}