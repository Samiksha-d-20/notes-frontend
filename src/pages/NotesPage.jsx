import NotesList from "../components/NotesList";
import SearchBox from "../components/SearchBox";
import PageButtons from "../components/PageButtons";

export default function NotesPage({
  searchTerm,
  handleSearch,
  paginatedNotes,
  loading,
  error,
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  return (
    <div>
      <SearchBox searchTerm={searchTerm} handleSearch={handleSearch} />
      <PageButtons
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
      <NotesList notes={paginatedNotes} loading={loading} error={error} />
    </div>
  );
}
