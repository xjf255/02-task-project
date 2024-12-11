import { APIModel, Task } from "../types"
 
export const fetchProject = async ( page = 1,): Promise<APIModel> => {
  const API = import.meta.env.VITE_API_TASKS
  const response = await fetch(`${API}?page=${page}`)
  return await response.json()
}

export const updateTask = async (id: string, updatedTask: Partial<Task>) => {
  const API = import.meta.env.VITE_API_TASKS
  try {
    const response = await fetch(`${API}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updatedTask })
    })

    if (!response.ok) throw new Error("Failed to update task")
  } catch (error) {
    console.error("Error updating task:", error)
  }
}

export const createTask = async (newTask: Task) => {
  const API = import.meta.env.VITE_API_TASKS
  try {

    const taskToSend = {
      ...newTask,
      description: newTask.description === '' ? null : newTask.description,
    };
    const response = await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskToSend)
    })
    if (!response.ok) {
      throw new Error("Task created successfully!")
    }
  } catch (error) {
    console.error("Error to create task:", error)
  }
}

export const removeTask = async (id: string) => {
  const API = import.meta.env.VITE_API_TASKS
  try {
    const response = await fetch(`${API}/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error("Error eliminando la tarea")
  } catch (error) {
    console.error("Error task:", error)
  }
}