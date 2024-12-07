import { CloseModal } from "../Icons";
import { useModalStore } from "../store/useModalStore";

export default function HeaderModal() {
  const { closeModal } = useModalStore()
  return (
    <header className='modal__title'>
      <h2>Tasks details</h2>
      <figure className='title__close' onClick={closeModal}>
        <CloseModal />
      </figure>
    </header>
  )
}