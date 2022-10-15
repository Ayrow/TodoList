import React from 'react';
import {
  IInitialStateType,
  useTodolistContext,
} from '../../contexts/TodolistContext';
import ModalDeleteTodo from './ModalDeleteTodo';
import ModalEditTodo from './ModalEditTodo';

const ModalTodolist = () => {
  const { state } = useTodolistContext();
  const { isEditing } = state as IInitialStateType;
  return (
    <div className='shadow-lg rounded-2xl p-4 bg-white w-64 mx-auto mt-24 mb-56'>
      <div className='w-full h-full text-center'>
        {isEditing ? <ModalEditTodo /> : <ModalDeleteTodo />}
      </div>
    </div>
  );
};

export default ModalTodolist;
