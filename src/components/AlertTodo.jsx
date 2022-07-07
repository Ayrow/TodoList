import React, { useContext, useEffect } from 'react';
import { TodolistContext } from '../contexts/TodolistContext';

const AlertTodo = () => {
  const { closeAlert, ...state } = useContext(TodolistContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      closeAlert();
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [state.alert]);

  return (
    <div className={`text-center ${state.alert.type} rounded-md`}>
      {state.alert.message}
    </div>
  );
};

export default AlertTodo;
