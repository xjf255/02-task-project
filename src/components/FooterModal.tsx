import { DoneIcons, Trash } from "../Icons";
import { useModalStore } from "../store/useModalStore";
import { RefProp } from "../types";

export default function FooterModal({ formRef }: RefProp) {
  const { task } = useModalStore()

  const submitTask = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (formRef.current) {
      const form = new FormData(formRef.current)
      const name = form.get("name")
      const description = form.get("task__description")
      const icon = form.get("icon")
      const status = form.get("status")

      console.log({
        name,
        description,
        icon,
        status
      })

      if (task?.id) {
        const API = import.meta.env.VITE_API_TASKS
        try {
          const response = await fetch(`${API}/${task.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name,
              description,
              icon,
              status
            })
          })

          if (response.ok) {
            console.log("Task updated successfully!")
          } else {
            alert("Failed to update task")
          }
        } catch (error) {
          console.error("Error updating task:", error)
        }
        return
      }

      const API = import.meta.env.VITE_API_TASKS
      try {
        const response = await fetch(API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            description: description === '' ? null : description,
            icon,
            status
          })
        })
        console.log(response)
        if (response.ok) {
          console.log("Task created successfully!")
        } else {
          console.error("Failed to create task")
        }
      } catch (error) {
        console.error("Error task:", error)
      }
    }
  }

  const removeTask = async () => {
    if (task?.id) {
      const API = import.meta.env.VITE_API_TASKS
      try {
        const response = await fetch(`${API}/${task.id}`, {
          method: 'DELETE'
        })
        console.log(response)
        if (response.ok) {
          console.log("Task deleted successfully!")
        } else {
          console.error("Failed to delete task")
        }
      } catch (error) {
        console.error("Error task:", error)
      }
    }
  }

  return (
    <footer>
      {task?.id && <button className='btn--delete' onClick={removeTask}>Delete <Trash /> </button>}
      <button className='btn--submit' onClick={(event) => submitTask(event)}>Save <DoneIcons /> </button>
    </footer>
  )
}