import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyAccount from './pages/MyAccount';

import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import RouteNewUserOnly from './components/RouteNewUserOnly';
import PrivateRoute from './components/PrivateRoute';
import TodoList from './pages/TodoList';

import PageNotFound from './pages/PageNotFound';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path='/my-account' element={<MyAccount />} />
        </Route>
        <Route path='/' element={<Home />} />
        <Route path='/todolist' element={<TodoList />} />

        <Route element={<RouteNewUserOnly />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
