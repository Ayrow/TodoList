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
          <button type='button' className='border'>
            Sign Up With Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
