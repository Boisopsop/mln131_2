import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './App.tsx';

const container = document.getElementById('app');

if (container) {
  const root = ReactDOM.createRoot(container);

  root.render(
    React.createElement(
      React.StrictMode,
      null,
      React.createElement(App),
    ),
  );
}
