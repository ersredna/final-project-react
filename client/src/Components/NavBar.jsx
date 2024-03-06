import { useState } from 'react'
import './NavBar.css'

const ROUTE = 'http://one-piece-connections.s3-website-us-west-2.amazonaws.com/'

export default function NavBar({ user, setUser }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [adminCode, setAdminCode] = useState('')


    async function loginUser(submitType) {
        if (submitType === 'logout') {
            setUsername('')
            setPassword('')
            setUser('')
            return
        }

        if (!username && !password) alert("Must provide username and password")
        else {
            if (!username) alert("Must provide username") 
            if (!password) alert("Must provide password")
        }
        if (!username || !password) return

        if (submitType === 'register') {
            fetch(ROUTE + 'register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password, adminCode })
            })
            .then(res => res.json())
            .then(data => {
                if (data.error) alert(data.error)
                else setUser(data.content.username, data.content.isAdmin)
            })
            .catch(err => console.error(err))
        }
        else if (submitType === 'login') {
            fetch(ROUTE + 'login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, password: password })
            })
            .then(res => res.json())
            .then(data => {
                if (data.error) alert(data.error)
                else setUser(data.content.username, data.content.isAdmin)
            })
            .catch(err => console.error(err))
        }
        else return
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">One Piece Connections</a>
            <div className="login-div nav-item" id="login-form">
                {!user && 
                    <>
                        <button className="btn d-inline-block login-btn" name='register' id='register-btn' onClick={e => loginUser(e.target.name)}>Register</button>
                        <input className="d-inline-block form-control admin-code-input" id="admin-code" onChange={e => setAdminCode(e.target.value)} placeholder="Admin Code" value={adminCode} type="password"></input>
                        <div className="login-input-wrapper">
                            <input className="d-inline-block form-control login-input" onChange={e => setUsername(e.target.value)} id="username" placeholder="Username" value={username} type="text"></input>
                            <input className="d-inline-block form-control login-input" onChange={e => setPassword(e.target.value)} id="password" placeholder="Password" value={password} type="password"></input>
                        </div>
                        <button className="btn d-inline-block login-btn" name='login' id='login-btn' onClick={e => loginUser(e.target.name)}>Login</button>
                    </>
                }
                {user && 
                    <>
                        <p className="d-inline-block logged-msg nav-item">Logged in as <strong>{user}</strong></p>
                        <button className="btn d-inline-block login-btn" name='logout' id='logout-btn' onClick={e => loginUser(e.target.name)}>Logout</button>
                    </>
                }
            </div>
        </nav>
    )
}