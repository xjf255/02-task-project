import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { ModalProps } from '../types'
import FooterModal from './FooterModal'
import HeaderModal from './HeaderModal'
import BodyModal from './BodyModal'

export function Modal({ isOpen, task, closedModal }: ModalProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const closeModal = () => {
    closedModal(false)
  }

  document.addEventListener("keydown", e => {
    if (isOpen) {
      if (e.key === "Escape") closeModal()
    }
  })

  const submitTask = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const form = new FormData(formRef.current)
    const name = form.get("name")
    const description = form.get("task__description")
    const icon = form.get("icon")
    const status = form.get("status")
    console.log(name, description, ",", icon, status)
  }

  if (!isOpen) return
  return createPortal(
    <div className='dark' onClick={closeModal} >
      <div className="task--new" onClick={(event) => event.stopPropagation()}>
        <HeaderModal closeModal={closeModal} />
        <BodyModal formRef={formRef} task={task} />
        <FooterModal submitTask={submitTask} />
      </div>
    </div>, document.body
  )
}