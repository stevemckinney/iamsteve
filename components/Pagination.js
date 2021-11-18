import Link from '@/components/Link'

export default function Pagination({ style = 'full', totalPages, currentPage }) {
  const prevPage = parseInt(currentPage) - 1 > 0
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages)

  return (
    <>
      {style === 'full' ? (
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <nav className="flex justify-between">
            {prevPage ? (
              <Link href={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`}>
                <button rel="previous">Previous</button>
              </Link>
            ) : (
              <button rel="previous" className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
                Previous
              </button>
            )}
            <span>
              {currentPage} of {totalPages}
            </span>
            {nextPage ? (
              <Link href={`/blog/page/${currentPage + 1}`}>
                <button rel="next">Next</button>
              </Link>
            ) : (
              <button rel="next" className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
                Next
              </button>
            )}
          </nav>
        </div>
      ) : (
        <>
          {style === 'previous' ? (
            <>
              {prevPage ? (
                <Link href={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`}>
                  <button rel="previous">Previous</button>
                </Link>
              ) : (
                <button rel="previous" className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
                  Previous
                </button>
              )}
            </>
          ) : (
            <>
              {nextPage ? (
                <Link href={`/blog/page/${currentPage + 1}`}>
                  <button rel="next">Next</button>
                </Link>
              ) : (
                <button rel="next" className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
                  Next
                </button>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}
