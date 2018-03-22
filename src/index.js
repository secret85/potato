

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//// third-party laibraries///
import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
 // window.$ = $;
// require('popper')
// require('bootstrap');
// require('bootstrap-datepicker');
////////////////////////////////
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
