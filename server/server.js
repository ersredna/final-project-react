import express, { response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { getTest, getUser, getCharacters, addCharacter, addCharactersBulk, deleteCharacter, getConnections, addConnection, deleteConnection, clearTable } from './database.js'

const app = express()
const PORT = 5000

// TODO: DEPLOY TO ELASTIC BEANSTALK

const jsonParser = bodyParser.json()

app.use(cors({
    origin: 'http://localhost:5173'
}))


app.get('/characters', async (req, res) => {
    const response = await getCharacters()
    // console.log(response)

    if (response.error) {
        res.status(200).json(response.error)
    }
    else {
        res.status(200).json(response.content)
    }
})


app.post('/add-character', jsonParser, async (req, res) => {
    const { name } = req.body

    const response = await addCharacter(name)

    if (response.error) {
        res.status(200).json(response.error)
    }
    else {
        res.status(201).json(response.content)
    }
})


app.post('/delete-character', jsonParser, async (req, res) => {
    const { name } = req.body

    const response = await deleteCharacter(name)

    if (response.error) {
        res.status(200).json(response.error)
    }
    else {
        res.status(202).json(response.content)
    }
})


app.get('/connections', async (req, res) => {
    const response = await getConnections()

    if (response.error) {
        res.status(200).json(response.error)
    }
    else {
        res.status(200).json(response.content)
    }
})


app.post('/add-connection', jsonParser, async (req, res) => {
    const { charNameS, charNameT } = req.body

    const response = await addConnection(charNameS, charNameT)

    if (response.error) {
        res.status(200).json(response.error)
    }
    else {
        res.status(201).json(response.content)
    }
})


app.post('/delete-connection', jsonParser, async (req, res) => {
    const { charNameS, charNameT } = req.body

    const response = await deleteConnection(charNameS, charNameT)

    if (response.error) {
        res.status(200).json(response.error)
    }
    else {
        res.status(201).json(response.content)
    }
})


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})