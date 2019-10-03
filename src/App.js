import React from 'react';
import './App.css';

import imageLogo from './assets/logo.svg';

function App() {
  return (
    <div className="containner">
      <img src={ imageLogo } alt="Logo"/>

      <div className="content">
        <p>
          Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa.
        </p>

        <form action="">
          <label htmlFor="email">EMAIL *</label>
          <input type="email"/>
        </form>
      </div>
    </div>
  );
}

export default App;
