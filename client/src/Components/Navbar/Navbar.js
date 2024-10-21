import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Avatar, Button } from '@material-ui/core'
import useStyles from './styles'
import memoriesLogo from '../../images/memoriesLogo.png'
import memoriesText from '../../images/memoriesText.png'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'

const Navbar = () => {
    const classes = useStyles()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation()


    console.log(user)

    const handleLogout = () => {
        dispatch({type: 'LOGOUT'})
        setUser(null)
        navigate('/')
        
    }

    const handleLogin = () => {
        navigate('/auth')
    }

    useEffect(() => {

        
        console.log(user)
        if(user)
        {
            const token = user.result.token
            console.log('token : ', token)

            if(token) {
                const decodedToken = decode(token)

                if(decodedToken.exp * 1000 < new Date().getTime())
                {
                    handleLogout()
                }
            }
            
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img src={memoriesText} alt="icon" height="45px"/>
                <img className={classes.image} src={memoriesLogo} alt="memories" height="40px" />
            </Link>
            <Toolbar classes={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={handleLogout}>Logout</Button>
                    </div>
                ) : (
                    <Button variant="contained" color="primary" onClick={handleLogin}>
                        Sign In
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar