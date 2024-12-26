import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';

function Signup() {
    const { register,
        handleSubmit,
        formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
        // Perform signup logic here
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-center min-h-screen bg-gray-900 dark:bg-gray-800">
                <div className="relative card w-96 bg-white dark:bg-gray-700 shadow-xl p-6 rounded-lg">
                    {/* Close Button */}
                    <Link to={'/login'}>
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200"
                        >
                            <IoMdClose size={20} />
                        </button>
                    </Link>

                    <div className="mb-4 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            Sign<span className="text-violet-600">Up</span>
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {/* Username */}
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70 text-gray-500 dark:text-gray-300"
                            >
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input
                                {...register('username', { required: true })}
                                type="text"
                                className="grow focus:outline-none bg-transparent text-gray-900 dark:text-gray-100"
                                placeholder="Username"
                            />
                        </label>
                        {errors.username && (
                            <span className="text-red-600">This field is required!</span>
                        )}

                        {/* Email */}
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70 text-gray-500 dark:text-gray-300"
                            >
                                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input
                                {...register('email', { required: true })}
                                type="text"
                                className="grow focus:outline-none bg-transparent text-gray-900 dark:text-gray-100"
                                placeholder="Email"
                            />
                        </label>
                        {errors.email && (
                            <span className="text-red-600">This field is required!</span>
                        )}

                        {/* Password */}
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70 text-gray-500 dark:text-gray-300"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 1 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <input
                                {...register('password', { required: true })}
                                type="password"
                                className="grow focus:outline-none bg-transparent text-gray-900 dark:text-gray-100"
                                placeholder="Password"
                            />
                        </label>
                        {errors.password && (
                            <span className="text-red-600">This field is required!</span>
                        )}

                        {/* Confirm Password */}
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70 text-gray-500 dark:text-gray-300"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 1 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <input
                                {...register('confirmpassword', { required: true })}
                                type="password"
                                className="grow focus:outline-none bg-transparent text-gray-900 dark:text-gray-100"
                                placeholder="Confirm Password"
                            />
                        </label>
                        {errors.confirmpassword && (
                            <span className="text-red-600">This field is required!</span>
                        )}
                    </div>
                    <div className="flex justify-between">
                        <button className="bg-violet-600 btn btn-primary mt-6 px-3 py-2 rounded-md hover:bg-violet-500 duration-500 cursor-pointer text-white">
                            Sign Up
                        </button>
                        <p className="mt-6 text-gray-900 dark:text-gray-100">
                            Have an account?{' '}
                            <Link to="/login">
                                <span className="text-violet-600 underline cursor-pointer">
                                    Login
                                </span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Signup;
