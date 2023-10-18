import React, { useEffect } from 'react';
import { useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate} from 'react-router-dom';
import './App.css';
/*
import Header from './components/Header';
import Footer from './components/Footer';
*/
import LoginContent from './components/LoginContent';
import HomeComponent from './components/HomeComponent';
import FormRegister from './components/FormRegister';
import UserPage from './components/UserPage';
import Course from './components/Course';

function App() {
  return (
    <div>
        <Routes >
          <Route path='/' element={<LoginContent />} onEnter/>
          <Route path='/register' element = {<FormRegister />} />
          <Route path='/home' element = {<HomeComponent/>}/>
          <Route path='/user/' element = {<UserPage/>} />
          <Route path='/*' element={<PageNotFound/>} />
          <Route path='/courses' element={<Course/>} />
        </Routes >
    </div>
  );
}

function PageNotFound() {
  return (
    <div>
        <p>404 Page not found</p>
    </div>
  );
}

export default App;