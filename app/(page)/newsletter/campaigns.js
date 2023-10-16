'use client'
import { useState, useEffect } from 'react'
import Date from '@/components/date'

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
        next: { revalidate: 10 },
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
  if (!campaigns) return <p>No profile data</p>

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
      <ul className="flex flex-col">
        {campaigns.data.map((campaign) => {
          console.log(campaign)
          if (campaign.status !== 'SENT') return
          return (
            <li className="flex justify-between" key={campaign.id}>
              {campaign.subject} <Date dateString={campaign.sent_at} />
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
