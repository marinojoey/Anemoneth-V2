import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store';
import { Provider } from 'react-redux';
import { ModalProvider } from './context/Modal';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './App';
import Web3Login from './components/Web3Login/Web3Login';
import SplashPage from './components/SplashPage/SplashPage';
import LoginForm from './components/Auth/LoginForm/LoginForm';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} >
                <Route index element={<SplashPage />} />
                <Route path="loginform" element={<LoginForm />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ModalProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
