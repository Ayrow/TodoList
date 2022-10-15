import React from 'react';
import { Link } from 'react-router-dom';
import Background from '../assets/home-bg.svg';

const Home: React.FC = () => {
  return (
    <div className='bg-indigo-900 relative overflow-hidden h-full'>
      <img
        src={Background}
        alt='bg-home'
        className='absolute h-full w-full object-cover opacity-70'
      />
      <div className='container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 '>
        <div className='lg:w-3/5 xl:w-2/5 flex flex-col items-start relative z-10'>
          <span className='font-bold uppercase text-yellow-400'>Todolist</span>
          <h1 className='font-bold text-6xl sm:text-7xl text-white leading-tight mt-4'>
            A really simple TodoList
          </h1>
          <Link
            to={'/todolist'}
            className='block bg-white hover:bg-gray-100 py-3 px-4 rounded-lg text-lg text-gray-800 font-bold uppercase mt-10'>
            Start a todolist
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
