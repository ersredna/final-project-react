import express, { response } from 'express'
import bodyParser from 'body-parser'
import csv from 'csv-parser'
import fs from 'fs'
import multer from 'multer'
import cors from 'cors'
import { registerUser, loginUser, getCharacters, addCharacter, addCharactersBulk, deleteCharacter, getConnections, addConnection, deleteConnection, importCharacters, clearTable } from './database.js'

const app = express()
const PORT = 5000

const jsonParser = bodyParser.json()

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads')
    },
    filename: function(req, file, callback) {
        callback(null, 'imports.csv')
    }
})

const upload = multer({ storage })

app.use(cors({
    origin: 'http://localhost:5173'
}))


app.post('/register', jsonParser, async (req, res) => {
    const { username, password, adminCode } = req.body

    const response = await registerUser(username, password, adminCode)

    res.status(response.status).json(response)
})


app.post('/login', jsonParser, async (req, res) => {
    const { username, password } = req.body

    const response = await loginUser(username, password)

    res.status(response.status).json(response)
})


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


app.post('/import-csv', upload.single('import-csv'), async (req, res) => {
    if (!req.file) {
        res.status(200).json({ status: 200, error: 'Must select file'})
        return
    }
    
    if (!new RegExp('\.(csv|CSV)$').test(req.file.originalname)) {
        res.status(200).json({ status: 200, error: 'Incorrect file type' })
        return
    }
    
    const results = []

    fs.createReadStream(req.file.destination + '/' + req.file.filename)   // error here
    .pipe(csv({}))
    .on('error', err => {
        console.error(err)
        res.status(200).json({ status: 200, error: 'Error reading file'})
    })
    .on('data', data => results.push(data))
    .on('end', async () => {
        const response = await importCharacters(results)
        res.status(response.status).json(response)

        if (fs.existsSync('./uploads/imports.csv')) {
            fs.unlink('./uploads/imports.csv', err => {
                if (err) console.error(err)
            })
        }
    })
})


app.get('/export-csv', async (req, res) => {
    const response = await getConnections()
    if (response.error) res.status(response.status).json(response)

    let connectionsData = 'source,target\r\n'

    for (const connection of response.content) {
        connectionsData += connection.source + ',' + connection.target + '\r\n'
    }

    fs.writeFileSync('./exports/connections.csv', connectionsData, err => {
        if (err) console.error(err)
    })

    res.status(200).download('exports/connections.csv', 'connections.csv', err => {
        if (err) {
            console.error(err)
            res.status(200).json({ status: 200, error: 'Could not download file'})
        }
    })

    if (fs.existsSync('./exports/connections.csv')) {
        console.log('exists')
        fs.unlink('./exports/connections.csv', err => {
            if (err) console.error(err)
            console.log('removed')
        })
    }
})


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})