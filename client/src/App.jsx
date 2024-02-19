import React, { setState } from 'react'
import NavBar from './Components/NavBar'
import CharacterList from './Components/CharacterList'
import CharacterAddForm from './Components/CharacterAddForm'
import CharacterConnectionAddForm from './Components/CharacterConnectionAddForm'


import './App.css'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: '',
    }
  }

  loginSubmit() {
    return
  }

  addCharacter() {
    return
  }

  deleteCharacter() {
    return
  }

  addConnection() {
    return
  }

  deleteConnection() {
    return
  }

  render() {
    return (
      <>
        <NavBar user={this.state.user} loginSubmit={this.state.loginSubmit} />
        <div className="content-div">
          <div className="character-div">
            <CharacterAddForm />
            <CharacterList />
          </div>
          <div className="character-div">
            <CharacterConnectionAddForm />
          </div>
        </div>
      </>
    );
  }
}