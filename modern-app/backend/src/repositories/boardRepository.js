import pool from '../db.js';

const mapBoard = (row) => ({
  id: row.id,
  name: row.name,
  description: row.description,
  createdAt: row.created_at
});

const mapColumn = (row) => ({
  id: row.id,
  boardId: row.board_id,
  name: row.name,
  position: row.position
});

export async function listBoards() {
  const [rows] = await pool.query('SELECT * FROM boards ORDER BY created_at DESC');
  return rows.map(mapBoard);
}

export async function getBoard(id) {
  const [rows] = await pool.query('SELECT * FROM boards WHERE id = ?', [id]);
  return rows.length ? mapBoard(rows[0]) : null;
}

export async function getBoardWithColumns(id) {
  const [boardRows] = await pool.query('SELECT * FROM boards WHERE id = ?', [id]);
  if (!boardRows.length) {
    return null;
  }

  const board = mapBoard(boardRows[0]);
  const [columnRows] = await pool.query('SELECT * FROM columns WHERE board_id = ? ORDER BY position ASC', [id]);
  board.columns = columnRows.map(mapColumn);
  return board;
}

export async function createBoard({ name, description, columns = [] }) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [boardResult] = await conn.query('INSERT INTO boards (name, description) VALUES (?, ?)', [name, description ?? null]);
    const boardId = boardResult.insertId;

    if (columns.length) {
      const values = columns.map((column, index) => [boardId, column.name ?? column, index + 1]);
      await conn.query('INSERT INTO columns (board_id, name, position) VALUES ?', [values]);
    }

    await conn.commit();
    return getBoardWithColumns(boardId);
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}

export async function reorderColumn(boardId, columnId, newPosition) {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const [columns] = await conn.query('SELECT id FROM columns WHERE board_id = ? ORDER BY position ASC', [boardId]);
    const targetIndex = columns.findIndex((column) => column.id === Number(columnId));

    if (targetIndex === -1) {
      throw new Error('Column not found');
    }

    const [columnRows] = await conn.query('SELECT position FROM columns WHERE id = ?', [columnId]);
    const currentPosition = columnRows[0].position;

    if (currentPosition === newPosition) {
      await conn.commit();
      return;
    }

    if (currentPosition < newPosition) {
      await conn.query(
        `UPDATE columns
         SET position = position - 1
         WHERE board_id = ? AND position > ? AND position <= ?`,
        [boardId, currentPosition, newPosition]
      );
    } else {
      await conn.query(
        `UPDATE columns
         SET position = position + 1
         WHERE board_id = ? AND position >= ? AND position < ?`,
        [boardId, newPosition, currentPosition]
      );
    }

    await conn.query('UPDATE columns SET position = ? WHERE id = ?', [newPosition, columnId]);
    await conn.commit();
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}
