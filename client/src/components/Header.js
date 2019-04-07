import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'

class  Header extends Component {

  withSignIn = (username) => {
    return (
      <div className="bounds">
      <h1 className="header--logo" onClick={this.handleLogoOnClick}>Courses</h1>
      <nav>
        <span>Welcome {username}!</span>
        <Link className="signout" to="/signout">Sign Out</Link>
      </nav>
    </div>
    );
  }

  withOutSignIn = () => {
    return ( 
        <div className="bounds">
          <h1 className="header--logo" onClick={this.handleLogoOnClick}>Courses</h1>
          <nav>
            <Link className="signup" to="/signup">Sign Up</Link>
            <Link className="signin" to="/signin" >Sign In</Link>
          </nav>
        </div>
    );
  }

  handleLogoOnClick = () =>{
    console.log("historypush");
    this.props.history.push("/");
  }
  
  render(){
   return(<div className="header">
      {this.props.isSignedIn?this.withSignIn(this.props.userName):this.withOutSignIn()}
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