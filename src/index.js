import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router basename={window.location.pathname || ''}>
      <Routes>
        <Route path='/' element={<App />} />

      </Routes>
    </Router>
  </React.StrictMode>
);
