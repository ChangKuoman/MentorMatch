
import React from 'react';
import { useState } from 'react';
import { Routes, Route, Router, BrowserRouter } from 'react-router-dom';
import './App.css';
import LoginContent from './components/LoginContent';
import FormRegister from './components/FormRegister';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    /*
    <div className="App">
      <Header />
      <LoginContent />
      <Footer />
    </div>
    */

    <div className='App'>
    <Header />
    <BrowserRouter>
      <Routes >
        <Route path='/' element={<LoginContent />} />
        <Route path='/register' element = {<FormRegister />} />
      </Routes >
      <Footer />
    </BrowserRouter>
  </div>
  );
}

export default App;