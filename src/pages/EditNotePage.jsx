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
