import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'

export default function FourZeroFour() {
  return (
    <>
      <PageSEO title={`404 • ${siteMetadata.title}`} description={`Page not found.`} />
      <div className="row subheader center contain contain-medium contain-large pb4">
        <h1 className="f4 f3-b f2-d warm mb0 text-center">404</h1>
      </div>
      <div className="contain">
        <div className="measure m-center pt4 pt6-d pb4 pb6-d">
          <p>
            It’s probable you’re here because a redirect went wrong or I guess you’ve made a typo,
            no problem. If you believe the page <strong>should</strong> be here, please{' '}
            <Link href="/contact" className="link">
              contact me
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  )
}
