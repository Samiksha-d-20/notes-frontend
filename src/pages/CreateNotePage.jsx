import NoteForm from "../components/NoteForm";

export default function CreateNotePage({
  handleCreate,
  formData,
  setFormData,
}) {
  return (
    <div>
      <h1>Create Note</h1>
      <NoteForm
        onSubmit={handleCreate}
        formData={formData}
        setFormData={setFormData}
        buttonText="Create Note"
      />
    </div>
  );
}
