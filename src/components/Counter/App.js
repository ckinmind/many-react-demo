import

/*********
 * REACT
 **********/

/* Create Counter component which takes value, onIncrement, and onDecrement as its parameters */
const Counter = ({ value, onIncrement, onDecrement, onReset }) => (
    <div id="counter-app">
        <div id="display-container" className="container">
            <p id="display">{value}</p>
        </div>
        <div id="buttons-container" className="container">
            <button id="increment-button" className="button" onClick={onIncrement}><i className="fa fa-plus"></i></button>
            <button id="decrement-button" className="button" onClick={onDecrement}><i className="fa fa-minus"></i></button>
            <button id="reset-button" className="button" onClick={onReset}><i className="fa fa-refresh"></i></button>
        </div>
    </div>
);

/* Wrapper function for ReactDOM.render functionality for the app */
const render = () => {
    ReactDOM.render(
        <Counter
            value={store.getState()}
            onIncrement={() => {
                const val = store.getState();
                if (val < 99) {
                    store.dispatch({
                        type: 'INCREMENT'
                    });
                }
            }}
            onDecrement={() => {
                const val = store.getState();
                if (val > 0) {
                    store.dispatch({
                        type: 'DECREMENT'
                    });
                };
            }}
            onReset={() => {
                store.dispatch({
                    type: 'RESET'
                });
            }}
        />,
        document.getElementById('app')
    )
};

/*********
 * REDUX
 **********/

/* counter takes a default value for state, and an action */
const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        case 'RESET':
            return 0;
        default:
            return state;
    }
};

/* Import { createStore } from 'redux' */
const { createStore } = Redux;
/* store uses counter as its reducer */
const store = createStore(counter);

/* When the state in store changes, use this function */
store.subscribe(render);

/* Initial render */
render();

