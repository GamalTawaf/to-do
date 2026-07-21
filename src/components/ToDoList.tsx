
import ToDoItem from "./ToDoItem"

export default function ToDoList({ todos , toggleTodo, deleteTodo}: ToDoListProps) {
    if (todos.length === 0) {
      return <p className="empty">Board's empty. Pin something.</p>;
    }
    const orderedTodos = [...todos].sort((a, b) => Number(a.completed) - Number(b.completed));
    return (
      <ul className="list">
      {orderedTodos.map(todo => {
        return (
            <ToDoItem {...todo} key={todo.id} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
        )
      })}
    </ul>
    );
}