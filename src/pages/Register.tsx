import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUserInitialState, useUserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';
import AlertUser from '../components/AlertUser';

const Register = () => {
  const navigate = useNavigate();
  const { dispatch, createUser, state } = useUserContext();

  const { password, confirmPassword, alert } = state as IUserInitialState;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch({ type: 'PASSWORDS_DONT_MATCH' });
    } else {
      createUser();
      navigate('/todolist');
    }
  };

  return (
    <div className='flex justify-center pt-5 relative'>
      {alert.isOpen && (
        <div className='fixed flex w-full h-full bg-white bg-opacity-80 z-50 place-content-center'>
          <AlertUser />
        </div>
      )}
      <div className='flex flex-col w-1/3 px-4 pt-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10'>
        <div className='self-center text-xl font-light text-gray-800 sm:text-2xl dark:text-white'>
          Create a new account
        </div>
        <span className='justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400'>
          Already have an account ?
          <Link
            to='/login'
            className='text-sm text-blue-500 underline hover:text-blue-700 pl-2'>
            Sign in
          </Link>
        </span>
        <div className='p-6 mt-8'>
          <form onSubmit={(e) => handleRegister(e)}>
            <div className='flex flex-col mb-2'>
              <div className=' relative '>
                <input
                  required
                  type='text'
                  id='username'
                  className=' rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                  name='username'
                  placeholder='Username'
                  onChange={(event) =>
                    dispatch({
                      type: 'SET_USER_DATA',
                      payload: { key: 'username', value: event.target.value },
                    })
                  }
                />
              </div>
            </div>

            <div className='flex flex-col mb-2'>
              <div className=' relative '>
                <input
                  required
                  type='text'
                  id='email'
                  className=' rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                  name='email'
                  placeholder='Email'
                  onChange={(event) =>
                    dispatch({
                      type: 'SET_USER_DATA',
                      payload: { key: 'email', value: event.target.value },
                    })
                  }
                />
              </div>
            </div>

            <div className='flex flex-col mb-2'>
              <div className='flex relative '>
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  id='create-account-pseudo'
                  className='relative rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent '
                  name='password'
                  placeholder='Password'
                  onChange={(event) =>
                    dispatch({
                      type: 'SET_USER_DATA',
                      payload: { key: 'password', value: event.target.value },
                    })
                  }
                />
                <div className='absolute inset-y-0 right-0 flex items-center'>
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='bg-white pr-4'>
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
            </div>

            <div className='flex flex-col mb-2'>
              <div className='flex relative'>
                <input
                  required
                  type={showConfirmPassword ? 'text' : 'password'}
                  id='create-account-pseudo'
                  className='relative rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                  name='confirmPassword'
                  placeholder='Confirm Password'
                  onChange={(event) =>
                    dispatch({
                      type: 'SET_USER_DATA',
                      payload: {
                        key: 'confirmPassword',
                        value: event.target.value,
                      },
                    })
                  }
                />
                <div className='absolute inset-y-0 right-0 flex items-center'>
                  <button
                    className='bg-white pr-4'
                    type='button'
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }>
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-4 w-full my-4'>
              <button
                type='submit'
                className='py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
