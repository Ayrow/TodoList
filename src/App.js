import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyAccount from './pages/MyAccount';

import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './utils/firebase-config';
import PrivateRoute from './components/PrivateRoute';
import TodoList from './pages/TodoList';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <Router>
      <AuthProvider value={{ currentUser }}>
        <Navbar />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route exact path='/my-account' element={<MyAccount />} />
            <Route exact path='/todolist' element={<TodoList />} />
          </Route>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
