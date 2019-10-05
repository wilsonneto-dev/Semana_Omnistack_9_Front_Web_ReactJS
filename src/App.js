import React from 'react';
import './App.css';
import Routes from './routes';

import imageLogo from './assets/logo.svg';

function App() {
  return (
    <div className="container">
      <img src={imageLogo} alt="Logo" />

      <div className="content">
        <Routes />
      </div>
    </div>
  );
}

export default App;
