import { create } from 'zustand'
import { Store } from '../types'

export const useModalStore = create<Store>()((set) => ({
  modalState: false,
  changeModalState: () => set((state) => ({ modalState: !state.modalState })),
  task: undefined,
  updateTask: (newTask) => set(() => ({ task: newTask, modalState: true })),
  addNewTask: () => set(() => ({ modalState: true, task: undefined })),
  closeModal: () => set(() => ({ modalState: false }))
}))