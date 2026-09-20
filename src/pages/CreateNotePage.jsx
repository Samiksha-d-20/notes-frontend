import { useEffect } from "react";
import NoteForm from "../components/NoteForm";

export default function CreateNotePage({
  handleCreate,
  formData,
  setFormData,
}) {
  useEffect(() => {
    setFormData({ title: "", content: "" });
  }, []);

  return (
    <main className="note-form-page">
      <div className="note-form-header">
        <h1 className="page-title">Create a new note</h1>
        <p className="page-subtitle">
          Capture your thoughts and ideas in one place.
        </p>
      </div>
      <NoteForm
        onSubmit={handleCreate}
        formData={formData}
        setFormData={setFormData}
        buttonText="Create Note"
      />
    </main>
  );
}
