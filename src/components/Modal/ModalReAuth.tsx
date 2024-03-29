import { useState } from 'react';
import { IUserInitialState, useUserContext } from '../../contexts/UserContext';

const ModalReAuth = () => {
  const {
    dispatch,
    changePassword,
    setIsModalReAuthOpen,
    deleteAccount,
    updateAccount,
    state,
  } = useUserContext();
  const [showPassword, setShowPassword] = useState(false);

  const { isDeleting, isUpdatingPassword, isUpdatingUserInfo, password } =
    state as IUserInitialState;

  return (
    <div className='shadow-lg rounded-2xl p-4 bg-white w-96 text-center mx-auto mt-24 mb-auto'>
      <p className='text-gray-800 text-xl font-bold mt-4'>
        Account verification
      </p>
      <p className='text-gray-600  text-xs py-2 px-6'>
        {isDeleting
          ? `Please enter your current password to delete your account and all your data. This action can't be reversed`
          : 'Please enter your current password to update your account'}
      </p>
      <div className='flex flex-col mb-2 mt-2'>
        <div className='flex relative'>
          <input
            required
            type={showPassword ? 'text' : 'password'}
            id='create-account-pseudo'
            className='relative rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
            name='Password'
            placeholder='Confirm Password'
            onChange={(event) =>
              dispatch({
                type: 'SET_USER_DATA',
                payload: {
                  key: 'password',
                  value: event.target.value,
                },
              })
            }
          />
          <div className='absolute inset-y-0 right-0 flex items-center'>
            <button
              className='bg-white pr-4'
              type='button'
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-between gap-4 w-full mt-8'>
        {isUpdatingPassword && (
          <button
            type='button'
            onClick={() => changePassword(password)}
            className='py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '>
            Change Password
          </button>
        )}
        {isDeleting && (
          <button
            type='button'
            onClick={() => deleteAccount(password)}
            className='py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '>
            Delete account
          </button>
        )}
        {isUpdatingUserInfo && (
          <button
            type='button'
            onClick={() => updateAccount(password)}
            className='py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '>
            Update account
          </button>
        )}

        <button
          type='button'
          onClick={() => setIsModalReAuthOpen(false)}
          className='py-2 px-4  bg-black hover:bg-gray-800 focus:ring-indigo-500 focus:ring-offset-indigo-200  text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ModalReAuth;
