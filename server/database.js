import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()


export async function getUser(username) {
    const [ rows ] = await pool.query("SELECT * FROM users WHERE username = ?", username)
    return rows[0]
}


export async function getCharacters() {
    const [ characters ] = await pool.query("SELECT * FROM characters")

    if (!characters.length) return { error: 'No characters in database' }

    return { status: 'success', content: characters }
}


export async function addCharacter(name) {
    name = name.toUpperCase()

    const [[ rows ]] = await pool.query("SELECT * FROM characters WHERE name = ?", name)

    if (rows) return { error: 'Character already in database' }

    await pool.query("INSERT INTO characters (name) VALUES (?)", name)
    const [[ character ]] = await pool.query("SELECT * FROM characters WHERE name = ?", name)
    return { status: 'success', content: character }
}


export async function addCharactersBulk(characters) {
    return
}


export async function deleteCharacter(name) {
    name = name.toUpperCase()

    const [[ character ]] = await pool.query("SELECT * FROM characters WHERE name = ?", name)

    console.log(character)

    if (!character) return { error: 'Character not in database' }

    await pool.query("DELETE FROM characters WHERE name = ?", name)
    await pool.query("DELETE FROM connections WHERE char_id_1 = ? OR char_id_2 = ?", [character.id, character.id])
    return { status: 'success', content: character }
}


export async function getConnections() {
    const [ connections ] = await pool.query("SELECT char1.name, char2.name FROM connections AS conn JOIN characters AS char1 ON conn.char_id_1 = char1.id JOIN characters AS char2 ON conn.char_id_2 = char2.id")
    
    if (!connections.length) return { error: 'No connections in database' }

    console.log(connections) // FIXME: only returning target
    
    return { status: 'success', content: connections }
}


export async function addConnection(charNameS, charNameT) {
    charNameS = charNameS.toUpperCase()
    charNameT = charNameT.toUpperCase()
    
    const [[ source ]] = await pool.query("SELECT id FROM characters WHERE name = ?", charNameS)
    const [[ target ]] = await pool.query("SELECT id FROM characters WHERE name = ?", charNameT)

    if (!source && !target) return { error: `${charNameS} nor ${charNameT} are in database` }
    if (!source) return { error: `${charNameS} not in database` }
    if (!target) return { error: `${charNameT} not in database` }

    const [[ rows ]] = await pool.query("SELECT * FROM connections WHERE char_id_1 = ? AND char_id_2 = ?", [source.id, target.id])

    if (rows) return { error: 'Connection already exists' }

    await pool.query("INSERT INTO connections (char_id_1, char_id_2) VALUES (?, ?)", [source.id, target.id])
    const [[ connection ]] = await pool.query("SELECT * FROM connections WHERE char_id_1 = ? AND char_id_2 = ?", [source.id, target.id])

    return { status: 'success', content: connection }
}


export async function deleteConnection(charNameS, charNameT) {
    charNameS = charNameS.toUpperCase()
    charNameT = charNameT.toUpperCase()
    
    const [[ source ]] = await pool.query("SELECT id FROM characters WHERE name = ?", charNameS)
    const [[ target ]] = await pool.query("SELECT id FROM characters WHERE name = ?", charNameT)

    if (!source && !target) return { error: `${charNameS} nor ${charNameT} are in database` }
    if (!source) return { error: `${charNameS} not in database` }
    if (!target) return { error: `${charNameT} not in database` }

    const [[ connection ]] = await pool.query("SELECT * FROM connections WHERE char_id_1 = ? AND char_id_2 = ?", [source.id, target.id])

    if (!connection) return { error: 'Connection doesn\'t exist' }

    await pool.query("DELETE FROM connections WHERE char_id_1 = ? AND char_id_2 = ?", [source.id, target.id])

    return { status: 'success', content: connection }
}


export async function getTest() {
    const [rows] = await pool.query("SELECT * FROM test")
    return rows
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