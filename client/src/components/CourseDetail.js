import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import ActionBar from '../common/ActionBar';

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

  handleDelete = ()=>{
    if(!this.props || !this.props.user ||!this.props.user.token)return;
    axios({
      url:`http://localhost:5000/api/courses/${this.state.course._id}`,
      method:'delete',
      headers:{
          Authorization:`Basic ${this.props.user.token}`
      }
    })
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
            <ActionBar user={this.props.user} course={this.state.course}/>
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

const mapStateToProps = state => {
  return {user:state.userAuth.user}
}

export default connect(mapStateToProps)(CourseDetail)