const redux = require('redux');
const createStore = redux.createStore;

const BUY_CAKE = 'BUY_CAKE';

//action creater function --> returns an action (action is an object with type property)
const buyCake = () => {
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
}
// (prevState, action) => newState

const initialState = {
    numOfCakes: 10
}
//Now we will return the new state of the application based on the current state and the action
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        default:
            return state;
    }
}
//important pt here: we are not mutating the state object, we return a new object(next state)

const store = createStore(reducer);

console.log('Initial state', store.getState()); //Should give us initial state of the application since we have not performed any state transitions yet.

//we are making the store to subscribe to changes in the store. Listens to changes in the state
const unsubscribe = store.subscribe(() => console.log('Updated state ', store.getState()));

store.dispatch(buyCake()); //we can also pass action directly
store.dispatch(buyCake());
store.dispatch(buyCake());

unsubscribe(); //stops listening to changes, but changes happen

// store.dispatch(buyCake());
// console.log('Now state', store.getState());

//when is comes to code, shopkeeper is nothing but the reducer.