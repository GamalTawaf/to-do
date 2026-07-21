import { useState } from "react";

export default function NewToDoForm({ onSubmit }: NewToDoFormProps) {
  const [newItem, setNewItem] = useState("");


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = newItem.trim();
    if (trimmed === "") return;

    onSubmit(trimmed)
    setNewItem("");
  }
    return (
        <form onSubmit={handleSubmit} className="new-item-form">
            <div className="form-row">
            <label htmlFor="item" className="visually-hidden">New task</label>
            <input
              value={newItem}
              onChange={e => setNewItem(e.target.value)}
              type="text"
              id="item"
              placeholder="Write a task…"
              autoComplete="off"
            />
            </div>
            <button className="pin-btn" aria-label="Pin it">+</button>
        </form>
  );
}
