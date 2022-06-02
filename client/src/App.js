import React, { createContext, useReducer } from 'react';
import Navbar from "./components/Navbar";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import "./App.css";
import Errorpage from './components/Errorpage';

import { initialState, reducer } from './Reducer/UseReducer';

//   ContextAPI
const UserContext = createContext();

const  App=() =>{
   const [state, dispatch] = useReducer(reducer, initialState);

  return (


    <>
      <UserContext.Provider value={{state,dispatch}}>
      <Navbar />
      
      <Routes>
      <Route path='*' element={<Errorpage/>} />
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/logout" element={<Logout/>} />
      
      </Routes>
      
      </UserContext.Provider>
    </>
  )
}

export {UserContext};
export default App; 