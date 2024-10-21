import React from "react";
import {Container} from '@material-ui/core'
import Home from "./Components/Home/Home"
import Navbar from './Components/Navbar/Navbar'
import Auth from "./Components/Auth/Auth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PostDetails from "./Components/PostDetails/PostDetails";

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'))
    return (
        <BrowserRouter>       
            <Container maxWidth="xl">
                <Navbar />
                <Routes>
                    <Route path="/" exact element={<Navigate to="/posts" replace={true} />} />
                    <Route path='/posts' exact element={<Home />}/>
                    <Route path='/posts/search' exact element={<Home />}/>
                    <Route path='/posts/:id' exact element={<PostDetails />}/>
                    <Route path='/auth' exact element={!user ? (<Auth />) : (<Navigate to="/posts" replace={true} />)}/>
                </Routes>
            </Container>
        </BrowserRouter>
 
    )
}

export default App