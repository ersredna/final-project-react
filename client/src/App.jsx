import React, { setState } from 'react'
import NavBar from './Components/NavBar'
import CharactersList from './Components/CharactersList'
import CharactersAlterForm from './Components/CharactersAlterForm'
import CharacterConnectionsAlterForm from './Components/CharacterConnectionsAlterForm'
import ConnectionsList from './Components/ConnectionsList'
import CsvInputForm from './Components/CsvInputForm'

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
    this.getConnections()
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
    const response = await fetch('http://localhost:5000/characters')
    .then(res => {
      return res.json()
    })
    .catch(err => console.error(err))

    this.setState({ characters: response.content })
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
    .then(data => {
      if (data.error) alert(data.error)
    })
    .then(() => this.getCharacters())
    .then(() => this.getConnections())
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
    .then(data => {
      if (data.error) alert(data.error)
    })
    .then(() => this.getCharacters())
    .then(() => this.getConnections())
    .catch(err => console.error(err))

    this.setState({ charInput: '' })
  }


  async getConnections() {
    const response = await fetch('http://localhost:5000/connections')
    .then(res => {
      return res.json()
    })
    .catch(err => console.error(err))

    this.setState({ connections: response.content })
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
    .then(data => {
      if (data.error) alert(data.error)
    })
    .then(() => this.getConnections())
    .catch(err => console.error(err))

    this.setState({ connInputT: '' })
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
    .then(data => {
      if (data.error) alert(data.error)
    })
    .then(() => this.getConnections())
    .catch(err => console.error(err))

    this.setState({ connInputT: '' })
  }


  render() {
    return (
      <>
        <NavBar user={this.state.user} loginSubmit={this.state.loginSubmit} />
        <div className="content-div">
          <div className="form-div">
            <CharactersAlterForm charInput={this.state.charInput} onChange={this.onChange} addCharacter={this.addCharacter} deleteCharacter={this.deleteCharacter} />
            <CharactersList characters={this.state.characters} />
          </div>
          <div className="form-div">
            <CharacterConnectionsAlterForm connInputS={this.state.connInputS} connInputT={this.state.connInputT} onChange={this.onChange} addConnection={this.addConnection} deleteConnection={this.deleteConnection} />
            <ConnectionsList connInputS={this.state.connInputS} connInputT={this.state.connInputT} connections={this.state.connections} />
          </div>
          <div className="form-div">
            <CsvInputForm />
          </div>
          <button className="btn">test</button>
        </div>
      </>
    );
  }
}