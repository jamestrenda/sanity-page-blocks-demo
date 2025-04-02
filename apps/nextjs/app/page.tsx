import { sanityFetch } from '@/lib/sanity/live';
import { getMetaData } from '@/lib/seo';
import { INDEX_QUERY } from '@repo/sanity/queries';
import { Blocks } from './components/blocks';

async function fetchData() {
  return await sanityFetch({
    query: INDEX_QUERY,
  });
}

export async function generateMetadata() {
  const { data: pageData } = await fetchData();
  if (!pageData) {
    return getMetaData({});
  }
  return getMetaData(pageData);
}

export default async function Home() {
  const { data } = await fetchData();

  if (!data) {
    return <div>No home page data</div>;
  }

  const { blocks, ...rest } = data ?? {};

  return <Blocks blocks={blocks ?? []} {...rest} />;
}
