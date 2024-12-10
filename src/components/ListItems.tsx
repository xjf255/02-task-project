import { CLASSNAME_STATUS, STATUS } from "../const"
import { NewItem } from "../Icons"
import GetIcon from "./GetIcon"
import { useModalStore } from "../store/useModalStore"
import { Task } from "../types"
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchProject } from "../utils/useAPI"
import { useEffect, useState } from "react"


export default function ListItems() {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(0)
  const { addNewTask, updateTask } = useModalStore()
  const { data, isLoading, isError, isPlaceholderData } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchProject(page + 1),
    placeholderData: keepPreviousData,
    staleTime: 5000
  })

  useEffect(() => {
    if (!isPlaceholderData && data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ['projects', page + 1],
        queryFn: () => fetchProject(page + 1),
      })
    }
  }, [data, isPlaceholderData, page, queryClient])

  console.log(data)

  if (isError) <h4>Error al cargar items</h4>

  return (
    <ul>
      {isLoading && <span> Loading...</span>}
      {data && data.projects.map((task: Task) => {
        const type = task.status === STATUS[1] ? CLASSNAME_STATUS[1] : task.status === STATUS[0] ? CLASSNAME_STATUS[0] : task.status === null ? "" : CLASSNAME_STATUS[2]
        return (
          <li className={type} key={task.name} onClick={() => updateTask(task)}>
            <section>
              <figure className='item__icons'>
                <img src={task.icon} alt={task.name} />
              </figure>
              <div>
                <h3>{task.name}</h3>
                {task.description && <p>{task.description}</p>}
              </div>
            </section>
            <GetIcon state={type} />
          </li>
        )
      })}
      <li className='item item--new' onClick={addNewTask}>
        <section>
          <figure>
            <NewItem />
          </figure>
          <h3>Add new task</h3>
        </section>
      </li>
      <span className="pagination">
        {page !== 0 && <button
          className="btn__pagination"
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
        >
          last
        </button>}
        {data?.hasMore && <button
          className="btn__pagination"
          onClick={() => {
            setPage((old) => (data?.hasMore ? old + 1 : old))
          }}
        >
          Next Page
        </button>}
      </span>
    </ul >
  )
}