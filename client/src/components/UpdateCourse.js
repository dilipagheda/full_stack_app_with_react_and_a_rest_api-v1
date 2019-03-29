import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const axios = require('axios');

class UpdateCourse extends Component {

    state = {course:{
        title:'',
        description:'',
        materialsNeeded:'',
        estimatedTime:'',
    }};

    componentDidMount() {
      //console.log(this.props);
      if(this.props.location.state){
          console.log("found:");
          console.log(this.props.location.state);
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
    
    getAuthor = ()=>{
        if(this.state.course.user){
            return `By ${this.state.course.user.firstName} ${this.state.course.user.lastName}`
        }else{
            return null;
        }
        
    }

    onCancel = (event)=>{
        event.preventDefault(); 
        this.props.history.push(`/courses/${this.state.course._id}`);
    }

    handleSubmit = (event) => {
        event.preventDefault();
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
                          value={this.state.course.title}/>
                      </div>
                      <p>{this.getAuthor()}</p>
                    </div>
                    <div className="course--description">
                      <div>
                          <textarea id="description" name="description" className="" placeholder="Course description..." value={this.state.course.description}>
                            
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
                              placeholder="Hours" value={this.state.course.estimatedTime}/>
                          </div>
                        </li>
                        <li className="course--stats--list--item">
                          <h4>Materials Needed</h4>
                          <div>
                              <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={this.state.course.materialsNeeded}>
                                
                              </textarea>
                           </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="grid-100 pad-bottom">
                    <button className="button" type="submit" onClick={this.handleSubmit}>Update Course</button>
                    <button className="button button-secondary" onClick={this.onCancel}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>);
    }
}

export default UpdateCourse
