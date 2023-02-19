import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
// import { ChakraProvider } from "@chakra-ui/react"
import { SnackbarProvider } from 'notistack'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider maxSnack={2}>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);
