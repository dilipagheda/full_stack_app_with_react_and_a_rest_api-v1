import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'

const axios = require('axios');

class ActionBar extends Component {

    handleDelete = ()=>{
        if(!this.props || !this.props.user ||!this.props.user.token)return;
        axios({
          url:`http://localhost:5000/api/courses/${this.props.course._id}`,
          method:'delete',
          headers:{
              Authorization:`Basic ${this.props.user.token}`
          }
        })
        .then( response=> {
          // handle success
          this.props.redirectToHome();
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
      }

    renderActionButtons = () => {
        if(this.props.user && this.props.course && this.props.course.user && this.props.course.user._id===this.props.user._id){
            return (
                <span>
                    <Link className="button" to={{pathname:`/courses/${this.props.course._id}/update`,
                    state:{
                    course:this.props.course
                    }}}>Update Course</Link>
                    <button className="button" onClick={this.handleDelete} >Delete Course</button>
                </span>
            );
        }else{
            return null;
        }
    }

    render(){
        return (
            <div className="actions--bar">
            <div className="bounds">
              <div className="grid-100">
                {this.renderActionButtons()}
              <Link className="button button-secondary" to="/">Return to List</Link>
              </div>
            </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {user:state.userAuth.user}
  }
  
export default connect(mapStateToProps)(ActionBar)