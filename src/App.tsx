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
    <a
      className="github-corner-link"
      href="https://github.com/GamalTawaf/to-do"
      target="_blank"
      rel="noreferrer"
      aria-label="View source on GitHub"
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A10.51 10.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
      </svg>
    </a>
  </div>
  )
}

