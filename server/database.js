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

    if (!characters.length) {
        return { error: 'No characters in database' }
    }

    return { status: 'success', content: characters }
}


export async function addCharacter(name) {
    name = name.toUpperCase()

    const [characters] = await pool.query("SELECT * FROM characters WHERE name = ?", name)

    if (characters.length) {
        return { error: 'Character already in database' }
    }

    await pool.query("INSERT INTO characters (name) VALUES (?)", name)
    const [ rows ] = await pool.query("SELECT * FROM characters WHERE name = ?", name)
    return { status: 'success', content: rows[0] }
}


export async function addCharactersBulk(characters) {
    return
}


export async function deleteCharacter(name) {
    name = name.toUpperCase()

    const [ characters ] = await pool.query("SELECT * FROM characters WHERE name = ?", name)

    if (!characters.length) {
        return { error: 'Character not in database' }
    }

    await pool.query("DELETE FROM characters WHERE name = ?", name)
    return { status: 'success', content: 'deleted' }
}


export async function addConnection(id1, id2) {
    return
}


export async function getConnections() {
    const [rows] = await pool.query("SELECT c1, c2 FROM connections AS conn JOIN characters AS char1 ON conn.char_id_1 = char1.id JOIN characters AS char2 ON conn.char_id_2 = char2.id")
    return rows
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