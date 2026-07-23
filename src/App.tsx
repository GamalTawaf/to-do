import { useEffect, useState } from "react";
import NewToDoForm from "./components/NewToDoForm"
import ToDoList from "./components/ToDoList"
import { COLORS, ROTATIONS } from "./noteStyles"

function loadTodos(): ToDoObject[] {
  const localValue = localStorage.getItem("ITEMS");
  if (localValue == null) return [];
  try {
    const parsed = JSON.parse(localValue);
    if (!Array.isArray(parsed)) throw new Error("Stored todos are not an array");
    return parsed.map((item): ToDoObject => ({
      id: typeof item?.id === "string" ? item.id : crypto.randomUUID(),
      title: typeof item?.title === "string" ? item.title : "",
      completed: Boolean(item?.completed),
      colorIndex: Number.isInteger(item?.colorIndex) ? item.colorIndex : Math.floor(Math.random() * COLORS.length),
      rotationIndex: Number.isInteger(item?.rotationIndex) ? item.rotationIndex : Math.floor(Math.random() * ROTATIONS.length),
    }));
  } catch (error) {
    console.error("Couldn't read saved todos, starting with an empty board:", error);
    return [];
  }
}

export default function App() {
  const [todos, setTodos] = useState<ToDoObject[]>(loadTodos);

  useEffect(() =>{
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos])

  function addTodo(title: string) {
    setTodos((currentTodos: ToDoObject[])=> {
      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(),
          title: title,
          completed: false,
          colorIndex: Math.floor(Math.random() * COLORS.length),
          rotationIndex: Math.floor(Math.random() * ROTATIONS.length),
        },
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
      return currentTodos.filter(todo => todo.id !== id);
    });
  }
  const doneCount = todos.filter(todo => todo.completed).length;

  return(
   <div className="board">
    <div className="banner-wrap"><h1 className="banner">My Corkboard</h1></div>
    <NewToDoForm onSubmit={addTodo} />
    <p className="meta">
      <span>{todos.length} pinned</span>
      <span>{doneCount} done</span>
    </p>
    <ToDoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    <footer className="site-footer">
      <a href="https://github.com/GamalTawaf/to-do" target="_blank" rel="noreferrer">View source on GitHub</a>
    </footer>
  </div>
  )
}

