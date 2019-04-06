
const axios = require('axios');
const token = require('basic-auth-token');

function signInUser(username,password,cb1,cb2){
    const authToken=token(username,password);
    //make a call here to sign in
    axios({
        url:'http://localhost:5000/api/users',
        method:'get',
        headers:{
            Authorization:`Basic ${authToken}`
        }
    })
    .then( response=> {
      // handle success
      //console.log(response.data);
      //this.props.signIn({...response.data,token:authToken});
      cb1(response,authToken);
    })
    .catch( (error) =>{
      // handle error
      //this.props.signOut();
      //console.log(error);
      cb2(error);
    })

}

export default signInUser
