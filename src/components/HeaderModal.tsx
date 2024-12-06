import { CloseModal } from "../Icons";

interface Props {
  closeModal: () => void
}

export default function HeaderModal({ closeModal }: Props) {
  return (
    <header className='modal__title'>
      <h2>Tasks details</h2>
      <figure className='title__close' onClick={closeModal}>
        <CloseModal />
      </figure>
    </header>
  )
}