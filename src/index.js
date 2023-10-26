import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./components/App";
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
  <BrowserRouter basename="/goit-react-hw-05-movies">
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
