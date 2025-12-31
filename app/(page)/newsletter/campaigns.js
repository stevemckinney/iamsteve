'use client'
import { useState, useEffect } from 'react'
import Date from '@/components/date'
import Icon from '@/components/icon'
export const revalidate = 2592000

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const response = await fetch('/api/campaigns', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          next: { revalidate: 2592000 },
        })
        const data = await response.json()
        setCampaigns(data.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching campaigns:', error)
        setLoading(false)
      }
    }
    getCampaigns()
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!campaigns || campaigns.length === 0)
    return <p>There are no previous issues</p>

  return (
    <ul className="flex flex-col -my-2">
      {campaigns.map((campaign) => {
        if (campaign.status !== 'SENT') return null

        return (
          <li
            key={campaign.id}
            className="not-first:border-t not-first:border-t not-first:border-neutral-01-200"
          >
            <div className="flex justify-between py-2 text-lg text-heading">
              {campaign.subject}{' '}
              <span className="flex items-center leading-none gap-2 text-base">
                <Date
                  dateString={campaign.sent_at}
                  className={`font-ui lowercase text-neutral-01-400`}
                />
                <Icon
                  icon="arrow-right"
                  className="text-neutral-01-400 relative -top-px"
                  size={16}
                />
              </span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default Campaigns
