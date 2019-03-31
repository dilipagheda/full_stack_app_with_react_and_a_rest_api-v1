
const setInitial = () => {

  let state=null;
  //check if localstorage has state information
  if(window.localStorage.getItem("state")){
    state = window.localStorage.getItem("state");
    // parse the localStorage string and setState
    try {
      state = JSON.parse(state);
    } catch (e) {
      // handle empty string
      state = {isSignedIn:false,user:null}
    }
  }else{
    state = {isSignedIn:false,user:null}
  }
  return state;
}

const INITIAL = setInitial();

const userAuth = (state = INITIAL, action) => {
    switch (action.type) {
      case 'SIGN_IN':
        return {
          ...state,
          isSignedIn:true,
          user:action.user
        }
      case 'SIGN_OUT':
        return {
          ...state,
          isSignedIn:false,
          user:null
        }
      default:
        return state
    }
  }
  
  export default userAuth