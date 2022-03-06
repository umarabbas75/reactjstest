import { ActionType } from "../actionTypes/auth";

const initialState = {
  posts: [],
  getting_posts: false,
  getpost_Success: false,
  getpost_fail: false,

  adding_post_succcess: false,
  adding_posts: false,
  adding_post_fail: false,
  add_post_modal_visibiity: false,

  updating_post_succcess: false,
  updating_posts: false,
  updating_post_fail: false,

  delete_post_modal_visibiity : false,

  deleting_post_succcess: false,
  deleting_posts: false,
  deleting_post_fail: false,

  initialValues: null,
  postId : null
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.GETTING_POST: {
      return {
        ...state,
        getting_posts: true,
      };
    }
    case ActionType.GETTING_POST_SUCCESS: {
      return {
        ...state,
        posts: action.payload,
        getting_posts: false,
        getpost_Success: true,
      };
    }

    case ActionType.GETTING_POST_FAIL: {
      return {
        ...state,
        getting_posts: false,
        getpost_fail: true,
      };
    }
    case ActionType.ADDING_POST: {
      return {
        ...state,
        adding_posts: true,
      };
    }

    case ActionType.ADDING_POST_SUCCESS: {
      const updatedPost = [action.payload, ...state.posts];
      return {
        ...state,
        adding_post_succcess: true,
        adding_posts: false,
        posts: [...updatedPost],
      };
    }
    case ActionType.ADDING_POST_FAIL: {
      return {
        ...state,
        adding_post_fail: true,
        adding_posts: false,
      };
    }

    case ActionType.UPDATING_POST: {
      return {
        ...state,
        adding_posts: true,
      };
    }

    case ActionType.UPDATING_POST_SUCCESS: {
      const updatedPost = getUpdatedPost(state.posts, action.payload);
      return {
        ...state,
        updating_post_succcess: true,
        adding_posts: false,
        posts: [...updatedPost],
      };
    }
    case ActionType.UPDATING_POST_FAIL: {
      return {
        ...state,
        updating_post_fail: true,
        adding_posts: false,
      };
    }

    case ActionType.ADD_POST_MODAL_TOGGLE: {
      return {
        ...state,
        add_post_modal_visibiity: !state.add_post_modal_visibiity,
        initialValues: action.payload ? action.payload : null,
      };
    }

    case ActionType.DELETE_POST_MODAL_TOGGLE: {
      return {
        ...state,
        delete_post_modal_visibiity: !state.delete_post_modal_visibiity,
        postId: action.payload ? action.payload : null,
      };
    }

    case ActionType.DELETING_POST: {
      return {
        ...state,
        deleting_posts: true,
      };
    }

    case ActionType.DELETING_POST_SUCCESS: {
      const updatedPost = getUpdatedPostAfterDelete(state.posts, action.payload);
      return {
        ...state,
        deleting_post_succcess: true,
        deleting_posts: false,
        posts: [...updatedPost],
      };
    }
    case ActionType.DELETING_POST_FAIL: {
      return {
        ...state,
        deleting_post_fail: true,
        deleting_posts: false,
      };
    }

    case ActionType.RESET_POST_STATES: {
      return {
        ...state,
        getting_posts: false,
        getpost_Success: false,
        getpost_fail: false,
        adding_post_succcess: false,
        adding_posts: false,
        adding_post_fail: false,
        updating_post_succcess: false,
        updating_posts: false,
        updating_post_fail: false,
        deleting_post_succcess: false,
        deleting_posts: false,
        deleting_post_fail: false,
      };
    }
    default:
      return state;
  }
};

const getUpdatedPost = (oldData: any, newData: any) => {
  let newArray: any = [];
  oldData.map((item: any) => {
    if (item.id === newData.id) {
      newArray.push(newData);
    } else {
      newArray.push(item);
    }
    return item;
  });
  return newArray;
};

const getUpdatedPostAfterDelete = (oldData: any, newData: any) => {
  let newArray : any = [];
    oldData.map((item:any) => {
        if (item.id !== newData.id) {
            newArray.push(item);
        }
        return item
    })
    return newArray;
};
