import "./NotesList.css";
import { useNavigate } from "react-router-dom";

export default function NotesList({ notes, loading, error }) {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Notes List</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div>
        {notes.length === 0 ? (
          <p className="empty-message">No notes found.</p>
        ) : (
          <div className="notes-container">
            {notes.map((note) => {
              return (
                <div key={note.id} className="note-item">
                  <p className="note-title">{note.title}</p>
                  <button onClick={() => navigate(`/note/${note.id}`)}>
                    View Note
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
