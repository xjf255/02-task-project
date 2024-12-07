import { CLASSNAME_STATUS, STATUS } from "../const"
import { NewItem } from "../Icons"
// import data from '../mock.json'
import GetIcon from "./GetIcon"
import { useModalStore } from "../store/useModalStore"
import useFetchAPI from "../Hooks/useAPI"


export default function ListItems() {
  const { addNewTask, updateTask } = useModalStore()
  const { data, isError, isLoading } = useFetchAPI({ key: "Tasks", api: "https://zero2-task-api.onrender.com/tasks" })
  if (isError) return (
    <>
      <h4>Error al cargar items</h4>
    </>
  )
  return (
    <ul>
      {isLoading !== false && <p>loading...</p>}
      {data && data.map(task => {
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
    </ul>
  )
}