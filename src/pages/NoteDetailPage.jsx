import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import { getSingleNote } from "../api/notesApi";
import getErrorMessage from "../utils/getErrorMessage";

export default function NoteDetailPage({ onDelete }) {
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
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!note) {
    return <h1>Note not found</h1>;
  }

  return (
    <div>
      <NoteCard note={note} onDelete={handleDelete} />
    </div>
  );
}
