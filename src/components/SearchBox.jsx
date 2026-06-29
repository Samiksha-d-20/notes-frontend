import "./SearchBox.css";

export default function SearchBox({ searchTerm, handleSearch }) {
  return (
    <div className="search-container">
      <input
        className="search-box"
        type="text"
        placeholder="Search notes..."
        onChange={handleSearch}
        value={searchTerm}
      />
    </div>
  );
}
