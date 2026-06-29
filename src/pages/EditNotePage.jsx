import { useParams } from "react-router-dom";
import NoteForm from "../components/NoteForm";
import { useEffect } from "react";

export default function EditNotePage({
  notes,
  loading,
  handleUpdate,
  formData,
  setFormData,
}) {
  const { id } = useParams();
  const singleNote = notes.find((note) => note.id === id);

  useEffect(() => {
    if (singleNote) {
      setFormData({
        title: singleNote.title,
        content: singleNote.content,
      });
    }
  }, [singleNote, setFormData]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (!singleNote) {
    return <h1>Note not found</h1>;
  }

  return (
    <div>
      <h1>Edit Note</h1>
      <NoteForm
        onSubmit={(formData) => handleUpdate(id, formData)}
        formData={formData}
        setFormData={setFormData}
        buttonText="Update Note"
      />
    </div>
  );
}
