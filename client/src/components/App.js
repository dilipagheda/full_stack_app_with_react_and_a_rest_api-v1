import React, {Component} from 'react';
import {
  BrowserRouter,
  Route,
  Redirect
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
import NotFound from './NotFound';
import Forbidden from './Forbidden';
import UnhandledError from './UnhandledError';

class App extends Component {
  render() {
    return ( 
      <div>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" exact component={Courses} />
            <PrivateRoute path="/courses/create" exact component={CreateCourse} />
            <PrivateRoute path="/courses/:id/update" exact component={UpdateCourse} />
            <Route path="/courses/:id" exact component={CourseDetail} />
            <Route path="/signin" exact component={UserSignIn} />
            <Route path="/signup" exact component={UserSignUp} />
            <Route path="/signout" exact component={UserSignOut} />
            <Route path="/notfound" exact component={NotFound} />
            <Route path="/forbidden" exact component={Forbidden} />
            <Route path="/error" exact component={UnhandledError} />
            <Redirect to="/notfound"  />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;