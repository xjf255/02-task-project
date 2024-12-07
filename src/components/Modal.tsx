import { useRef } from 'react'
import { createPortal } from 'react-dom'
import FooterModal from './FooterModal'
import HeaderModal from './HeaderModal'
import BodyModal from './BodyModal'
import { useModalStore } from '../store/useModalStore'

export function Modal() {
  const formRef = useRef<HTMLFormElement>(null)
  const { modalState: isOpen, closeModal } = useModalStore()

  document.addEventListener("keydown", e => {
    if (isOpen) {
      if (e.key === "Escape") closeModal()
    }
  })

  if (!isOpen) return
  return createPortal(
    <div className='dark' onClick={closeModal} >
      <div className="task--new" onClick={(event) => event.stopPropagation()}>
        <HeaderModal />
        <BodyModal formRef={formRef} />
        <FooterModal formRef={formRef} />
      </div>
    </div>, document.body
  )
}