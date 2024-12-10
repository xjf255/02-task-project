import { Task } from "../types"
 
export const fetchProject = async ( page = 1,): Promise<{
  projects: Array<Task>
  hasMore: boolean
}> => {
  const API = import.meta.env.VITE_API_TASKS
  const response = await fetch(`${API}?page=${page}`)
  return await response.json()
}
