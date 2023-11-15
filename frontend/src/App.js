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
import Register from './components/Register';
import UserPage from './components/UserPage';
import Course from './components/Course';
import Event from './components/Event';
import Chat from './components/Chat';
import Feedback from './components/Feedback';
import Subscription from './components/Subscription';
import Admin from './components/Admin';


function App() {

  const isLog = localStorage.getItem('isLog')

  return (
    <div>
        <Routes >
          <Route path='/' element={isLog ? <Navigate to="/home" /> : <LoginContent />} />
          <Route path='/register' element = {isLog ? <Navigate to="/home" /> : <Register />} />
          <Route path='/home' element = {isLog ? <HomeComponent/> : <Navigate to="/" />} />
          <Route path='/user/' element = {isLog ? <UserPage/> : <Navigate to="/" />} />
          <Route path='/courses' element={isLog ? <Course/> : <Navigate to="/" />} />
          <Route path='/reservas' element={isLog ? <Event/> : <Navigate to="/" />} />
          <Route path='/chats' element={isLog ? <Chat/> : <Navigate to="/" />} />
          <Route path='/feedback' element={isLog ? <Feedback/> : <Navigate to="/" />} />
          <Route path='/subscripciones' element={isLog ? <Subscription/> : <Navigate to="/" />} />
          <Route path='/admin' element={isLog ? <Admin/> : <Navigate to="/" />} />
          <Route path='/dashboards' element={isLog ? <dashboards/> : <Navigate to="/" />} />
          <Route path='/*' element={<PageNotFound/>} />
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
