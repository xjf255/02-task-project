import { DoneIcons, Trash } from "../Icons";
import { RefProp } from "../types";



export default function FooterModal({ formRef }: RefProp) {

  const submitTask = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (formRef.current) {
      const form = new FormData(formRef.current)
      const name = form.get("name")
      const description = form.get("task__description")
      const icon = form.get("icon")
      const status = form.get("status")
      console.log(name, description, ",", icon, status)
    }
  }

  return (
    <footer>
      <button className='btn--delete'>Delete <Trash /> </button>
      <button className='btn--submit' onClick={(event) => submitTask(event)}>Save <DoneIcons /> </button>
    </footer>
  )
}