import { useEffect } from 'react';
import {
  IInitialStateType,
  useTodolistContext,
} from '../contexts/TodolistContext';
import AlertTodo from './AlertTodo';
import ModalTodolist from './Modal/ModalTodolist';

const TodosComponent: React.FC = () => {
  const { dispatch, fetchTodos, addTodo, editTodo, clearList, state } =
    useTodolistContext();

  const { todo, todoArray, isModalOpen, alert } = state as IInitialStateType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todo) {
      dispatch({ type: 'MISSING_TODO' });
    } else {
      addTodo();
      console.log('todoArray', todoArray);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className='flex flex-col place-items-center relative h-screen'>
      {isModalOpen && (
        <div className='absolute z-40 bg-black bg-opacity-80 w-full h-full flex '>
          <ModalTodolist />
        </div>
      )}
      <h1 className=' text-center text-xl mt-5 uppercase font-semibold'>
        Manage your tasks easily !
      </h1>
      <div className='flex flex-col mt-5 w-full max-w-xl px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 '>
        <div className='relative self-center mb-6 text-lg font-light text-gray-600 sm:text-2xl dark:text-white'>
          {alert.open && <AlertTodo />}

          <form action='' onSubmit={(e) => handleSubmit(e)} className='p-5'>
            <div className='flex'>
              <input
                type='text'
                name='todo'
                id='todo'
                value={todo}
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
            {todoArray.length > 0 && (
              <div className='flex flex-col place-items-center'>
                {todoArray.map((item, index) => {
                  return (
                    <div key={index} className=' w-full mt-4  '>
                      <div className='capitalize grid grid-cols-3 py-2 px-4 bg-slate-200 text-black w-full text-center text-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg'>
                        {item}
                        <button
                          type='button'
                          onClick={() => editTodo(item, index)}
                          className=' text-green-800'>
                          Edit
                        </button>
                        <button
                          type='button'
                          onClick={() =>
                            dispatch({
                              type: 'CONFIRM_DELETE',
                              payload: item,
                            })
                          }
                          className=' text-red-600'>
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}

                <button
                  type='button'
                  onClick={() => clearList()}
                  className='mt-5 w-1/3 py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '>
                  Clear All
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default TodosComponent;
