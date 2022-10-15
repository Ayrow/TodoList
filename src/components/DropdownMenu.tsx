import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useTodolistContext } from '../contexts/TodolistContext';

interface IProps {
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownMenu: React.FC<IProps> = ({ setIsDropdownOpen }: IProps) => {
  const navigate = useNavigate();
  const { currentUser, handleSignout } = useAuthContext();
  const { emptyTodoArray } = useTodolistContext();

  const logout = () => {
    handleSignout();
    emptyTodoArray();
    navigate('/');
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
          <>
            <Link
              to='/my-account'
              className='block px-4 py-2 w-full text-center text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600'>
              <span className='flex flex-col'>
                <span>My Account</span>
              </span>
            </Link>
            <button
              onClick={logout}
              className='block px-4 py-2 w-full text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600'>
              <span className='flex flex-col'>
                <span>Logout</span>
              </span>
            </button>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;
