import { useEffect } from 'react';
import {
  IInitialStateType,
  useTodolistContext,
} from '../contexts/TodolistContext';

const AlertTodo = () => {
  const { closeAlert, state } = useTodolistContext();

  const { alert } = state as IInitialStateType;

  useEffect(() => {
    const timeout = setTimeout(() => {
      closeAlert();
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [alert]);

  return (
    <div className={`text-center ${alert.type} rounded-md`}>
      {alert.message}
    </div>
  );
};

export default AlertTodo;
