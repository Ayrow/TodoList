import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';
import AlertUser from '../components/AlertUser';

const Register = () => {
  const navigate = useNavigate();
  const { dispatch, createUser, loginWithGoogle, ...state } =
    useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    if (state.password !== state.confirmPassword) {
      dispatch({ type: 'PASSWORDS_DONT_MATCH' });
    } else {
      createUser();
      navigate('/todolist');
    }
  };

  return (
    <div className='flex justify-center pt-5 relative'>
      {state.alert.isOpen && (
        <div className=' fixed flex w-full h-full bg-white bg-opacity-80 z-50 place-content-center'>
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
              <button
                type='button'
                onClick={loginWithGoogle}
                className='py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '>
                <svg
                  width='20'
                  height='20'
                  fill='currentColor'
                  className='mr-2'
                  viewBox='0 0 1792 1792'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path d='M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z'></path>
                </svg>
                Sign up with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
