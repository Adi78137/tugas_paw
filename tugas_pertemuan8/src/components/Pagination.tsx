export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  const getPageItems = (): (number | 'ellipsis')[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const items: (number | 'ellipsis')[] = [1]
    const leftBound = Math.max(2, currentPage - 1)
    const rightBound = Math.min(totalPages - 1, currentPage + 1)

    if (leftBound > 2) {
      items.push('ellipsis')
    }

    for (let p = leftBound; p <= rightBound; p++) {
      items.push(p)
    }

    if (rightBound < totalPages - 1) {
      items.push('ellipsis')
    }

    items.push(totalPages)
    return items
  }

  const pageItems = getPageItems()

  return (
    <nav aria-label="Navigasi Halaman" className="d-flex justify-content-center my-4">
      <ul className="pagination mb-0 flex-wrap justify-content-center">
        <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
          <button
            type="button"
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            aria-label="Halaman Sebelumnya"
          >
            &laquo; Sebelumnya
          </button>
        </li>

        {pageItems.map((item, index) => {
          if (item === 'ellipsis') {
            return (
              <li
                key={`ellipsis-${index}`}
                className="page-item disabled"
                aria-hidden="true"
              >
                <span className="page-link">&hellip;</span>
              </li>
            )
          }

          const isActive = item === currentPage
          return (
            <li
              key={item}
              className={`page-item ${isActive ? 'active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <button
                type="button"
                className="page-link"
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            </li>
          )
        })}

        <li className={`page-item ${currentPage >= totalPages ? 'disabled' : ''}`}>
          <button
            type="button"
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            aria-label="Halaman Berikutnya"
          >
            Berikutnya &raquo;
          </button>
        </li>
      </ul>
    </nav>
  )
}

