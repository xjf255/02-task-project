import { useId, useRef, useState } from 'react'
import './App.css'
import { Close, CloseModal, Done, DoneIcons, Edit, Logo, NewItem, Timer, Trash } from './Icons'
import data from './mock.json'
import { createPortal } from 'react-dom'
import { CLASSNAME_STATUS, DEFAULT_TASK, ICONS, STATUS } from './const'


interface Task {
  id?: string;
  name: string;
  description: string;
  icon: string;
  status: string | null;
}
interface ModalProps {
  isOpen: boolean,
  task?: Task
  closedModal: (arg: boolean) => void
}

function Modal({ isOpen, task, closedModal }: ModalProps) {
  const idInputURL = useId()
  const idInputHidden = useId()
  const formRef = useRef()

  document.addEventListener("keydown", e => {
    if (isOpen) {
      if (e.key === "Escape") closeModal()
    }
  })


  const handleClickIcons = (e) => {
    const $lastSelected = document.querySelectorAll(".icon--selected")
    if ($lastSelected) {
      $lastSelected.forEach(icon => icon.classList.remove("icon--selected"))
    }
    const $currentElement = e.target
    const $input = document.getElementById(idInputURL)
    $input.value = $currentElement.src
    $currentElement.classList.add("icon--selected")
  }

  const handleClickStatus = (e) => {
    const $lastSelected = document.querySelectorAll(".--selected")
    if ($lastSelected) {
      $lastSelected.forEach(icon => icon.classList.remove("--selected"))
    }
    e.target.classList.add("--selected")
    const $input = document.getElementById(idInputHidden)
    $input.value = e.target.textContent
  }

  const submitTask = (e) => {
    e.preventDefault()
    const form = new FormData(formRef.current)
    const name = form.get("name")
    const description = form.get("task__description")
    const icon = form.get("icon")
    const status = form.get("status")
    console.log(name, description, ",", icon, status)
  }

  const closeModal = () => {
    closedModal(false)
  }

  if (!isOpen) return
  return createPortal(
    <div className='dark' onClick={closeModal} >
      <div className="task--new" onClick={(e) => e.stopPropagation()}>
        <header className='modal__title'>
          <h2>Tasks details</h2>
          <figure className='title__close' onClick={closeModal}>
            <CloseModal />
          </figure>
        </header>
        <form className='taks__modal' ref={formRef}>
          <label className='modal__name'>
            Task name
            <input type="text" placeholder='Enter a title' name='name' defaultValue={task?.name} autoComplete='prueba'/>
          </label>
          <label>
            Description
            <textarea name="task__description" placeholder='Enter a short description' defaultValue={task?.description}></textarea>
          </label>
          <label>
            Icon
          </label>
          <input type="text" hidden id={idInputURL} name='icon' defaultValue={task?.icon} />
          <div className="modal__icons" >
            {Object.entries(ICONS).map(icon => {
              const style = icon[1] === task?.icon ? "icon--selected" : ''
              return (
                <figure className="icons__task" key={icon[0]} onClick={(e) => handleClickIcons(e)}>
                  <img src={icon[1]} alt={icon[0]} className={style} />
                </figure>
              )
            })}
          </div>
          <label>
            Status
          </label>
          <section className='modal__status'>
            <input type="text" name="status" hidden id={idInputHidden} defaultValue={task?.status || undefined} />
            {STATUS.map(state => {
              const type = state === STATUS[1] ? CLASSNAME_STATUS[1] : state === STATUS[0] ? CLASSNAME_STATUS[0] : state === null ? "" : CLASSNAME_STATUS[2]
              const style = `${type} ${task?.status === state ? "--selected" : ''}`
              return (
                <div key={state} className='status__field' onClick={(e) => handleClickStatus(e)}>
                  <span className={style}>
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
          <button className='btn--delete'>Delete <Trash /> </button>
          <button className='btn--submit' onClick={(e) => submitTask(e)}>Save <DoneIcons /> </button>
        </footer>
      </div>
    </div>, document.body
  )
}

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
              <li className={type} key={el.name} onClick={() => updateTask(el)}>
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
        <Modal isOpen={modalState} task={task} closedModal={setModalState} />
      </main>
    </>
  )
}

export default App
