import { useState } from 'react'
import './App.css'
import Signup from './Components/Signup.component';
import Login from './Components/Login.component';
import Homepage from './Components/Homepage.component';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
axios.defaults.baseURL = import.meta.env.REACT_APP_BACKEND;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post.Accept = 'application/json';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="single" element={<Homepage />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="triple" element={<Homepage />}/>
            <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
