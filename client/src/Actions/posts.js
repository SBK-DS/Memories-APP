import * as api from '../API'
import { FETCH_ALL, FETCH_POST, CREATE, UPDATE, DELETE, START_LOADING, END_LOADING, FETCH_BY_SEARCH, COMMENT } from '../constants/actionTypes';

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const { data } = await api.fetchPost(id);
        console.log(data)
        dispatch({type: FETCH_POST, payload: data})
        dispatch({type: END_LOADING})
    }
    catch (error) {
        console.log(error.message)
    }
}
export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const { data } = await api.fetchPosts(page);
        console.log('Number of pages : ' + data.numberOfPages)
        dispatch({type: FETCH_ALL, payload: data})
        dispatch({type: END_LOADING})
    }
    catch (error) {
        console.log(error.message)
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({type: FETCH_BY_SEARCH, payload: data})
        dispatch({type: END_LOADING})
    }
    catch (error) {
        console.log(error)
    }
}

export const createPost = (post) => {
   return async(dispatch) => {
        try {
            dispatch({type: START_LOADING})
            const { data } = await api.createPost(post)
            console.log('CreatePost Called ')
            console.log(post + ' ' + data)
            dispatch({type: CREATE, payload: data})
            dispatch({type: END_LOADING})
        } catch (error) {
            console.log(error)
        }
}}

export const updatePost = (id, post) => async(dispatch) => {
    try {
        console.log('Updated post in action creator : ', post)
        const { data } = await api.updatedPost(id, post)
        console.log('API patched data in action creator : ', data)
        dispatch({type: UPDATE, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        const { data } = await api.deletePost(id)
        dispatch({type: DELETE, payload: id})
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async(dispatch) => {
    try {
        console.log('like post : ', id)
        const { data } = await api.likePost(id)
        dispatch({type: UPDATE, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const commentPost = (value, id) => async(dispatch) => {
    try {
        console.log('comment : ', value, id)
        const { data } = await api.commentPost(value, id)
        dispatch({type: COMMENT, payload: data})
        console.log('Response from comment api : ', data)
        return data.comments
    } catch (error) {
        console.log(error)
    }
}