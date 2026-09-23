import NotesList from "../components/NotesList";
import SearchBox from "../components/SearchBox";
import PageButtons from "../components/PageButtons";
import { Link } from "react-router-dom";
import "./NotesPage.css";

export default function NotesPage({
  searchTerm,
  handleSearch,
  notes,
  loading,
  error,
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  return (
    <main className="notes-page">
      <div className="notes-header">
        <div className="notes-header-copy">
          <h1 className="page-title">My Notes</h1>
          <span className="notes-count">
            {notes.length} {notes.length === 1 ? "note" : "notes"} in your
            workspace
          </span>
        </div>
        <Link className="btn btn-primary" to="/create">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Create Note
        </Link>
      </div>

      <div className="notes-search-row">
        <SearchBox searchTerm={searchTerm} handleSearch={handleSearch} />
      </div>

      <NotesList
        notes={notes}
        loading={loading}
        error={error}
        searchTerm={searchTerm}
      />

      <PageButtons
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </main>
  );
}
