import React, {Component} from 'react';
import {signIn,signOut}  from '../actions';
import { connect } from 'react-redux'
import signInUser from '../common/signInUser';

class UserSignIn extends Component {

    state = {
        username:'joe@smith.com',
        password:'joepassword'
    };

    handleUserNameChange = (event) => {
        this.setState({username: event.target.value});
    }

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onCancel = (event)=>{
       event.preventDefault(); 
       this.props.history.push("/");
    }

    handleSubmit = (event) => {
        event.preventDefault();
        signInUser(this.state.username, this.state.password, (response,authToken)=>{
            console.log(response.data);
            this.props.signIn({...response.data,token:authToken});
        }, (error)=>{
            console.log(error);
            this.props.signOut();
        },()=>{
            this.props.history.push("/"); 
        });
    }

    render(){
        return (
            <div className="bounds">
            <div className="grid-33 centered signin">
              <h1>Sign In</h1>
              <div>
                <form onSubmit={this.handleSubmit}>
                  <div>
                      <input value={this.state.username} onChange={this.handleUserNameChange} id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address"  />
                  </div>
                  <div>
                      <input value={this.state.password} onChange={this.handlePasswordChange} id="password" name="password" type="password" className="" placeholder="Password"  />
                  </div>
                  <div className="grid-100 pad-bottom">
                    <button className="button" type="submit">Sign In</button>
                    <button className="button button-secondary" onClick={this.onCancel}>Cancel</button>
                  </div>
                </form>
              </div>
              <p>&nbsp;</p>
              <p>Don't have a user account? <a href="sign-up.html">Click here</a> to sign up!</p>
            </div>
          </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    signIn: (user) => dispatch(signIn(user)),
    signOut:()=> dispatch(signOut())
  })

export default connect(
    null,
    mapDispatchToProps
  )(UserSignIn)