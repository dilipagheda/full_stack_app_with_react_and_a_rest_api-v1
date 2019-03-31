import React from 'react';

const UnhandledError = (props) => {
    return (
        <div className="bounds">
        <h1>Internal Server Error</h1>
        <p>{props.location.state && props.location.state.message?props.location.state.message:"Sorry! Something went wrong!!"}</p>
      </div>
    );
}

export default UnhandledError

