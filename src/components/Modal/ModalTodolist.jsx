import { useContext } from 'react';
import { TodolistContext } from '../../contexts/TodolistContext';
import ModalDeleteTodo from './ModalDeleteTodo';
import ModalEditTodo from './ModalEditTodo';

const ModalTodolist = () => {
  const { closeModal, deleteTodo, ...state } = useContext(TodolistContext);
  return (
    <div className='shadow-lg rounded-2xl p-4 bg-white w-64 mx-auto mt-24 mb-56'>
      <div className='w-full h-full text-center'>
        {state.isEditing ? <ModalEditTodo /> : <ModalDeleteTodo />}
      </div>
    </div>
  );
};

export default ModalTodolist;
