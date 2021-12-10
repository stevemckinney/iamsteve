import Link from '@/components/Link'

export default function FourZeroFour() {
  return (
    <>
      <div className="row subheader center contain contain-medium contain-large pb4">
        <h1 className="f4 f3-b f2-d warm mb0 text-center">404</h1>
      </div>
      <div className="contain">
        <div className="measure m-center pt4 pt6-d pb4 pb6-d">
          <p>
            I'm guessing you've either made a typo or the URL is slightly wrong, no problem. If you
            believe the page <strong>should</strong> be here, please{' '}
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
