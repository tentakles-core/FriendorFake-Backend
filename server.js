const express = require('express')
const cors = require('cors')
const { default: axios } = require('axios')
const Cache = require('./cache')

// initializing instances
const app = express()
const cache = new Cache()

// middlewares
app.use(express.json())
app.use(cors())

// route handlers
app.post('/api/v1/is-fake', async (req,res) => {
    
    // fetch user's data from cache
    const userCache = await cache.get(req.body.username)
    let isFake = null;

    if(userCache !== null){ // cache hit
        isFake = userCache
    }else if('user' in req.body){ // cache miss
        
        // fetch the result from the sagemaker
        const response = await axios.post('https://wl1nlfxw9f.execute-api.ap-south-1.amazonaws.com/prod', {
            input: Object.values(req.body.user)
        })
        isFake = response.data

        // set the result to the cache
        cache.set(req.body.username, response.data)
    }

    res.send(isFake)
})


// listening
app.listen(3000, async () => {
    console.log("Listening to port 3000");

    // connecting to the redis server
    await cache.connect()
    console.log('Connection with the redis server established')
})