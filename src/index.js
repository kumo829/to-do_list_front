import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import AuthService from "./services/auth.service";

axios.defaults.baseURL = 'http://localhost:8090/api/';

axios.interceptors.request.use(request => {
  console.log(request);
  if(AuthService.getCurrentUser()){
    request.headers.authorization = "Bearer " + AuthService.getCurrentUser().access_token;
  }
  // Edit request config
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
