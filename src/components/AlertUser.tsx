import React from 'react';
import { useEffect } from 'react';
import { IUserInitialState, useUserContext } from '../contexts/UserContext';

const AlertUser = () => {
  const { closeAlert, state } = useUserContext();

  const { alert } = state as IUserInitialState;

  useEffect(() => {
    const timeout = setTimeout(() => {
      closeAlert();
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={` ${alert.color} border-l-4 p-4 relative h-1/4 top-1/4 `}>
      <button onClick={closeAlert} className=' absolute top-0 right-2'>
        Close [X]
      </button>
      <div className='text-center pt-10'>
        <p className='font-bold'> {alert.type} </p>
        <p> {alert.message} </p>
      </div>
    </div>
  );
};

export default AlertUser;
