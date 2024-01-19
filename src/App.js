import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

// components 
import Login from './components/Login';
import Notes from './components/Notes';
import IdContext from './context/IdContext';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import Alert from './components/Alert';


function App() {
  const [login, setLogin] = useState(false)
  const [alert, setAlert] = useState({message : "", type : ""})

  const showAlert = (message, type, time=1500)=>{
    setAlert({message : message, type : type})
    setTimeout(()=>{
      setAlert({message : "", type : ""})
    }, time)
  }

  return (
    <>
    <IdContext>
          <Router>
            <Navbar showAlert={showAlert}/>
            <Alert alert={alert}/>
            <Routes>
              <Route exact path='/' element={<Login showAlert={showAlert}/>}></Route>
              <Route exact path='/signup' element={<SignUp showAlert={showAlert}/>}></Route>
              <Route exact path='/notes' element={<Notes showAlert={showAlert}/>}></Route>
            </Routes>
          </Router>
    </IdContext>
    </>
  );
}

export default App;
