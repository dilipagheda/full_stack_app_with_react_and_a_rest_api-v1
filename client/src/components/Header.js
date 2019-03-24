import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'


const withSignIn = (username) => {
  return (
    <div className="bounds">
    <h1 className="header--logo">Courses</h1>
    <nav>
      <span>Welcome {username}!</span>
      <Link className="signout" to="/signout">Sign Out</Link>
    </nav>
  </div>
  );
}

const withOutSignIn = () => {
  return ( 
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        <nav>
          <Link className="signup" to="/signup">Sign Up</Link>
          <Link className="signin" to="/signin" >Sign In</Link>
        </nav>
      </div>
  );
}

class  Header extends Component {
  render(){
   return(<div className="header">
      {this.props.isSignedIn?withSignIn(this.props.userName):withOutSignIn()}
    </div>
   );
  }
}

const mapStateToProps = state => {
  let userName='';
  if(state.userAuth.user){
    userName=`${state.userAuth.user.firstName} ${state.userAuth.user.lastName}`;
  }
  return {isSignedIn: state.userAuth.isSignedIn,
          userName
  }
}

export default connect(
  mapStateToProps
)(Header)