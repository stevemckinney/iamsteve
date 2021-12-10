import Image from 'next/image'

export default function Confirm() {
  return (
    <>
      <div className="row subheader center contain contain-medium contain-large pb4">
        <h1 className="f4 f3-b f2-d warm mb0 text-center">You’re almost there</h1>
      </div>

      <div className="contain contain-medium contain-large pt4 pt6-d pb4 pb6-d">
        <p className="f2-l text-center measure m-center">
          The final step, please check your email to confirm your subscription. It should be almost
          immediate, so if you don’t have it check your spam folder. If you have any problems{' '}
          <a href="{site_url}/contact" className="link">
            let me know
          </a>
          .
        </p>
      </div>
    </>
  )
}
