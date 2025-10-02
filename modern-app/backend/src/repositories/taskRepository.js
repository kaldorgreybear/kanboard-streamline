import pool from '../db.js';

const mapTask = (row) => ({
  id: row.id,
  columnId: row.column_id,
  title: row.title,
  description: row.description,
  owner: row.owner,
  color: row.color,
  dueDate: row.due_date,
  priority: row.priority,
  isActive: row.is_active === 1,
  createdAt: row.created_at,
  updatedAt: row.updated_at
});

export async function listTasks(boardId) {
  const [rows] = await pool.query(
    `SELECT t.* FROM tasks t
     JOIN columns c ON c.id = t.column_id
     WHERE c.board_id = ?
     ORDER BY c.position ASC, t.priority DESC, t.created_at ASC`,
    [boardId]
  );

  return rows.map(mapTask);
}

export async function createTask({ columnId, title, description, owner, color, dueDate, priority }) {
  const [result] = await pool.query(
    `INSERT INTO tasks (column_id, title, description, owner, color, due_date, priority)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [columnId, title, description ?? null, owner ?? null, color ?? '#2980b9', dueDate ?? null, priority ?? 0]
  );

  return getTask(result.insertId);
}

export async function updateTask(id, updates) {
  const fields = [];
  const values = [];

  Object.entries(updates).forEach(([key, value]) => {
    if (value === undefined) {
      return;
    }

    switch (key) {
      case 'columnId':
        fields.push('column_id = ?');
        values.push(value);
        break;
      case 'title':
      case 'description':
      case 'owner':
      case 'color':
        fields.push(`${key} = ?`);
        values.push(value);
        break;
      case 'dueDate':
        fields.push('due_date = ?');
        values.push(value ?? null);
        break;
      case 'priority':
        fields.push('priority = ?');
        values.push(value);
        break;
      case 'isActive':
        fields.push('is_active = ?');
        values.push(value ? 1 : 0);
        break;
      default:
        break;
    }
  });

  if (!fields.length) {
    return getTask(id);
  }

  values.push(id);
  await pool.query(`UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`, values);
  return getTask(id);
}

export async function deleteTask(id) {
  await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
}

export async function getTask(id) {
  const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
  return rows.length ? mapTask(rows[0]) : null;
}
