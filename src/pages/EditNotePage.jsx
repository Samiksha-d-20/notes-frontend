import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NoteForm from "../components/NoteForm";
import { getSingleNote } from "../api/notesApi";
import getErrorMessage from "../utils/getErrorMessage";

export default function EditNotePage({ handleUpdate, formData, setFormData }) {
  const { id } = useParams();

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

        setFormData({
          title: data.title,
          content: data.content,
        });
      } catch (err) {
        setError(getErrorMessage(err, "Failed to fetch note"));
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, setFormData]);

  if (loading) {
    return (
      <main className="note-form-page">
        <div className="loading-state">
          <div className="spinner" />
          <span>Loading note...</span>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="note-form-page">
        <div className="note-form-header">
          <h1 className="page-title">Edit note</h1>
        </div>
        <div className="inline-error">{error}</div>
      </main>
    );
  }

  if (!note) {
    return (
      <main className="note-form-page">
        <div className="note-form-header">
          <h1 className="page-title">Edit note</h1>
          <p className="page-subtitle">Note not found.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="note-form-page">
      <div className="note-form-header">
        <h1 className="page-title">Edit note</h1>
        <p className="page-subtitle">
          Update the title or content of your note.
        </p>
      </div>

      <NoteForm
        onSubmit={(formData) => handleUpdate(id, formData)}
        formData={formData}
        setFormData={setFormData}
        buttonText="Update Note"
      />
    </main>
  );
}
