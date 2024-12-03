import { useState } from 'react'
import './App.css'
import { Close, Done, Edit, Logo, NewItem, Timer } from './Icons'
import data from './mock.json'
import { createPortal } from 'react-dom'

interface ModalProps {
  isOpen: boolean
}

function Modal({ isOpen }: ModalProps) {
  if (!isOpen) return
  return createPortal(
    <div>
      este es mi modal
    </div>, document.body
  )
}

function App() {
  const [modalState, setModalState] = useState<boolean>(false)

  const handleAddTask = () => {
    setModalState(prev => !prev)
  }
  return (
    <>
      <header>
        <figure id='logo'>
          <Logo />
        </figure>
        <div className="title">
          <h1 contentEditable>My Task Board</h1>
          <p>Tasks to keep organised</p>
        </div>
        <figure id='editable'>
          <Edit />
        </figure>
      </header>
      <main>
        <ul>
          {data.map(el => {
            const type = el.status === "Completed" ? "completed" : el.status === "In Progress" ? "progress" : el.status === null ? "" : "wont"
            return (
              <li className={type} key={el.name}>
                <section>
                  <figure className='item__icons'>
                    <img src={el.icon} alt="aqui va una img" />
                  </figure>
                  <div>
                    <h3>{el.name}</h3>
                    {el.description && <p>{el.description}</p>}
                  </div>
                </section>
                <figure className='item__status'>
                  {type === "completed" && <Timer />}
                  {type === "progress" && <Done />}
                  {type === "wont" && <Close />}
                </figure>
              </li>
            )
          })}
          <li className='item item--new' onClick={handleAddTask}>
            <section>
              <figure>
                <NewItem />
              </figure>
              <h3>Add new task</h3>
            </section>
          </li>
        </ul>
        <Modal isOpen={modalState} />
      </main>
    </>
  )
}

export default App
