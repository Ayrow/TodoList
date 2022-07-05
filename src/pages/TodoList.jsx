import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../utils/firebase-config';

const TodoList = () => {
  const [todo, setTodo] = useState('');
  const [todoArray, setTodoArray] = useState([]);

  const fetchTodos = async () => {
    const docRef = doc(db, 'todos', auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return setTodoArray(docSnap.data().todos);
    } else {
      console.log('No such document!');
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo) {
      alert('please add Todo');
    } else {
      const addTodo = async () => {
        const todosRef = doc(db, 'todos', auth.currentUser.uid);
        const docSnap = await getDoc(todosRef);
        if (docSnap.exists()) {
          await updateDoc(todosRef, {
            todos: arrayUnion(todo),
          });
        } else {
          await setDoc(todosRef, {
            todos: [todo],
          });
        }
        setTodo('');
      };
      addTodo();
    }
  };

  useEffect(() => {
    fetchTodos();
    console.log(todoArray);
  }, []);

  return (
    <div className='flex flex-col place-items-center'>
      <h1 className=' text-center text-xl mt-5 uppercase font-semibold'>
        Manage your tasks easily !
      </h1>
      <div className='flex flex-col place-items-center border bg-gray-50 mt-10 w-1/2 py-5 '>
        <h2>Todo List</h2>
        <form action='' onSubmit={(e) => handleSubmit(e)} className='p-5'>
          <div className='flex gap-2'>
            <input
              type='text'
              name='todo'
              id='todo'
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
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
