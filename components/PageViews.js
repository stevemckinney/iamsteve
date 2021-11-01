import useSWR from 'swr';

const fetcher = async (RequestInfo) => {
  const Response = await fetch(RequestInfo);
  return await Response.json();
};

const PageViews = ({ slug }) => {
  const { data } = useSWR(`/api/views/${slug}`, fetcher);

  return <>{data?.total ? `${data.total} views` : `0`}</>;
};

export default PageViews;