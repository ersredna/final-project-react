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
      charInput: '',
      connInputS: '',
      connInputT: '',
      characters: []
    }
  }


  componentDidMount() {
    this.getCharacters()
  }


  onChange = (e) => {
    const { id, value } = e.target

    this.setState(() => {
      switch (id) {
        case 'character-input':
          return { charInput: value }
        case 'connection-input-source':
          return { connInputS: value }
        case 'connection-input-target':
          return { connInputT: value }
        default:
          console.error("input error")
      }
    })
  }


  loginSubmit() {
    return
  }


  async getCharacters() {
    const characters = await fetch('http://localhost:5000/characters')
    .then(res => {
      return res.json()
    })
    .catch(err => console.error(err))

    this.setState({ characters })
  }


  addCharacter = () => {
    const name = this.state.charInput
    if (!name) {
      alert("Must provide character name")
      return
    }

    fetch('http://localhost:5000/add-character', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "name": name })
    })
    .then(res => res.json())
    .then(() => this.getCharacters())
    .catch(err => console.error(err))

    this.setState({ charInput: '' })
  }


  deleteCharacter = () => {
    const name = this.state.charInput
    if (!name) {
      alert("Must provide character name")
      return
    }

    fetch('http://localhost:5000/delete-character', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "name": name })
    })
    .then(res => res.json())
    .then(() => this.getCharacters())
    .catch(err => console.error(err))

    this.setState({ charInput: '' })
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
            <CharacterAddForm charInput={this.state.charInput} onChange={this.onChange} addCharacter={this.addCharacter} deleteCharacter={this.deleteCharacter} />
            <CharacterList characters={this.state.characters} />
          </div>
          <div className="character-div">
            <CharacterConnectionAddForm connInputS={this.state.connInputS} connInputT={this.state.connInputT} onChange={this.onChange} />
          </div>
        </div>
      </>
    );
  }
}