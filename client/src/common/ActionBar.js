import React from 'react';
import {Link} from 'react-router-dom';

const renderActionButtons = (user,course,handleDelete) => {

    if(user && course && course.user && course.user._id===user._id){
        return (
            <span>
                <Link className="button" to={{pathname:`/courses/${course._id}/update`,
                state:{
                course:course
                }}}>Update Course</Link>
                <button className="button" onClick={handleDelete} >Delete Course</button>
            </span>
        );
    }else{
        return null;
    }
}

const ActionBar = (props) => {
    return (
        <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100">
            {renderActionButtons(props.user,props.course,props.handleDelete)}
          <Link className="button button-secondary" to="/">Return to List</Link>
          </div>
        </div>
        </div>
    );
}

export default ActionBar
