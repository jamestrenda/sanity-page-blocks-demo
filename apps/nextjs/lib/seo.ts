import type { Metadata } from 'next';

import { getBaseUrl } from '@/config';
import { Maybe } from '@repo/sanity/types';

// interface OgImageOptions {
//   type?: string;
//   id?: string;
// }

// function getOgImage({ type, id }: OgImageOptions = {}): string {
//   const params = new URLSearchParams();
//   if (id) params.set('id', id);
//   if (type) params.set('type', type);
//   const baseUrl = getBaseUrl();
//   const logoUrl = `${baseUrl}/api/og?${params.toString()}`;
//   return logoUrl;
// }

interface MetaDataInput {
  _type?: Maybe<string>;
  seoDescription?: Maybe<string>;
  seoTitle?: Maybe<string>;
  slug?: Maybe<{ current: string | null }> | string | null;
  title?: Maybe<string>;
  description?: Maybe<string>;
  _id?: Maybe<string>;
}

export function getMetaData(data: MetaDataInput): Metadata {
  const {
    // _type,
    seoDescription,
    seoTitle,
    slug,
    title,
    description,
    // _id,
  } = data ?? {};

  const baseUrl = getBaseUrl();
  const pageSlug = typeof slug === 'string' ? slug : (slug?.current ?? '');
  const pageUrl = `${baseUrl}${pageSlug}`;

  const meta = {
    title: seoTitle ?? title ?? '',
    description: seoDescription ?? description ?? '',
  };

  //   const ogImage = getOgImage({
  //     type: _type ?? undefined,
  //     id: _id ?? undefined,
  //   });

  return {
    title: `${meta.title} | Sanity Page Blocks Demo`,
    description: meta.description,
    metadataBase: new URL(baseUrl),
    creator: 'James Trenda',
    authors: [{ name: 'James Trenda', url: 'https://trenda.dev' }],
    icons: {
      icon: `https://fav.farm/%E2%97%BC%EF%B8%8F`, // black square
    },
    other: {
      canonical: pageUrl,
    },
    // keywords: [
    //   'roboto',
    //   'studio',
    //   'demo',
    //   'sanity',
    //   'next',
    //   'react',
    //   'template',
    // ],
    // twitter: {
    //   card: 'summary_large_image',
    //   images: [ogImage],
    //   creator: '@studioroboto',
    //   title: meta.title,
    //   description: meta.description,
    // },
    // openGraph: {
    //   type: 'website',
    //   countryName: 'UK',
    //   description: meta.description,
    //   title: meta.title,
    //   images: [
    //     {
    //       url: ogImage,
    //       width: 1200,
    //       height: 630,
    //       alt: meta.title,
    //       secureUrl: ogImage,
    //     },
    //   ],
    //   url: pageUrl,
    // },
  };
}
