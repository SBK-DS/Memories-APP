import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"

export const getPosts = async (req, res) => {
    const {page} = req.query
    try {
        const LIMIT = 8
        const startIndex = (Number(page) - 1) * LIMIT // get the strating index of every page
        const total = await PostMessage.countDocuments({})
        console.log('Total no of pages : ' + Math.ceil(total/LIMIT))
        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex)
        console.log('Pages object in server ' + posts)
        res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Number(Math.ceil(total/LIMIT))})
    }
    catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getPost = async(req, res) => {
    const {id} = req.params
    console.log('getpost in server' + req.params)

    try {
        const post = await PostMessage.findById(id)
        res.status(200).json(post)
    }
    catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getPostsBySearch = async (req, res) => {
    
    const { searchQuery, tags } = req.query
    
    try {
        const title = new RegExp(searchQuery, 'i')

        const posts = await PostMessage.find({$or: [{title} , {tags: { $in: tags.split(',')}}]})
        res.status(200).json({data: posts})
    }
    catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createPost = async (req, res) => {
    const post = req.body
    console.log('create post of controller called : ')
    console.log('req.body : ' + post)
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()})
    console.log(newPost)
    try {
        await newPost.save()
        
        res.status(201).json(newPost)
    }
    catch (error) {
        console.log(error)
        res.status(409).json({message: error.message})
    }
}

export const updatePost = async(req, res) =>{
    const {id: _id} = req.params
    const postBody = req.body

    if (!req.userId) return res.json({message: 'Unauthenticated'})

    console.log('req.userID', req.userId)

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID')

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, postBody, { new: true});
    console.log("Post update in server : " + updatedPost)

    res.json(updatedPost)

}

export const deletePost = async(req, res) =>{
    const {id} = req.params
    const post = req.body

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID')

    const deletedPost = await PostMessage.findByIdAndRemove(id);

    res.json({message: 'Post deleted Successfully'})
}

export const likePost = async(req, res) =>{
    const {id: _id} = req.params
    console.log('req Id', req.userId)
    console.log('Id in likepost : ' + _id)

    if(!req.userId) return res.json({ message: 'Unauthenticated'})

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID')

    const post = await PostMessage.findById(_id)

    console.log('Post before Like : ', post)

    const isLiked = post.likes.includes(String(req.userId))
    console.log("Like check in server : " + isLiked)

    if(!isLiked)
    {
        post.likes.push(req.userId)
    }
    else
    {
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }
    

    console.log('Post after Like : ', post)


    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true }); 
  
    res.json(updatedPost)
}

export const commentPost = async (req, res) => {
    const {id} = req.params
    const {value} = req.body

    console.log("comment at backened : ", value)

    const post = await PostMessage.findById(id)
    post.comments.push(value)

    console.log('Comment Before update : ', post)

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true})

    console.log('Comment After update : ', updatedPost)

    res.json(updatedPost)
}