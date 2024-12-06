import { DoneIcons, Trash } from "../Icons";

interface Props {
  submitTask: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function FooterModal({ submitTask }: Props) {
  return (
    <footer>
      <button className='btn--delete'>Delete <Trash /> </button>
      <button className='btn--submit' onClick={(event) => submitTask(event)}>Save <DoneIcons /> </button>
    </footer>
  )
}