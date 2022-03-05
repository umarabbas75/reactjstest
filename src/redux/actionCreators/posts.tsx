import axios from '../../util/axios';
import { Dispatch } from 'redux';
import { ActionType } from '../actionTypes/auth';

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
            const { data } = await axios.post(`/posts`,postData);
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