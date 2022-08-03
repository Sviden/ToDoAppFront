import './App.css';
import React from 'react';
import { NewTaskForm } from './components/AddNewTask';
import {NavBar} from './components/NavBar';
import {AllTasks} from './components/AllTasks';
import NoPage from './components/NoPage';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Login } from './components/LogIn';
import { SignUp } from './components/SignUp';


// in react v6 <Switch> is  replaced with <Routes>!!!

class App extends React.Component{

 render(){
   return ( 
     <>
           <NavBar/>
     <Routes>  
         <Route index element={<Login/>} exact path="/" />
         <Route path='/newtask'  element={<NewTaskForm/>}/>
         <Route path='/alltasks' element={<AllTasks/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/signup' element={<SignUp/>}/>
         <Route path="/*" element={<NoPage />} />
       </Routes>   
       </>
        )
 }
}

export default App;
