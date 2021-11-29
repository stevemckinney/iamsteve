import Link from '@/components/Link'
import Icon from '@/components/icon/index.js'

export default function Pagination({ stage = 'full', totalPages, currentPage }) {
  const newer = parseInt(currentPage) - 1 > 0
  const older = parseInt(currentPage) + 1 <= parseInt(totalPages)

  return (
    <>
      {stage === 'full' ? (
        <nav className="row center pagination pagination-offset">
          {newer ? (
            <Link href={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`}>
              <a rel="next" className="paginate paginate-left link-icon">
                <span className="icon icon-medium icon-left">
                  <Icon kind="left" />
                </span>
                <strong>Next</strong>
              </a>
            </Link>
          ) : (
            <span className="paginate paginate-left disabled link-icon" disabled={!newer}>
              <span className="icon icon-medium icon-left">
                <Icon kind="left" />
              </span>
              <strong>Newer</strong>
            </span>
          )}
          <div className="paginate paginate-between">
            <span>
              {currentPage} of {totalPages}
            </span>
          </div>
          {older ? (
            <Link href={`/blog/page/${currentPage + 1}`}>
              <a rel="previous" className="paginate paginate-right link-icon">
                <strong>Older</strong>
                <span className="icon icon-medium icon-right">
                  <Icon kind="right" />
                </span>
              </a>
            </Link>
          ) : (
            <span className="paginate paginate-right disabled link-icon" disabled={!older}>
              <strong>Older</strong>
              <span className="icon icon-medium icon-right">
                <Icon kind="right" />
              </span>
            </span>
          )}
        </nav>
      ) : (
        <>
          {stage === 'previous' || stage === 'older' ? (
            <>
              {older ? (
                <Link href={`/blog/page/${currentPage + 1}`}>
                  <a rel="previous" className="warm sans link-icon">
                    <strong>Older</strong>
                    <span className="icon icon-medium icon-right">
                      <Icon kind="right" />
                    </span>
                  </a>
                </Link>
              ) : (
                <span className="primary-l2 sans link-icon disabled" disabled={!older}>
                  <strong>Older</strong>
                  <span className="icon icon-medium icon-right">
                    <Icon kind="right" />
                  </span>
                </span>
              )}
            </>
          ) : (
            <>
              {newer ? (
                <Link href={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`}>
                  <a rel="next" className="warm sans link-icon">
                    <span className="icon icon-medium icon-left">
                      <Icon kind="left" />
                    </span>
                    <strong>Newer</strong>
                  </a>
                </Link>
              ) : (
                <span className="primary-l2 sans link-icon disabled" disabled={!newer}>
                  <span className="icon icon-medium icon-left">
                    <Icon kind="left" />
                  </span>
                  <strong>Newer</strong>
                </span>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}
