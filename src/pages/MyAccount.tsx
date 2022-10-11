import { useContext, useEffect, useState } from 'react';
import EmptyProfile from '../assets/no-profile-picture.svg';
import { UserContext, IUserInitialState } from '../contexts/UserContext';
import ModalReAuth from '../components/Modal/ModalReAuth';
import AlertUser from '../components/AlertUser';

const MyAccount: React.FC = () => {
  const { user, fetchUserInfo } = useContext(UserContext);

  const { dispatch, isModalReAuthOpen, setIsModalReAuthOpen, ...state } =
    useContext(UserContext);

  const { username, newPassword, phoneNumber, email, alert } =
    state as IUserInitialState;

  const [showPassword, setShowPassword] = useState(false);

  const verifyAccountForPassword = () => {
    if (newPassword === '') {
      dispatch({ type: 'MISSING_NEW_PASSWORD' });
      // alert('enter password');
    } else {
      dispatch({ type: 'MODAL_UPDATE_PASSWORD' });
      setIsModalReAuthOpen(true);
    }
  };

  const verifyAccountToDelete = () => {
    dispatch({ type: 'MODAL_DELETE' });
    setIsModalReAuthOpen(true);
  };

  const verifyAccountToUpdate = () => {
    if (!username && !phoneNumber && !email) {
      dispatch({ type: 'NOTHING_TO_UPDATE' });
    } else {
      dispatch({ type: 'MODAL_UPDATE_USER_INFO' });
      setIsModalReAuthOpen(true);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <section className='bg-white relative'>
      {isModalReAuthOpen && (
        <div className='absolute w-full h-full bg-black bg-opacity-80 flex z-50'>
          <ModalReAuth
          // newPassword={state.newPassword}
          />
        </div>
      )}
      {alert.isOpen && (
        <div className=' fixed flex w-full h-full bg-white bg-opacity-80 z-50 place-content-center'>
          <AlertUser />
        </div>
      )}
      <form className='container max-w-2xl mx-auto shadow-md md:w-3/4 pt-5'>
        <div className='p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5'>
          <div className='max-w-sm mx-auto md:w-full md:mx-0'>
            <div className='inline-flex items-center space-x-4'>
              <img
                alt='profile'
                src={user.profileimage || EmptyProfile}
                className='mx-auto object-cover rounded-full h-16 w-16 '
              />

              <h1 className='text-gray-600 text-lg'> {user.username} </h1>
            </div>
          </div>
        </div>
        <div className='space-y-6 bg-white'>
          <div className='items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0'>
            <h2 className='max-w-sm mx-auto md:w-1/3'>Account</h2>
            <div className='max-w-sm mx-auto md:w-2/3'>
              <div className=' relative '>
                <input
                  type='text'
                  name='email'
                  className=' rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                  placeholder={user.email}
                  onChange={(e) =>
                    dispatch({
                      type: 'SET_USER_DATA',
                      payload: { key: 'email', value: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </div>
          <hr />
          <div className='items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0'>
            <h2 className='max-w-sm mx-auto md:w-1/3'>Personal info</h2>
            <div className='max-w-sm mx-auto space-y-5 md:w-2/3'>
              <div>
                <div className=' relative '>
                  <input
                    type='text'
                    name='username'
                    className=' rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                    placeholder={user.username}
                    value={username}
                    onChange={(e) =>
                      dispatch({
                        type: 'SET_USER_DATA',
                        payload: { key: 'username', value: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <div className=' relative '>
                  <input
                    type='text'
                    id='user-info-phone'
                    name='phoneNumber'
                    className=' rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                    placeholder={user.phoneNumber || 'Phone Number'}
                    value={phoneNumber}
                    onChange={(e) =>
                      dispatch({
                        type: 'SET_USER_DATA',
                        payload: { key: 'phoneNumber', value: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className='items-center w-full p-8 space-y-4 text-gray-500 md:inline-flex md:space-y-0'>
            <h2 className='max-w-sm mx-auto md:w-4/12'>Change password</h2>
            <div className='w-full max-w-sm pl-2 mx-auto space-y-5 md:w-5/12 md:pl-9 md:inline-flex'>
              <div className=' relative '>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  className='relative rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent '
                  name='password'
                  value={newPassword}
                  placeholder='New Password'
                  onChange={(event) =>
                    dispatch({
                      type: 'SET_USER_DATA',
                      payload: {
                        key: 'newPassword',
                        value: event.target.value,
                      },
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
            <div className='text-center md:w-3/12 md:pl-6'>
              <button
                type='button'
                onClick={() => verifyAccountForPassword()}
                className='py-2 px-4  bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '>
                Change
              </button>
            </div>
          </div>
          <hr />
          <div className='w-full flex flex-col gap-5 px-4 pb-4 ml-auto text-gray-500 md:w-1/3'>
            <button
              type='button'
              className='py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '
              onClick={verifyAccountToUpdate}>
              Save
            </button>
            <button
              type='button'
              onClick={() => verifyAccountToDelete()}
              className='py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '>
              DELETE ACCOUNT
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default MyAccount;
