import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'
import Icon from './Icon'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import Input from './Input'
import { gapi } from 'gapi-script'
import { useDispatch } from 'react-redux'
import { signin, signup } from '../../Actions/auth'

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

const Auth = () => {

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: '',
                scope: ""
            })
        }

        gapi.load('client:auth2', start)
    })

    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate();



    const state = null

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignup) {
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signin(formData, navigate))
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        handleShowPassword(false)
    }

    const googleSuccess = async (res) => {
        const result = res.profileObj
        const token = res.tokenId
        console.log('Google Id : ' + result + " " + token)

        try {
            dispatch({type: 'AUTH', data: {result, token}})
            navigate('/')
        } catch (error) {
            console.log(error.message)
        }
    }
    const googleFailure = (error) => {
        console.log("Google Sign In was unsuccesfull. Try Again Later")
        console.log(error)
    }

    return (
        <Container component="main" maxWidth="xs">  
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {
                                isSignup && (
                                    <>                                
                                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half></Input>                           
                                        <Input name="lastName" label="Last Name" handleChange={handleChange} half></Input>
                                    </>
                                )
                            }
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                        </Grid>



                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {isSignup ? 'Sign Up' : 'Sign In'}
                        </Button>
                        
                        <GoogleLogin 
                            clientId='322696984272-dbj8mdef27qkk7ts4ttdca91esiejr2f.apps.googleusercontent.com'
                            render={(renderProps) => (
                                <Button 
                                    className={classes.googleButton} 
                                    color='primary' 
                                    fullWidth 
                                    onClick={renderProps.onClick} 
                                    disabled={renderProps.disabled} 
                                    startIcon={<Icon />} 
                                    variant="contained">
                                        Google Sign In
                                </Button>
                            )}
                            plugin_name='memories App'
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />
                        
                        <Grid container justify="flex-end" >
                            <Grid item >
                                <Button onClick={switchMode}>
                                    {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                                </Button>
                            </Grid>
                        </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth