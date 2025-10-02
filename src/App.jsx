import { useState } from 'react'
import './App.css'
import Temp from './Components/Temp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Temp/>
    </>
  )
}

export default App
