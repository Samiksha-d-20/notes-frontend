import "./PageButtons.css";

export default function PageButtons({
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}>
        Previous
      </button>
      &nbsp;
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}>
        Next
      </button>
    </div>
  );
}
