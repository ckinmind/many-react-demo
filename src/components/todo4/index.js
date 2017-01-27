import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import reducer from './reducers';
import './index.scss';

const store = createStore(reducer);

export default () => (
    <Provider store={store}>
        <App />
    </Provider>
);
