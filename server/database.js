import mysql from 'mysql2'
import bcrypt from 'bcrypt'
const SALT_ROUNDS = 11

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.RDS_HOSTNAME || process.env.MYSQL_HOST,
    user: process.env.RDS_USERNAME || process.env.MYSQL_USER,
    password: process.env.RDS_PASSWORD || process.env.MYSQL_PASSWORD,
    database: process.env.RDS_DB_NAME || process.env.MYSQL_DATABASE,
    ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false
}).promise()


export async function registerUser(username, password, adminCode) {
    const usernameUpper = username.toUpperCase()
    const [[ existingUser ]] = await pool.query("SELECT * FROM users WHERE username = ?", usernameUpper)

    if (existingUser) return { status: 200, error: `Username "${username}" already in use`}

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    const isAdmin = adminCode === process.env.ADMIN_HASH ? 1 : 0

    await pool.query("INSERT INTO users (username, hash, is_admin) VALUES (?, ?, ?)", [usernameUpper, hashedPassword, isAdmin])

    return { status: 201, content: { username, isAdmin: isAdmin === 1 ? true : false } }
}


export async function loginUser(username, password) {
    const usernameUpper = username.toUpperCase()

    const [[ hash ]] = await pool.query("SELECT hash FROM users WHERE username = ?", usernameUpper)

    if (!hash) return { status: 200, error: 'Username or password is incorrect'}
    if (!await bcrypt.compare(password, hash.hash)) return { status: 200, error: 'Username or password is incorrect'}

    const [[ isAdmin ]] = await pool.query("SELECT is_admin FROM users WHERE username = ?", usernameUpper)

    return { status: 200, content: { username, isAdmin: isAdmin.is_admin.readInt8() === 1 ? true : false } }
}


export async function getCharacters() {
    const [ characters ] = await pool.query("SELECT * FROM characters ORDER BY id ASC")

    if (!characters.length) return { status: 200, error: 'No characters in database' }

    return { status: 200, content: characters }
}


export async function addCharacter(name) {
    name = name.toUpperCase()

    const [[ rows ]] = await pool.query("SELECT * FROM characters WHERE name = ?", name)

    if (rows) return { status: 200, error: `${name} already in database` }

    await pool.query("INSERT INTO characters (name) VALUES (?)", name)

    const [[ character ]] = await pool.query("SELECT * FROM characters WHERE name = ?", name)

    return { status: 201, content: character }
}


export async function deleteCharacter(name) {
    name = name.toUpperCase()

    const [[ character ]] = await pool.query("SELECT * FROM characters WHERE name = ?", name)

    if (!character) return { status: 200, error: `${name} not in database` }

    await pool.query("DELETE FROM connections WHERE char_id_1 = ? OR char_id_2 = ?", [character.id, character.id])
    await pool.query("DELETE FROM characters WHERE name = ?", name)

    return { status: 200, content: character }
}


export async function getConnections() {
    const [ connections ] = await pool.query("SELECT conn.id, char1.name AS source, char2.name AS target FROM connections AS conn JOIN characters AS char1 ON conn.char_id_1 = char1.id JOIN characters AS char2 ON conn.char_id_2 = char2.id")
    
    if (!connections.length) return { status: 200, error: 'No connections in database' }
    
    return { status: 200, content: connections }
}


export async function addConnection(charNameS, charNameT) {
    charNameS = charNameS.toUpperCase()
    charNameT = charNameT.toUpperCase()
    
    const [[ source ]] = await pool.query("SELECT id FROM characters WHERE name = ?", charNameS)
    const [[ target ]] = await pool.query("SELECT id FROM characters WHERE name = ?", charNameT)

    if (!source && !target) return { status: 200, error: `${charNameS} nor ${charNameT} are in database` }
    if (!source) return { status: 200, error: `${charNameS} not in database` }
    if (!target) return { status: 200, error: `${charNameT} not in database` }

    const [[ rows ]] = await pool.query("SELECT * FROM connections WHERE char_id_1 = ? AND char_id_2 = ?", [source.id, target.id])

    if (rows) return { status: 200, error: `${charNameS} > ${charNameT} already exists` }

    await pool.query("INSERT INTO connections (char_id_1, char_id_2) VALUES (?, ?)", [source.id, target.id])

    const [[ connection ]] = await pool.query("SELECT * FROM connections WHERE char_id_1 = ? AND char_id_2 = ?", [source.id, target.id])

    return { status: '201', content: connection }
}


export async function deleteConnection(charNameS, charNameT) {
    charNameS = charNameS.toUpperCase()
    charNameT = charNameT.toUpperCase()
    
    const [[ source ]] = await pool.query("SELECT id FROM characters WHERE name = ?", charNameS)
    const [[ target ]] = await pool.query("SELECT id FROM characters WHERE name = ?", charNameT)

    if (!source && !target) return { status: 200, error: `${charNameS} nor ${charNameT} are in database` }
    if (!source) return { status: 200, error: `${charNameS} not in database` }
    if (!target) return { status: 200, error: `${charNameT} not in database` }

    const [[ connection ]] = await pool.query("SELECT * FROM connections WHERE char_id_1 = ? AND char_id_2 = ?", [source.id, target.id])

    if (!connection) return { status: 200, error: `${charNameS} > ${charNameT} doesn\'t exist` }

    await pool.query("DELETE FROM connections WHERE char_id_1 = ? AND char_id_2 = ?", [source.id, target.id])

    return { status: 200, content: connection }
}


export async function importCharacters(characters) {
    let added = []

    for (const character of characters) {
        const name = character.name.toUpperCase()
        const [[ existingCharacter ]] = await pool.query("SELECT * FROM characters WHERE name = ?", name)

        if (existingCharacter) continue

        await pool.query("INSERT INTO characters (name) VALUES (?)", name)

        const [[ id ]] = await pool.query("SELECT id FROM characters WHERE name = ?", name)

        added.push({ id: id.id, name })
    }

    return { status: 201, content: JSON.stringify(added) }
}


export async function clearTable(t) {
    let table

    switch (t) {
        case 'char':
            table = 'characters'
            break
        case 'conn':
            table = 'connections'
            break
        case 'user':
            table = 'users'
            break
        default:
            table = 'characters'
    }

    pool.query("DELETE * FROM ?", table)
}