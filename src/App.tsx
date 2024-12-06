import { useState } from 'react'
import './App.css'
import { Task } from './types'
import { Modal } from './components/Modal'
import Header from './components/Header'
import ListItems from './components/ListItems'

function App() {
  const [modalState, setModalState] = useState<boolean>(false)
  const [task, setTask] = useState<Task>()

  const handleAddTask = () => {
    setModalState(prev => !prev)
    setTask(undefined)
  }

  const updateTask: (task: Task) => void = (task) => {
    setTask(task)
    setModalState(true)
  }

  return (
    <>
      <Header />
      <main>
        <ListItems updateTask={updateTask} handleAddTask={handleAddTask} />
        <Modal isOpen={modalState} task={task} closedModal={setModalState} />
      </main>
    </>
  )
}

export default App
