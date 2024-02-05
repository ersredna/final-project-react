import './NavBar.css'

export function NavBar({ user, setUser, unameInput, setUnameInput }) {
    let userLogged
    let btnMessage = 'Login'
    if (user) {
        userLogged = <div className="logged-message nav-item">Logged in as <strong>{user}</strong></div>
        btnMessage = 'Logout'
    }
    else {
        userLogged = ''
        btnMessage = 'Login'
    }
    console.log(user)
    function handleChange(e) {
        setUnameInput(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        userLogged ? setUser('') : setUser(unameInput)
        localStorage.username = unameInput
    }

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Navbar</a>
            <div>
                {!userLogged && <>
                    <form>
                        <input id="username" onChange={handleChange} type="text" value={unameInput}></input>
                        <input id="password" type="password"></input>
                    </form>
                    </>}
                {userLogged}
                <button className="btn nav-item" onClick={handleSubmit}>{btnMessage}</button>
            </div>
        </nav>
    )
}