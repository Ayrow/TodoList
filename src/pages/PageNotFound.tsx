import React from 'react';
import { Link } from 'react-router-dom';
import Background from '../assets/background-404.svg';

const PageNotFound = () => {
  return (
    <div>
      <div className='bg-indigo-900 relative overflow-hidden h-screen'>
        <img
          src={Background}
          className='absolute h-full w-full object-cover'
          alt='background'
        />
        <div className='inset-0 bg-black opacity-25 absolute'></div>
        <div className='flex place-content-center'>
          <div className='font-mono relative z-10 flex flex-col place-items-center'>
            <h1 className='font-extrabold text-5xl text-white leading-tight mt-4'>
              You&#x27;re alone here
            </h1>
            <p className='font-extrabold text-8xl  text-white animate-bounce my-5'>
              404
            </p>
            <Link
              to='/'
              className='py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg'>
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
