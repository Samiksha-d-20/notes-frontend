import { useState, useEffect, useCallback } from "react";
import Layout from "./components/Layout";
import NotesPage from "./pages/NotesPage";
import NoteDetailPage from "./pages/NoteDetailPage";
import CreateNotePage from "./pages/CreateNotePage";
import EditNotePage from "./pages/EditNotePage";
import { getNotes, createNote, deleteNote, updateNote } from "./api/notesApi";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import getErrorMessage from "./utils/getErrorMessage";
import { useAuth } from "./context/AuthContext";

function App() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { isAuthenticated, authLoading } = useAuth();
  const navigate = useNavigate();

  //Fetch notes when the app loads
  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getNotes(currentPage, 5, searchTerm);

      setNotes(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to fetch notes"));
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm]);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchNotes();
    }
  }, [authLoading, isAuthenticated, fetchNotes]);

  //handle create note
  const handleCreate = async (formData) => {
    try {
      setError("");
      const newNote = await createNote(formData);

      await fetchNotes();

      setFormData({
        title: "",
        content: "",
      });

      navigate(`/note/${newNote.id}`);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to create note"));
    }
  };

  //handle update note
  const handleUpdate = async (id, formData) => {
    try {
      setError("");
      const updatedNote = await updateNote(id, formData);

      await fetchNotes();

      navigate(`/note/${updatedNote.id}`);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to update note"));
    }
  };

  //handle delete note
  const handleDelete = async (id) => {
    try {
      setError("");
      await deleteNote(id);

      await fetchNotes();

      navigate("/");
    } catch (err) {
      setError(getErrorMessage(err, "Failed to delete note"));
    }
  };

  function handleSearch(e) {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  }

  return (
    <div className="app">
      <h1 className="app-title">Notes app</h1>
      <Routes>
        {/* Public routes */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <NotesPage
                  searchTerm={searchTerm}
                  handleSearch={handleSearch}
                  notes={notes}
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
            element={<NoteDetailPage onDelete={handleDelete} />}></Route>
          <Route
            path="/edit/:id"
            element={
              <EditNotePage
                handleUpdate={handleUpdate}
                formData={formData}
                setFormData={setFormData}
              />
            }></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
