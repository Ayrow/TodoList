import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import TodosComponent from '../components/TodosComponent';
import Register from './Register';

const TodoList = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className='relative '>
      {currentUser ? (
        <TodosComponent />
      ) : (
        <div className=''>
          <div className=' font-semibold text-xl text-center mt-5'>
            You need an account to start a todolist
          </div>

          <Register />
        </div>
      )}
    </div>
  );
};

export default TodoList;
