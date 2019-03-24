const INITIAL = {
  isSignedIn:false,
  user:null
}

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