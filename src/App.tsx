import { useEffect, useState } from "react";
import NewToDoForm from "./components/NewToDoForm"
import ToDoList from "./components/ToDoList"


export default function App() {
  const [todos, setTodos] = useState<ToDoObject[]>(() => {
    const localValue = localStorage.getItem("ITEMS");
    if(localValue == null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() =>{
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos])

  function addTodo(title: string) {
    setTodos((currentTodos: ToDoObject[])=> {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: title, completed: false },
  
      ];
    });
  }
  function toggleTodo(id: string, completed: boolean) {
    setTodos((currentTodos: ToDoObject[]) => {
      return currentTodos.map(todo  => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }
  function deleteTodo(id: string) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id != id);
    });
  }
  return(
   <>
    <NewToDoForm onSubmit={addTodo} />
    <h1>Todo List {todos.length}</h1>
    <ToDoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
  </>
  )
}

