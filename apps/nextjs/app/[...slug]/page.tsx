import { notFound } from 'next/navigation';

import { client } from '@/lib/sanity/client';
import { sanityFetch } from '@/lib/sanity/live';
// import { getMetaData } from "@/lib/seo";
import { PAGE_PATHS_QUERY, PAGE_QUERY } from '@repo/sanity/queries';
import { Blocks } from '../components/blocks';

async function fetchData(slug: string) {
  return await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
  });
}

async function fetchPaths() {
  const slugs = await client.fetch(PAGE_PATHS_QUERY);
  const paths: { slug: string[] }[] = [];
  for (const slug of slugs) {
    if (!slug) continue;
    const parts = slug.split('/').filter(Boolean);
    paths.push({ slug: parts });
  }
  return paths;
}

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ slug: string[] }>;
// }) {
//   const { slug } = await params;
//   const slugString = slug.join("/");
//   const { data: pageData } = await fetchSlugPageData(slugString);
//   if (!pageData) {
//     return getMetaData({});
//   }
//   return getMetaData(pageData);
// }

export async function generateStaticParams() {
  return await fetchPaths();
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugString = slug.join('/');
  const { data } = await fetchData(slugString);

  if (!data) {
    return notFound();
  }

  const { title, blocks, ...rest } = data ?? {};

  return !Array.isArray(blocks) || blocks?.length === 0 ? (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-4 text-2xl font-semibold capitalize">{title}</h1>
      <p className="mb-6 text-muted-foreground">
        This page has no content blocks yet.
      </p>
    </div>
  ) : (
    <Blocks blocks={blocks ?? []} {...rest} />
  );
}
