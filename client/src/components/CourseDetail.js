import React, {Component} from 'react';
import {Link} from 'react-router-dom';
const ReactMarkdown = require('react-markdown');

const axios = require('axios');

class CourseDetail extends Component {

  state = {course:null};

  componentDidMount() {
    //console.log(this.props);
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

  generateCourseDescription(desc){
     if(!desc)return null;
     
     return <ReactMarkdown source={desc} />;
  }

  generateMaterials(materialsNeeded){
      if(!materialsNeeded)return null;
      
      return (
        <li className="course--stats--list--item">
        <h4>Materials Needed</h4>
        <ul>
          <ReactMarkdown source={this.state.course.materialsNeeded} />
        </ul>
      </li>  
    );
  }

  generateEstimatedTime(time){
      if(!time)return null;
      return (
        <li className="course--stats--list--item">
        <h4>Estimated Time</h4>
        <h3>{time}</h3>
      </li>
      );
  }

  renderCourseDetail(){
      if(this.state.course){
        return (
          <div>
            <div className="actions--bar">
            <div className="bounds">
              <div className="grid-100">
                <span>
                  <Link className="button" to={{pathname:`/courses/${this.state.course._id}/update`,
                                                state:{
                                                  course:this.state.course
                                                }}}>Update Course</Link>
                  <Link className="button" href="#">Delete Course</Link>
                </span>
                <Link className="button button-secondary" to="/">Return to List</Link>
              </div>
            </div>
            </div>
            <div className="bounds course--detail">
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{this.state.course.title}</h3>
                <p>By {`${this.state.course.user.firstName} ${this.state.course.user.lastName}`}</p>
              </div>
              <div className="course--description">
                {this.generateCourseDescription(this.state.course.description)}
               </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  {this.generateEstimatedTime(this.state.course.estimatedTime)}
                  {this.generateMaterials(this.state.course.materialsNeeded)}
                  
                </ul>
              </div>
            </div>
          </div>
        </div>
        );
      }else{
          return null;
      }
  }

  render() {
    return (
            this.renderCourseDetail()
        );
  }
}

export default CourseDetail;