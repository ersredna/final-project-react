import './NavBar.css'

export default function NavBar({ user, setUser, unameInput }) {
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
            <form className="login-form nav-item" id="login-form" onSubmit={handleSubmit}>
                {!userLogged && <div className="login-input-wrapper">
                    <input className="d-inline-block form-control login-input" id="username" placeholder="Username" type="text" value={unameInput}></input>
                    <input className="d-inline-block form-control login-input" id="password" placeholder="Password" type="password"></input>
                </div>}
                {userLogged}
                <button className="btn d-inline-block login-btn">{btnMessage}</button>
            </form>
        </nav>
    )
}