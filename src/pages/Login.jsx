import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase-config';

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='flex justify-center'>
      <form
        onSubmit={(e) => handleSignin(e)}
        className='w-1/2 h-auto border border-black rounded-lg mt-10 p-10 flex flex-col gap-5 shadow-lg bg-gray-100'>
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
        <div className='flex gap-3'>
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
        <div className='flex flex-col gap-5'>
          <button className='border '>Sign in</button>
          <button type='button' className='border'>
            Sign In With Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
