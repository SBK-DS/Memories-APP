import express from 'express'
import { getPostsBySearch, getPost, getPosts, commentPost, createPost, updatePost, deletePost, likePost} from '../controllers/postsController.js'
import auth from '../middleware/auth.js'


const router = express.Router()

router.get('/search', getPostsBySearch)
router.get('/', getPosts)
router.post('/', auth, createPost)
router.get('/:id', auth, getPost)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost)
router.post('/:id/commentPost', auth, commentPost)

export default router