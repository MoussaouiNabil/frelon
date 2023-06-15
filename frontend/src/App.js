import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navbar_login/navbar';

function App() {
  return (
      <div className="App">
        <Navbar />
        <div className="auth-wrapper">
          <div className="auth-inner">
          </div>
        </div>
      </div>
  )
}

export default App;
