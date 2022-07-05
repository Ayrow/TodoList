import { signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../utils/firebase-config';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className=' bg-blue-900 text-white text-xl p-5 '>
      <div className='flex justify-between'>
        <Link to='/'>Home</Link>

        {currentUser ? (
          <div className='flex gap-5'>
            <Link to='/todolist'>TodoList</Link>
            <Link to='/my-account'>My Account</Link>
            <button onClick={handleSignout}>Logout</button>
          </div>
        ) : (
          <div className='flex gap-5'>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
