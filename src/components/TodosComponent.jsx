import React, { useContext, useEffect } from 'react';
import { TodolistContext } from '../contexts/TodolistContext';
import AlertTodo from './AlertTodo';

const TodosComponent = () => {
  const { dispatch, fetchTodos, addTodo, todoArray, ...state } =
    useContext(TodolistContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.todo) {
      dispatch({ type: 'MISSING_TODO' });
    } else {
      addTodo();
      dispatch({ type: 'ADDING_TODO' });
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [todoArray]);

  return (
    <div className='flex flex-col place-items-center'>
      <h1 className=' text-center text-xl mt-5 uppercase font-semibold'>
        Manage your tasks easily !
      </h1>
      <div className='flex flex-col mt-5 w-full max-w-xl px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 '>
        <div className='relative self-center mb-6 text-lg font-light text-gray-600 sm:text-2xl dark:text-white'>
          {state.alert.open && <AlertTodo />}

          <form action='' onSubmit={(e) => handleSubmit(e)} className='p-5'>
            <div className='flex'>
              <input
                type='text'
                name='state.todo'
                id='state.todo'
                onChange={(e) =>
                  dispatch({ type: 'SET_TODO', payload: e.target.value })
                }
                className=' border text-black pl-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
              />
              <button
                type='submit'
                className='border text-black bg-slate-100 px-2 rounded-r-md '>
                Add Todo
              </button>
            </div>
          </form>

          {todoArray.map((item, index) => {
            return (
              <div key={index} className=' w-full mt-4  '>
                <div className='grid grid-cols-3 py-2 px-4 bg-slate-200 text-black w-full text-center text-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '>
                  {item}
                  <button className=' text-green-800'>Edit</button>
                  <button className=' text-red-600'>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TodosComponent;
