const initialState = {
    logInUser : null
}

export default (state = initialState, action : any) => {
  switch (action.type) {

  case 'set_user_info':
    return { 
        ...state,
        logInUser : action.payload
    }

  default:
    return state
  }
}
