export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pagesPerBatch = 3;

  // Tính toán batch hiện tại: mỗi batch chứa 3 trang
  const currentBatch = Math.floor((currentPage - 1) / pagesPerBatch);
  const startPage = 1;
  const endPage = Math.min((currentBatch + 1) * pagesPerBatch, totalPages);

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  if (totalPages <= 1) return null;

  return (
    <ul className="flex flex-wrap items-center justify-center gap-2 my-6">
      {/* Nút trang trước */}
      <li>
        <button
          className="px-4 py-2 rounded-md border bg-white text-black hover:bg-gray-100 disabled:opacity-50"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          « Trang trước
        </button>
      </li>

      {/* Hiển thị các trang hiện tại trong batch */}
      {visiblePages.map((pageNum) => (
        <li key={pageNum}>
          <button
            className={`px-4 py-2 rounded-md border ${
              pageNum === currentPage
                ? "bg-red-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </button>
        </li>
      ))}

      {/* Dấu ... và nút đến batch cuối nếu còn trang phía sau */}
      {endPage < totalPages && (
        <>
          <li className="px-2 py-2 text-gray-600 select-none">...</li>
          <li>
            <button
              className="px-4 py-2 rounded-md border bg-white hover:bg-gray-100"
              onClick={() => onPageChange(endPage + 1)}
            >
              {endPage + 1}
            </button>
          </li>
        </>
      )}

      {/* Nút trang sau */}
      <li>
        <button
          className="px-4 py-2 rounded-md border bg-white text-black hover:bg-gray-100 disabled:opacity-50"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Trang sau »
        </button>
      </li>
    </ul>
  );
};
