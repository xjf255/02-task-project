export interface Task {
  id?: string;
  name: string;
  description: string;
  icon: string;
  status: string | null;
}

export interface ModalProps {
  isOpen: boolean,
  task?: Task
  closedModal: (arg: boolean) => void
}

export interface PropsListItems {
  handleAddTask: () => void,
  updateTask: (el) => void
}