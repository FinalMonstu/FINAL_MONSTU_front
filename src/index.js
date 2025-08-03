import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import MultiSnackBar from './common/components/MultiSnackBar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <MultiSnackBar>
      <App />
    </MultiSnackBar>
  // </React.StrictMode>
);