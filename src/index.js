import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import GlobalState from './context/GlobalContext';
import { BrowserRouter } from 'react-router-dom'; // 引入 BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalState>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </GlobalState>
);

reportWebVitals();
