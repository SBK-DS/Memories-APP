import jwt from 'jsonwebtoken'

// When a user like a post this happens
// Click the like button => auth Middleware (next() calls if middleware accepts it)) => like controller

const auth = async (req, res, next) => {
    try {
        console.log(req.headers)
        const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null
        if(!token)
        {
            console.log('You need to signin to see the details!')
            next()
        }
        else
        {
            const isCustomAuth = token.length < 500 // greater than 500 is google's OAUTH, less than is our own jwt  

            let decodedData;
    
            if(token && isCustomAuth)
            {
                decodedData = jwt.verify(token, 'test')
                req.userId = decodedData.id
                console.log('Custom Id : ' + req.userId)
            }
            else
            {
                decodedData = jwt.decode(token)
                req.userId = decodedData.sub
                console.log('Google Id : ' + req.userId)
            }
    
            next()
        }

    } catch (error) {
        console.log(error)
    }
}

export default auth