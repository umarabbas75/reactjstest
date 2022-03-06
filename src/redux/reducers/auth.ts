import { ActionType } from '../actionTypes';

const initialState = {
  logInUser: null,
};

const auth = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.LOGIN_USER: {
      let {token,...userInfo} = action.payload
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("token", JSON.stringify(token));
      return {
        ...state,
        logInUser: action.payload,
      };
    }
    case ActionType.LOGOUT_USER: {
      localStorage.clear();
      return {
        ...state,
        logInUser: null,
      };
    }

    default:
      return state;
  }
};

export default auth
