import { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  updateCurrentUser,
} from 'firebase/auth';
import { db, auth, googleProvider } from '../utils/firebase-config';
import { useNavigate } from 'react-router-dom';
import { addDoc, setDoc, collection, doc } from 'firebase/firestore';

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const createUser = async () => {
            await setDoc(doc(db, 'users', auth.currentUser.uid), {
              username,
              email,
            });
          };
          createUser();
          navigate('/');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className='flex justify-center'>
      <form
        onSubmit={(e) => handleRegister(e)}
        className='w-1/2 h-auto border border-black rounded-lg mt-10 p-10 flex flex-col gap-5 shadow-lg bg-gray-100'>
        <div className='flex gap-3'>
          <label htmlFor='username'>Username</label>
          <input
            required
            type='text'
            id='email'
            name='username'
            className='border'
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className='flex gap-3'>
          <label htmlFor='email'>Email</label>
          <input
            required
            type='email'
            id='email'
            name='email'
            className='border'
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className='flex gap-3 place-items-center'>
          <label htmlFor='password'>Password</label>
          <input
            required
            type={showPassword ? 'text' : 'password'}
            name='password'
            id='password'
            className='border'
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            type='button'
            className=''
            onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className='flex gap-3 place-items-center'>
          <label htmlFor='password'>Confirm Password</label>
          <input
            required
            type={showConfirmPassword ? 'text' : 'password'}
            name='password'
            id='password'
            className='border'
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <button
            type='button'
            className=''
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className='flex flex-col gap-5'>
          <button className='border'>Submit</button>
          <button
            type='button'
            class='py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '>
            <svg
              width='20'
              height='20'
              fill='currentColor'
              class='mr-2'
              viewBox='0 0 1792 1792'
              xmlns='http://www.w3.org/2000/svg'>
              <path d='M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z'></path>
            </svg>
            Sign up with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
