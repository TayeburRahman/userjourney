import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-phone-input-2/lib/style.css';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import '././components/css/Nav.css';
import App from './App';
import AuthProvider from './Firebase/Context/AuthProvider';
import { store } from './app/store';
import './components/css/home.css';
import './components/css/main.css';
import './components/css/pages.css';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> 
    <Provider store={store}> 
    <AuthProvider>  
        <App /> 
     </AuthProvider>
     </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

 
reportWebVitals();
