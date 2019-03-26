import {signOut}  from '../actions';
import { connect } from 'react-redux'

const UserSignOut = (props) =>{
    props.signOut();
    props.history.push("/");
    return null;
}

const mapDispatchToProps = dispatch => ({
    signOut:()=> dispatch(signOut())
  })

export default connect(
    null,
    mapDispatchToProps
  )(UserSignOut)
