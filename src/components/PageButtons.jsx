import "./PageButtons.css";

export default function PageButtons({
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination" aria-label="Notes pagination">
      <button
        className="pagination-arrow"
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={page === currentPage ? "active" : ""}
          aria-current={page === currentPage ? "page" : undefined}
          onClick={() => setCurrentPage(page)}>
          {page}
        </button>
      ))}
      <button
        className="pagination-arrow"
        aria-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}
