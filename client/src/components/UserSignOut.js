import {signOut}  from '../actions';
import { connect } from 'react-redux'

const UserSignOut = (props) =>{
    props.signOut();
    props.history.push("/");
    return null;
}

const mapDispatchToProps = dispatch => ({
    signOut:()=> {
      //clear local storage here
      window.localStorage.removeItem("state");
      dispatch(signOut());
    }
  })

export default connect(
    null,
    mapDispatchToProps
  )(UserSignOut)
