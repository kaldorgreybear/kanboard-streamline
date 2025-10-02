import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskBoard from './components/TaskBoard.jsx';
import BoardSelector from './components/BoardSelector.jsx';
import TaskForm from './components/TaskForm.jsx';

const API_BASE = '/api';

export default function App() {
  const [boards, setBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [boardDetail, setBoardDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`${API_BASE}/boards`)
      .then((response) => {
        setBoards(response.data);
        if (response.data.length && !selectedBoardId) {
          setSelectedBoardId(response.data[0].id);
        }
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (!selectedBoardId) {
      return;
    }

    setLoading(true);
    setError('');
    axios
      .get(`${API_BASE}/boards/${selectedBoardId}`)
      .then((response) => setBoardDetail(response.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [selectedBoardId]);

  const handleTaskCreate = (payload) =>
    axios
      .post(`${API_BASE}/tasks`, { ...payload, columnId: payload.columnId ?? boardDetail.columns[0].id })
      .then((response) => {
        setBoardDetail((current) => ({
          ...current,
          tasks: [...current.tasks, response.data]
        }));
        return response.data;
      })
      .catch((err) => {
        setError(err.message);
        throw err;
      });

  const handleTaskUpdate = (taskId, updates) =>
    axios
      .put(`${API_BASE}/tasks/${taskId}`, updates)
      .then((response) => {
        setBoardDetail((current) => ({
          ...current,
          tasks: current.tasks.map((task) => (task.id === response.data.id ? response.data : task))
        }));
        return response.data;
      })
      .catch((err) => {
        setError(err.message);
        throw err;
      });

  const handleTaskDelete = (taskId) =>
    axios
      .delete(`${API_BASE}/tasks/${taskId}`)
      .then(() => {
        setBoardDetail((current) => ({
          ...current,
          tasks: current.tasks.filter((task) => task.id !== taskId)
        }));
      })
      .catch((err) => {
        setError(err.message);
        throw err;
      });

  return (
    <div className="app">
      <header className="app__header">
        <h1>Kanboard Streamline</h1>
        <BoardSelector boards={boards} value={selectedBoardId} onChange={setSelectedBoardId} />
      </header>

      {error && <div className="app__error">{error}</div>}

      {loading && <div className="app__loading">Loading board…</div>}

      {!loading && boardDetail && (
        <>
          <TaskForm columns={boardDetail.columns} onSubmit={handleTaskCreate} />
          <TaskBoard
            columns={boardDetail.columns}
            tasks={boardDetail.tasks}
            onUpdateTask={handleTaskUpdate}
            onDeleteTask={handleTaskDelete}
          />
        </>
      )}

      {!loading && !boardDetail && <p>Select a board to get started.</p>}
    </div>
  );
}
