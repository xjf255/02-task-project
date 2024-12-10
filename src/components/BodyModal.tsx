import { useId } from "react"
import { CLASSNAME_STATUS, ICONS, STATUS } from "../const"
import { DoneIcons } from "../Icons"
import GetIcon from "./GetIcon"
import { useModalStore } from "../store/useModalStore"
import { RefProp } from "../types"

export default function BodyModal({ formRef }: RefProp) {
  const idInputURL = useId()
  const idInputHidden = useId()
  const { task } = useModalStore()

  const handleClickIcons = (event: React.MouseEvent<HTMLElement>) => {
    const $lastSelected = document.querySelectorAll(".icon--selected")
    $lastSelected.forEach(icon => icon.classList.remove("icon--selected"))
    const $currentElement = event.currentTarget as HTMLImageElement
    const $input = document.getElementById(idInputURL) as HTMLInputElement
    $input.value = $currentElement?.src
    $currentElement.classList.add("icon--selected")
  }

  const handleClickStatus = (event: React.MouseEvent<HTMLDivElement>) => {
    const $lastSelected = document.querySelectorAll(".--selected")
    $lastSelected.forEach(icon => icon.classList.remove("--selected"))
    event.currentTarget.classList.add("--selected")
    const $input = document.getElementById(idInputHidden) as HTMLInputElement
    $input.value = event.currentTarget.textContent || ''
  }

  return (
    <form className='taks__modal' ref={formRef}>
      <label className='modal__name'>Task name
        <input type="text" placeholder='Enter a title' name='name' defaultValue={task?.name} autoComplete='prueba' />
      </label>
      <label>Description
        <textarea name="task__description" placeholder='Enter a short description' defaultValue={task?.description || ""}></textarea>
      </label>
      <label htmlFor={idInputURL} >Icon</label>
      <input type="text" hidden id={idInputURL} name='icon' defaultValue={task?.icon} />
      <div className="modal__icons" >
        {Object.entries(ICONS).map(icon =>
          <figure className="icons__task" key={icon[0]} >
            <img src={icon[1]} alt={icon[0]} className={icon[1] === task?.icon ? "icon--selected" : ''} onClick={(event: React.MouseEvent<HTMLElement>) => handleClickIcons(event)} />
          </figure>
        )}
      </div>
      <label htmlFor={idInputHidden}>Status</label>
      <section className='modal__status'>
        <input type="text" name="status" hidden id={idInputHidden} defaultValue={task?.status || undefined} />
        {STATUS.map(state => {
          const type = state === STATUS[1] ? CLASSNAME_STATUS[1] : state === STATUS[0] ? CLASSNAME_STATUS[0] : state === null ? "" : CLASSNAME_STATUS[2]
          return (
            <div key={state} className='status__field'>
              <span className={`${type} ${task?.status === state ? "--selected" : ''}`} onClick={(event: React.MouseEvent<HTMLDivElement>) => handleClickStatus(event)}>
                <GetIcon state={type} />
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
  )
}