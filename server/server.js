import express from 'express'
import { getTest } from './database.js'

const app = express()
const PORT = 5000

// TODO: DEPLOY TO ELASTIC BEANSTALK


app.get('/characters', (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173")

    getTest()
    .then(result => res.json(result))
    .catch(err => console.error(err))

})

app.listen(PORT, () => {
    console.log('server is running on port 5000')
})