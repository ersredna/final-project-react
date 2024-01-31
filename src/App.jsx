import { useState } from 'react'
import { NavBar } from './Components/NavBar'

export default function App() {
  const [user, setUser] = useState('')

  return (
    <>
      <NavBar user={user} setUser={setUser}/>
      {/* <CharacterList />
      <CharacterAddForm />
      <CharacterDeleteForm />
      <CharacterConnectionAddForm />
      <CharacterConnectionDeleteForm /> */}
    </>
  );
}