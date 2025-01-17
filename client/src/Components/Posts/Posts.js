import React from 'react'
import {Grid, CircularProgress} from '@material-ui/core'
import { useSelector } from 'react-redux'
import Post from './Post/Post'
import useStyles from './styles'


const Posts = ({setcurrentId}) => {
    const {posts, isLoading} = useSelector((state) => state.posts)
    const classes = useStyles()
    console.log(posts)
    
    return (
        posts ? !posts.length ? (<CircularProgress />) : (
        <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {
                    posts.map((post) => (
                        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                            <Post post={post} isLoading={isLoading} setcurrentId={setcurrentId}/>
                        </Grid>
                    ))
                }
        </Grid>) : null
    )
}

export default Posts