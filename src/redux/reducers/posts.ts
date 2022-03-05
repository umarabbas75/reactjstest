import { ActionType } from '../actionTypes/auth';

const initialState = {
  posts: [],
  getting_posts : false,
  getpost_Success : false,
  getpost_fail : false,

  adding_post_succcess : false,
  adding_posts : false,
  adding_post_fail : false,
  add_post_modal_visibiity : false
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
      case  ActionType.ADDING_POST : {
        return {
          ...state,
          adding_posts : true
        }
      }
      
      case  ActionType.ADDING_POST_SUCCESS : {
        const updatedPost = [action.payload,...state.posts]
        return {
          ...state,
          adding_post_succcess : true,
          adding_posts : false,
          posts : [...updatedPost]
        }
      }
      case  ActionType.ADDING_POST_FAIL : {
        return {
          ...state,
          adding_post_fail : true,
          adding_posts : false
        }
      }
      case  ActionType.ADD_POST_MODAL_TOGGLE : {
        return {
          ...state,
          add_post_modal_visibiity : !state.add_post_modal_visibiity
        }
      }
      case ActionType.RESET_POST_STATES: {
        return {
          ...state,
          getting_posts : false,
          getpost_Success : false,
          getpost_fail : false,
          adding_post_succcess : false,
          adding_posts : false,
          adding_post_fail : false
        };
      }

    default:
      return state;
  }
};
