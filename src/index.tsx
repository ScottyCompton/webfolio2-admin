import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {appData} from './appData/appData';
import {Provider} from 'react-redux';



ReactDOM.render(
  <Provider store={appData}><App /></Provider>,
  document.getElementById('root')
);
