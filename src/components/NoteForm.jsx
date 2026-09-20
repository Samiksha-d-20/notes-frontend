import { useState } from "react";
import "./NoteForm.css";

export default function NoteForm({
  onSubmit,
  formData,
  setFormData,
  buttonText,
}) {
  const [submitting, setSubmitting] = useState(false);
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      await onSubmit(formData);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="title">Title</label>
        <input
          name="title"
          id="title"
          onChange={handleChange}
          value={formData.title}
          placeholder="Note title"
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          onChange={handleChange}
          value={formData.content}
          placeholder="Start writing your note here..."
          required></textarea>
      </div>
      <div className="note-form-actions">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Saving..." : buttonText}
        </button>
      </div>
    </form>
  );
}
