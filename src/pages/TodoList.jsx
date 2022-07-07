import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import TodosComponent from '../components/TodosComponent';

const TodoList = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      {currentUser ? (
        <TodosComponent />
      ) : (
        <div>You need an account to start a todolist</div>
      )}
    </div>
  );
};

export default TodoList;
