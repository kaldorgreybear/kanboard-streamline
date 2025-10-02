import TaskCard from './TaskCard.jsx';

export default function TaskBoard({ columns, tasks, onUpdateTask, onDeleteTask }) {
  const tasksByColumn = columns.reduce((acc, column) => {
    acc[column.id] = [];
    return acc;
  }, {});

  tasks.forEach((task) => {
    if (!tasksByColumn[task.columnId]) {
      tasksByColumn[task.columnId] = [];
    }
    tasksByColumn[task.columnId].push(task);
  });

  return (
    <div className="task-board">
      {columns.map((column) => (
        <div key={column.id} className="task-board__column">
          <header className="task-board__column-header">
            <h2>{column.name}</h2>
            <span className="task-board__column-count">{tasksByColumn[column.id]?.length ?? 0}</span>
          </header>

          <div className="task-board__column-body">
            {(tasksByColumn[column.id] ?? []).map((task) => (
              <TaskCard key={task.id} task={task} columns={columns} onUpdate={onUpdateTask} onDelete={onDeleteTask} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
