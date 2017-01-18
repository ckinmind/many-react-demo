import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';

import Route from './route';
require('./styles/base.scss');
ReactDOM.render(<Route />, document.getElementById('app'));

// import App from './components/todo1/App.js';
// ReactDOM.render(<App />, document.getElementById('app'));