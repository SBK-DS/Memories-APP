import React, {useState} from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, CircularProgress, ButtonBase} from '@material-ui/core'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import useStyles from './styles'
import { useDispatch} from 'react-redux'
import { deletePost, likePost } from '../../../Actions/posts';
import {useNavigate} from 'react-router-dom'


const Post = ({post, isLoading, setcurrentId}) => {
    console.log(post, isLoading)
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const navigate = useNavigate()
    const [likes, setLikes] = useState(post.likes)
    const userId = user ? (user.result.googleId || user.result._id) : null

    const handleLike = async () => {
        
        dispatch(likePost(post._id))


        
        const hasLikedPost = likes.find((like) => like === (userId));
        

        if(hasLikedPost)
        {
            setLikes(likes.filter((id) => id !== (userId)))
        }
        else
        {
            setLikes([...likes, userId])
        }

    }

    if(!post && !isLoading) return 'No posts created or retrieved!'

    const Likes = () => {
        // console.log('Google Id : ' + typeof(user.result.googleId))
        // console.log('User Id : ' + typeof(user.result.id))
        // console.log('post.creator : ' + typeof(post.creator))
        // console.log(user.result.googleId === post.creator)
        if (likes.length > 0 && user)
        {
            return likes.find((like) => like === (userId)) ? (
                <>
                    <ThumbUpAltIcon fontSize='small' /> &nbsp; {likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
                    </> 
            ) : (
                <>
                    <ThumbUpAltIcon fontSize='small' /> &nbsp; {likes.length} {likes.length === 1 ? 'Likes' : 'Likes'}
                </> 
            )
        }

        return <><ThumbUpAltIcon fontSize='small' /> &nbsp; Like</>
    }

    const openPost = () => {
        console.log('Individual Post function called!')
        navigate(`/posts/${post._id}`)
    }

    return (
        <Card className={classes.card} raised elevation={6}>
            
            {isLoading ? (<CircularProgress />) : user ? (
                        (user.result.googleId === post.creator || user.result._id === post.creator) ? (
                            <div className={classes.overlay2}>
                            <Button style={{color: 'white', "z-index": "2"}} size='small' 
                            onClick={() => setcurrentId(post._id)}>
                                <MoreHorizIcon fontSize='default'/>
                            </Button>
                        </div>
                        ) : (null)
                    ):(null)} 
            
            
            <ButtonBase className={classes.cardAction} onClick={openPost}>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
                <div className={classes.overlay}>
                    <Typography variant='h6' >{post.name}</Typography>
                    <Typography variant='body2' >{moment(post.createdAt).fromNow()}</Typography>
                </div>

                <div className={classes.details}>
                    <Typography variant='body2' color="textSecondary" >{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} variant='h5' gutterBottom >{post.title}</Typography>
                <CardContent>
                    <Typography variant='body2' color="textSecondary" component="p">{post.message}</Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                
                <Button size="small" color="primary" disabled={!user} onClick={handleLike}>
                    <Likes />
                </Button>

                {user ? (
                    (user.result.googleId === post.creator || user.result._id === post.creator) ? (
                        <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" />
                            Delete
                        </Button>
                    ) : (null)
                ):(null)}


                
            </CardActions>
        </Card>
    )
}

export default Post