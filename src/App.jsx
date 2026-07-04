import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import NotesPage from "./pages/NotesPage";
import NoteDetailPage from "./pages/NoteDetailPage";
import CreateNotePage from "./pages/CreateNotePage";
import EditNotePage from "./pages/EditNotePage";
import { getNotes, createNote, deleteNote, updateNote } from "./api/notesApi";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  //Fetch notes when the app loads
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const data = await getNotes();
        setNotes(data);
      } catch (err) {
        setError("failed to fetch notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  //handle create note
  const handleCreate = async (formData) => {
    const newNote = await createNote(formData);
    setNotes((prev) => {
      return [...prev, newNote];
    });
    setFormData({
      title: "",
      content: "",
    });
    navigate(`/note/${newNote.id}`);
  };

  //handle update note
  const handleUpdate = async (id, formData) => {
    const updatedNote = await updateNote(id, formData);

    setNotes((prev) => {
      return prev.map((note) => (note.id === id ? updatedNote : note));
    });
    navigate(`/note/${updatedNote.id}`);
  };

  //handle delete note
  async function onDelete(id) {
    await deleteNote(id);

    setNotes((prev) => {
      return prev.filter((note) => note.id !== id);
    });
    navigate("/");
  }

  async function handleSearch(e) {
    setSearchTerm(e.target.value);
  }

  //Search feature
  let filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  //Pagination
  const notesPerPage = 5;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredNotes.length / notesPerPage),
  );
  const startIndex = (currentPage - 1) * notesPerPage;
  const endIndex = startIndex + notesPerPage;
  let paginatedNotes = filteredNotes.slice(startIndex, endIndex);

  return (
    <div className="app">
      <h1 className="app-title">Notes app</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <NotesPage
                searchTerm={searchTerm}
                handleSearch={handleSearch}
                paginatedNotes={paginatedNotes}
                loading={loading}
                error={error}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            }></Route>

          <Route
            path="create"
            element={
              <CreateNotePage
                handleCreate={handleCreate}
                formData={formData}
                setFormData={setFormData}
              />
            }></Route>
        </Route>
        <Route
          path="/note/:id"
          element={
            <NoteDetailPage
              notes={notes}
              loading={loading}
              onDelete={onDelete}
            />
          }></Route>
        <Route
          path="/edit/:id"
          element={
            <EditNotePage
              notes={notes}
              loading={loading}
              handleUpdate={handleUpdate}
              formData={formData}
              setFormData={setFormData}
            />
          }></Route>
      </Routes>
    </div>
  );
}

export default App;
