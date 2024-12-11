export interface Task {
  id?: string;
  name: string;
  description: string | null;
  icon: string;
  status: string | null;
}
export interface StoreModal {
  modalState: boolean,
  task?: Task
  changeModalState: () => void
  updateTask: (newTask: Task) => void
  addNewTask: () => void
  closeModal: () => void
}

export interface StorePage {
  page: number,
  changeNextPage: () => void,
  changeLastPage: () => void
}

export interface RefProp {
  formRef: React.RefObject<HTMLFormElement>,
}

export interface APIModel {
  projects: Array<Task>
  hasMore: boolean
}