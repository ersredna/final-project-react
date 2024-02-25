import './NavBar.css'

export default function NavBar({ user }) {
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

    let submitType = 'login'
    function loginUser(e) {                // currently working here              move this function to app.jsx
        e.preventDefault()
        console.log(submitType)

        if (!e.target.username.value && !e.target.password.value) alert("Must provide username and password")
        else {
            if (!e.target.username.value) alert("Must provide username") 
            if (!e.target.password.value) alert("Must provide password")
        }
        if (!e.target.username.value || !e.target.password.value) return

        if (submitType === 'register') {
            fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: e.target.username.value, password: e.target.password.value, adminCode: e.target.adminCode.value })
            })
            .then(res => res.json())
            .then(data => {
                if (data.error) alert(data.error)
            })
            .catch(err => console.error(err))
        }
        else if (submitType === 'login') {                    // finish login path
            fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: e.target.username.value, password: e.target.password.value })
            })
            .then(res => res.json())
            .then(data => {
                if (data.error) alert(data.error)
            })
            .catch(err => console.error(err))
        }
        else return
        
        // localStorage.user = user ? user : ''
    }


    function changeSubmitType(e) {
        submitType = e.target.name
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">One Piece Connections</a>
            <form className="login-form nav-item" id="login-form" onSubmit={loginUser}>
                {!user && 
                    <>
                        <button className="btn d-inline-block login-btn" name='register' id='register-btn' onClick={changeSubmitType}>Register</button>
                        <input className="d-inline-block form-control admin-code-input" id="adminCode" placeholder="Admin Code" type="password"></input>
                        <div className="login-input-wrapper">
                            <input className="d-inline-block form-control login-input" id="username" placeholder="Username" type="text"></input>
                            <input className="d-inline-block form-control login-input" id="password" placeholder="Password" type="password"></input>
                        </div>
                    </>
                }
                {userLogged}
                <button className="btn d-inline-block login-btn" name='login' id='login-btn' onClick={changeSubmitType}>{btnMessage}</button>
            </form>
        </nav>
    )
}