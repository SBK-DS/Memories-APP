import React, {useState, useEffect} from 'react'
import Posts from '../../Components/Posts/Posts'
import Form from '../../Components/Forms/Form'
import { useDispatch } from "react-redux";
import { getPosts, getPostsBySearch } from '../../Actions/posts'
import useStyles from './styles'
import { Grow, Container, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import Pagination from '../Pagination';
import { useNavigate, useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'

function useQuery () {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const [currentId, setcurrentId] = useState(null)
    const classes = useStyles();
    const dispatch = useDispatch()
    const query = useQuery()
    const navigate = useNavigate()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])


    const searchPost = () => {
        if(search.trim() || tags)
        {
            // dispatch -> fetch search post
            dispatch(getPostsBySearch({search, tags: tags.join(',')}))
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        }
        else
        {
            navigate('/')
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost()
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag]);

    const handleDelete = (tagToDelete) => setTags(tags.filter((t) => t !== tagToDelete))
        // console.log(tags, tagToDelete)
        // const new_tags = [...tags]
        // console.log(new_tags.filter((t) => t !== tagToDelete))
        // console.log(tags)
        //setTags();

    return (
        <Grow in>
        <Container maxWidth='xl'>
            <Grid className={classes.gridContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={6} md={9}>
                    <Posts setcurrentId={setcurrentId} currentId={currentId}/>
                </Grid>
    
                <Grid item xs={12} sm={4} md={3}>
                    <AppBar className={classes.appBarSearch} position="static" color="inherit">
                        <TextField name="search" variant="outlined" label="Search Memories" fullWidth value={search} onKeyPress={handleKeyPress} onChange={(e) => {setSearch(e.target.value)}}/>
                        <ChipInput 
                        style={{margin: '10px 0'}}
                        value={tags}
                        onAdd={(chip) => handleAdd(chip)}
                        onDelete={(chip) => handleDelete(chip)}
                        label="Search Tags"
                        variant="outlined"
                        />
                        <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained">Search</Button>
                    </AppBar>

                    <Form setcurrentId={setcurrentId} currentId={currentId} />
                    {(!searchQuery && !tags.length) && (
                        <Paper elevation={6} className={classes.pagination}>
                            <Pagination page={page}/>
                        </Paper>  
                    )}

                </Grid>
            
            </Grid>
        </Container>
        </Grow>
    )

}

export default Home
