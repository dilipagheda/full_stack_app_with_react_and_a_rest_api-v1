import React, {Component} from 'react';

const axios = require('axios');

class CourseDetail extends Component {

  state = {course:null};

  componentDidMount() {
    console.log(this.props);
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
     let descLines = desc.split("\n\n");
     return descLines.map(descLine=>{
         return <p>{descLine}</p>;
     })
  }

  generateMaterials(materialsNeeded){
      if(!materialsNeeded)return null;
      let materials = materialsNeeded.split("\n");
      return (
        <li className="course--stats--list--item">
        <h4>Materials Needed</h4>
        <ul>
            {materials.map(material=>{
                if(material.length>0){
                    return <li>{material.trim().replace('* ','')}</li>;
                }else{
                    return null;
                }
            })}
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