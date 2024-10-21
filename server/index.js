import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import dotenv from 'dotenv'

const app = express()
dotenv.config()
// Middlewares Start

app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(cors())
app.use('/posts', postRoutes)
app.use('/user', userRoutes)
// Middlewares End

app.get('/', (req, res) => {
    res.send('Welcome to the memories API')
})

//const CONNECTION_URL = 'mongodb+srv://sbk-DB:1234567890@mern-app.1q3mrf4.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000

// Database Connect
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
    }))
    .catch((error) => console.log(error.message))