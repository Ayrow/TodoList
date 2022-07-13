import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebase-config';
import EmptyProfile from '../assets/no-profile-picture.svg';
import { UserContext } from '../contexts/UserContext';
import ModalLogin from '../components/Modal/ModalLogin';

const MyAccount = () => {
  const { currentUser } = useContext(AuthContext);
  const {
    changePassword,
    dispatch,
    isModalReAuthOpen,
    setIsModalReAuthOpen,
    ...state
  } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({});

  const fetchUserInfo = async () => {
    const docRef = doc(db, 'users', currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUser(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  };

  const verifyAccountForPassword = () => {
    if (state.newPassword === '') {
      // dispatch({ type: 'MISSING_NEW_PASSWORD' });
      alert('please enter a new password');
    } else {
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
          <ModalLogin newPassword={state.newPassword} />
        </div>
      )}
      <form className='container max-w-2xl mx-auto shadow-md md:w-3/4 pt-5'>
        <div className='p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5'>
          <div className='max-w-sm mx-auto md:w-full md:mx-0'>
            <div className='inline-flex items-center space-x-4'>
              <img
                alt='profil'
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
                  id='user-info-email'
                  className=' rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                  placeholder={user.email}
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
                    id='user-info-name'
                    className=' rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                    placeholder='Name'
                  />
                </div>
              </div>
              <div>
                <div className=' relative '>
                  <input
                    type='text'
                    id='user-info-phone'
                    className=' rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                    placeholder='Phone number'
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
              className='py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '>
              Save
            </button>
            <button
              type='button'
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
