import React from 'react';
import {Redirect} from 'react-router-dom';

const RedirectToError = (props) => {
    if(!props.error || !props.error.status)return null;
    switch(props.error.status){
      case 404:
        return <Redirect to="/notfound" />
      case 500:
        return (<Redirect to={{
          pathname: "/error" ,
          state: {
            message:props.error.message
          }
        }}/>);
      default:
        return null;
    }
  }

  export default RedirectToError

