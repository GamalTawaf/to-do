
import ToDoItem from "./ToDoItem"

export default function ToDoList({ todos , toggleTodo, deleteTodo}: ToDoListProps) {
    return (
      <ul className="list">
      {todos.length === 0 && "No Todos" }
      {todos.map(todo => {
        return (
            <ToDoItem {...todo} key={todo.id} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
        )
      })}
    </ul>
    );
}