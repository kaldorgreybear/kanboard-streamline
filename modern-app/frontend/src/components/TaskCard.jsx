import dayjs from 'dayjs';
import { useState } from 'react';

function formatDate(date) {
  return date ? dayjs(date).format('MMM D, YYYY') : 'No due date';
}

export default function TaskCard({ task, columns, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    owner: task.owner,
    dueDate: task.dueDate?.slice(0, 10) ?? '',
    columnId: task.columnId,
    priority: task.priority
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate(task.id, form).then(() => setIsEditing(false));
  };

  const handleDelete = () => {
    if (confirm('Delete this task?')) {
      onDelete(task.id);
    }
  };

  if (isEditing) {
    return (
      <form className="task-card task-card--editing" onSubmit={handleSubmit}>
        <input
          type="text"
          required
          value={form.title}
          onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
        />
        <textarea
          value={form.description ?? ''}
          onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
        />
        <label>
          Owner
          <input
            type="text"
            value={form.owner ?? ''}
            onChange={(event) => setForm((current) => ({ ...current, owner: event.target.value }))}
          />
        </label>
        <label>
          Due Date
          <input
            type="date"
            value={form.dueDate}
            onChange={(event) => setForm((current) => ({ ...current, dueDate: event.target.value }))}
          />
        </label>
        <label>
          Column
          <select
            value={form.columnId}
            onChange={(event) => setForm((current) => ({ ...current, columnId: Number(event.target.value) }))}
          >
            {columns.map((column) => (
              <option key={column.id} value={column.id}>
                {column.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Priority
          <input
            type="number"
            value={form.priority}
            onChange={(event) =>
              setForm((current) => ({ ...current, priority: Number(event.target.value) || 0 }))
            }
          />
        </label>
        <footer className="task-card__actions">
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </footer>
      </form>
    );
  }

  return (
    <article className="task-card" style={{ borderColor: task.color }}>
      <header className="task-card__header">
        <h3>{task.title}</h3>
        <span className="task-card__owner">{task.owner ?? 'Unassigned'}</span>
      </header>
      <p className="task-card__description">{task.description ?? 'No description yet.'}</p>
      <dl className="task-card__meta">
        <div>
          <dt>Due</dt>
          <dd>{formatDate(task.dueDate)}</dd>
        </div>
        <div>
          <dt>Priority</dt>
          <dd>{task.priority}</dd>
        </div>
      </dl>
      <footer className="task-card__actions">
        <button type="button" onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button type="button" className="task-card__delete" onClick={handleDelete}>
          Delete
        </button>
      </footer>
    </article>
  );
}
