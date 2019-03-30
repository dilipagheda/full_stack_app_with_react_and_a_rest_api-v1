import React, {Component} from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import {Switch} from 'react-router';
import Courses from './Courses';
import Header from './Header';
import UserSignIn from './UserSignIn';
import UserSignUp from './UserSignUp';
import UserSignOut from './UserSignOut';
import CourseDetail from './CourseDetail';
import CreateCourse from './CreateCourse';
import PrivateRoute from '../HOC/PrivateRoute';
import UpdateCourse from './UpdateCourse';

class App extends Component {
  render() {
    return ( 
      <div>
        <BrowserRouter>
          <Header />
          <Route path="/" exact component={Courses} />
          <Switch>
            <PrivateRoute path="/courses/create" exact component={CreateCourse} />
            <Route path="/courses/:id/update" exact component={UpdateCourse} />
            <Route path="/courses/:id"  component={CourseDetail} />
          </Switch>
          
          <Route path="/signin" component={UserSignIn} />
          <Route path="/signup" component={UserSignUp} />
          <Route path="/signout" component={UserSignOut} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;