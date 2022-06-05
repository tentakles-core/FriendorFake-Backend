const express = require('express')
const cors = require('cors')
const { default: axios } = require('axios')

const app = express()


app.use(express.json())
app.use(cors())

app.post('/', async (req,res) => {
    
    console.log(Object.values(req.body.user));

    const response = await axios.post('https://wl1nlfxw9f.execute-api.ap-south-1.amazonaws.com/prod', {
        input: Object.values(req.body.user)
    })


    res.send(response.data)
})


app.listen(3000, () => {
    console.log("Listening to port 3000");
})