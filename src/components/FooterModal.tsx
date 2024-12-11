import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DoneIcons, Trash } from "../Icons";
import { useModalStore } from "../store/useModalStore";
import { APIModel, RefProp, Task } from "../types";
import { usePageStore } from "../store/usePageStore";
import { createTask, removeTask, updateTask } from "../utils/useAPI";

export default function FooterModal({ formRef }: RefProp) {
  const { task, closeModal } = useModalStore()
  const { page } = usePageStore()
  const queryClient = useQueryClient()

  const updateTaskMutation = useMutation({
    //solomante acepta un param
    mutationFn: ({ id, updatedTask }: { id: string, updatedTask: Partial<Task> }) => updateTask(id, updatedTask),
    onMutate: async ({ id, updatedTask }: { id: string, updatedTask: Partial<Task> }) => {
      //cancela consultas pendientes
      await queryClient.cancelQueries({ queryKey: ["tasks", page] })
      //obtiene el estado previo
      const previousTasks = queryClient.getQueryData(["tasks"])
      //actualizacion optimista
      queryClient.setQueryData(["tasks"], (oldTasks: APIModel | undefined) => {
        if (!oldTasks) return undefined;

        return {
          ...oldTasks,
          projects: oldTasks.projects.map((oldTask) =>
            oldTask.id === id ? { ...oldTask, ...updatedTask } : oldTask
          ),
        };
      });
      return { previousTasks }
    },
    onError: (_error, _taskId, context) => {
      queryClient.setQueryData(["tasks"], context?.previousTasks)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", page] });
    }
  })

  const createTaskMutation = useMutation({
    mutationFn: async (newTask: Task) => await createTask(newTask),
    onMutate: async (task) => {
      await queryClient.cancelQueries({ queryKey: ["tasks", page] })
      const previousTasks = queryClient.getQueryData(["tasks"])

      queryClient.setQueryData(["tasks", 0], (oldTasks: APIModel) => {
        console.log(oldTasks)
        return {
          ...oldTasks,
          projects: [
            ...oldTasks.projects,
            task
          ]
        }
      })

      return { previousTasks }
    },
    onError: (error, _taskId, context) => {
      console.log(error)
      queryClient.setQueryData(["tasks"], context?.previousTasks)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", page] });
    }
  })

  const removeTaskMutation = useMutation({
    mutationFn: (taskId: string) => removeTask(taskId),
    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey: ["tasks", page] });
      const previousTasks = queryClient.getQueryData<APIModel>(["tasks"]);

      queryClient.setQueryData<APIModel>(["tasks"], (oldTasks) => {
        if (!oldTasks) return oldTasks;
        return {
          ...oldTasks,
          projects: oldTasks.projects.filter((task) => task.id !== taskId),
        };
      });

      return { previousTasks }
    },
    onError: (_error, _taskId, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", page] });
    },
  });


  const submitTask = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (formRef.current) {
      const form = new FormData(formRef.current);
      const name = form.get("name") as string;
      const description = form.get("task__description") as string;
      const icon = form.get("icon") as string;
      const status = form.get("status") as string;

      if (!name || !icon || !status) {
        alert("Todos los campos obligatorios deben estar llenos.");
        return;
      }

      if (task?.id) {
        updateTaskMutation.mutate({ id: task.id, updatedTask: { name, description, icon, status } });
      } else {
        createTaskMutation.mutate({ name, description, icon, status });
      }
    }
    closeModal();
  };


  const handleRemoveTask = () => {
    if (task?.id) removeTaskMutation.mutate(task.id)
    closeModal()
  }

  return (
    <footer>
      {task?.id && <button className='btn--delete' onClick={handleRemoveTask}>Delete <Trash /> </button>}
      <button className='btn--submit' onClick={(event) => submitTask(event)}>Save <DoneIcons /> </button>
    </footer>
  )
}