import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './components/todo4/App';
import reducer from '././components/todo4/reducers';
import './components/todo4/index.scss';

const store = createStore(reducer);

console.log(store.getState());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
