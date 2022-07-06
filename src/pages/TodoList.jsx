import { useContext, useEffect, useState } from 'react';
import { TodolistContext } from '../contexts/TodolistContext';

const TodoList = () => {
  const { dispatch, fetchTodos, addTodo, todoArray, ...state } =
    useContext(TodolistContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.todo) {
      dispatch({ type: 'MISSING_TODO' });
    } else {
      addTodo();
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [todoArray]);

  return (
    <div className='flex flex-col place-items-center'>
      {state.alert.open && (
        <div className=' font-extrabold text-xl text-red-700'>
          'Please add a Todo'
        </div>
      )}
      <h1 className=' text-center text-xl mt-5 uppercase font-semibold'>
        Manage your tasks easily !
      </h1>
      <div className='flex flex-col place-items-center border bg-gray-50 mt-10 w-1/2 py-5 '>
        <h2>Todo List</h2>
        <form action='' onSubmit={(e) => handleSubmit(e)} className='p-5'>
          <div className='flex gap-2'>
            <input
              type='text'
              name='state.todo'
              id='state.todo'
              value={state.todo}
              onChange={(e) =>
                dispatch({ type: 'SET_TODO', payload: e.target.value })
              }
              className=' border'
            />
            <button type='submit'>Add Todo</button>
          </div>
        </form>
        {todoArray.map((item, index) => {
          return (
            <div key={index} className=' w-1/2 mt-4'>
              <div className='grid grid-cols-3  '>
                {item}
                <button className=' text-green-800'>Edit</button>
                <button className=' text-red-600'>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
