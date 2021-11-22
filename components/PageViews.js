import useSWR from 'swr'

export const fetcher = async (RequestInfo) => {
  const Response = await fetch(RequestInfo)

  return await Response.json()
}

export const views = (slug) => {
  const { data } = useSWR(`/api/views/${slug}`, fetcher)

  return <>{data?.total ? `${data.total} views` : `0 views`}</>
}

export const PageViews = ({ slug }) => {
  const { data } = useSWR(`/api/views/${slug}`, fetcher)

  return <>{data?.total ? `${data.total} views` : `0`}</>
}
