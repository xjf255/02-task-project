import { useId, useState } from 'react'
import './App.css'
import { Close, CloseModal, Done, DoneIcons, Edit, Logo, NewItem, Timer, Trash } from './Icons'
import data from './mock.json'
import { createPortal } from 'react-dom'
import { CLASSNAME_STATUS, ICONS, STATUS } from './const'

interface ModalProps {
  isOpen: boolean
}

function Modal({ isOpen }: ModalProps) {
  const idInputURL = useId()

  const handleClickIcons = (e) => {
    const $lastSelected = document.querySelectorAll(".icon--selected")
    if ($lastSelected) {
      $lastSelected.forEach(icon => icon.classList.remove("icon--selected"))
    }
    const $currentElement = e.target
    const $input = document.getElementById(idInputURL)
    $input.textContent = $currentElement.src
    $currentElement.classList.add("icon--selected")
  }

  const handleCLickStatus = (e) => {
    const $lastSelected = document.querySelectorAll(".--selected")
    if ($lastSelected) {
      $lastSelected.forEach(icon => icon.classList.remove("--selected"))
    }
    e.target.classList.add("--selected")
  }

  const closeModal = () => {
    isOpen = false
  }

  if (!isOpen) return
  return createPortal(
    <div className='dark'>
      <div className="task--new">
        <header className='modal__title'>
          <h2>Tasks details</h2>
          <figure className='title__close' onClick={closeModal}>
            <CloseModal />
          </figure>
        </header>
        <form className='taks__modal'>
          <label className='modal__name'>
            Task name
            <input type="text" placeholder='Enter a title' />
          </label>
          <label>
            Description
            <textarea name="task__description" placeholder='Enter a short description'></textarea>
          </label>
          <label>
            Icon
          </label>
          <div className="modal__icons" >
            <input type="url" hidden id={idInputURL} />
            {Object.entries(ICONS).map(icon => {
              return (
                <figure className="icons__task" key={icon[0]} onClick={(e) => handleClickIcons(e)}>
                  <img src={icon[1]} alt={icon[0]} />
                </figure>
              )
            })}
          </div>
          <label>
            Status
          </label>
          <section className='modal__status'>
            <input type="hidden" name="status" value={CLASSNAME_STATUS[0]} />
            {STATUS.map(state => {
              const type = state === STATUS[1] ? CLASSNAME_STATUS[1] : state === STATUS[0] ? CLASSNAME_STATUS[0] : state === null ? "" : CLASSNAME_STATUS[2]
              return (
                <div key={state} className='status__field' onClick={(e) => handleCLickStatus(e)}>
                  <span className={type}>
                    <figure className="item__status ">
                      {state === STATUS[0] && <Timer />}
                      {state === STATUS[1] && <Done />}
                      {state === STATUS[2] && <Close />}
                    </figure>
                    <p>{state}</p>
                    <figure className='check'>
                      <DoneIcons />
                    </figure>
                  </span>
                </div>
              )
            })}
          </section>
        </form>

        <footer>
          <button className='btn--delete' type="submit">Delete <Trash /> </button>
          <button className='btn--submit' type="submit">Save <DoneIcons /> </button>
        </footer>
      </div>
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
          <h1 contentEditable suppressContentEditableWarning={true}>My Task Board</h1>
          <p>Tasks to keep organised</p>
        </div>
        <figure id='editable'>
          <Edit />
        </figure>
      </header>
      <main>
        <ul>
          {data.map(el => {
            const type = el.status === STATUS[1] ? CLASSNAME_STATUS[1] : el.status === STATUS[0] ? CLASSNAME_STATUS[0] : el.status === null ? "" : CLASSNAME_STATUS[2]
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
                  {type === "completed" && <Done />}
                  {type === "progress" && <Timer />}
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
