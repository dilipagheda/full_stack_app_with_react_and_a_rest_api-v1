import React, {Component} from 'react';
import signInUser from '../common/signInUser';
import {signIn,signOut}  from '../actions';
import { connect } from 'react-redux'

const axios = require('axios');

class UserSignUp extends Component {

    state = {
      firstName:"",
      lastName:"",
      emailAddress:"",
      password:"",
      confirmPassword:"",
      errors:[]
    };

    handleFirstNameChange = (event)=>{
      this.setState({firstName: event.target.value});
    }

    handleLastNameChange = (event)=>{
      this.setState({lastName: event.target.value});
    }

    handleEmailAddressChange = (event) =>{
      this.setState({emailAddress: event.target.value});
    }

    handlePasswordChange = (event)=>{
      this.setState({password: event.target.value});
    }

    handleConfirmPasswordChange = (event) => {
      this.setState({confirmPassword: event.target.value});
    }

    onCancel = (event)=>{
      event.preventDefault(); 
      this.props.history.push("/");
    }

    checkErrors = ()=>{
      let errors = [];

      //check for errors
      if(this.state.password !== this.state.confirmPassword){
        errors.push("Password is not the same as Confirmed Password!");
      }
      return errors;
    }

    handleSubmit = (event) => {
      event.preventDefault();

      //check for errors
      const errors = this.checkErrors();
      if(errors.length>0){
        this.setState({errors});
        return;
      }
      //make a call here to sign in
      axios({
          url:'http://localhost:5000/api/users',
          method:'post',
          data:{
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "emailAddress": this.state.emailAddress,
            "password": this.state.password,
            "confirmPassword":this.state.confirmPassword
          }

      })
      .then( response=> {
        // handle success
        //Sign in user
        signInUser(this.state.emailAddress, this.state.password, (response,authToken)=>{
            this.props.signIn({...response.data,token:authToken});
          }, (error)=>{
              this.props.signOut();
          },()=>{
              this.props.history.push("/"); 
          });
      })
      .catch( (error) =>{
        // handle error
        this.props.signOut();
        this.setState({errors:[error.response.data.message]});
      }) 
  }

  showErrors=()=>{
    console.log(this.state.errors);
    if(this.state.errors.length===0)return null;
    return (
      <div>
      <h2 className="validation--errors--label">Validation errors</h2>
      <div className="validation-errors">
        <ul>
          {this.state.errors.map((error,index)=><li key={index}>{error}</li>)}
        </ul>
      </div>
    </div>
    );
  }

    render(){
        return (
            <div className="bounds">
            <div className="grid-33 centered signin">
              <h1>Sign Up</h1>
              <div>
                {this.showErrors()}
                <form onSubmit={this.handleSubmit}>
                  <div>
                      <input value={this.state.firstName} onChange={this.handleFirstNameChange} id="firstName" name="firstName" type="text" className="" placeholder="First Name"  required/>
                  </div>
                  <div>
                      <input value={this.state.lastName} onChange={this.handleLastNameChange} id="lastName" name="lastName" type="text" className="" placeholder="Last Name" required />
                   </div>
                  <div>
                      <input value={this.state.emailAddress} onChange={this.handleEmailAddressChange}  id="emailAddress" name="emailAddress" type="email" className="" placeholder="Email Address"  />
                   </div>
                  <div>
                      <input value={this.state.password} onChange={this.handlePasswordChange} id="password" name="password" type="password" className="" placeholder="Password" required />
                   </div>
                  <div>
                      <input value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange}  id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" required
                       />
                  </div>
                  <div className="grid-100 pad-bottom">
                    <button className="button" type="submit">Sign Up</button>
                    <button className="button button-secondary" onClick={this.onCancel}>Cancel</button>
                   </div>
                </form>
              </div>
              <p>&nbsp;</p>
              <p>Already have a user account? <a href="sign-in.html">Click here</a> to sign in!</p>
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
)(UserSignUp)