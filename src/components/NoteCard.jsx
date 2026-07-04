import "./NoteCard.css";
import { useNavigate } from "react-router-dom";

export default function NoteCard({ note, onDelete }) {
  const navigate = useNavigate();
  return (
    <div className="note-card">
      <h2 className="note-card-title">{note.title}</h2>

      <p className="note-card-content">{note.content}</p>

      <div className="note-actions">
        <button className="delete-btn" onClick={() => onDelete(note.id)}>
          Delete
        </button>

        <button
          className="update-btn"
          onClick={() => navigate(`/edit/${note.id}`)}>
          Update
        </button>
      </div>
    </div>
  );
}
