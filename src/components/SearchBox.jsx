import "./SearchBox.css";

export default function SearchBox({ searchTerm, handleSearch }) {
  return (
    <div className="search-container">
      <svg
        className="search-icon"
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <line x1="20" y1="20" x2="16.2" y2="16.2" />
      </svg>
      <input
        className="search-box"
        type="text"
        placeholder="Search notes by title or content..."
        onChange={handleSearch}
        value={searchTerm}
        aria-label="Search notes by title or content"
      />
    </div>
  );
}
