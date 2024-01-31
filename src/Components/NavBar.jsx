import './NavBar.css'

export function NavBar({ user, setUser }) {
    let userLogged
    let btnMessage = 'Login'
    if (user) {
        userLogged = <div className="logged-message nav-item">Logged in as <strong>{user}</strong></div>
        btnMessage = 'Logout'
    }
    else {
        userLogged = <></>
        btnMessage = 'Login'
    }
    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Navbar</a>
            <div>
                {userLogged}
                <button className="btn nav-item" onClick={() => setUser('anders')}>{btnMessage}</button>
            </div>
        </nav>
    )
}