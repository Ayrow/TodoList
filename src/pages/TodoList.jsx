import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import TodosComponent from '../components/TodosComponent';
import Register from '../pages/Register';

const TodoList = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className='relative '>
      {currentUser ? (
        <TodosComponent />
      ) : (
        <div>
          You need an account to start a todolist
          <Register />
        </div>
      )}
    </div>
  );
};

export default TodoList;
