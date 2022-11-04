import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './styles.css';

import App from './App.jsx';
// New way to render at root. Alex:Self - Look into this
// const container = document.getElementbyId('root');
// const root = createRoot(container);
// root.render(
//   <App />// 
// )

// Depracated version
ReactDOM.render(
  <App />
  , document.getElementById('root'));