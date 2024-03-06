import React, { setState } from 'react'

import NavBar from './Components/NavBar'
import CharactersList from './Components/CharactersList'
import CharactersAlterForm from './Components/CharactersAlterForm'
import CharacterConnectionsAlterForm from './Components/CharacterConnectionsAlterForm'
import ConnectionsList from './Components/ConnectionsList'
import CsvInputForm from './Components/CsvInputForm'
import CsvExportForm from './Components/CsvExportForm'

import './App.css'

const ROUTE = 'http://one-piece-connections.s3-website-us-west-2.amazonaws.com/'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: '',
      isAdmin: false,
      charInput: '',
      connInputS: '',
      connInputT: '',
      characters: [],
      connections: [],
      importFile: []
    }
  }


  componentDidMount() {
    this.setState({ user: localStorage.user, isAdmin: localStorage.isAdmin })

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


  setUser = (user, isAdmin = false) => {
    this.setState({ user, isAdmin }, () => {
      localStorage.user = user
      localStorage.isAdmin = isAdmin
    })
  }


  async getCharacters() {
    const response = await fetch(ROUTE + 'characters')
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

    fetch(ROUTE + 'add-character', {
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
    .catch(err => console.error(err))

    this.setState({ charInput: '' })
  }


  deleteCharacter = () => {
    const name = this.state.charInput
    if (!name) {
      alert("Must provide character name")
      return
    }

    fetch(ROUTE + 'delete-character', {
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
    const response = await fetch(ROUTE + 'connections')
    .then(res => {
      return res.json()
    })
    .catch(err => console.error(err))

    this.setState({ connections: response.content })
  }


  addConnection = () => {
    const charNameS = this.state.connInputS
    const charNameT = this.state.connInputT

    if (!charNameS && !charNameT) alert("Must provide target and source names")
    else {
      if (!charNameS) alert("Must provide source name") 
      if (!charNameT) alert("Must provide target name")
    }
    if (!charNameS || !charNameT) return

    fetch(ROUTE + 'add-connection', {
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

    if (!charNameS && !charNameT) alert("Must provide target and source names")
    else {
      if (!charNameS) alert("Must provide source name") 
      if (!charNameT) alert("Must provide target name")
    }
    if (!charNameS || !charNameT) return

    fetch(ROUTE + 'delete-connection', {
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


  setFile = (e) => {
    this.setState({ importFile: e.target.files[0] })
  }


  handleUpload = () => {
    const data = new FormData()
    data.append('import-csv', this.state.importFile)
    
    fetch(ROUTE + 'import-csv', {
      method: 'POST',
      body: data
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) alert(data.error)
    })
    .then(() => this.getCharacters())
    .catch(err => console.error(err))

    document.getElementById('csv-file-input').value = ''
  }


  handleExport() {
    window.open(ROUTE + 'export-csv', '_blank').focus()
  }


  render() {
    let page = <></>
    if (this.state.user && this.state.isAdmin) {
      page = 
      <div className="content-div">
        <div className="form-div">
          <div className="header-div">
            <h3>Add or Remove Characters</h3>
          </div>
          <CharactersAlterForm charInput={this.state.charInput} onChange={this.onChange} addCharacter={this.addCharacter} deleteCharacter={this.deleteCharacter} />
          <CharactersList characters={this.state.characters} />
        </div>
        <div className="form-div">
          <div className="header-div">
            <h3>Add or Remove Connections</h3>
          </div>
          <CharacterConnectionsAlterForm connInputS={this.state.connInputS} connInputT={this.state.connInputT} onChange={this.onChange} addConnection={this.addConnection} deleteConnection={this.deleteConnection} />
          <ConnectionsList connInputS={this.state.connInputS} connInputT={this.state.connInputT} connections={this.state.connections} />
        </div>
        <div className="form-div">
          <div className="header-div">
            <h3>Import Characters as .csv</h3>
          </div>
          <CsvInputForm setFile={this.setFile} handleUpload={this.handleUpload} />
          <div className="header-div">
            <h3>Download connections as .csv</h3>
          </div>
          <CsvExportForm handleExport={this.handleExport} />
        </div>
      </div>
    }
    else if (this.state.user) {
      page =
      <div>
        Hello there. If you're part of the project, ask Rhys about an admin code.
      </div>
    }
    // if no user
    else {
      page =
      <div>
        This app is for a school project.
      </div>
    }


    return (
      <>
        <NavBar user={this.state.user} setUser={this.setUser} loginSubmit={this.state.loginSubmit} />
        {page}
      </>
    );
  }
}