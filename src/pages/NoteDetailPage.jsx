import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import { getSingleNote } from "../api/notesApi";
import getErrorMessage from "../utils/getErrorMessage";

export default function NoteDetailPage({ onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getSingleNote(id);

        setNote(data);
      } catch (err) {
        setError(getErrorMessage(err, "Failed to fetch note"));
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    try {
      await onDelete(id);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to delete note"));
    }
  };

  if (loading) {
    return (
      <main className="note-detail-page">
        <div className="loading-state">
          <div className="spinner" />
          <span>Loading note...</span>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="note-detail-page">
        <button
          className="btn btn-primary note-detail-back"
          onClick={() => navigate("/")}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Notes
        </button>
        <div className="inline-error">{error}</div>
      </main>
    );
  }

  if (!note) {
    return (
      <main className="note-detail-page">
        <button
          className="btn btn-primary note-detail-back"
          onClick={() => navigate("/")}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Notes
        </button>
        <h1 className="page-title">Note not found</h1>
        <p className="page-subtitle">This note may have been deleted.</p>
      </main>
    );
  }

  return (
    <main className="note-detail-page">
      <button
        className="btn btn-primary note-detail-back"
        onClick={() => navigate("/")}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to Notes
      </button>
      <NoteCard note={note} onDelete={handleDelete} />
    </main>
  );
}
