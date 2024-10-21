import axios from 'axios'

const API = axios.create({baseURL: 'http://127.0.0.1:5000'})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }


    return req
})

const url = 'https://memoriesnode.herokuapp.com/posts'

export const fetchPost = async (id) => {
    const response = await API.get(`/posts/${id}`)
    return response 
}
export const fetchPosts = async (page) => {
    const response = await API.get(`/posts?page=${page}`)
    console.log('pagination data in API : ' + JSON.stringify(response.data.currentPage))
    return response 
}
export const fetchPostsBySearch = async (searchQuery) => {
    const response = await API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
    return response 
}

export const createPost = async (newPost) => {
    const response = await API.post('/posts', newPost)
    return response
}

export const updatedPost = async (id, updatedPost) => {
    const response = await API.patch(`/posts/${id}`, updatedPost)
    console.log('Updated post in API : ', response)
    return response
}

export const deletePost = async (id) => {
    const response = await API.delete(`/posts/${id}`)
    return response
}

export const likePost = async (id) => {
    const response = await API.patch(`/posts/${id}/likePost`)
    return response
}

export const commentPost = async (value, id) => {
    console.log('comment at end point call : ', value)
    const response = await API.post(`/posts/${id}/commentPost`, { value })
    console.log('API end point comment response', response)
    return response
}

export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData)