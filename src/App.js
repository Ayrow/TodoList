import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyAccount from './pages/MyAccount';

import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import TodoList from './pages/TodoList';

import PageNotFound from './pages/PageNotFound';

const App = () => {
  return (
    <Router>
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
    </Router>
  );
};

export default App;
