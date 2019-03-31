import React, {Component} from 'react';
import { connect } from 'react-redux'
import {getAuthor} from '../common/utility'
import ValidationErrors from './ValidationErrors';
import RedirectToError from './RedirectToError';

const axios = require('axios');

class CreateCourse extends Component {
    state = {
        course:{
            title:'',
            description:'',
            estimatedTime:'',
            materialsNeeded:''
        },
        errors:[], //errors are for validation errors
        error:{} //error object is for 404 and 500
    }

    handleTitleChange = (event) => {
        const value = event.target.value;
        this.setState( (prevState) =>(
            {course: {...prevState.course,title:value}}
        ));
    }
    handleDescriptionChange = (event) => {
        const value = event.target.value;
        this.setState( (prevState) =>(
            {course: {...prevState.course,description:value}}
        ));
    }
    handleEstimatedTimeChange = (event) => {
        const value = event.target.value;
        this.setState( (prevState) =>(
            {course: {...prevState.course,estimatedTime:value}}
        ));

    }
    handleMaterialsNeededChange = (event) => {
        const value = event.target.value;
        this.setState( (prevState) =>(
            {course: {...prevState.course,materialsNeeded:value}}
        ));
    }

    handleCancel = (event)=>{
        event.preventDefault(); 
        this.props.history.push("/");
    }

    handleSubmit = (event)=>{
        event.preventDefault();

        //Check for errors
        const errors = [];
        if(!this.state.course.title || this.state.course.title.length===0){
            errors.push("Please provide a title!");
        }
        if(!this.state.course.description || this.state.course.description.length===0){
            errors.push("Please provide a description!");
        }
        if(errors.length>0){
            this.setState({errors});
            return;
        }

        //Submit the form by making a POST call here
        axios({
            url:'http://localhost:5000/api/courses',
            method:'post',
            data:{
                "title":this.state.course.title,
                "description":this.state.course.description,
                "user":this.props.user._id,
                "materialsNeeded": this.state.course.materialsNeeded,
                "estimatedTime":this.state.course.estimatedTime
            },
            headers:{
                Authorization:`Basic ${this.props.user.token}`
            }
        })
        .then( response=> {
            // handle success
            this.props.history.push("/");
        })
        .catch( (error) => {
            // handle error
            if(error.response.status){
              this.setState({error:{
                status:error.response.status,
                message:error.response.data.message
              }});
            }
        })
    }

    render(){
        if(this.state.error.status){
            return <RedirectToError error={this.state.error} />
          }else{
            return (
                <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                <ValidationErrors errors={this.state.errors} />
                <form>
                    <div className="grid-66">
                    <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <div>
                            <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."  
                                    onChange={this.handleTitleChange} 
                                    value={this.state.course.title}/>
                        </div>
                        <p>{getAuthor(this.props.user)}</p>
                    </div>
                    <div className="course--description">
                        <div>
                            <textarea id="description" name="description" className="" placeholder="Course description..."  
                                    onChange={this.handleDescriptionChange} 
                                    value={this.state.course.description}>
                            </textarea>
                        </div>
                    </div>
                    </div>
                    <div className="grid-25 grid-right">
                    <div className="course--stats">
                        <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                            <h4>Estimated Time</h4>
                            <div>
                                <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                                        placeholder="Hours" 
                                        onChange={this.handleEstimatedTimeChange} 
                                        value={this.state.course.estimatedTime}/>
                            </div>
                        </li>
                        <li className="course--stats--list--item">
                            <h4>Materials Needed</h4>
                            <div>
                                <textarea id="materialsNeeded" name="materialsNeeded" 
                                            className="" placeholder="List materials..." 
                                            onChange={this.handleMaterialsNeededChange}  
                                            value={this.state.course.materialsNeeded}>
                                </textarea>
                            </div>
                        </li>
                        </ul>
                    </div>
                    </div>
                    <div className="grid-100 pad-bottom">
                        <button className="button" type="submit" onClick={this.handleSubmit}>Create Course</button>
                        <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
                    </div>
                </form>
                </div>
            </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {user:state.userAuth.user}
}
  
export default connect(mapStateToProps)(CreateCourse)
