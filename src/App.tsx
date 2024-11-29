import { useState } from 'react'
import reactLogo from './assets/books.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <img src="data:image/png;base64,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" alt="" />
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
