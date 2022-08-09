import './App.css';
import React from 'react';
import { NewTaskForm } from './components/AddNewTask';
import { NavBar } from './components/NavBar';
import { AllTasks } from './components/AllTasks';
import NoPage from './components/NoPage';

import { Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './components/LogIn';
import { SignUp } from './components/SignUp';


function App(){

    let login = localStorage.getItem("login")
    let isNotLoggedIn = !login || login === "false";


    return (
      <>
        <NavBar />
        <Routes>
          <Route index element={isNotLoggedIn ? <Navigate to="/login" /> :<Navigate to="/alltasks" />} exact path="/" />
          <Route path='/newtask' element={isNotLoggedIn ? <Navigate to="/login" /> : <NewTaskForm />} />
          <Route path='/alltasks' element={isNotLoggedIn ? <Navigate to="/login" /> : <AllTasks />} />
          <Route path='/login' element={!isNotLoggedIn? <Navigate to="/alltasks" /> : <Login />} />
          <Route path='/signup' element={!isNotLoggedIn ? <Navigate to="/alltasks" /> : <SignUp />} />
          <Route path='/*' element={<NoPage />} />
        </Routes>
      </>
    )

}

export default App;
