import React, {Component} from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import Courses from './Courses';
import Header from './Header';
import CourseDetail from './CourseDetail';


class App extends Component {


  render() {
    return ( 
      <div>
        <Header />
        <BrowserRouter>
          <Route path="/" exact component={Courses} />
          <Route path="/courses/:id" component={CourseDetail} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;