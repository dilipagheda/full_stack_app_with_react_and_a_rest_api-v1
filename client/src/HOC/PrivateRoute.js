import React from 'react';
import store from '../common/store';
import { Redirect } from 'react-router-dom'
import {
    Route
  } from 'react-router-dom';

const isSignedIn = () =>{
    const state = store.getState();
    const isSignedIn = state.userAuth.isSignedIn;

    console.log("Private route");
    console.log(state);
    return isSignedIn;
}
const PrivateRoute = ({ component: Component, ...rest }) => {
    return   <Route {...rest} render={(props)=>(isSignedIn()?<Component {...props}/>:<Redirect to={{pathname:"/signin",state: { from: props.location }}} />)} />
}

export default PrivateRoute
