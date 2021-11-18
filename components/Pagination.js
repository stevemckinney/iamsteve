import Link from '@/components/Link'
import Icon from '@/components/icon'

export default function Pagination({ style = 'full', totalPages, currentPage }) {
  const newer = parseInt(currentPage) - 1 > 0
  const older = parseInt(currentPage) + 1 <= parseInt(totalPages)

  return (
    <>
      {style === 'full' ? (
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <nav className="flex justify-between">
            {older ? (
              <Link href={`/blog/page/${currentPage + 1}`}>
                <a rel="previous" className="warm sans link-icon"><strong>Older</strong></a>
              </Link>
            ) : (
              <span className="primary-l2 sans link-icon disabled" disabled={!older}>
                <strong>Older</strong><span className="icon icon-medium icon-right secondary"><Icon kind="right" /></span>
              </span>
            )}
            <span>
              {currentPage} of {totalPages}
            </span>
            {newer ? (
              <Link href={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`}>
                <a rel="next" className="warm sans link-icon"><strong>Next</strong> <span className="icon icon-medium icon-right secondary"><Icon kind="right" /></span></a>
              </Link>
            ) : (
              <span className="primary-l2 sans link-icon disabled" disabled={!newer}>
                <strong>Newer</strong> <span className="icon icon-medium icon-right"><Icon kind="right" /></span>
              </span>
            )}
          </nav>
        </div>
      ) : (
        <>
          {style === 'previous' || style === 'older' ? (
            <>
              {older ? (
                <Link href={`/blog/page/${currentPage + 1}`}>
                  <a rel="previous" className="warm sans link-icon"><strong>Older</strong><span className="icon icon-medium icon-right"><Icon kind="right" /></span></a>
                </Link>
              ) : (
                <span className="primary-l2 sans link-icon disabled" disabled={!older}>
                  <strong>Older</strong><span className="icon icon-medium icon-right"><Icon kind="right" /></span>
                </span>
              )}
            </>
          ) : (
            <>
              {newer ? (
                <Link href={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`}>
                  <a rel="next" className="warm sans link-icon"><span className="icon icon-medium icon-left"><Icon kind="left" /></span><strong>Newer</strong></a>
                </Link>
              ) : (
                <span className="primary-l2 sans link-icon disabled" disabled={!newer}>
                  <span className="icon icon-medium icon-left"><Icon kind="left" /></span><strong>Newer</strong>
                </span>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}
