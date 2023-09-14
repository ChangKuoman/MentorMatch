
import React from 'react';
import { useState } from 'react';
import './App.css';
import LoginContent from './components/LoginContent';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (

/*Esto aun no lo puedo hacer funcar
    <Router>
      <Routes>
        <Route path="/">
          <Header />
          <LoginContent email={email} password={password} />
          <Footer/>
        </Route>
        <Route path="/register">
          <FormRegister/>
        </Route>
      </Routes>
    </Router> 
*/
    <div className="App">
      <Header />
      <LoginContent />
      <Footer />
    </div>
  );
}

export default App;