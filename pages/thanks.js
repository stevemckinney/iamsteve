import Image from 'next/image'
import Link from 'next/link'

export default function Thanks() {
  return (
    <>
      <div className="row subheader center contain contain-medium contain-large pb4">
        <h1 className="f4 f3-b f2-d warm mb0 text-center">Subscription confirmed</h1>
      </div>
      <div className="contain contain-medium contain-large pt4 pt6-d pb4 pb6-d">
        <Image src="/static/images/thanks.svg" alt="Thumbs up" className="db m-center mb4" />

        <p className="f2-l text-center measure m-center">
          Your subscription has been confirmed. If you have any problems{' '}
          <Link href="/contact" className="link">
            let me know
          </Link>{' '}
          or reply to any of the emails you receive.
        </p>

        <section className="grid-thanks pt6 m-center">
          <h2 className="f5 f4-b chunky neutral row-title column-all">
            Here’s what you can expect
          </h2>
          {/*exp:channel:entries channel="{ch}" status="{ch_status}" disable="{ch_disable}" limit="{ch_limit_large}" entry_id="160|161|157|164|165|76" fixed_order="165|160|164|157|161|72"}
            {post_small}
          {/exp:channel:entries*/}
        </section>
      </div>
    </>
  )
}
