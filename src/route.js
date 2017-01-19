import React from 'react';
import { Route, Router, Link, hashHistory, browserHistory,IndexRoute} from 'react-router';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import Navbar from './components/navbar';
import Todo1 from './components/todo1/App.js';
import Todo2 from './components/todo2';
import Todo3 from './components/todo3';
import Calculator from './components/Calculator/App';


const App = ({ children, location }) => (
    <div className="main">
        <Navbar />
        <ReactCSSTransitionGroup
            component="div"
            transitionName="page"
            transitionEnterTimeout={700}
            transitionLeaveTimeout={700}
        >
            {React.cloneElement(children, {
                key: location.pathname
            })}
        </ReactCSSTransitionGroup>
    </div>
);


const Blue = () => (
    <div className="page blue">
        <span>blue</span>
    </div>
);

const Red = () => (
    <div className="page red">
        <span>red</span>
    </div>
);

const Green = () => (
    <div className="page green">
        <span>green</span>
    </div>
);

const Orange = () => (
    <div className="page orange">
        <span>orange</span>
    </div>
);

export default () => (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Blue}/>
            <Route path="blue" component={Blue} />
            <Route path="red" component={Red} />
            <Route path="green" component={Green} />
            <Route path="orange" component={Orange} />
            <Route path="todo1" component={Todo1} />
            <Route path="todo2" component={Todo2} />
            <Route path="todo3" component={Todo3} />
            <Route path="calculator" component={Calculator} />
        </Route>
    </Router>
);
