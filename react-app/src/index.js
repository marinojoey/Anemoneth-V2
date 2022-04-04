import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store';
import { Provider } from 'react-redux';
import { ModalProvider } from './context/Modal';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './App';
import SignUpPage from './components/SignUpPage/SignUpPage';
import SplashPage from './components/SplashPage/SplashPage';
import LoginForm from './components/Auth/LoginForm/LoginForm';
import Fry from './components/SplashPage/Fry/Fry';
// import SignUpForm from './components/Auth/SignUpForm/SignUpForm';
import Homepage from './components/Homepage/Homepage';
import Data from './components/Admin/Data/Data';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} >
                <Route index element={<SplashPage />} />
                <Route path="fry" element={<Fry />} />
                <Route path="signup" element={<SignUpPage />} />
                <Route path="loginform" element={<LoginForm />} />
                <Route path="homepage" element={<Homepage />} />
                <Route path="data" element={<Data />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ModalProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
