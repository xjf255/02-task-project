import { create } from 'zustand'
import { StoreModal } from '../types'

export const useModalStore = create<StoreModal>()((set) => ({
  modalState: false,
  changeModalState: () => set((state) => ({ modalState: !state.modalState })),
  task: undefined,
  updateTask: (newTask) => set(() => ({ task: newTask, modalState: true })),
  addNewTask: () => set(() => ({ modalState: true, task: undefined })),
  closeModal: () => set(() => ({ modalState: false }))
}))