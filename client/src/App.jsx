import React, { setState } from 'react'
import { NavBar } from './Components/NavBar'
import { TestComponent } from './Components/TestComponent'

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

  render() {
    return (
      <>
        <NavBar user={this.state.user} loginSubmit={this.state.loginSubmit} />
        <div>
          <TestComponent />
          {/* <CharacterList />
          <CharacterAddForm />
          <CharacterDeleteForm />
          <CharacterConnectionAddForm />
          <CharacterConnectionDeleteForm /> */}
        </div>
      </>
    );
  }
}