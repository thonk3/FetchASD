import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import Theme from './Theme';

import './index.css';
import AppContainer from './app/AppContainer';

ReactDOM.render(
    <BrowserRouter>
      <ThemeProvider theme={Theme}>

        {/* <CssBaseline /> */}
        <AppContainer />
        
      </ThemeProvider>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
