/// <reference types="vite/client" />

interface ToDoObject {
    id: string,
    title: string,
    completed: boolean
}

interface ToDoProps {
  id: string,
  title: string,
  completed: boolean,
  toggleTodo: (id: string, checked: boolean) => void,
  deleteTodo: (id: string) => void
}

interface ToDoListProps {
  todos: ToDoObject[],
  toggleTodo: (id: string, checked: boolean) => void,
  deleteTodo: (id: string) => void
}
interface NewToDoFormProps {
  onSubmit: (item: string) => void
}