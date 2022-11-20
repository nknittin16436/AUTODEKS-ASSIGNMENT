import './App.css';
import '@fontsource/roboto/300.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Authentication/Login';
import SignUp from './components/Authentication/SignUp';
import HomePage from './components/HomePage/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { loadUser } from './action/userAction';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('autodesk') === null || localStorage.getItem('autodesk') === "undefined") {
      localStorage.removeItem('autodesk');
      navigate('/login');
    }
    if (localStorage.getItem('autodesk')) {
      dispatch(loadUser());
    }
    else {
      navigate('/login');
    }
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
