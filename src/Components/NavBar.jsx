import './NavBar.css'

export function NavBar({ user, setUser, unameInput, setUnameInput }) {
    let userLogged
    let btnMessage = 'Login'
    if (user) {
        userLogged = <p className="d-inline-block logged-msg nav-item">Logged in as <strong>{user}</strong></p>
        btnMessage = 'Logout'
    }
    else {
        userLogged = ''
        btnMessage = 'Login'
    }

    function handleChange(e) {
        setUnameInput(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        user ? setUser('') : setUser(unameInput)
        localStorage.username = unameInput
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Navbar</a>
            <div className="loginout nav-item">
                {!userLogged && <>
                    <input className="d-inline-block" id="username" onChange={handleChange} type="text" value={unameInput}></input>
                    <input className="d-inline-block" id="password" type="password"></input>
                </>}
                {userLogged}
                <button className="btn d-inline-block" onClick={handleSubmit}>{btnMessage}</button>
            </div>
        </nav>
    )
}