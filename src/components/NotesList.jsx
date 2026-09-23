import "./NotesList.css";
import { Link, useNavigate } from "react-router-dom";

export default function NotesList({ notes, loading, error, searchTerm }) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner" />
        <span>Loading notes...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="inline-error" style={{ marginTop: 24 }}>
        {error}
      </div>
    );
  }

  if (notes.length === 0 && searchTerm) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true">
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
            <polyline points="14 3 14 8 19 8" />
            <line x1="10" y1="13" x2="14" y2="13" />
            <line x1="10" y1="17" x2="14" y2="17" />
          </svg>
        </div>
        <h3>No notes found</h3>
        <p>
          No notes match "<strong>{searchTerm}</strong>".
        </p>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true">
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
            <polyline points="14 3 14 8 19 8" />
            <line x1="10" y1="13" x2="14" y2="13" />
            <line x1="10" y1="17" x2="14" y2="17" />
          </svg>
        </div>
        <h3>No notes yet</h3>
        <p>Create your first note to start building your collection.</p>
        <Link className="btn btn-primary" to="/create">
          Create your first note
        </Link>
      </div>
    );
  }

  return (
    <div className="notes-container">
      {notes.map((note) => {
        return (
          <article
            key={note.id}
            className="note-item"
            onClick={() => navigate(`/note/${note.id}`)}>
            <div className="note-card-indicator" aria-hidden="true" />
            <h3 className="note-title">{note.title}</h3>
            <p className="note-content-preview">{note.content}</p>
            <div className="note-card-actions">
              <button
                className="btn btn-secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/edit/${note.id}`);
                }}>
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/note/${note.id}`);
                }}>
                View
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
