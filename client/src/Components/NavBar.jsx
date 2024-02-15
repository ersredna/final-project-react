import './NavBar.css'

export function NavBar({ user, setUser, unameInput }) {
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

    function handleSubmit(e) {
        e.preventDefault()
        user ? setUser('') : setUser(unameInput)
        localStorage.username = unameInput
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">One Piece Connections</a>
            <form className="login-logout nav-item" id="login-form" onSubmit={handleSubmit}>
                {!userLogged && <>
                    <input className="d-inline-block" id="username" type="text" value={unameInput}></input>
                    <input className="d-inline-block" id="password" type="password"></input>
                </>}
                {userLogged}
                <button className="btn d-inline-block">{btnMessage}</button>
            </form>
        </nav>
    )
}