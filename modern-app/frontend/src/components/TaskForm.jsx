import { useEffect, useState } from 'react';

const initialState = (columns) => ({
  title: '',
  description: '',
  owner: '',
  dueDate: '',
  columnId: columns?.[0]?.id ?? null,
  priority: 0
});

export default function TaskForm({ columns, onSubmit }) {
  const [form, setForm] = useState(initialState(columns));

  useEffect(() => {
    setForm(initialState(columns));
  }, [columns]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form).then(() => {
      setForm(initialState(columns));
    });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Create a task</h2>
      <div className="task-form__grid">
        <label>
          Title
          <input
            type="text"
            required
            value={form.title}
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
          />
        </label>
        <label>
          Owner
          <input
            type="text"
            value={form.owner}
            onChange={(event) => setForm((current) => ({ ...current, owner: event.target.value }))}
          />
        </label>
        <label>
          Column
          <select
            value={form.columnId ?? ''}
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
            onChange={(event) => setForm((current) => ({ ...current, priority: Number(event.target.value) || 0 }))}
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
        <label className="task-form__full">
          Description
          <textarea
            value={form.description}
            rows={3}
            onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
          />
        </label>
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
}
