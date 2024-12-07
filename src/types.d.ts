export interface Task {
  id?: string;
  name: string;
  description: string | null;
  icon: string;
  status: string | null;
}
export interface Store {
  modalState: boolean,
  task?: Task
  changeModalState: () => void
  updateTask: (newTask: Task) => void
  addNewTask: () => void
  closeModal: () => void
}

export interface RefProp {
  formRef: React.RefObject<HTMLFormElement>,
}