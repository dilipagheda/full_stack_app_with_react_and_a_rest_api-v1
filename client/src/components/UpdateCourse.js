import React, {Component} from 'react';
import {getAuthor} from '../common/utility'
import { connect } from 'react-redux'

const axios = require('axios');

class UpdateCourse extends Component {

    state = {
        course:{
            _id:null,
            title:'',
            description:'',
            estimatedTime:'',
            materialsNeeded:''
        },
        errors:[]
    }

    componentDidMount() {
      if(this.props.location.state){
        this.setState({course:this.props.location.state.course})
      }else{
        axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
        .then( response=> {
          // handle success
          console.log(response.data);
          this.setState({course:response.data});
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
      }
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

    handleSubmit = (event)=>{
        alert("submit");
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
            url:`http://localhost:5000/api/courses/${this.state.course._id}`,
            method:'put',
            data:{
                "title":this.state.course.title,
                "description":this.state.course.description,
                "user":this.props.user._id,
                "materialsNeeded":this.props.materialsNeeded,
                "estimatedTime":this.props.estimatedTime
            },
            headers:{
                Authorization:`Basic ${this.props.user.token}`
            }
        })
        .then( response=> {
            // handle success
            alert("success!");
            this.props.history.push("/");
        })
        .catch( (error) =>{
            // handle error
            this.setState((prevState)=>{return {errors:[...prevState.errors,'Sorry, Something went wrong!']}});
        }) 
    }

    handleCancel = (event)=>{
        event.preventDefault(); 
        this.props.history.push(`/courses/${this.state.course._id}`);
    }

    render(){

        return (<div>
            <div className="bounds course--detail">
              <h1>Update Course</h1>
              <div>
                <form>
                  <div className="grid-66">
                    <div className="course--header">
                      <h4 className="course--label">Course</h4>
                      <div>
                          <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                            onChange={this.handleTitleChange}
                            value={this.state.course.title}/>
                      </div>
                      <p>{getAuthor(this.state.course.user)}</p>
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
                              <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." 
                                onChange={this.handleMaterialsNeeded}
                                value={this.state.course.materialsNeeded}>
                              </textarea>
                           </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="grid-100 pad-bottom">
                    <button className="button" type="submit" onClick={this.handleSubmit}>Update Course</button>
                    <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>);
    }
}

const mapStateToProps = state => {
    return {user:state.userAuth.user}
}
  
export default connect(mapStateToProps)(UpdateCourse)