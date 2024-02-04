import { useState } from 'react'
import { NavBar } from './Components/NavBar'
import { TestComponent } from './Components/TestComponent'

export default function App() {
  const [user, setUser] = useState('')

  return (
    <>
      <NavBar user={user} setUser={setUser}/>
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