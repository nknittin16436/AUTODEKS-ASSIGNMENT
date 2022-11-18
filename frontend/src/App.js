import './App.css';
import '@fontsource/roboto/300.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Authentication/Login';
import SignUp from './components/Authentication/SignUp';
import HomePage from './components/HomePage/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
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
