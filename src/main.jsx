import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Layout.tsx'
import './index.scss'
import {LoadingProvider} from "./store/GENERAL_CONTEXT/LoadingContext.tsx";

ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
      <LoadingProvider>
          <Layout />
      </LoadingProvider>
  </React.StrictMode>,
);

