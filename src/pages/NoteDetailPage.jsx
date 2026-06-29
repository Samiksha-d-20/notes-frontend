import NoteCard from "../components/NoteCard";
import { useParams } from "react-router-dom";

export default function NoteDetailPage({ notes, loading, onDelete, onUpdate }) {
  const { id } = useParams();
  const singleNote = notes.find((note) => note.id === id);
  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!singleNote) {
    return <h1>Note not found</h1>;
  }

  return (
    <div>
      <NoteCard note={singleNote} onDelete={onDelete} onUpdate={onUpdate} />
    </div>
  );
}
