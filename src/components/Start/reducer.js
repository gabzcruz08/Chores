const INITIAL_STATE = {
  user: {}
}

export default (state = INITIAL_STATE, action) => {
  const action_str = action.type.replace('_FULFILLED', '')
  // console.log('loginsuccess', action_str);
  switch (action_str) {
    case 'VerifyUser_Login':
      return {
        ...state,
        user: action.payload.data.success_data
      }
    case "User_Facebook_Login": return{
      
    }
    default:
      return state
  }
}
