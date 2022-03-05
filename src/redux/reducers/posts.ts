import { ActionType } from '../actionTypes/auth';

const initialState = {
  posts: [],
  getting_posts : false,
  getpost_Success : false,
  getpost_fail : false
};

export default (state = initialState, action: any) => {
  switch (action.type) {

    case ActionType.GETTING_POST: {
      return {
        ...state,
        getting_posts : true
      };
    }
    case ActionType.GETTING_POST_SUCCESS: {
        return {
          ...state,
          posts: action.payload,
          getting_posts : false,
          getpost_Success : true,
        };
      }

      case ActionType.GETTING_POST_FAIL: {
        return {
          ...state,
          getting_posts : false,
          getpost_fail : true
        };
      }
      case ActionType.RESET_POST_STATES: {
        return {
          ...state,
          getting_posts : false,
          getpost_Success : false,
          getpost_fail : false
        };
      }

    default:
      return state;
  }
};
