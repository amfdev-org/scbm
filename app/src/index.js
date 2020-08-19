import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { ContextProvider } from "./provider/provider";
//import configureStore from './store/configureStore';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

//const store = configureStore();

ReactDOM.render(
  <ContextProvider>
    <App />
  </ContextProvider>,
  document.getElementById('root')
);