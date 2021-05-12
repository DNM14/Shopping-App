import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { buyCake } from '../redux';

function HooksCakeContainer() {
    const numOfCakes = useSelector(state => state.numOfCakes); //useSelector returns whatever is returned by selector function
    //so we have done is accessed the numOfCakes in the redux state and stored it in a variable called numOfCakes that belongs to our react component

    const dispatch = useDispatch(); //this useDispatch returns a reference to dispatch function from the redux store and we save that reference in a variable dispatch
    return (
        <div>
            <h2>Num of cakes - {numOfCakes}</h2>
            <button onClick={() => dispatch(buyCake())}>Buy cake</button>
        </div>
    )
}

export default HooksCakeContainer
