import React, { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const AlertUser = () => {
  const { closeAlert, ...state } = useContext(UserContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      closeAlert();
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={` ${state.alert.color} border-l-4 p-4 text-center`}>
      <p className='font-bold'> {state.alert.type} </p>
      <p> {state.alert.message} </p>
    </div>
  );
};

export default AlertUser;
