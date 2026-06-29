import "./NoteForm.css";
export default function NoteForm({
  onSubmit,
  formData,
  setFormData,
  buttonText,
}) {
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //handle form submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <label htmlFor="title">Title : </label>
      <input
        name="title"
        id="title"
        onChange={handleChange}
        value={formData.title}
        placeholder="Enter note title"
        required
      />
      <label htmlFor="content">Content : </label>
      <textarea
        name="content"
        id="content"
        onChange={handleChange}
        value={formData.content}
        placeholder="Write your note here..."
        required></textarea>
      <br />
      <button type="submit">{buttonText}</button>
    </form>
  );
}
