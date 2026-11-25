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
    <nav
      aria-label="Navigasi Halaman"
      className="d-flex justify-content-center my-4"
    >
      <ul className="kg-pagination justify-content-center">
        <li>
          <button
            type="button"
            className="kg-page-btn"
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
                aria-hidden="true"
              >
                <span className="kg-page-ellipsis">&hellip;</span>
              </li>
            )
          }

          const isActive = item === currentPage
          return (
            <li key={item}>
              <button
                type="button"
                className={`kg-page-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => onPageChange(item)}
                aria-current={isActive ? 'page' : undefined}
              >
                {item}
              </button>
            </li>
          )
        })}

        <li>
          <button
            type="button"
            className="kg-page-btn"
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
