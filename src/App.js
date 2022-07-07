import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyAccount from './pages/MyAccount';

import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import TodoList from './pages/TodoList';
import { TodolistProvider } from './contexts/TodolistContext';
import PageNotFound from './pages/PageNotFound';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <TodolistProvider>
          <Navbar />
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route exact path='/my-account' element={<MyAccount />} />
            </Route>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/todolist' element={<TodoList />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route path='/*' element={<PageNotFound />} />
          </Routes>
        </TodolistProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
