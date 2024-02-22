import React, { setState } from 'react'
import NavBar from './Components/NavBar'
import CharacterList from './Components/CharacterList'
import CharactersAlterForm from './Components/CharactersAlterForm'
import CharacterConnectionsAlterForm from './Components/CharacterConnectionsAlterForm'


import './App.css'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: '',
      charInput: '',
      connInputS: '',
      connInputT: '',
      characters: [],
      connections: []
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
      body: JSON.stringify({ name })
    })
    .then(res => res.json())
    .then(data => console.log(data))
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
      body: JSON.stringify({ name })
    })
    .then(res => res.json())
    .then(() => this.getCharacters())
    .catch(err => console.error(err))

    this.setState({ charInput: '' })
  }


  async getConnections() {
    const connections = await fetch('http://localhost:5000/connections')
    .then(res => {
      return res.json()
    })
    .catch(err => console.error(err))

    console.log(connections) // FIXME: database only gets target of connections

    // this.setState({ connections })
  }


  addConnection = () => {
    const charNameS = this.state.connInputS
    const charNameT = this.state.connInputT

    if (!charNameS) alert("Must provide source name") 
    if (!charNameT) alert("Must provide target name")
    if (!charNameS || !charNameT) return

    fetch('http://localhost:5000/add-connection', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ charNameS, charNameT })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err))
  }


  deleteConnection = () => {
    const charNameS = this.state.connInputS
    const charNameT = this.state.connInputT

    if (!charNameS) alert("Must provide source name") 
    if (!charNameT) alert("Must provide target name")
    if (!charNameS || !charNameT) return

    fetch('http://localhost:5000/delete-connection', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ charNameS, charNameT })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err))
  }


  render() {
    return (
      <>
        <NavBar user={this.state.user} loginSubmit={this.state.loginSubmit} />
        <div className="content-div">
          <div className="character-div">
            <CharactersAlterForm charInput={this.state.charInput} onChange={this.onChange} addCharacter={this.addCharacter} deleteCharacter={this.deleteCharacter} />
            <CharacterList characters={this.state.characters} />
          </div>
          <div className="character-div">
            <CharacterConnectionsAlterForm connInputS={this.state.connInputS} connInputT={this.state.connInputT} onChange={this.onChange} addConnection={this.addConnection} deleteConnection={this.deleteConnection} />
          </div>
          <button className="btn" onClick={this.getConnections}>test</button>
        </div>
      </>
    );
  }
}