'use client'
import { useState, useEffect } from 'react'
import Date from '@/components/date'
import Icon from '@/components/icon'

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const getCampaigns = async () => {
      const campaigns = await fetch('/api/campaigns', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 2592000 },
      })
        .then((res) => res.json())
        .then((campaigns) => {
          setCampaigns(campaigns)
          setLoading(false)
        })
    }
    getCampaigns()
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!campaigns) return <p>There are no previous issues</p>

  // https://eocampaign1.com/web-version
  // ?p=bdee1dd4-6b74-11ee-9541-e16c9f4b3cbc
  // &pt=campaign&t=1697386038
  // &s=47efb23d40cf0cd377004575ee4e52b937d219b31e3d61157d76c5fad87de688
  // <a
  //   href={`https://australis.eocampaign1.com/web-version?ep=2&lc=e99c622e-62e1-11ee-bf97-39cb090f9780&p=${campaign.id}&pt=campaign&t=1696443441&s=c832187331a4e5aff134b524c923fb33ad2a84530f186309fbc440fd1e440844`}
  //   key={campaign.id}
  // >
  //   <div
  //     dangerouslySetInnerHTML={{ __html: campaign.content.html }}
  //   />
  // </a>
  if (campaigns.data && campaigns.data.length) {
    return (
      <ul className="flex flex-col -my-2">
        {campaigns.data.map((campaign) => {
          if (campaign.status !== 'SENT') return
          return (
            <li
              key={campaign.id}
              className="[&:not(:first-child)]:border-t [&:not(:first-child)]:border-t-1 [&:not(:first-child)]:border-neutral-01-200"
            >
              <span className="flex justify-between py-2 text-lg text-fern-1100">
                {campaign.subject}{' '}
                <span className="flex items-center leading-none gap-2 text-base">
                  <Date
                    dateString={campaign.sent_at}
                    className={`font-ui lowercase text-neutral-01-400`}
                  />
                  <Icon
                    icon="arrow-right"
                    className="text-neutral-01-400 relative top-[-1px]"
                    size={16}
                  />
                </span>
              </span>
            </li>
          )
        })}
      </ul>
    )
  } else {
    return <p>No issues currently</p>
  }
}

export default Campaigns
