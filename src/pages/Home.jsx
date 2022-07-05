import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <div>
        <h1>Todo List</h1>
      </div>
    </div>
  );
};

export default Home;
