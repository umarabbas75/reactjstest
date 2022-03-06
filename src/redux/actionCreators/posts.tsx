import axios from '../../util/axios';
import { Dispatch } from 'redux';
import { ActionType } from '../actionTypes';

export const getAllPosts = () => {
    return async (dispatch : any) => {
        dispatch({
            type: ActionType.GETTING_POST
        });

        try {
            const { data } = await axios.get(`/posts`);
            console.log(data);
            dispatch({
                type: ActionType.GETTING_POST_SUCCESS,
                payload: data  
            });

        } catch(err) {
            dispatch({
                type: ActionType.GETTING_POST_FAIL,
                payload: 'some error occured'
            });
        }
    }
} 

export const addPost = (postData:any) => {
    return async (dispatch : any) => {
        dispatch({
            type: ActionType.ADDING_POST
        });

        try {
            const { data } = await axios.post(`/posts`,JSON.stringify(postData));
            console.log('added post',data);
            dispatch({
                type: ActionType.ADDING_POST_SUCCESS,
                payload: data  
            });

        } catch(err) {
            dispatch({
                type: ActionType.ADDING_POST_FAIL,
                payload: 'some error occured'
            });
        }
    }
} 


export const editPost = (postData:any,postId : any) => {
    return async (dispatch : any) => {
        dispatch({
            type: ActionType.UPDATING_POST
        });

        try {
            const { data } = await axios.put(`/posts/${postId}`,JSON.stringify(postData));
            console.log('updated post',data);
            dispatch({
                type: ActionType.UPDATING_POST_SUCCESS,
                payload: data  
            });

        } catch(err) {
            dispatch({
                type: ActionType.UPDATING_POST_FAIL,
                payload: 'some error occured'
            });
        }
    }
} 

export const deletePost = (postId : any) => {
    return async (dispatch : any) => {
        dispatch({
            type: ActionType.DELETING_POST
        });

        try {
            const { data } = await axios.delete(`/posts/${postId}`);
            console.log('deleted post',data);
            dispatch({
                type: ActionType.DELETING_POST_SUCCESS,
                payload: data  
            });

        } catch(err) {
            dispatch({
                type: ActionType.DELETING_POST_FAIL,
                payload: 'some error occured'
            });
        }
    }
} 