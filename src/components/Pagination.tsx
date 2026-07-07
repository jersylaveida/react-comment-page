interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="pagination">
            <button
                type="button"
                className="pagination__button"
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
            >
                Previous
            </button>

            <div className="pagination__numbers" aria-label="Page numbers">
                {pageNumbers.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        type="button"
                        className={`pagination__number ${pageNumber === page ? 'is-active' : ''}`}
                        onClick={() => onPageChange(pageNumber)}
                        aria-current={pageNumber === page ? 'page' : undefined}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>

            <button
                type="button"
                className="pagination__button"
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
            >
                Next
            </button>
        </div>
    );
}
