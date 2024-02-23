import express, { response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { getUser, getCharacters, addCharacter, addCharactersBulk, deleteCharacter, getConnections, addConnection, deleteConnection, clearTable } from './database.js'

const app = express()
const PORT = 5000

const jsonParser = bodyParser.json()

app.use(cors({
    origin: 'http://localhost:5173'
}))


app.get('/characters', async (req, res) => {
    const response = await getCharacters()

    res.status(response.status).json(response)
})


app.post('/add-character', jsonParser, async (req, res) => {
    const { name } = req.body

    const response = await addCharacter(name)

    res.status(response.status).json(response)
})


app.post('/delete-character', jsonParser, async (req, res) => {
    const { name } = req.body

    const response = await deleteCharacter(name)

    res.status(response.status).json(response)
})


app.get('/connections', async (req, res) => {
    const response = await getConnections()

    res.status(response.status).json(response)
})


app.post('/add-connection', jsonParser, async (req, res) => {
    const { charNameS, charNameT } = req.body

    const response = await addConnection(charNameS, charNameT)

    res.status(response.status).json(response)
})


app.post('/delete-connection', jsonParser, async (req, res) => {
    const { charNameS, charNameT } = req.body

    const response = await deleteConnection(charNameS, charNameT)

    res.status(response.status).json(response)
})


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})