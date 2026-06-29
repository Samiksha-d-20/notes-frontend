import "./NoteCard.css";

export default function NoteCard({ note, onDelete, onUpdate }) {
  return (
    <div className="note-card">
      <h2 className="note-card-title">{note.title}</h2>

      <p className="note-card-content">{note.content}</p>

      <div className="note-actions">
        <button className="delete-btn" onClick={() => onDelete(note.id)}>
          Delete
        </button>

        <button className="update-btn" onClick={() => onUpdate(note)}>
          Update
        </button>
      </div>
    </div>
  );
}
