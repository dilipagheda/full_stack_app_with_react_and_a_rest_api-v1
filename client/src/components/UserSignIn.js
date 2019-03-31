import React, {Component} from 'react';
import {signIn,signOut}  from '../actions';
import { connect } from 'react-redux'
import signInUser from '../common/signInUser';
import ValidationErrors from './ValidationErrors';

class UserSignIn extends Component {

    state = {
        username:'',
        password:'',
    };

    handleUserNameChange = (event) => {
        const value = event.target.value;
        this.setState({username: value});
    }

    handlePasswordChange = (event) => {
        const value = event.target.value;
        this.setState({password: value});
    }

    onCancel = (event)=>{
       event.preventDefault(); 
       this.props.history.push("/");
    }

    handleSubmit = (event) => {
        event.preventDefault();
        signInUser(this.state.username, this.state.password, 
          (response,authToken)=>{
            this.props.signIn({...response.data,token:authToken});
            //save authToken to local storage
            window.localStorage.setItem("state",JSON.stringify(this.props.state));
            if(this.props && this.props.location && this.props.location.state &&this.props.location.state.from){
              this.props.history.push(this.props.location.state.from)
            }else{
              this.props.history.push("/");
            }
        }, (error)=>{
          if(error.response && error.response.status){
            this.setState({status:error.response.status});
          }else{
            this.setState({status:500});
          }
            
        });
    }

    render(){
        const errors=[];
        if(this.state.status && this.state.status===401){
          errors.push("Invalid Credentials. Try again!");
        }
        return (
            <div className="bounds">
            <ValidationErrors errors={errors} />
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

const mapStateToProps = state => {
    return {state:state.userAuth};
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserSignIn)