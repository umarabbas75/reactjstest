import { ActionType } from "../actionTypes";

const initialState = {
  posts: [],
  filteredPosts : [],
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

export interface Post {
  body : string
  title : string
  id : number 
  userId : number | string
}

interface PostStateTypes {
  posts: Post[]
  filteredPosts:  Post[]
  getting_posts: boolean
  getpost_Success: boolean
  getpost_fail: boolean

  adding_post_succcess: boolean
  adding_posts: boolean
  adding_post_fail: boolean
  add_post_modal_visibiity: boolean

  updating_post_succcess: boolean
  updating_posts: boolean
  updating_post_fail: boolean

  delete_post_modal_visibiity : boolean

  deleting_post_succcess: boolean
  deleting_posts: boolean
  deleting_post_fail: boolean

  initialValues: Post | null
  postId : number | null
}

const posts = (state : PostStateTypes = initialState, action: any) => {
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
        filteredPosts : action.payload,
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
        filteredPosts : [...updatedPost],
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
        filteredPosts : [...updatedPost],
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
        filteredPosts : [...updatedPost],
      };
    }
    case ActionType.DELETING_POST_FAIL: {
      return {
        ...state,
        deleting_post_fail: true,
        deleting_posts: false,
      };
    }

    case ActionType.FILTER_POST : {
      let allPosts = [...state.posts]
      const filteredPostsData = getFilteredPosts(action.payload,allPosts)
      return {
        ...state,
        filteredPosts :[...filteredPostsData],
      }
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

export default posts

const getUpdatedPost = (oldData: Post[], newData: Post) => {
  let newArray: Post[] = [];
  oldData.map((item: Post) => {
    if (item.id === newData.id) {
      newArray.push(newData);
    } else {
      newArray.push(item);
    }
    return item;
  });
  return newArray;
};

const getUpdatedPostAfterDelete = (oldData: Post[], postId: number) => {
  console.log('========')
  let newArray :  Post[] = [];
    oldData.map((item:Post) => {
        if (item.id !== postId) {
            newArray.push(item);
        }
        return item
    })
    return newArray;
};
const getFilteredPosts = (searchQuery : string, posts : Post[])=>{
  let filter : Post[] = posts.filter((item:any)=>item.title.toLowerCase().includes(searchQuery.toLowerCase()))
  return filter
}
