import { COLORS, ROTATIONS } from "../noteStyles";

export default function ToDoItem({completed, id, title, colorIndex, rotationIndex, toggleTodo, deleteTodo}: ToDoProps) {
    const noteClass = `note ${COLORS[colorIndex % COLORS.length]}${completed ? " done" : ""}`;
    const style = { "--rot": `${ROTATIONS[rotationIndex % ROTATIONS.length]}deg` } as React.CSSProperties;

    return (
        <li className={noteClass} style={style}>
            <button
              onClick={() => deleteTodo(id)}
              className="btn-danger"
              aria-label={`Delete '${title}'`}
            >
              ✕
            </button>
            <label>
              <input
                type="checkbox"
                checked={completed}
                onChange={e => toggleTodo(id, e.target.checked)}
              />
              <span className="checkmark">✓</span>
              <span className="note-text">{title}</span>
            </label>
          </li>
    );
}
