import React from 'react';
import { connect } from 'react-redux';
import { buyCake } from '../redux';

function CakeContainer(props) {
    return (
        <div>
            <h2>Number of cakes {props.numOfCakes}</h2>
            <button onClick={props.buyCake}>Buy Cake</button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        numOfCakes: state.numOfCakes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        buyCake: () => dispatch(buyCake())
    }
    //here we mapped dispatching of buyCake to a prop called buyCake
}

export default connect(mapStateToProps, mapDispatchToProps)(CakeContainer);

//using mapStateToProps function, the state from the redux-store is mapped to our component props (so apart from whatever props it was receiving, it will receive an addditional prop called numOfCakes which reflects numOfCakes in the redux-store)
//similarly mapDispatchToProps will basically map our dispatch of an action creator to a prop in our component, so our component receives a second additional prop (buyCake) which will basically dispatch the BUY_CAKE action
