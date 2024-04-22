import './App.css';
import React, { useContext } from 'react'
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import { BrowserRouter as Router,
  Routes,Route } from 'react-router-dom';
import { Context } from './context/context';
import Customerone from './pages/customerone';
function App() {
  const {user}=useContext(Context);
  return (
    <Router>
       <Routes>
          <Route path="/" element={user?<><Home/></>:<Login />} />
          <Route path="/register" element={user?<><Home/></>:<Register/>} />
          <Route path="/login" element={user?<Home/>:<Login />} />
          <Route path="/:customerId" element={user?<Customerone/>:<Login />}/>
       </Routes>
    </Router>
  );
}

export default App;
