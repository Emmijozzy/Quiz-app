import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Game from "./components/Game"
import Hightlight from './components/HightLight';
import Help from "./components/Help"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='game' element={<Game />} />
        <Route path='highlight' element={<Hightlight />} />
        <Route path='help' element={<Help />} />
      </Routes>
    </Router>
  </React.StrictMode>
);