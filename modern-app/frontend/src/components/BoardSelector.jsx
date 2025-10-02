export default function BoardSelector({ boards, value, onChange }) {
  return (
    <label className="board-selector">
      Board
      <select value={value ?? ''} onChange={(event) => onChange(Number(event.target.value) || null)}>
        <option value="">Select…</option>
        {boards.map((board) => (
          <option key={board.id} value={board.id}>
            {board.name}
          </option>
        ))}
      </select>
    </label>
  );
}
