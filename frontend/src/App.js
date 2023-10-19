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

function App() {
  return (
    <div>
        <Routes >
          <Route path='/' element={<LoginContent />} onEnter/>
          <Route path='/register' element = {<Register />} />
          <Route path='/home' element = {<HomeComponent/>}/>
          <Route path='/user/' element = {<UserPage/>} />
          <Route path='/*' element={<PageNotFound/>} />
          <Route path='/courses' element={<Course/>} />
          <Route path='/reservas' element={<Event />} />
          <Route path='/chats' element={<Chat />} />
          <Route path='/feedback' element={<Feedback/>} />
          <Route path='/subscripciones' element={<Subscription />}/>

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
