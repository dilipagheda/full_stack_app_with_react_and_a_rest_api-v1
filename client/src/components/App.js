import React, {Component} from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import Courses from './Courses';
import Header from './Header';
import UserSignIn from './UserSignIn';
import UserSignUp from './UserSignUp';
import UserSignOut from './UserSignOut';
import CourseDetail from './CourseDetail';


class App extends Component {
  render() {
    return ( 
      <div>
        <BrowserRouter>
          <Header />
          <Route path="/" exact component={Courses} />
          <Route path="/courses/:id" component={CourseDetail} />
          <Route path="/signin" component={UserSignIn} />
          <Route path="/signup" component={UserSignUp} />
          <Route path="/signout" component={UserSignOut} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;