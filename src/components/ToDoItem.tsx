export default function ToDoItem({completed, id, title, toggleTodo, deleteTodo}: ToDoProps) {
    return (
        <li key={id}>
            <label>
              <input 
                type="checkbox" 
                checked={completed} 
                onChange={e => toggleTodo(id, e.target.checked)}
              />
              {title}  
            </label>
            <button 
              onClick={() => deleteTodo(id)}
              className="btn btn-danger" 
            >
              Delete
            </button>
          </li>
    );
}