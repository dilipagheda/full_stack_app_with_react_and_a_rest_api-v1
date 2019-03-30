import React from 'react';

const ValidationErrors = (props) => {
    if(!props.errors || props.errors.length===0)return null;
    const errors = props.errors.map(error=><li>{error}</li>);
    return (
        <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
                <ul>
                    {errors}
                </ul>
            </div>
         </div>);
}

export default ValidationErrors
