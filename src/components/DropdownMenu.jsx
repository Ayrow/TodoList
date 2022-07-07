import { Fragment } from 'react';
import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../utils/firebase-config';

const DropdownMenu = ({ setIsDropdownOpen }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      onMouseLeave={() => setIsDropdownOpen(false)}
      className=' z-20 origin-top-right absolute right-0 mt-10 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5'>
      <div
        className='py-1 '
        role='menu'
        aria-orientation='vertical'
        aria-labelledby='options-menu'>
        {currentUser ? (
          <Fragment>
            <Link
              to='/my-account'
              className='block px-4 py-2 w-full text-center text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600'>
              <span className='flex flex-col'>
                <span>My Account</span>
              </span>
            </Link>
            <button
              onClick={handleSignout}
              className='block px-4 py-2 w-full text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600'>
              <span className='flex flex-col'>
                <span>Logout</span>
              </span>
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <Link
              to='/login'
              className='block px-4 py-2 w-full text-center text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600'>
              <span className='flex flex-col'>
                <span>Login</span>
              </span>
            </Link>
            <Link
              to='/register'
              className='block px-4 py-2 w-full text-center text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600'>
              <span className='flex flex-col'>
                <span>Register</span>
              </span>
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;
